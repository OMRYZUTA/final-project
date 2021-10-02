# Generated by Django 3.1.6 on 2021-10-02 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0048_auto_20210906_1348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='file_url',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='document',
            name='uploaded_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
