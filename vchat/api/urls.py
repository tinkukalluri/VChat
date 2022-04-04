from django.contrib import admin
from django.urls import path , include

from . import views
from . import views_2

app_name="api"

urlpatterns = [
    path('home' , views.home),
    path('login' , views.Login.as_view()),
    path('signup' , views.SignUp.as_view()),
    path('logout' , views.Logout.as_view()),
    path('userinroom' , views.UserInRoom.as_view()),

    # here its view_2.py path sets 
    path('myid' , views_2.MyId.as_view()),
    path('friends' , views_2.FriendsList.as_view()),
    path('fetchmsgs' , views_2.FetchMessages.as_view()),
    path('inputtext' , views_2.InputText.as_view()),
    path('searchuser' , views_2.SearchUser.as_view()),
    path('addfriend' , views_2.AddFriend.as_view())
]
