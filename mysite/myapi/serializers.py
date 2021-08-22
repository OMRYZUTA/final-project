from rest_framework import serializers
from .models import EventType, Position, ApplicationProcess, Countries, Contact, Stage, EventMedia, Status
from datetime import date


class CountrySerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        managed = False
        model = Countries
        fields = '__all__'


class EventMediaSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        managed = False
        model = EventMedia
        fields = '__all__'


class EventTypeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        managed = False
        model = EventType
        fields = '__all__'


class StatusSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        managed = False
        model = Status
        fields = '__all__'


class PositionSerializer(serializers.HyperlinkedModelSerializer):
    application_process_id = serializers.PrimaryKeyRelatedField(
        many=False, read_only=True)

    class Meta:
        model = Position
        fields = '__all__'

    def validate_country_id(self, value):
        if value not in Countries.objects.values_list('id', flat=True):
            raise serializers.ValidationError(
                f'{value}  is not a valid country code')
        return value

    def create(self, validated_data):
        position = Position.objects.create(
            **validated_data)
        return position


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(default=None, write_only=False)
    application_process_id = serializers.PrimaryKeyRelatedField(
        many=False, read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'


class StageSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(default=None, write_only=False)
    application_process_id = serializers.PrimaryKeyRelatedField(
        many=False, read_only=True)
    event_type = EventTypeSerializer()
    event_media = EventTypeSerializer()

    class Meta:
        model = Stage
        fields = '__all__'

    def create(self, validated_data):

        event_type_validated_data = validated_data.pop('event_type')
        event_type_serializer = self.fields['event_type']
        event_type = event_type_serializer.create(event_type_validated_data)
        validated_data['event_type'] = event_type
        event_media_validated_data = validated_data.pop('event_media')
        event_media_serializer = self.fields['event_media']
        event_media = event_media_serializer.create(event_media_validated_data)
        validated_data['event_media'] = event_media
        stage = Stage.objects.create(
            **validated_data)
        return stage


class ApplicationProcessSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    position = PositionSerializer()
    contact_set = ContactSerializer(many=True, read_only=False)
    # stage_set ApplicationProcess field automatically generated by django because of many-to-one
    stage_set = StageSerializer(many=True, read_only=False)
    status = StatusSerializer()
    # reference_set

    class Meta:
        model = ApplicationProcess
        fields = '__all__'

    def create(self, validated_data):
        status_validated_data = validated_data.pop('status')

        if(status_validated_data != None):
            status_name = status_validated_data['name']
            status = Status.objects.get(name=status_name)
            validated_data['status'] = status

        position_validated_data = validated_data.pop('position')

        contacts_data = validated_data.pop('contact_set')
        stages_data = validated_data.pop('stage_set')
        application_process = ApplicationProcess.objects.create(
            **validated_data)

        Position.objects.create(
            application_process_id=application_process, **position_validated_data)

        for contact_data in contacts_data:
            Contact.objects.create(
                application_process_id=application_process, **contact_data)

        for stage_data in stages_data:
            Stage.objects.create(
                application_process_id=application_process, **stage_data)

        return application_process

    def update(self, instance, validated_data):
        status_validated_data = validated_data.pop('status')

        if(status_validated_data != None):
            status_name = status_validated_data['name']
            status = Status.objects.get(name=status_name)
            validated_data['status'] = status
        validated_data['last_modified'] = date.today()

        # CHANGE "position" here to match one-to-one field name
        if 'position' in validated_data:
            nested_position_validated_data = validated_data.pop('position')
            nested_position_serializer = self.fields['position']
            nested_position_instance = instance.position
            # Runs the update on whatever serializer the nested data belongs to
            nested_position_serializer.update(
                nested_position_instance, nested_position_validated_data)

        if 'contact_set' in validated_data:
            nested_contact_validated_data = validated_data.pop('contact_set')
            contacts_to_remove = {
                contact.id: contact for contact in instance.contact_set.all()}

            for contact in nested_contact_validated_data:
                contact_id = contact.get('id', None)

                if contact_id is None:
                    # new contact to created
                    instance.contact_set.create(**contact)
                elif contacts_to_remove.get(contact_id, None) is not None:
                    # update this item
                    instance_contact = contacts_to_remove.pop(contact_id)
                    Contact.objects.filter(
                        id=instance_contact.id).update(**contact)

            for contact in contacts_to_remove.values():
                contact.delete()

        if 'stage_set' in validated_data:
            nested_stage_validated_data = validated_data.pop('stage_set')
            stages_to_remove = {
                stage.id: stage for stage in instance.stage_set.all()}

            for stage in nested_stage_validated_data:
                stage_id = stage.get('id', None)

                if stage_id is None:
                    # new stage to created
                    instance.stage_set.create(**stage)
                elif stages_to_remove.get(stage_id, None) is not None:
                    # update this item
                    instance_stage = stages_to_remove.pop(stage_id)
                    Stage.objects.filter(
                        id=instance_stage.id).update(**stage)
            for stage in stages_to_remove.values():
                stage.delete()

        for field in validated_data:
            setattr(instance, field, validated_data.get(
                field, getattr(instance, field)))
        instance.save()

        return instance
