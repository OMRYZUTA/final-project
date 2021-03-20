from django.shortcuts import render

from rest_framework import viewsets, generics

from .serializers import PositionSerializer
from .models import Position


class PositionList(generics.ListAPIView):
    serializer_class = PositionSerializer

    def get_queryset(self):
        user = self.request.user
        return Position.objects.filter(user_id=user)


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all().order_by('job_title')
    serializer_class = PositionSerializer
