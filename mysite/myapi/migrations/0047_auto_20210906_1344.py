# Generated by Django 3.1.6 on 2021-09-06 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0046_document_file_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='uploaded_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
