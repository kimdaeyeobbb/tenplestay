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
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

from utils.util_views import PingAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("ping", PingAPIView.as_view(), name="ping"),
    # ============================================================== #
    # app's API urls
    # ============================================================== #
    path("api/accounts/", include("apps.accounts.urls")),
    path("api/scraping/", include("apps.scraping.urls")),
]


# ==================================================================== #
# DEBUG 일때만 swagger, URL patterns 추가해서 사용
# ==================================================================== #
schema_view = get_schema_view(
    openapi.Info(
        title="Tenplestay rest API Docs",
        default_version="v1.0.0",
        description="Tenplestay rest API Docs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(name="Nuung", email="hyeon.woo.dev@gmail.com"),
        license=openapi.License(name="Private License"),
    ),
    public=True,  # False 여야하고, permission_classes 세팅 필요
    permission_classes=(AllowAny,),
)

if settings.DEBUG:
    # import mimetypes
    # mimetypes.add_type("application/javascript", ".js", True)

    import debug_toolbar

    urlpatterns += [
        path(
            "swagger<format>/",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        path(
            "swagger/",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        path(
            "redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
        ),
        path("__debug__/", include(debug_toolbar.urls)),
    ]

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    SHOW_TOOLBAR_CALLBACK = True
