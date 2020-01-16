from rest_framework.viewsets import ModelViewSet
from StockManager.celery import debug_task
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django_eventstream import send_event
from rest_framework.response import Response
from .models import Product
from .tasks import copy_records_from_csv_file_to_product_table
from .serializers import ProductSerializer, CSVFileSerializer
from .utils import upload_file_to_dropbox


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by("id")

    def list(self, request, *args, **kwargs):
        debug_task()
        send_event('test', 'message', {'text': 'hello world'})
        return super().list(request, *args, **kwargs)

    def destroy_all(self, request, *args, **kwargs):
        total, split_dict = Product.objects.all().delete()
        return Response(total, status=204)


@csrf_exempt
def upload_view(request):
    serializer = CSVFileSerializer(data=request.FILES)
    serializer.is_valid()
    csv_file = serializer.save()
    try:
        dbx_path = upload_file_to_dropbox(
            csv_file.file.path,
            csv_file.file.name
        )
    except Exception as e:
        return HttpResponse(f"upload to dropbox failed: {e}")
    else:
        csv_file.dropbox_path = dbx_path
        csv_file.save()
        copy_records_from_csv_file_to_product_table.delay(csv_file.id)
    return HttpResponse(
        f"uploaded CSV#{csv_file.id} to server: {csv_file.file}")


@csrf_exempt
def publish_progress(request):
    send_event(
        'test',
        'message',
        request.POST,
    )
    return HttpResponse("OK")
