# Generated by Django 3.1.6 on 2021-07-10 13:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0015_auto_20210427_1824'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicationprocess',
            name='date',
        ),
        migrations.AddField(
            model_name='applicationprocess',
            name='last_modified',
            field=models.DateField(blank=True, default=datetime.datetime(2021, 7, 10, 16, 49, 26, 506617), null=True),
        ),
        migrations.AlterField(
            model_name='stage',
            name='date',
            field=models.DateField(blank=True, default=datetime.datetime(2021, 7, 10, 16, 49, 26, 506617), null=True),
        ),
    ]
