from rest_framework import serializers
from .models import Position, ApplicationProcess, Countries


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


class ApplicationProcessSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    position = PositionSerializer()

    class Meta:
        model = ApplicationProcess
        fields = '__all__'

    def create(self, validated_data):
        position_validated_data = validated_data.pop('position')

        position_serializer = self.fields['position']
        position = position_serializer.create(position_validated_data)
        validated_data['position'] = position
        application_process = ApplicationProcess.objects.create(
            **validated_data)
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
