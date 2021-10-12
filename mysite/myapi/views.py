
from django.shortcuts import render
from .models import ApplicationProcess, Contact, Document, EventMedia, EventType, Position,  Stage,  Status, StatsManager
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from rest_framework import viewsets
from .serializers import PositionSerializer, ApplicationProcessSerializer, ContactSerializer, StageSerializer, EventTypeSerializer, EventMediaSerializer, StatusSerializer, DocumentSerializer
# ViewSets define the view behavior.


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
    # if login is implemented, the userID will be part of the request
    def get(self, request):
        stats = StatsManager.getStatsByUserID(2)
        return Response(stats)


class ApplicationProcessViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationProcessSerializer
    queryset = ApplicationProcess.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        # becomes relevant if login is implemented
        queryset = queryset.filter(user_id=1)
        # queryset = queryset.all()
s
        position = self.request.query_params.get('position')

        if position is not None:
            queryset = queryset.filter(position_id=position)

        return queryset
