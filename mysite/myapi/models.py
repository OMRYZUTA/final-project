from django.db import models
from django.core import serializers


class Position(models.Model):
    user_id = models.IntegerField(null=True)
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    country_id = models.CharField(max_length=2, default="IL", null=True)
    city = models.CharField(max_length=100, null=True)

    #ForeignKey(UserSocialAuth.uid, on_delete=models.CASCADE)

    # email_address = forms.EmailField() #delete later

    def __str__(self):
        return self.job_title  # update later


class ApplicationProcess(models.Model):
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    user_id = models.IntegerField(null=True)
    #ForeignKey(UserSocialAuth.uid, on_delete=models.CASCADE)

    # email_address = forms.EmailField() #delete later

    def __str__(self):
        return self.job_title  # update later
