"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from utils.util_views import PingAPIView, log_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("admin-custom/log/", log_view, name="log_view"),
    # ============================================================== #
    # app's API urls
    # ============================================================== #
    path("api/ping", PingAPIView.as_view(), name="api_ping"),
    path("api/accounts/", include("apps.accounts.urls")),
    path("api/scraping/", include("apps.scraping.urls")),
    # ============================================================== #
    # API docs and third party urls
    # ============================================================== #
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]


# ==================================================================== #
# DEBUG 일때만 swagger, URL patterns 추가해서 사용
# ==================================================================== #

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    SHOW_TOOLBAR_CALLBACK = True
