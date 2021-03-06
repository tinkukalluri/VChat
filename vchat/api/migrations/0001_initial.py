# Generated by Django 3.2.3 on 2022-03-28 16:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('delivered', models.BooleanField()),
                ('seen', models.BooleanField()),
                ('send_on', models.DateTimeField(auto_now_add=True)),
                ('msg_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='msg_from_rel', to=settings.AUTH_USER_MODEL)),
                ('msg_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='msg_to_rel', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
