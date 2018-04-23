from django.db import models


class Locations(models.Model):
    """Locations model
    """
    country = models.CharField(
        verbose_name='Country',
        max_length=255,
        db_index=True,
    )
    class Meta:
        verbose_name = 'Locations'
