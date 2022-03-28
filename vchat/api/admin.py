from django.contrib import admin
from .models import Messages , Friends

# Register your models here.

register = admin.site.register(Messages)
register = admin.site.register(Friends)
