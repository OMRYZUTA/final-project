# Generated by Django 3.1.6 on 2021-04-18 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicationprocess',
            name='status',
            field=models.CharField(choices=[('AP', 'applied'), ('CL', 'closed')], default='AP', max_length=2),
        ),
    ]
