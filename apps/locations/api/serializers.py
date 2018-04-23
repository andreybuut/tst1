from rest_framework import serializers

from ..models import Locations


class LocationSerializer(serializers.ModelSerializer):
    """Serializer for ``District`` model
    """

    class Meta:
        model = Locations
        fields = (
            'country',
        )
