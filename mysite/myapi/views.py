from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PositionSerializer, ApplicationProcessSerializer, ContactSerializer, StageSerializer, EventTypeSerializer, EventMediaSerializer, StatusSerializer
from .models import Position, ApplicationProcess, Contact, Stage, EventType, EventMedia, Status
from django.contrib.auth.decorators import login_required
from rest_framework import permissions


class StatusViewSet(viewsets.ModelViewSet):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()


class EventTypeViewSet(viewsets.ModelViewSet):
    serializer_class = EventTypeSerializer
    queryset = EventType.objects.all()


class EventMediaViewSet(viewsets.ModelViewSet):
    serializer_class = EventMediaSerializer
    queryset = EventMedia.objects.all()


class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    queryset = Stage.objects.all()


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


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
        #queryset = queryset.filter(user_id=self.request.user.id)
        queryset = queryset.all()

        position = self.request.query_params.get('position')
        if position is not None:
            queryset = queryset.filter(position_id=position)

        return queryset
