# core/views.py

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from .models import PositionForm


def login(request):
    return render(request, 'login.html')


@login_required
def home(request):
    return render(request, 'home.html')