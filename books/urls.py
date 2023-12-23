from django.urls import path
from .views import BookView, BookImageView

urlpatterns = [
    path('book/', BookView.as_view(), name="book"),    
    path('book/<int:pk>', BookView.as_view(), name="book"),    
    path('book/images/', BookImageView.as_view(), name="book"),    
]
