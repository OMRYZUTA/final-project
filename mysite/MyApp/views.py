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


def get_position_form(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = PositionForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            form.save()
            return HttpResponseRedirect('/MyApp/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = PositionForm()

    return render(request, 'position_form.html', {'form': form})


def get_thanks(request):
    return render(request, 'thanks.html')
