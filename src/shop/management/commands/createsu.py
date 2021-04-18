from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
User = get_user_model()


class Command(BaseCommand):

    def handle(self, *args, **options):
        if not User.objects.filter(username="ådmin").exists():
            User.objects.create_superuser('ådmin', "comfrtshop@gmail.com", "Itisomar1!")