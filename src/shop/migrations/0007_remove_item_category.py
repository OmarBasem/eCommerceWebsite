# Generated by Django 3.1.5 on 2021-03-16 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='category',
        ),
    ]
