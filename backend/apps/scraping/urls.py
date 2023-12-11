from django.urls import include, path

from .views import (
    ScrapingUrlListCreateAPIView,
    ScrapingDomainStatsAPIView,
    ScrapingUrlAPI,
)

urlpatterns = [
    path(
        "", ScrapingUrlListCreateAPIView.as_view(), name="api_scraping_url_list_create"
    ),
    path(
        "stats",
        ScrapingDomainStatsAPIView.as_view(),
        name="api_scraping_url_domain_stats",
    ),
    path("request", ScrapingUrlAPI.as_view(), name="api_scraping_submit_url"),
]
