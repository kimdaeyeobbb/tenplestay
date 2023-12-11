from rest_framework import serializers

from .models import Noti, NotiPlatform


class NotiPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotiPlatform
        fields = "__all__"
        read_only_fields = (
            "created_at",
            "updated_at",
        )


class NotiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noti
        fields = "__all__"
        read_only_fields = (
            "created_at",
            "updated_at",
            "user",
        )
