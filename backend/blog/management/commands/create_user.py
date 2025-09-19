from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Create superuser and token if not exists'

    def handle(self, *args, **options):
        username = 'muthulakshmi'
        password = '12345'  # Change to strong password in prod

        if not User.objects.filter(username=username).exists():
            user = User.objects.create_superuser(
                username=username,
                password=password
            )
            token, created = Token.objects.get_or_create(user=user)
            self.stdout.write(self.style.SUCCESS(f'User {username} created with token: {token.key}'))
        else:
            self.stdout.write(self.style.WARNING(f'User {username} already exists'))