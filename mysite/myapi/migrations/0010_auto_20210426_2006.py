# Generated by Django 3.1.6 on 2021-04-26 17:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0009_auto_20210426_2000'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='application_process_url',
            new_name='application_process_id',
        ),
    ]
