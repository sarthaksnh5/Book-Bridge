from .consumers import UserConsumer, MessageConsumer
from django.urls import path
from channels.routing import URLRouter

ws_patterns = URLRouter([
    path(r'user/<user_email>', UserConsumer.as_asgi(), name='chats'),
    path(r'chat/<chat_id>', MessageConsumer.as_asgi(), name='chats')
])
