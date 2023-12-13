from django.contrib import admin
from django.utils.html import format_html

from .models import NotiPlatform, Noti


@admin.register(NotiPlatform)
class NotiPlatformAdmin(admin.ModelAdmin):
    list_display = ("id", "platform_num", "created_at", "updated_at")
    list_filter = ("platform_num",)
    search_fields = ("platform_num",)


@admin.register(Noti)
class NotiAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "scraping_url",
        "send_status",
        "main_noti_platform",
        "sub_noti_platform",
        "retry_count",
        "created_at",
        "updated_at",
    )
    list_filter = ("user", "scraping_url", "main_noti_platform", "sub_noti_platform")
    search_fields = (
        "user__username",
        "scraping_url__website",
        "main_noti_platform__platform_num",
        "sub_noti_platform__platform_num",
    )

    @admin.display(description="Sending Status")
    def send_status(self, obj: Noti):
        if obj.is_send:
            return format_html('<span style="color: green;">●</span> Y')
        return format_html('<span style="color: red;">●</span> N')
