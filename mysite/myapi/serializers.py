from rest_framework import serializers
from .models import Position, ApplicationProcess


class PositionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Position
        fields = '__all__'
        
class ApplicationProcessSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = ApplicationProcess
        fields = '__all__'        