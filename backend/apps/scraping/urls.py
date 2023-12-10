from django.urls import include, path

from .views import ScrapingUrlViewSet

urlpatterns = [path("", ScrapingUrlViewSet.as_view(), name="api_scraping_url_crud")]
