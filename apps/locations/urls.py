from rest_framework import routers

from .views import Loca

router = routers.DefaultRouter()
router.register(
    r'',
    DistrictViewSet,
    base_name='districts'
)

urlpatterns = router.urls
