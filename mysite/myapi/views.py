from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import PositionSerializer, ApplicationProcessSerializer
from .models import Position, ApplicationProcess
from django.contrib.auth.decorators import login_required
from rest_framework import permissions

class PositionViewSet(viewsets.ModelViewSet):

    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class ApplicationProcessViewSet(viewsets.ModelViewSet):

    serializer_class = ApplicationProcessSerializer
    queryset = ApplicationProcess.objects.all()
    # permission_classes  = [permissions.IsAuthenticatedOrReadOnly]
    

    # @login_required
    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user_id=self.request.user.id)
        return query_set
