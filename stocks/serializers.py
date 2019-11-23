from .models import Product, CSVFile
from rest_framework.serializers import ModelSerializer


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CSVFileSerializer(ModelSerializer):
    class Meta:
        model = CSVFile
        fields = "__all__"
