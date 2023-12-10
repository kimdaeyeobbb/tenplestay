from rest_framework import serializers

from .models import ScrapingUrl


class ScrapingUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapingUrl
        fields = "__all__"
        read_only_fields = ("id",)
