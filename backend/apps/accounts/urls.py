from django.urls import include, path

from .views import GoogleLoginView, GoogleOAuthCallbackView, NaverLoginView

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("", include("dj_rest_auth.registration.urls")),
    # naver OAuth
    path(
        "naver/login/",
        NaverLoginView.as_view(),
        name="api_accounts_naver_oauth",
    ),
    # google OAuth
    path(
        "google/login/callback/",
        GoogleOAuthCallbackView.as_view(),
        name="api_accounts_google_oauth_callback",
    ),
    path(
        "google/login/",
        GoogleLoginView.as_view(),
        name="api_accounts_google_oauth",
    ),
]
