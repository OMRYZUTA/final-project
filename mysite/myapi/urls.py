from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'positions', views.PositionViewSet)
router.register(r'eventtypes', views.EventTypeViewSet)
router.register(r'applicationprocesses', views.ApplicationProcessViewSet)
router.register(r'contacts', views.ContactViewSet)
router.register(r'stages', views.StageViewSet)
router.register(r'countries', views.CountryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
