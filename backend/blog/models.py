# backend/blog/models.py
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # ImageField for local storage
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile of {self.user.username}"

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()  # Stores HTML from rich text editor
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)  # ImageField for local storage

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author} on {self.post}'

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=Comment)
def send_comment_notification(sender, instance, created, **kwargs):
    if created:
        post = instance.post
        if post.author.email:
            send_mail(
                subject=f'New Comment on Your Post: {post.title}',
                message=f'{instance.author.username} commented: {instance.content[:100]}...',
                from_email='from@example.com',
                recipient_list=[post.author.email],
                fail_silently=True,
            )

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)