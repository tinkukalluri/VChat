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

def generate_unique_code_friends():
    length = 6
    while True:
        group_name = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Friends.objects.filter(group_name=group_name).count() == 0:
            break
    return group_name

class Friends(models.Model):
    user_1= models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_1_rel")
    user_2= models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_2_rel")
    group_name= models.CharField(max_length=12, default=generate_unique_code_friends)
    close_friend=models.BooleanField()

# extended Django Auth user...
def generate_unique_code_User_2():
    length = 6
    while True:
        group_name = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(group_name=group_name).count() == 0:
            break
    return group_name

class User_2(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    group_name= models.CharField(max_length=12, default=generate_unique_code_User_2 ,null=False)