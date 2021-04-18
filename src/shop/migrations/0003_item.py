# Generated by Django 3.1.7 on 2021-03-04 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_auto_20210303_1107'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=10000)),
                ('category', models.CharField(choices=[('Mobile Phones', 'Mobile Phones'), ('Laptops', 'Laptops'), ('Cameras', 'Cameras'), ('Tablets', 'Tablets')], max_length=100)),
                ('price', models.IntegerField()),
                ('uri', models.FileField(blank=True, null=True, upload_to='photos/')),
                ('rating', models.IntegerField()),
                ('rating_count', models.IntegerField()),
            ],
        ),
    ]