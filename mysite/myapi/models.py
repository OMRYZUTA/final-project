from django.db import models
from django.core import serializers
from datetime import datetime
from django.core.exceptions import ValidationError
import django


class EventType(models.Model):
    id = models.CharField(primary_key=True, max_length=2)
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'event_type'


class EventMedia(models.Model):
    id = models.CharField(primary_key=True, max_length=2)
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'event_media'


class Status(models.Model):
    id = models.CharField(primary_key=True, max_length=2)
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'status'


class Countries(models.Model):
    id = models.CharField(primary_key=True, max_length=2)
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'countries'


class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(
        default='main', max_length=100, null=True, blank=True)
    email_address = models.EmailField(max_length=100, null=True, blank=True)
    # later update phone fields with Local-Flavor library?
    phone_number1 = models.CharField(max_length=100, null=True, blank=True)
    phone_number2 = models.CharField(max_length=100, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    # null=true ??
    application_process_id = models.ForeignKey(
        'ApplicationProcess', null=True, on_delete=models.CASCADE)


class Position(models.Model):
    # owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    country = models.ForeignKey(
        Countries, null=False, default="IL", on_delete=models.DO_NOTHING)
    city = models.CharField(max_length=100, null=True, blank=True)
    initial_contact_email_address = models.EmailField(
        max_length=100, null=True, blank=True)
    job_posting_URL = models.URLField(max_length=250, null=True, blank=True)
    # maybe change to textField?
    about_the_job = models.CharField(
        max_length=500, null=True, blank=True)  # roughly 2 paragraphs

    #     class Restaurant(models.Model):
    # place = models.OneToOneField(
    #     Place,
    #     on_delete=models.CASCADE,
    #     primary_key=True,
    # )

    application_process_id = models.OneToOneField(
        'ApplicationProcess', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.job_title  # update later


class Stage(models.Model):
    id = models.AutoField(primary_key=True)
    application_process_id = models.ForeignKey(
        'ApplicationProcess', null=True, on_delete=models.CASCADE)
    stage_date = models.DateField(
        auto_now_add=True, null=True, blank=True)
    event_type = models.ForeignKey(
        EventType, null=False, default="OT", on_delete=models.DO_NOTHING)
    event_media = models.ForeignKey(
        'EventMedia', null=False, default="OT", on_delete=models.DO_NOTHING)
    notes = models.TextField(null=True, blank=True)
    # contact? nested contact per stage

    def __str__(self):
        return self.stage_date  # update later


class ApplicationProcess(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    note = models.TextField(null=True, blank=True)
    reference = models.TextField(null=True, blank=True)
    last_modified = models.DateField(auto_now_add=True, null=True, blank=True)
    # sent_resume= models.FileField()
    status = models.ForeignKey(
        'Status', null=False, default="IN", on_delete=models.DO_NOTHING)
    # position = models.OneToOneField(
    #     Position, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.id
