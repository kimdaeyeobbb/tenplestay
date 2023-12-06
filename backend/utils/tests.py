from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class PingAPIViewTestCase(APITestCase):
    def setUp(self):
        self.admin_user = get_user_model().objects.create_user(
            email="admin@example.com", password="password"
        )
        self.admin_user.is_staff = True  # IsAdminUser는 is_staff를 확인하므로 이를 True로 설정합니다.
        self.admin_user.save()

        self.user = get_user_model().objects.create_user(
            email="user@example1.com", password="password"
        )
        self.user.save()

    def test_ping_api_for_admin_user(self):
        """관리자 사용자로 인증, 200"""
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(reverse("ping"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ping_api_for_forbidden_user(self):
        """비 접근권한 사용자로 인증 (토큰 없음), 403"""
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("ping"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_ping_api_for_unauthenticated_user(self):
        """비 로그인으로 접근 (토큰 없음), 401"""
        response = self.client.get(reverse("ping"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
