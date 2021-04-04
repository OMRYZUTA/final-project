from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'positions', views.PositionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]


