from django.contrib import admin
from .models import Messages , Friends , User_2

# Register your models here.

register = admin.site.register(Messages)
register = admin.site.register(Friends)
register = admin.site.register(User_2)
