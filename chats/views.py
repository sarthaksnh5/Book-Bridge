from rest_framework import generics, mixins, permissions
from .serializers import ChatsSerializer
from .models import Chats


class ChatView(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = ChatsSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class SingleChatView(generics.CreateAPIView, mixins.DestroyModelMixin):
    serializer_class = ChatsSerializer
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Chats.objects.all()

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
