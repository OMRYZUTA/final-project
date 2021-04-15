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
        queryset = queryset.filter(user_id=self.request.user.id)

        position = self.request.query_params.get('position')
        if position is not None:
            queryset = queryset.filter(position_id=position)

        return queryset


""" class PurchaseList(generics.ListAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        
        #Optionally restricts the returned purchases to a given user,
        # by filtering against a `username` query parameter in the URL.
        
        queryset = Purchase.objects.all()
        username = self.request.query_params.get('username')
        if username is not None:
            queryset = queryset.filter(purchaser__username=username)
        return queryset
        """
