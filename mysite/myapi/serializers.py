from rest_framework import serializers
from .models import Position

class PositionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Position
        fields = ('job_title', 'company_name', 'user_id')