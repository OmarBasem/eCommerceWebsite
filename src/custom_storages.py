import os

from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME
    location = settings.STATICFILES_LOCATION
    custom_domain = os.environ['CDN']


class MediaStorage(S3Boto3Storage):
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME
    location = settings.MEDIAFILES_LOCATION
    custom_domain = os.environ['CDN']