# Generated by Django 3.2.3 on 2022-04-03 17:59

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20220403_2327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friends',
            name='group_name',
            field=models.CharField(default=api.models.generate_unique_code_friends, max_length=12),
        ),
        migrations.AlterField(
            model_name='user_2',
            name='group_name',
            field=models.CharField(default=api.models.generate_unique_code_User_2, max_length=12),
        ),
    ]
