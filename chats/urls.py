from django.urls import path
from .views import ChatView, SingleChatView

urlpatterns = [
    path('create', ChatView.as_view()),
    path('chat/<int:pk>', SingleChatView.as_view())
]