from django.db import models
from django.contrib.postgres.fields import CITextField


class Product(models.Model):
    name = models.TextField()
    sku = CITextField(unique=True)
    description = models.TextField()


class CSVFile(models.Model):
    file = models.FileField(upload_to='uploads/')
