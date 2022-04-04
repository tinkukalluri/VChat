# Generated by Django 3.2.3 on 2022-04-03 17:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0004_auto_20220402_0041'),
    ]

    operations = [
        migrations.AddField(
            model_name='friends',
            name='group_name',
            field=models.CharField(default='', max_length=12),
        ),
        migrations.CreateModel(
            name='User_2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(default='generate_unique_code_User_2', max_length=12)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
