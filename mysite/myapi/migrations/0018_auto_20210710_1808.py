# Generated by Django 3.1.6 on 2021-07-10 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0017_auto_20210710_1651'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stage',
            name='date',
        ),
        migrations.AddField(
            model_name='stage',
            name='stage_date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='applicationprocess',
            name='last_modified',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]