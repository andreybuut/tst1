from django.contrib import admin
from django.urls import path, include
from apps.core.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('admin/', admin.site.urls),

]
