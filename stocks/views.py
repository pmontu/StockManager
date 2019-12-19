from .serializers import ProductSerializer, CSVFileSerializer
from rest_framework.viewsets import ModelViewSet
from .models import Product
from StockManager.celery import debug_task
from .tasks import copy_records_from_csv_file_to_product_table
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django_eventstream import send_event
from rest_framework.decorators import api_view
from rest_framework.response import Response


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def list(self, request, *args, **kwargs):
        debug_task()
        send_event('test', 'message', {'text': 'hello world'})
        return super().list(request, *args, **kwargs)


@api_view(['delete'])
def delete_all(request):
    total, split_dict = Product.objects.all().delete()
    return Response(total, status=204)


@csrf_exempt
def upload_view(request):
    serializer = CSVFileSerializer(data=request.FILES)
    serializer.is_valid()
    csv_file = serializer.save()
    copy_records_from_csv_file_to_product_table(csv_file.id)
    return HttpResponse(f"uploaded CSV#{csv_file.id} {csv_file.file}")
