# Generated by Django 3.1.7 on 2021-03-05 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0004_auto_20210304_1137'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('MobilePhones', 'MobilePhones'), ('Laptops', 'Laptops'), ('Cameras', 'Cameras'), ('Tablets', 'Tablets')], max_length=100),
        ),
    ]
