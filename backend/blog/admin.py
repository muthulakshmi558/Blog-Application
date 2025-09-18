# backend/blog/admin.py
from django.contrib import admin
from .models import BlogPost, Comment, UserProfile

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'content')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'created_at')
    list_filter = ('author', 'created_at')
    search_fields = ('content',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'bio')