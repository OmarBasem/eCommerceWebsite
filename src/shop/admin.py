from django.contrib import admin
from .models import User, Item, Category, Purchase, Address

admin.site.register(User)
admin.site.register(Address)
admin.site.register(Item)
admin.site.register(Category)
admin.site.register(Purchase)
