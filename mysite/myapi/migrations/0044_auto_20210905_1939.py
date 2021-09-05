# Generated by Django 3.1.6 on 2021-09-05 16:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0043_document_uploaded_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='document',
            old_name='document',
            new_name='file',
        ),
        migrations.RemoveField(
            model_name='document',
            name='application_process_id',
        ),
        migrations.AddField(
            model_name='document',
            name='application_process_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapi.applicationprocess'),
        ),
    ]
