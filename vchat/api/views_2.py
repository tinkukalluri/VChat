from pyexpat.errors import messages
from django.shortcuts import render
from rest_framework import generics, status  
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect
from django.middleware.csrf import get_token
import json
from .views import loggedIn


from . import views
from .models import Messages ,Friends
from .serializers import MessageSerializer , FriendsSerializer

# here we will have codes related to models 
# key here is session_key
# user_id is the id given to the User Authentication model



class FriendsList(APIView):
    def post(self, request , format=None):
        if self.request.session.get('key'):
            print("Friends_session_key::"+self.request.session.get('key'))
            my_id=self.request.session['user_id']
            print(my_id)
            querySet=set(Friends.objects.filter(user_1=my_id))
            dic ={}
            for row in querySet:
                print("id of front::"+str(row.user_2.id))
                friend_name=row.user_2.username
                print(friend_name)
                dic[row.user_2.id]=friend_name
            return Response(dic , status=status.HTTP_200_OK)
        else:
            return Response({"user":"user_is_not_in_sesssion[key]" } , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class MyId(APIView):
    def post(self, request, format=None):
        if self.request.session['key']:
            print("Friends_session_key::"+self.request.session['key'])
            my_id=self.request.session['user_id']
            return Response({'myId':my_id} , status=status.HTTP_200_OK)
        else:
            return Response({"user":"user_is_not_in_sesssion[key]" } , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)



def push_to_msgs(row ,msgs):
    msgs[row.id]={}
    msgs[row.id]['text']=row.text
    msgs[row.id]['msg_from']=row.msg_from.id
    msgs[row.id]['msg_to']=row.msg_to.id
    msgs[row.id]['delivered']=row.delivered
    msgs[row.id]['seen']=row.seen
    msgs[row.id]['send_on']=row.send_on



class FetchMessages(APIView):
    def post(self, request , format=None):
        msgs={}
        if loggedIn(request):
            sent =[]
            recieved = []
            print("user_logged_in")
            post_data = request.data
            user_id= post_data["user_id"]
            contact_id=post_data["contact_id"]
            if self.request.session['user_id']==user_id:
                print("user authenticated by session")
                if Friends.objects.filter(user_1=contact_id , user_2=user_id).exists() or Friends.objects.filter(user_1=user_id , user_2=contact_id).exists() :
                    print(f'{user_id} and {contact_id} are friends')
                    querySet=Messages.objects.filter(msg_from=user_id , msg_to=contact_id).order_by('-id')
                    if querySet.exists():
                        for row in querySet:
                            push_to_msgs(row , msgs)
                    querySet=Messages.objects.filter(msg_from=contact_id , msg_to=user_id).order_by('-id')
                    if querySet.exists():
                        for row in querySet:
                            push_to_msgs(row , msgs)
            print(msgs)
            return Response(msgs , status=status.HTTP_200_OK)
        else:
            print("user not logged")
            return Response({"something went wrong":False }, status=status.HTTP_204_NO_CONTENT)



class InputText(APIView):
    def post(self, request, format=None):
        if loggedIn(request):
            post_data = request.data
            self.user_id=User.objects.filter(id= post_data["user_id"])[0]
            self.contact_id=User.objects.filter(id=post_data["contact_id"])[0]
            self.text=post_data["text"]
            print("inputtext")
            print(self.user_id , self.contact_id , self.text)
            msg_obj=Messages(msg_from=self.user_id ,msg_to=self.contact_id ,
                text=self.text
            )
            self.msg={}
            msg_obj.save(msg_obj , self.msg)
            push_to_msgs(msg_obj , self.msg)
            return Response({
                "lets_go":"yooy",
                "msg_id":msg_obj.id,
                "msg_data":self.msg
            } , status=status.HTTP_200_OK)
        else:
            print("user not logged")
            return Response({"something went wrong":False }, status=status.HTTP_204_NO_CONTENT)




