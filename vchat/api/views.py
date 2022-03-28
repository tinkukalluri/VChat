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


class LogedIn(APIView):
    # if not self.request.session.exists(self.request.session.session_key):
    #         self.request.session.create()

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({"status":False} , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class Login(APIView):
    def post(self, request, format=None):
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()
            post_data = request.data
            print(post_data)
            self.username = post_data.get('username')
            self.password =  post_data.get('password')
            print("credentials_login::"+self.username+" "+self.password)
            user = authenticate(username=self.username, password=self.password)
            if user is not None:
                self.request.session["key"]=self.request.session.session_key
                self.request.session["user_id"]=user.id
                print("user_id::"+str(self.request.session["user_id"]))
                # A backend authenticated the credentials
                return Response({"status":True} , status=status.HTTP_200_OK)
            else:
                # No backend authenticated the credentials
                return Response({"status":False} , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class SignUp(APIView):
    def post(self, request, format=None):
        print("executing post request in signup")
        post_data = request.data
        self.username = post_data.get('username')
        self.password =  post_data.get('password')
        self.email =  post_data.get('email')
        print("credentials::"+self.username+" "+self.password+" "+self.email)
        if(User.objects.filter(username=self.username)):
            return Response({"status":"user already exists"} , status=status.HTTP_202_ACCEPTED)
        user = User.objects.create_user(self.username, self.password, self.email)
        if user:
            return Response({"status": True} , status=status.HTTP_201_CREATED)
        else:
            return Response({"status": False} , status=status.HTTP_204_NO_CONTENT)


class Logout(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({"status": True} , status=status.HTTP_200_OK)
        if "key" in self.request.session:
            s_id = self.request.session.pop("key" , None)
            return Response({"status": True} , status=status.HTTP_200_OK)
        return Response({"status": True} , status=status.HTTP_200_OK)

class UserInRoom(APIView):
    def get(self, request,format=None):
        print(self.request.session)
        print(self.request.session.session_key)
        print(self.request.session.get('key'))
        print("user in room:"+str((self.request.session.get('key')!=None)))
        if(self.request.session.get('key')):
            return Response({"status": True} , status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid'}, status=status.HTTP_202_ACCEPTED)































# def SignUp(request):
#     if request.method == "POST":
#         print(request.method)
#         print(request.POST)
#         print("executing post request in signup")
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         email = request.POST.get('email')
#         print("credentials::"+username+" "+password+" "+email)
#         user = User.objects.create_user(username, password, email)
#         if user:
#             return Response({"status": True} , status=status.HTTP_201_CREATED)
#         else:
#             return Response({"status": False} , status=status.HTTP_204_NO_CONTENT)


# def SignUp(request):
#     if request.method == "POST":
#         print(request.method)
#         print(request)
#         print(request.POST)
#         csrf_token = get_token(request)
#         print("csrf_token::"+csrf_token)
#         # csrf_token_2=request.META.get('CSRF_COOKIE')
#         # print("csrf_token_2::"+csrf_token_2)
#         print("executing post request in signup")
#         post_data = json.loads(request.body.decode("utf-8"))
#         username = post_data.get('username')
#         password =  post_data.get('password')
#         email =  post_data.get('email')
#         print("credentials::"+username+" "+password+" "+email)
#         # user = User.objects.create_user(username, password, email)
#         return HttpResponse("done")







def home(request):
    return render(request , "index.html" , {"home":"home"})
