from rest_framework import serializers
from .models import Position
from django_countries.serializer_fields import CountryField


class CountrySerializer(serializers.Serializer):
    country = CountryField()


class PositionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Position
        country = CountryField()
        fields = ('job_title', 'company_name', 'user_id', 'country', 'city')
