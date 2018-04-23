from collections import OrderedDict

from django.conf import settings
from django.views.generic import TemplateView


class IndexView(TemplateView):
    """Class-based view for that shows version of swagger file on main page.

    Displays the current version of the swagger specification. To get the
    current spec version it uses ``get_current_swagger_spec_version`` function.

    """
    template_name = 'index.html'
    dev_environments = ('local', 'development')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        data = {
            # # Mobile API v1
            # 'swagger_version': swagger_version,
            'swagger_url': 'swagger_url',
            # 'api_changelog_url': '/docs/changelogs/changelog_api.html',
            # # Django Backend
            # 'backend_changelog_url': '/docs/changelogs/changelog_backend.html',
            # 'docs_url': '/docs/index.html',
            # # Other
            # 'index_page_urls': sorted_index_page_urls,
            # 'environment': settings.ENVIRONMENT,
            # 'dev_environments': self.dev_environments,
        }

        context.update(data)
        return context
