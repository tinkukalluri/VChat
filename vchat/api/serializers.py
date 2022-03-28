from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Messages , Friends


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Messages
        fields=("msg_to" , "msg_from" , "text" , "delivered" , "seen")

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Friends
        fields=("user_1" , "user_2" , "close_friend")