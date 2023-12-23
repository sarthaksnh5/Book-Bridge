from django.db import models
from django.contrib.auth import get_user_model
import random
import string
from django.db.models import Q
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from channels.layers import get_channel_layer

from asgiref.sync import async_to_sync

from datetime import datetime

from books.models import Book

# Create your models here.
User = get_user_model()


def getUniqueKey():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))


class Chats(models.Model):
    user1 = models.ForeignKey(
        User, related_name='user_1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='user_2',
                              on_delete=models.CASCADE)
    chat_id = models.CharField(max_length=255, default=getUniqueKey())
    chat_title = models.CharField(max_length=255)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    registered_data = models.DateTimeField(auto_now=True)

    @staticmethod
    def serializeData(chat):
        try:
            message = Messages.objects.filter(chats=chat).last()
            return {
                "chat_id": str(chat.chat_id),
                "user1": {
                    "name": chat.user1.full_name,
                    'id': chat.user1.id
                },
                "user2": {
                    "name": chat.user2.full_name,
                    'id': chat.user2.id
                },
                "chat_title": chat.chat_title,
                "last_message_date": message.date.isoformat(),
                "last_message": message.text
            }
        except Exception as e:            
            return {
                "chat_id": str(chat.chat_id),
                "user1": {
                    "name": chat.user1.full_name,
                    'id': chat.user1.id
                },
                "user2": {
                    "name": chat.user2.full_name,
                    'id': chat.user2.id
                },
                "chat_title": chat.chat_title,
                "last_message_date": datetime.now().isoformat(),
                "last_message": "No messages yet"
            }

    @staticmethod
    def serializeAllData(chats):
        data = []
        for chat in chats:
            data.append(Chats.serializeData(chat))

        return data

    @staticmethod
    def getChats(email):
        user = User.objects.get(email=email)
        chats = list(Chats.objects.filter(
            Q(user1=user) | Q(user2=user)).order_by('-registered_data'))

        return Chats.serializeAllData(chats)

    @staticmethod
    def setBothUsersStatus(chat_id, status):
        chat = Chats.objects.get(chat_id=chat_id)
        user1 = chat.user1
        User.set_user_online(user1, status)
        user2 = chat.user2
        User.set_user_online(user2, status)


class Messages(models.Model):
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    chats = models.ForeignKey(
        Chats, related_name='chats', on_delete=models.CASCADE)

    @staticmethod
    def serializeMessageData(query):
        chat = query.chats
        return {
            'id': query.id,
            'text': query.text,
            'date': query.date.isoformat(),
            'author': {
                'name': query.author.full_name,
                'id': query.author.id,
            },
            'chat': {
                "chat_id": str(chat.chat_id),
                "user1": {
                    "name": chat.user1.full_name,
                    'id': chat.user1.id
                },
                "user2": {
                    "name": chat.user2.full_name,
                    'id': chat.user2.id
                },
                "chat_title": chat.chat_title,
                "registered_on": chat.registered_data.isoformat()
            }
        }

    @staticmethod
    def serailizeAllData(messages):
        data = []
        for message in messages:
            data.append(Messages.serializeMessageData(message))

        return data

    @staticmethod
    def getLast10Messages(chat_id):
        messages = Messages.objects.filter(
            chats__chat_id=chat_id).order_by("-date")[:10]
        messages = reversed(messages)

        return Messages.serailizeAllData(messages)


@receiver([post_save], sender=Chats)
def save_chat_Handler(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()

    user1 = instance.user1
    user2 = instance.user2

    # for user 1
    async_to_sync(channel_layer.group_send)("chats_%s" % str(user1.email).split("@")[0], {
        "type": "add_new_chat",
        "value": Chats.serializeAllData([instance])
    })

    # for user 2
    async_to_sync(channel_layer.group_send)("chats_%s" % str(user2.email).split("@")[0], {
        "type": "add_new_chat",
        "value": Chats.serializeAllData([instance])
    })


@receiver([post_delete], sender=Chats)
def delete_chat_Handler(sender, instance, **kwargs):
    channel_layer = get_channel_layer()

    user1 = instance.user1
    user2 = instance.user2

    # for user 1
    async_to_sync(channel_layer.group_send)("chats_%s" % str(user1.email).split("@")[0], {
        "type": "delete_chat",
        "value": Chats.getChats(str(user1.email))
    })

    # for user 2
    async_to_sync(channel_layer.group_send)("chats_%s" % str(user2.email).split("@")[0], {
        "type": "delete_chat",
        "value": Chats.getChats(str(user2.email))
    })


@receiver([post_save], sender=Messages)
def save_message_handler(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()

    group_name = "room_%s" % instance.chats.chat_id

    async_to_sync(channel_layer.group_send)(group_name, {
        'type': 'add_new_message',
        'value': Messages.serailizeAllData([instance])
    })


@receiver([post_delete], sender=Messages)
def delete_message_handler(sender, instance, **kwargs):
    channel_layer = get_channel_layer()

    group_name = "room_%s" % instance.chats.chat_id

    async_to_sync(channel_layer.group_send)(group_name, {
        'type': 'add_new_message',
        'value': Messages.serailizeAllData([instance])
    })
