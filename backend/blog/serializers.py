# backend/blog/serializers.py (verify UserProfileSerializer)
from rest_framework import serializers
from .models import BlogPost, Comment, UserProfile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    avatar = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'avatar', 'created_at', 'updated_at']

    def validate(self, data):
        print("Validating data:", data)  # Debug log
        return data

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at']

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'comments', 'image']