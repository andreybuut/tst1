from django.contrib import admin
from django.urls import path, re_path, include
from apps.core.views import IndexView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', IndexView.as_view(), name='index'),
    path(
        '^api/v1/auth/', include('rest_auth.urls')
    ),
    re_path(
        r'^api/v1/locations/',
        include(
            'apps.locations.api.urls',
        ),
    ),
]
