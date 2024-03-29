# Generated by Django 3.1.6 on 2021-07-17 07:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0023_auto_20210717_1003'),
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.CharField(max_length=2, primary_key=True, serialize=False)),
                ('event_media', models.TextField()),
            ],
            options={
                'db_table': 'status',
                'managed': False,
            },
        ),
        migrations.AlterField(
            model_name='applicationprocess',
            name='status',
            field=models.ForeignKey(default='OT', on_delete=django.db.models.deletion.DO_NOTHING, to='myapi.status'),
        ),
    ]
