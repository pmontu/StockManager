import dropbox
import requests
from django.conf import settings


def upload_file_to_dropbox(file_path, file_relative_path):
    dbx = dropbox.Dropbox(settings.DROPBOX_ACCESS_TOKEN)
    f = open(file_path, "rb")
    file_relative_path = f"/{file_relative_path}"
    file_meta = dbx.files_upload(f.read(), file_relative_path)
    return file_meta.path_lower


def send_event_workaround(message):
    url = (
        f"{settings.CELERY_SERVER_URL}"
        "/stocks/upload-progress/"
    )
    res = requests.post(url, data=message)
    print(f"{res.text} {res.status_code}")
