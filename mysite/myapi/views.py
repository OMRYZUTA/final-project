
from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PositionSerializer, ApplicationProcessSerializer, ContactSerializer, StageSerializer, EventTypeSerializer, EventMediaSerializer, StatusSerializer, DocumentSerializer
from .models import Position, ApplicationProcess, Contact, Stage, EventType, EventMedia, Status, StatsManager, Document
from datetime import datetime, date

# ViewSets define the view behavior.


class PassthroughRenderer(renderers.BaseRenderer):
    """
        Return data as-is. View should supply a Response.
    """
    media_type = ''
    format = ''

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()

    def list(self, request):
        queryset = Document.objects.filter(file_url="")
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)


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


class StatsView(APIView):

    def get(self, request, format=None):
        stats = StatsManager.getStatsByUserID(2)
        return Response(stats)


class ApplicationProcessViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationProcessSerializer
    queryset = ApplicationProcess.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        #queryset = queryset.filter(user_id=self.request.user.id)
        queryset = queryset.all()

        position = self.request.query_params.get('position')
        if position is not None:
            queryset = queryset.filter(position_id=position)

        return queryset
