from django.urls import include, path

from .views import ScrapingUrlListCreateAPIView, ScrapingDomainStatsAPIView

urlpatterns = [
    path(
        "", ScrapingUrlListCreateAPIView.as_view(), name="api_scraping_url_list_create"
    ),
    path(
        "stats",
        ScrapingDomainStatsAPIView.as_view(),
        name="api_scraping_url_domain_stats",
    ),
]
