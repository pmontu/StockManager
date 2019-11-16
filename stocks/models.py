from django.db import models


class Product(models.Model):
    name = models.TextField()
    sku = models.TextField()
    description = models.TextField()
