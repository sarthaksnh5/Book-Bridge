from channels.routing import URLRouter
from django.urls import path
from chats.routing import ws_patterns as chat_patterns

ws_patterns = URLRouter([
    path("ws/", chat_patterns)
])