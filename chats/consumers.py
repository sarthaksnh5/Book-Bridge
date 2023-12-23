from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from .models import Chats, Messages
import json

User = get_user_model()


class UserConsumer(WebsocketConsumer):
    def connect(self):
        email = self.scope['url_route']['kwargs']['user_email']

        self.room_name = str(
            self.scope['url_route']['kwargs']['user_email']).split("@")[0]
        self.room_group_name = 'chats_%s' % self.room_name

        try:
            self.user = User.objects.get(email=email)
        except Exception as e:
            print(e)
            self.close()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

        User.set_user_online(self.user, True)
        chats = Chats.getChats(self.user.email)
        value = {
            'message': chats,
            'event': 'all_chats'
        }
        self.send(json.dumps(value))

    def add_new_chat(self, event):
        chat = event['value']
        value = {
            'message': chat,
            'event': 'new_chat',
        }
        self.send(json.dumps(value))

    def delete_chat(self, event):
        chats = event['value']
        value = {
            'message': chats,
            'event': 'delete_chat'
        }
        self.send(json.dumps(value))

    def disconnect(self, code):
        User.set_user_online(self.user, False)
        return super().disconnect(code)


class MessageConsumer(WebsocketConsumer):
    def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']

        self.room_name = self.chat_id
        self.room_group_name = "room_%s" % self.chat_id

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

        Chats.setBothUsersStatus(self.chat_id, True)
        print("Set Online Done")
        messages = Messages.getLast10Messages(self.chat_id)
        value = {
            'event': 'all_messages',
            'message': messages
        }
        self.send(json.dumps(value))

    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        if data['event'] == 'add_new_message':
            value = data['value']
            chat = Chats.objects.get(chat_id=self.chat_id)
            user = User.objects.get(id=value['user'])
            message = Messages(
                chats=chat, text=value['message'], author=user)
            message.save()

        return super().receive(text_data, bytes_data)

    def add_new_message(self, event):
        value = event['value']
        message = {
            'message': value,
            'event': 'new_message',
        }
        self.send(json.dumps(message))

    def disconnect(self, code):
        Chats.setBothUsersStatus(self.chat_id, False)
        return super().disconnect(code)
