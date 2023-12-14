from typing import Optional, Tuple
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import Token


class CustomJWTAuthentication(JWTAuthentication):
    """
    Extend the JWTAuthentication class to support cookie based authentication
    """

    def authenticate(self, request: Request):
        if (
            "access_token" in request.COOKIES
            and "refresh_token" in request.COOKIES
            and "HTTP_AUTHORIZATION" not in request.META
        ):
            if request.path.startswith("/api/ping"):
                return super().authenticate(request)

            access_token = request.COOKIES.get("access_token")
            refresh_token = request.COOKIES.get("refresh_token")
            validated_token = self.get_validated_token(access_token)
            return self.get_user(validated_token), validated_token
        return super().authenticate(request)

    # def authenticate(self, request):
    #     # Check if 'auth_token' is in the request cookies.
    #     # Give precedence to 'Authorization' header.
    #     if 'auth_token' in request.COOKIES and \
    #                     'HTTP_AUTHORIZATION' not in request.META:
    #         return self.authenticate_credentials(
    #             request.COOKIES.get('auth_token')
    #         )
    #     return super().authenticate(request)
