
from .models import CSVFile, Product
from celery import shared_task
from django.db import transaction
import csv
import requests
from django.conf import settings


@shared_task
def copy_records_from_csv_file_to_product_table(csv_file_id):
    csv_file = CSVFile.objects.get(id=csv_file_id)
    # with open(csv_file.file.name) as file:
    #     reader = csv.DictReader(file)
    #     with transaction.atomic():
    #         for idx, row in enumerate(reader):
    #             product, created = Product.objects.update_or_create(
    #                 sku=row["sku"],
    #                 defaults={
    #                     'name': row["name"],
    #                     'description': row["description"]
    #                 },
    #             )
    #             if idx % 100 == 0:
    #                 print(f"{idx} saved")
    #                 # url = (
    #                 #     f"{settings.CELERY_SERVER_URL}"
    #                 #     "/stocks/upload-progress/"
    #                 # )
    #                 # res = requests.post(url, data={
    #                 #     'fileId': csv_file_id,
    #                 #     "row": idx
    #                 # })
    #                 # print(f"{res.text} {res.status_code}")

    print("completed processing file", csv_file.file)
