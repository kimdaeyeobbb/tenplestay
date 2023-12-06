from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User


class UserRegisterAPIViewTestCase(APITestCase):
    def test_register_valid_user(self):
        url = "/api/user/sign-up/"
        data = {
            "email": "test@test.com",
            "password": "testpassword123",
            "name": "testuser",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)
        self.assertEqual(response.data["message"], "register successs")
        self.assertIn("token", response.data)

    def test_register_invalid_user(self):
        # Duplicate user or invalid data test
        url = "/api/user/sign-up/"
        data = {
            "email": "testst.com",
            "password": "testpassword123",
            "name": "testuser",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserLoginAPIViewTestCase(APITestCase):
    def setUp(self):
        # Create a user for login test
        self.user = User.objects.create_user(
            email="test@test.com", name="testuser", password="testpassword123"
        )

    def test_login_valid_user(self):
        url = "/api/user/sign-in/"
        data = {"email": "test@test.com", "password": "testpassword123"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)
        self.assertEqual(response.data["message"], "login success")
        self.assertIn("token", response.data)

    def test_login_invalid_pwd_user(self):
        url = "/api/user/sign-in/"
        data = {"email": "test@test.com", "password": "wrongpassword"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_invalid_email_user(self):
        url = "/api/user/sign-in/"
        data = {"email": "wrong@test.com", "password": "wrongpassword"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
