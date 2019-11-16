from .serializers import ProductSerializer
from rest_framework.viewsets import ModelViewSet
from .models import Product
from StockManager.celery import debug_task


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def list(self, request, *args, **kwargs):
        debug_task()
        return super().list(request, *args, **kwargs)
