from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from apps.accounts.models import User


class UserAdminTests(TestCase):
    def setUp(self):
        self.superuser = get_user_model().objects.create_superuser(
            email="superuser@test.com", password="testpassword123", name="Super User"
        )
        self.client.force_login(self.superuser)

    def test_list_display(self):
        response = self.client.get(reverse("admin:accounts_user_changelist"))
        self.assertContains(response, "superuser@test.com")
        self.assertContains(response, "Super User")
        self.assertContains(response, "is_active")
        self.assertContains(response, "is_staff")
        self.assertContains(response, "is_superuser")

    def test_search_field(self):
        # Creating another user for testing search
        User.objects.create(
            email="another@test.com", name="Another User", password="testpassword123"
        )

        response = self.client.get(
            reverse("admin:accounts_user_changelist"), {"q": "another"}
        )
        self.assertContains(response, "another@test.com")

    def test_edit_user_page_fields(self):
        response = self.client.get(
            reverse("admin:accounts_user_change", args=[self.superuser.id])
        )
        self.assertContains(response, "email")
        self.assertContains(response, "password")
        self.assertContains(response, "is_active")
        self.assertContains(response, "is_staff")
        self.assertContains(response, "is_superuser")
        self.assertContains(response, "groups")
        self.assertContains(response, "user_permissions")
        self.assertContains(response, "last_login")
        self.assertContains(response, "created_at")

    def test_add_user_page_fields(self):
        response = self.client.get(reverse("admin:accounts_user_add"))
        self.assertContains(response, "email")
        self.assertContains(response, "name")
        self.assertContains(response, "password1")
        self.assertContains(response, "password2")

    def test_create_user_in_admin(self):
        data = {
            "email": "newuser@test.com",
            "name": "New User",
            "password1": "testpassword123",
            "password2": "testpassword123",
        }
        self.client.post(reverse("admin:accounts_user_add"), data)
        self.assertTrue(User.objects.filter(email="newuser@test.com").exists())

    def test_edit_user_in_admin(self):
        data = {
            "email": "edited@test.com",
            "name": "Edited Name",
            "password": "testpassword123",
        }
        self.client.post(
            reverse("admin:accounts_user_change", args=[self.superuser.id]), data
        )
        self.superuser.refresh_from_db()
        self.assertEqual(self.superuser.email, "edited@test.com")
        self.assertEqual(self.superuser.name, "Edited Name")
