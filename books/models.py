from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Book(models.Model):
    registered_by = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=255)
    publication_year = models.IntegerField(blank=False)
    registered_on = models.DateTimeField(auto_now=True)
    grade = models.CharField(max_length=255, default='')
    description = models.TextField(default="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
    is_sold = models.BooleanField(default=False)


class BookImages(models.Model):
    book = models.ForeignKey(
        Book, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')
    uploaded_on = models.DateTimeField(auto_now=True)
