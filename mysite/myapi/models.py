from django.db import models
from django.core import serializers
from datetime import datetime
from django.core.exceptions import ValidationError
import django


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
    country_id = models.CharField(
        max_length=2, default="IL", null=True, blank=True)
    # later update city field with Local-Flavor library?
    city = models.CharField(max_length=100, null=True, blank=True)
    # EmailField(max_length=None, min_length=None, allow_blank=False)
    initial_contact_email_address = models.EmailField(
        max_length=100, null=True, blank=True)
    # URLField(max_length=200, min_length=None, allow_blank=False)
    job_posting_URL = models.URLField(max_length=250, null=True, blank=True)
    # maybe change to textField?
    about_the_job = models.CharField(
        max_length=500, null=True, blank=True)  # roughly 2 paragraphs

    def __str__(self):
        return self.job_title  # update later


class Stage(models.Model):
    EVENT_TYPE_CHOICES = (
        ("CV", "cv sent"), ("II", "initial interview"), ("HI", "HR interview"),
        ("LI", "team leader interview"), ("MI",
                                          "management interview"), ("OO", "offer received"),
        ("NG", "negotiations"), ("OA", "offer accepted"), ("OR", "offer rejected"), ("OT", "other"),)
    EVENT_MEDIA_CHOICES = (("FI", "F2F"), ("VI", "video call"),
                           ("PI", "phone call"), ("EM", "email"), ("OT", "other"),)

    id = models.AutoField(primary_key=True)
    application_process_id = models.ForeignKey(
        'ApplicationProcess', null=True, on_delete=models.CASCADE)

    date = models.DateField(
        auto_now_add=True, null=True, blank=True)
    event_type = models.CharField(
        max_length=2, choices=EVENT_TYPE_CHOICES, default="OT")
    event_media = models.CharField(
        max_length=2, choices=EVENT_MEDIA_CHOICES, default="OT")
    notes = models.TextField(null=True, blank=True)
    # contact? nested contact per stage

    def __str__(self):
        return self.event_type  # update later


class ApplicationProcess(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    note = models.TextField(null=True, blank=True)
    last_modified = models.DateField(auto_now_add=True, null=True, blank=True)
    # sent_resume= models.FileField()
    # will be one to many - several different application process will have same position (after parsing from other APIs)
    position = models.OneToOneField(
        Position, on_delete=models.CASCADE, null=True, blank=True)

    APPLIED = 'AP'
    CLOSED = 'CL'
    STATUS_CHOICES = [
        (APPLIED, 'applied'),
        (CLOSED, 'closed')
    ]
    status = models.CharField(
        max_length=2,
        choices=STATUS_CHOICES,
        default=APPLIED,
    )

    def __str__(self):
        return self.position.job_title  # update later
