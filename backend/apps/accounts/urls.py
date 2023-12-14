from django.urls import include, path

from .views import (
    DefaultLoginView,
    GoogleLoginView,
    GoogleOAuthCallbackView,
    NaverLoginView,
    KakaoLoginView,
)

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("", include("dj_rest_auth.registration.urls")),
    # custom login
    path(
        "local/login/",
        DefaultLoginView.as_view(),
        name="api_accounts_local_login",
    ),
    # naver OAuth
    path(
        "naver/login/",
        NaverLoginView.as_view(),
        name="api_accounts_naver_oauth",
    ),
    # kakao OAuth
    path(
        "kakao/login/",
        KakaoLoginView.as_view(),
        name="api_accounts_kakao_oauth",
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
