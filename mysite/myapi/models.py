from django.db import models
from django.core import serializers
from datetime import datetime, date
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


class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(
        default='main', max_length=300, null=True, blank=True)
    email_address = models.EmailField(max_length=100, null=True, blank=True)
    # later update phone fields with Local-Flavor library?
    phone_number1 = models.CharField(max_length=100, null=True, blank=True)
    phone_number2 = models.CharField(max_length=100, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    # null=true ??
    application_process_id = models.ForeignKey(
        'ApplicationProcess', null=True, on_delete=models.CASCADE)


class Position(models.Model):
    job_title = models.CharField(max_length=200, null=True, blank=True)
    company_name = models.CharField(max_length=200, null=True, blank=True)
    country_id = models.CharField(
        max_length=3, default="IL", null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    initial_contact_email_address = models.EmailField(
        max_length=100, null=True, blank=True)
    job_posting_URL = models.URLField(max_length=250, null=True, blank=True)
    # maybe change to textField?
    about_the_job = models.CharField(
        max_length=5000, null=True, blank=True)  # roughly 2 paragraphs
    application_process_id = models.OneToOneField(
        'ApplicationProcess', null=False, on_delete=models.CASCADE, primary_key=True)
# default

    def __str__(self):
        return str(self.job_title)  # update later


class Stage(models.Model):
    id = models.AutoField(primary_key=True)
    application_process_id = models.ForeignKey(
        'ApplicationProcess', null=True, on_delete=models.CASCADE)
    stage_date = models.DateField(null=True, blank=True)
    event_type = models.ForeignKey(
        EventType, null=False, default="OT", on_delete=models.DO_NOTHING)
    event_media = models.ForeignKey(
        'EventMedia', null=False, default="OT", on_delete=models.DO_NOTHING)
    notes = models.TextField(null=True, blank=True)
    # contact? nested contact per stage

    def __str__(self):
        return str(self.stage_date)  # update later


class ApplicationProcess(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    note = models.TextField(null=True, blank=True)
    reference = models.TextField(null=True, blank=True)
    last_modified = models.DateField(auto_now_add=True, null=True, blank=True)
    status = models.ForeignKey(
        'Status', null=False, default="IN", on_delete=models.DO_NOTHING)
    # sent_resume= models.FileField()

    def __str__(self):
        return str(self.id)


class StatsManager(models.Model):
    class Meta:
        managed = False

    def getStatsByUserID(id):
        open_applications = StatsManager.get_open_applications_by_id(id)
        future_stages = StatsManager.get_num_of_future_stages(
            open_applications)

        return {"open_applications": len(open_applications), "future_stages": future_stages}

    def get_open_applications_by_id(id):
        applications = ApplicationProcess.objects.filter(user_id=id)
        open_applications = []
        for app in applications:
            if app.status.id == "AP" or app.status.id == "PR":
                open_applications.append(app)
        return open_applications

    def get_num_of_future_stages(open_applications):
        future_stages = 0
        stages = []
        for app in open_applications:
            stages.append(Stage.objects.filter(
                application_process_id=app.id))

        for stage_query_set in stages:
            for stage in stage_query_set:
                if stage.stage_date >= date.today():
                    future_stages += 1
        return future_stages


class Document(models.Model):
    user_id = models.IntegerField(null=True)
    application_process_id = models.ForeignKey(
        ApplicationProcess, on_delete=models.SET_NULL,null=True)
    uploaded_at = models.DateField(null=True, blank=True)
    file = models.FileField(upload_to='uploads/',null=True, blank=True)
    file_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return str(self.user_id)
