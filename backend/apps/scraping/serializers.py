from rest_framework import serializers

from apps.notifications.serializers import NotiPlatformSerializer
from .models import ScrapingUrl, ScrapingLog


class ScrapingLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapingLog
        exclude = ["updated_at"]


class ScrapingUrlSerializer(serializers.ModelSerializer):
    last_scraping_log = ScrapingLogSerializer(read_only=True)

    class Meta:
        model = ScrapingUrl
        fields = "__all__"
        read_only_fields = ("id", "scraping_group", "user", "last_scraping_log")


class ScrapingUrlAPISerializer(serializers.Serializer):
    url = serializers.URLField()
