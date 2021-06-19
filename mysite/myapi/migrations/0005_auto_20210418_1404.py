# Generated by Django 3.1.6 on 2021-04-18 11:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0004_auto_20210418_1110'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicationprocess',
            name='contact',
        ),
        migrations.AddField(
            model_name='contact',
            name='application_process',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='myapi.applicationprocess'),
        ),
        migrations.AddField(
            model_name='contact',
            name='description',
            field=models.CharField(default='main', max_length=100),
        ),
    ]