from django.urls import path
from . import views

app_name = 'application_process'
urlpatterns = [
    path('position_form/', views.get_position_form, name="position_form"),
    path('dashboard/', views.get_dashboard, name="dashboard"),
    path('thanks/', views.get_thanks, name="thanks"),
]
