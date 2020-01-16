import csv
import dropbox
import requests
from celery import shared_task
from django.conf import settings
from contextlib import closing
from .models import CSVFile, Product
from .utils import send_event_workaround
# from django.db import transaction


@shared_task
def copy_records_from_csv_file_to_product_table(csv_file_id):
    idx = None
    try:
        csv_file = CSVFile.objects.get(id=csv_file_id)

        dbx = dropbox.Dropbox(settings.DROPBOX_ACCESS_TOKEN)
        temp_link_result = dbx.files_get_temporary_link(csv_file.dropbox_path)
        url = temp_link_result.link
        file_size = temp_link_result.metadata.size
        prev_progress = -1

        with closing(requests.get(url, stream=True)) as r:
            f = (line.decode('utf-8') for line in r.iter_lines())
            reader = csv.DictReader(f, delimiter=',', quotechar='"')
            count = len("sku") + len("name") + len("description") + 1 + 2
            for idx, row in enumerate(reader, 1):
                product, created = Product.objects.update_or_create(
                    sku=row["sku"],
                    defaults={
                        'name': row["name"],
                        'description': row["description"]
                    },
                )

                count += len(row["sku"]) + len(row["name"]) + \
                    len(row["description"]) + 1 + 2
                progress = ((100 * count) // file_size) // 10
                if progress != prev_progress:
                    send_event_workaround({
                        'fileId': csv_file_id,
                        "percent": progress * 10,
                        "rows": idx
                    })
                    prev_progress = progress

    except Exception as e:
        print(f"Problem encountered: {e}")

    else:
        if idx is not None:
            send_event_workaround({
                'fileId': csv_file_id,
                "percent": 100,
                "rows": idx,
                "count": count,
                "file_size": file_size
            })
            print(f"completed processing file {csv_file.file}, count: {count}")
