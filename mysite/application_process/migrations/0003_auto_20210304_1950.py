# Generated by Django 3.1.6 on 2021-03-04 17:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('social_django', '0010_uid_db_index'),
        ('application_process', '0002_position_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='social_django.usersocialauth'),
        ),
    ]