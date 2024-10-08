# Generated by Django 4.1.2 on 2024-09-28 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_profile_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='is_posted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='blog',
            name='schedule_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
