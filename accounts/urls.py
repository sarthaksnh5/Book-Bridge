from django.urls import path
from .views import RegisterView, UserView, CustomTokenObtainView, ChangePasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/<int:pk>', UserView.as_view(), name='profile'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/', CustomTokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/changepassword', ChangePasswordView.as_view())
]
