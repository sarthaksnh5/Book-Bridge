from rest_framework import serializers
from .models import Book, BookImages

from accounts.serializers import UserSerializer


class BookImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookImages
        fields = ['id', 'image', 'uploaded_on', 'book']
        extra_kwargs = {'book': {'write_only': True}}


class BookSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, source="registered_by")
    images = BookImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'registered_by', 'user', 'author', 'title',
                  'publication_year', 'is_sold', 'registered_on', 'images', 'grade', 'description']
        extra_kwargs = {'registered_on': {'read_only': True},
                        'registered_by': {'write_only': True}}
