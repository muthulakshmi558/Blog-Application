# backend/blog/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, CommentViewSet, UserProfileViewSet, CustomAuthToken, RegisterView

router = DefaultRouter()
router.register(r'blog_posts', BlogPostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'profiles', UserProfileViewSet, basename='profile')  # Added basename

urlpatterns = [
    path('v1/', include(router.urls)),
    path('v1/auth/login/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('v1/auth/register/', RegisterView.as_view(), name='api_register'),
]