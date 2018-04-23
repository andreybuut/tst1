# Application definition
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',
    'django_filters',
    'django_object_actions',
    'corsheaders',
    'storages',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'crispy_forms',
    'opbeat.contrib.django',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
)

LOCAL_APPS = (
    'apps.locations',
    'apps.core',
)

INSTALLED_APPS += LOCAL_APPS
