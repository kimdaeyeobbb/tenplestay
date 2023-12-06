from dj_rest_auth.registration.serializers import (
    RegisterSerializer as DefaultRegisterSerializer,
)
from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

User = get_user_model()


class UserRegisterSerializer(DefaultRegisterSerializer):
    name = serializers.CharField(max_length=50, write_only=True, required=True)

    @transaction.atomic
    def save(self, request):
        return super().save(request)

    def custom_signup(self, request, user):
        name = self.validated_data.pop("name")
        if name:
            user.name = name
            user.save()
