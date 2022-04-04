from email.policy import default
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import string
import random
# Create your models here.


class Messages(models.Model):
    msg_to=models.ForeignKey(User ,on_delete=models.CASCADE , related_name='msg_to_rel')
    msg_from= models.ForeignKey(User ,on_delete=models.CASCADE , related_name='msg_from_rel')
    text=models.TextField()
    delivered=models.BooleanField(default=False)
    seen=models.BooleanField(default=False)
    send_on=models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        # converting utc to itc , the gap is 5.5 hours
        self.send_on=timezone.now() + timezone.timedelta(hours=5.5)
        print("timezome.now()::", self.send_on)
        #     self.created = timezone.now()
        # self.modified = timezone.now()
        return super(Messages , self).save(*args, **kwargs)


class Friends(models.Model):
    user_1= models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_1_rel")
    user_2= models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_2_rel")
    close_friend=models.BooleanField(default=False)

# extended Django Auth user...


class User_2(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
