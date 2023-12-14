import requests

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView, LoginView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status


class DefaultLoginView(LoginView):
    
    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        return self.login()
    
    def login(self):
        # Perform the standard login procedure and get the response
        super().login()
        response = super().get_response()

        # Set access and refresh tokens as cookies in the response
        response.set_cookie(
            "access_token",
            response.data["access"],
            max_age=7 * 24 * 60 * 60,  # httponly=False
        )
        response.set_cookie(
            "refresh_token",
            response.data["refresh"],
            max_age=30 * 24 * 60 * 60,  # httponly=False
        )
        return response


class CustomGoogleOAuth2Adapter(GoogleOAuth2Adapter):
    def complete_login(self, request, app, token, response, **kwargs):
        login = super().complete_login(request, app, token, response, **kwargs)
        # print(login, type(login))  # allauth.socialaccount.models.SocialLogin
        return login


class GoogleOAuthCallbackView(APIView):
    def get(self, request: Request):
        # code 값을 URL의 query string에서 추출
        if code := request.GET.get("code"):
            # print("GoogleOAuthCallbackView", code)
            response = self.forward_code_to_google_login_view(code)
            if response.status_code == 200:
                tokens = response.json()
                tokens = tokens["data"]
                return_res = Response(tokens, status=status.HTTP_200_OK)
                return_res.set_cookie(
                    "access_token", tokens["access"], max_age=7 * 24 * 60 * 60
                )
                return_res.set_cookie(
                    "refresh_token", tokens["refresh"], max_age=30 * 24 * 60 * 60
                )
                return return_res
            return Response(
                {"error": "Failed to process with GoogleLoginView"},
                status=response.status_code,
            )

        return Response(
            {"error": "Code not provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    def forward_code_to_google_login_view(self, code: str):
        url = "https://tenplestay.kro.kr/api/accounts/google/login/"
        payload = {"code": code}
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, json=payload, headers=headers)
        return response


class GoogleLoginView(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter
    callback_url = "https://tenplestay.kro.kr/landing"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class NaverLoginView(SocialLoginView):
    adapter_class = NaverOAuth2Adapter
    callback_url = "https://tenplestay.kro.kr/landing"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class KakaoLoginView(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter
    callback_url = "https://tenplestay.kro.kr/landing"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
