# Generated by Django 3.1.6 on 2021-03-20 18:50

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicationProcess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=100)),
                ('company_name', models.CharField(max_length=100)),
                ('user_id', models.IntegerField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='position',
            name='city',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='position',
            name='country',
            field=django_countries.fields.CountryField(max_length=2, null=True),
        ),
    ]