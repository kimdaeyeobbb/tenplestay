from django.test import TestCase

from apps.accounts.models import User


class UserModelTestCase(TestCase):
    def setUp(self):
        self.user_email = "test@example.com"
        self.user_name = "Test User"
        self.user_password = "securepassword123"

    def test_create_user(self):
        user: User = User.objects.create_user(
            email=self.user_email, name=self.user_name, password=self.user_password
        )
        self.assertEqual(user.email, self.user_email)
        self.assertEqual(user.name, self.user_name)
        self.assertTrue(user.check_password(self.user_password))
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)

    def test_create_superuser(self):
        superuser: User = User.objects.create_superuser(
            email=self.user_email, name=self.user_name, password=self.user_password
        )
        self.assertEqual(superuser.email, self.user_email)
        self.assertEqual(superuser.name, self.user_name)
        self.assertTrue(superuser.check_password(self.user_password))
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_active)

    def test_str_representation(self):
        user = User.objects.create_user(
            email=self.user_email, name=self.user_name, password=self.user_password
        )
        self.assertEqual(str(user), self.user_email)

    # 추가로 필요한 테스트 케이스들...
