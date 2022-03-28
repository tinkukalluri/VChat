from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Messages(models.Model):
    msg_to=models.ForeignKey(User ,on_delete=models.CASCADE , related_name='msg_to_rel')
    msg_from= models.ForeignKey(User ,on_delete=models.CASCADE , related_name='msg_from_rel')
    text=models.TextField()
    delivered=models.BooleanField()
    seen=models.BooleanField()
    send_on=models.DateTimeField(auto_now_add=True)


class Friends(models.Model):
    user_1= models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_1_rel")
    user_2= models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_2_rel")
    close_friend=models.BooleanField()