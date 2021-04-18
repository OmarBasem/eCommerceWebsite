from django.db import models
from django.contrib.auth.models import AbstractUser



class Address(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    building = models.CharField(max_length=100)

class User(AbstractUser):
    name = models.CharField(max_length=100, blank=True, null=True)
    address = models.OneToOneField(Address, blank=True, null=True, on_delete=models.CASCADE)

class Category(models.Model):
    name = models.CharField(max_length=100)
    uri = models.FileField(upload_to='categories/')

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    price = models.IntegerField()
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.PROTECT)
    uri = models.FileField(upload_to='items/', blank=True, null=True)
    rating = models.FloatField()
    rating_count = models.IntegerField()

class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    refNum = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)