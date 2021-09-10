from rest_framework import serializers
from .models import EventType, Position, ApplicationProcess, Contact, Stage, EventMedia, Status, Document
from datetime import date, datetime
from rest_framework.serializers import Serializer, FileField

# Serializers define the API representation.


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
    id = serializers.IntegerField(read_only=True)
    application_process_id = serializers.PrimaryKeyRelatedField(
        many=False, read_only=True)
    event_type = EventTypeSerializer()
    event_media = EventTypeSerializer()

    class Meta:
        model = Stage
        fields = '__all__'

    def create(self, validated_data):
        stage = Stage.objects.create(
            **validated_data)
        return stage


class DocumentSerializer(serializers.ModelSerializer):
    application_process_id = serializers.PrimaryKeyRelatedField(
        many=False, queryset=ApplicationProcess.objects.all(), allow_null=True)
    id = serializers.IntegerField(
        read_only=True,
        default=None,
        write_only=False)

    class Meta:
        model = Document
        fields = '__all__'


class ApplicationProcessSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    position = PositionSerializer()
    status = StatusSerializer()
    # stage_set ApplicationProcess field automatically generated by django because of many-to-one
    contact_set = ContactSerializer(many=True, read_only=False)
    stage_set = StageSerializer(many=True, read_only=False)
    document_set = DocumentSerializer(many=True, read_only=False)

    class Meta:
        model = ApplicationProcess
        fields = '__all__'

    def create(self, validated_data):
        status_validated_data = validated_data.pop('status')
        position_validated_data = validated_data.pop('position')
        contacts_data = validated_data.pop('contact_set')
        stages_data = validated_data.pop('stage_set')
        documents_data = validated_data.pop('document_set')

        # status is a direct field in ApplicationProcess model
        if(status_validated_data != None):
            status_name = status_validated_data['name']
            status = Status.objects.get(name=status_name)
            validated_data['status'] = status

        application_process = ApplicationProcess.objects.create(
            **validated_data)

        # nested objects in ApplicationProcess

        Position.objects.create(
            application_process_id=application_process, **position_validated_data)

        for document_data in documents_data:
            Document.objects.create(
                application_process_id=application_process, **document_data)

        for contact_data in contacts_data:
            Contact.objects.create(
                application_process_id=application_process, **contact_data)

        for stage_data in stages_data:
            event_type_validated_data = stage_data.pop('event_type')
            if(event_type_validated_data != None):
                event_type_name = event_type_validated_data['name']
                event_type = EventType.objects.get(name=event_type_name)
                stage_data['event_type'] = event_type

            event_media_validated_data = stage_data.pop('event_media')
            if(event_media_validated_data != None):
                event_media_name = event_media_validated_data['name']
                event_media = EventMedia.objects.get(name=event_media_name)
                stage_data['event_media'] = event_media

            Stage.objects.create(
                application_process_id=application_process, **stage_data)

        return application_process

    def update(self, instance, validated_data):
        validated_data['last_modified'] = date.today()

        if('status' in validated_data):
            status_validated_data = validated_data.pop('status')
            validated_data['status'] = self.update_status(
                status_validated_data)

        if 'position' in validated_data:
            nested_position_validated_data = validated_data.pop('position')
            self.update_position(nested_position_validated_data, instance)

        if 'document_set' in validated_data:
            nested_documents_validated_data = validated_data.pop(
                'document_set')
            self.update_document_set(nested_documents_validated_data, instance)

        if 'contact_set' in validated_data:
            nested_contact_validated_data = validated_data.pop('contact_set')
            self.update_contact_set(nested_contact_validated_data, instance)

        if 'stage_set' in validated_data:
            nested_stage_validated_data = validated_data.pop('stage_set')
            stages_to_remove = {
                stage.id: stage for stage in instance.stage_set.all()}

            for stage_data in nested_stage_validated_data:
                stage_id = stage_data.get('id', None)

                if stage_id is None:
                    # new stage to created
                    event_type_validated_data = stage_data.pop('event_type')
                    if(event_type_validated_data != None):
                        event_type_name = event_type_validated_data['name']
                        event_type = EventType.objects.get(
                            name=event_type_name)
                        stage_data['event_type'] = event_type

                    event_media_validated_data = stage_data.pop('event_media')
                    if(event_media_validated_data != None):
                        event_media_name = event_media_validated_data['name']
                        event_media = EventMedia.objects.get(
                            name=event_media_name)
                        stage_data['event_media'] = event_media

                    Stage.objects.create(
                        application_process_id=instance, **stage_data)

                elif stages_to_remove.get(stage_id, None) is not None:
                    # update this item
                    instance_stage = stages_to_remove.pop(stage_id)
                    Stage.objects.filter(
                        id=instance_stage.id).update(**stage_data)

            for stage in stages_to_remove.values():
                stage.delete()

        for field in validated_data:
            setattr(instance, field, validated_data.get(
                field, getattr(instance, field)))
        instance.save()

        return instance

    def update_status(self, status_validated_data):
        status_name = status_validated_data['name']
        status = Status.objects.get(name=status_name)
        return status

    def update_position(self, nested_position_validated_data, instance):
        nested_position_serializer = self.fields['position']
        nested_position_instance = instance.position
        # Runs the update on whatever serializer the nested data belongs to
        nested_position_serializer.update(
            nested_position_instance, nested_position_validated_data)

    def update_document_set(self, nested_documents_validated_data, instance):
        documents_to_remove = {
            document.id: document for document in instance.document_set.all()}
        for document in nested_documents_validated_data:
            document_id = document.get('id', None)
            if document_id is None:
                # new contact to created
                instance.document_set.create(**document)
            elif documents_to_remove.get(document_id, None) is not None:
                # update this item
                instance_document = documents_to_remove.pop(document_id)
                Document.objects.filter(
                    id=instance_document.id).update(**document)

        for document in documents_to_remove.values():
            document.delete()

    def update_contact_set(self, nested_contact_validated_data, instance):
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
