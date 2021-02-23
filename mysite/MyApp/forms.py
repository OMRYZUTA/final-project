from django import forms


class NameForm(forms.Form):
    Company = forms.CharField(label='Your name', max_length=100)
