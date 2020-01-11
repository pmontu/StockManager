from .views import ProductViewSet, upload_view, publish_progress
from rest_framework.routers import SimpleRouter
from django.urls import path


class SimpleRouterWithDeleteAll(SimpleRouter):
    def __init__(self, *args, **kwargs):
        self.routes[0].mapping["delete"] = 'destroy_all'
        super().__init__(*args, **kwargs)


router = SimpleRouterWithDeleteAll()
router.register(r'products', ProductViewSet, basename='product')
urlpatterns = router.urls

urlpatterns += [
    path('upload-product-csv/', upload_view),
    path('upload-progress/', publish_progress)
    # path('products/', delete_all)
]
