
from .models import CSVFile, Product
from StockManager.celery import app
from django.db import transaction
import csv


@app.task(bind=True)
def copy_records_from_csv_file_to_product_table(self, csv_file_id):
    csv_file = CSVFile.objects.get(id=csv_file_id)
    with open(csv_file.file.name) as file:
        reader = csv.DictReader(file)
        with transaction.atomic():
            for idx, row in enumerate(reader):
                product, created = Product.objects.update_or_create(
                    sku=row["sku"],
                    defaults={
                        'name': row["name"],
                        'description': row["description"]
                    },
                )
                print(idx, created, row["sku"])
                if idx >= 100:
                    break
    print("completed processing file", csv_file.file)
