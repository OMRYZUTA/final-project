# Generated by Django 3.1.6 on 2021-07-10 13:51

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0016_auto_20210710_1649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationprocess',
            name='last_modified',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='stage',
            name='date',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
