# Generated by Django 3.1.6 on 2021-09-06 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0045_auto_20210906_0951'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='file_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
