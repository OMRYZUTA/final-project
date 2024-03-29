from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'applicationprocesses', views.ApplicationProcessViewSet)
router.register(r'contacts', views.ContactViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'eventtypes', views.EventTypeViewSet)
router.register(r'eventmedia', views.EventMediaViewSet)
router.register(r'positions', views.PositionViewSet)
router.register(r'statuses', views.StatusViewSet)
router.register(r'stages', views.StageViewSet)

urlpatterns = [
    path('stats', views.StatsView.as_view()),
    path('api/', include(router.urls)),
]
