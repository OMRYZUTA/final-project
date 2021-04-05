from django.db import models
from django.core import serializers
from datetime import datetime


class Position(models.Model):
    # owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    country_id = models.CharField(max_length=2, default="IL", null=True)
    city = models.CharField(max_length=100, null=True)
    #EmailField(max_length=None, min_length=None, allow_blank=False)
    initial_contact_email_address = models.EmailField(max_length=100,null=True)
    #URLField(max_length=200, min_length=None, allow_blank=False)
    job_posting_URL = models.URLField(max_length=250,null=True)
    about_the_job = models.CharField(max_length=500, null=True) # roughly 2 paragraphs
    
    # def save(self, *args, **kwargs):
    #     pass    

    def __str__(self):
        return self.job_title  # update later


class ApplicationProcess(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    date = models.DateField(default=datetime.now)
    #will be one to many - several different application process will have same position (after parsing from other APIs)
    position = models.OneToOneField(Position,on_delete=models.CASCADE, null=True)
    
    #ForeignKey(UserSocialAuth.uid, on_delete=models.CASCADE)

    def __str__(self):
        return self.job_title  # update later
