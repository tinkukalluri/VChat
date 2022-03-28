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


from . import views
from .models import Messages ,Friends
from .serializers import MessageSerializer , FriendsSerializer

# here we will have codes related to models 

class Friends(APIView):
    def post(self, request , format=None):
        if self.request.session['key']:
            print("Friends_session_key::"+self.request.session['key'])
            user_id=self.request.session['user_id']
            querySet=Friends.objects.filter(user_1=user_id)
            dic ={}
            for row in querySet:
                fiend_name=User.objects.filter(id=row.user_2)
                dic[row.user_2]=fiend_name
            Response(dic , status=status.HTTP_200_OK)
        else:
            Response({"user":"user_is_not_in_sesssion[key]" } , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class MyId(APIView):
    def post(self, request, format=None):
        if self.request.session['key']:
            print("Friends_session_key::"+self.request.session['key'])
            my_id=self.request.session['user_id']
            Response({'myId':my_id} , status=status.HTTP_200_OK)
        else:
            Response({"user":"user_is_not_in_sesssion[key]" } , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)









