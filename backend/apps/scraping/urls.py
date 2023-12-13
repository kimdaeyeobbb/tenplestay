from django.urls import include, path

from .views import (
    ScrapingUrlListCreateAPIView,
    ScrapingUrlRetrieveUpdateDestroyAPIView,
    ScrapingDomainStatsAPIView,
    ScrapingUrlAPI,
)

urlpatterns = [
    path(
        "", ScrapingUrlListCreateAPIView.as_view(), name="api_scraping_url_list_create"
    ),
    path(
        "detail/<int:pk>/",
        ScrapingUrlRetrieveUpdateDestroyAPIView.as_view(),
        name="api_scraping_url_detail",
    ),
    path(
        "stats",
        ScrapingDomainStatsAPIView.as_view(),
        name="api_scraping_url_domain_stats",
    ),
    path("request", ScrapingUrlAPI.as_view(), name="api_scraping_submit_url"),
]
