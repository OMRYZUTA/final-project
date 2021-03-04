from django.db import models
from django.forms import ModelForm
from django import forms
from social_django.models import UserSocialAuth


class Position(models.Model):
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    user = models.ForeignKey(UserSocialAuth, on_delete=models.CASCADE)
    
    # email_address = forms.EmailField() #delete later

    def __str__(self):
        pass  # yet to be defined, delete later


class PositionForm(ModelForm):
    class Meta:
        model = Position
        fields = ['job_title', 'company_name','user']
