from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import PositionSerializer
from .models import Position
from django.contrib.auth.decorators import login_required


# class PositionList(generics.ListAPIView):
#     serializer_class = PositionSerializer

#     def get_queryset(self):
#         user = self.request.user
#         return Position.objects.filter(user_id=user)


class PositionViewSet(viewsets.ModelViewSet):

    serializer_class = PositionSerializer
    queryset = Position.objects.all()

    # @login_required
    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user_id=self.request.user.id)
        return query_set
