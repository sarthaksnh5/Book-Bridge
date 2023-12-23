from rest_framework import serializers
from .models import Chats, Messages
from django.db.models import Q


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = ('id', 'text', 'date', 'author')


class ChatsSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chats
        fields = ('id', 'user1', 'user2', 'messages',
                  'chat_id', 'chat_title', 'book_id')

    def validate(self, attrs):
        chats = Chats.objects.filter(Q(user1=attrs['user1']) | Q(user2=attrs['user1']), Q(
            user1=attrs['user2']) | Q(user2=attrs['user2']), book_id=attrs['book_id'])

        if len(chats) > 0:
            raise serializers.ValidationError(
                {'chat': 'This message already Exists'})

        return super().validate(attrs)
