from rest_framework import serializers
from .models import Position, ApplicationProcess, Countries, Contact


class PositionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Position
        fields = '__all__'

    def validate_country_id(self, value):
        if value not in Countries.objects.values_list('id', flat=True):
            raise serializers.ValidationError(
                f'{value}  is not a valid country code')
        return value


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    application_process_id = serializers.PrimaryKeyRelatedField(many=False,read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'


class ApplicationProcessSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    position = PositionSerializer()
    # contact_set ApplicationProcess field automatically generated by django (because of many-to-one)
    contact_set = ContactSerializer(many=True, read_only=False)

    class Meta:
        model = ApplicationProcess
        fields = '__all__'

    def create(self, validated_data):
        position_validated_data = validated_data.pop('position')
        position_serializer = self.fields['position']
        position = position_serializer.create(position_validated_data)
        validated_data['position'] = position

        contacts_data = validated_data.pop('contact_set')
        application_process = ApplicationProcess.objects.create(
            **validated_data)

        for contact_data in contacts_data:
            Contact.objects.create(
                application_process=application_process, **contact_data)

        return application_process

    def update(self, instance, validated_data):
        # CHANGE "position" here to match one-to-one field name
        if 'position' in validated_data:
            nested_position_validated_data = validated_data.pop('position')
            nested_position_serializer = self.fields['position']
            nested_position_instance = instance.position
            # Runs the update on whatever serializer the nested data belongs to
            nested_position_serializer.update(
                nested_position_instance, nested_position_validated_data)

        if 'contact' in validated_data:
            nested_contact_validated_data = validated_data.pop('contact')
            nested_contact_serializer = self.fields['contact']
            nested_contact_instance = instance.contact
            # Runs the update on whatever serializer the nested data belongs to
            nested_contact_serializer.update(
                nested_contact_instance, nested_contact_validated_data)

        # Runs the original parent update(), since the nested fields were "popped" out of the data
        return super(ApplicationProcessSerializer, self).update(instance, validated_data)

    #     profile = instance.accountprofile

    #     # * User Info
    #     instance.first_name = validated_data.get(
    #         'first_name', instance.first_name)
    #     instance.last_name = validated_data.get(
    #         'last_name', instance.last_name)
    #     instance.email = validated_data.get(
    #         'email', instance.email)
    #     instance.save()

    #     # * AccountProfile Info
    #     profile.gender = profile_data.get(
    #         'gender', profile.gender)
    #     profile.phone = profile_data.get(
    #         'phone', profile.phone)
    #     profile.location = profile_data.get(
    #         'location', profile.location)
    #     profile.birth_date = profile_data.get(
    #         'birth_date', profile.birth_date)
    #     profile.biodata = profile_data.get(
    #         'biodata', profile.biodata)
    #     profile.save()

    #     return instance
