from rest_framework.routers import DefaultRouter
from .views import InternshipViewSet

router = DefaultRouter()
router.register(r'', InternshipViewSet)

urlpatterns = router.urls
