from itertools import count
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import string
import random
from api import models
from django.contrib.auth.models import User
from rest_framework.views import APIView


def getList(dict):
        return list(dict.keys())

class ChatConsumer(AsyncWebsocketConsumer):
    my_room_group_name=""
    async def connect(self ):
        # self.room_name = self.scope['url_route']['kwargs']['room_name']
        # print("mssg comming from consumers.py"+request.session.session_key)
        # self.room_name=self.request.session.session_key
        # self.room_group_name = 'chat_%s' % self.room_name
        # print("room_group_name::"+self.room_group_name)
        print("connected to websocket")
        await self.accept()
        await self.send(text_data=json.dumps({
            "conn_status":True
        }))
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.my_room_group_name,
            self.channel_name
        )


    # Receive message from WebSocket
    _count=1
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if(self._count==1):
        # Join room group
            self.my_room_group_name=str(text_data_json["room_name"])
            print("self.my_room_group_name"+str(self.my_room_group_name))
            await self.channel_layer.group_add(
            self.my_room_group_name,
            self.channel_name
                )
            self._count=3
            print("count::"+str(self._count))
        else:
            print("count_in_elseblock::"+str(self._count))
            print(text_data_json)
            msg_id=getList(text_data_json)[0]
            text = text_data_json[msg_id]['text']
            user_id=text_data_json[msg_id]['msg_from']
            contact_id=str(text_data_json[msg_id]['msg_to'])
            # Send message to room group
            await self.channel_layer.group_send(
                contact_id,
                {
                    'type': 'chat_message',
                    **text_data_json
                }
            )

    # Receive message from room group
    async def chat_message(self, event):
        print("message from room group",event)
        # Send message to WebSocket
        await self.send(text_data=json.dumps(
            event
        ))