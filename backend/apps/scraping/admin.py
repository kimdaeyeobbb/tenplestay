from django.contrib import admin
from django.utils.html import format_html

from .models import ScrapingUrl, ScrapingLog, ScrapingGroup


@admin.register(ScrapingUrl)
class ScrapingUrlAdmin(admin.ModelAdmin):
    list_display = (
        "website",
        "user",
        "last_scraping_log_str",
        "scraping_group",
        "main_noti_platform",
        "sub_noti_platform",
        "created_at",
        "updated_at",
    )
    list_filter = ("user", "scraping_group", "is_static")
    search_fields = ("website", "keywords")

    def last_scraping_log_str(self, obj):
        return format_html(
            "<div>{}</div>",
            obj.last_scraping_log.__str__() if obj.last_scraping_log else "-",
        )


@admin.register(ScrapingLog)
class ScrapingLogAdmin(admin.ModelAdmin):
    list_display = ("result_str", "is_error", "created_at", "updated_at")
    list_filter = ("is_error",)
    search_fields = ("result",)

    def result_str(self, obj):
        return format_html("<div>{}</div>", obj.__str__())

    result_str.short_description = "Scraping Result"


@admin.register(ScrapingGroup)
class ScrapingGroupAdmin(admin.ModelAdmin):
    list_display = ("group_name", "created_at", "updated_at")
    search_fields = ("group_name",)
