from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path

from apps.core.views import IndexView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', IndexView.as_view(), name='index'),
    re_path(
        r'^api/v1/auth/', include('rest_auth.urls')
    ),
    re_path(
        r'^api/v1/locations/',
        include(
            'apps.locations.api.urls',
        ),
    ),
]
urlpatterns += static(
        settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
