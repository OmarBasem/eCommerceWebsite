import re
from rest_framework import serializers

from .models import Item, Category, User, Purchase, Address


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ItemSerialzer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Item
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    class Meta:
        model = User
        fields = '__all__'


class PurchaseSerializer(serializers.ModelSerializer):
    item = ItemSerialzer()
    class Meta:
        model = Purchase
        fields = '__all__'


