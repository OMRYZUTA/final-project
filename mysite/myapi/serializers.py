from rest_framework import serializers
from .models import Position, ApplicationProcess


class PositionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Position
        fields = '__all__'


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
        validated_data.position = position
        application_process = ApplicationProcess.objects.create(
            **validated_data)
        return application_process
