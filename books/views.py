from rest_framework import generics, permissions, mixins
from .serializers import BookSerializer, BookImagesSerializer
from .models import Book, BookImages
# Create your views here.


class BookView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    serializer_class = BookSerializer
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Book.objects.all()
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        """Handles getting a list of books."""
        if len(kwargs) > 0:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class BookImageView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    serializer_class = BookImagesSerializer
    permission_classes = (permissions.IsAuthenticated, )
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)