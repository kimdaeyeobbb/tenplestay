import requests

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status


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
                tokens = response.json()["data"]
                return_res = Response(tokens, status=status.HTTP_200_OK)
                return_res.set_cookie("access_token", tokens["access"])
                return_res.set_cookie("refresh_token", tokens["refresh"])
                return return_res
            return Response(
                {"error": "Failed to process with GoogleLoginView"},
                status=response.status_code,
            )

        return Response(
            {"error": "Code not provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    def forward_code_to_google_login_view(self, code: str):
        url = "http://localhost:8000/api/accounts/google/login/"
        payload = {"code": code}
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, json=payload, headers=headers)
        return response


class GoogleLoginView(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter
    callback_url = "http://localhost:3000"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        # print("GoogleLoginView", "post")
        return super().post(request, *args, **kwargs)


class NaverLoginView(SocialLoginView):
    adapter_class = NaverOAuth2Adapter
    callback_url = "http://localhost:5500/callback.html"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        # print("NaverLoginView", "post")
        return super().post(request, *args, **kwargs)
