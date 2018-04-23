from rest_framework import mixins, viewsets

from django_filters.rest_framework.backends import DjangoFilterBackend

from apps.locations.api.filters import LocationsFilterSet

from ..models import Locations
from .serializers import LocationSerializer


class LocationsViewSet(mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """ViewSet for ``District`` model
    """
    queryset = Locations.objects.all()
    serializer_class = LocationSerializer
    filter_backends = (
        DjangoFilterBackend,
    )
    filter_class = LocationsFilterSet

    def get_queryset(self):
        """Overwritten method for distance
        """
        qs = super().get_queryset()
        return qs
