# Generated by Django 3.1.6 on 2021-08-22 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0034_auto_20210821_2124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='about_the_job',
            field=models.CharField(blank=True, max_length=4000, null=True),
        ),
    ]
