from django.shortcuts import render

from rest_framework import viewsets

from .serializers import PositionSerializer
from .models import Position

class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all().order_by('job_title')
    serializer_class = PositionSerializer
