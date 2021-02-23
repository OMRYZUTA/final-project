from django.urls import path
from . import views

app_name = 'application_process'
urlpatterns = [
    path('position_form/', views.get_position_form, name="position_form"),
    path('thanks/', views.get_thanks, name="thanks"),
]
