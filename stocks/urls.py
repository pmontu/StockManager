from .views import ProductViewSet, upload_view
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
urlpatterns = router.urls

urlpatterns += [
    path('upload-product-csv/', upload_view)
]
