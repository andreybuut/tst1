from rest_framework import routers

from .views import LocationsViewSet

router = routers.DefaultRouter()
router.register(
    r'^$',
    LocationsViewSet,
    base_name='locations'
)

urlpatterns = router.urls
