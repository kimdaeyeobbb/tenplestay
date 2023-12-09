from django.contrib import admin
from .models import ScrapingUrl, ScrapingLog, ScrapingGroup


@admin.register(ScrapingUrl)
class ScrapingUrlAdmin(admin.ModelAdmin):
    list_display = ("website", "user", "scraping_group", "created_at", "updated_at")
    list_filter = ("user", "scraping_group", "is_static")
    search_fields = ("website", "keywords")


@admin.register(ScrapingLog)
class ScrapingLogAdmin(admin.ModelAdmin):
    list_display = ("result", "is_error", "created_at", "updated_at")
    list_filter = ("is_error",)
    search_fields = ("result",)


@admin.register(ScrapingGroup)
class ScrapingGroupAdmin(admin.ModelAdmin):
    list_display = ("group_name", "created_at", "updated_at")
    search_fields = ("group_name",)
