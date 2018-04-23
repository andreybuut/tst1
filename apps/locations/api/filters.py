from django_filters import rest_framework as filters

from ..models import Locations


class LocationsFilterSet(filters.FilterSet):
    """Filter Set for ``Locations`` model

    Provide following filters for District model:
        country: filter districts by country name

    """

    class Meta:
        model = Locations
        fields = (
            'country',
        )
