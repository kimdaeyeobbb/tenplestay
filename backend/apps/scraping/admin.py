from django.contrib import admin
from django.utils.html import format_html

from .models import ScrapingUrl, ScrapingLog, ScrapingGroup


@admin.register(ScrapingUrl)
class ScrapingUrlAdmin(admin.ModelAdmin):
    list_display = (
        "website",
        "user",
        "last_scraping_log_str",
        "error_status",
        "activate_status",
        "scraping_group",
        "main_noti_platform",
        "sub_noti_platform",
        "phone_number",
        "created_at",
        "updated_at",
    )
    list_filter = ("scraping_group", "is_static", "is_activate")
    search_fields = ("website", "keywords")

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related("last_scraping_log")
        return queryset

    @admin.display(description="Scraping Status")
    def last_scraping_log_str(self, obj: ScrapingUrl):
        return format_html(
            "<div>{}</div>",
            obj.last_scraping_log.__str__() if obj.last_scraping_log else "-",
        )

    @admin.display(description="Error Status")
    def error_status(self, obj: ScrapingUrl):
        if not obj.last_scraping_log:
            return format_html("Never")

        if obj.last_scraping_log and obj.last_scraping_log.is_error:
            return format_html('<span style="color: red;">●</span> Error')
        return format_html('<span style="color: green;">●</span> No Error')

    @admin.display(description="Activate Status")
    def activate_status(self, obj: ScrapingUrl):
        if obj.is_activate:
            return format_html('<span style="color: green;">●</span>활성상태')
        return format_html('<span style="color: red;">●</span><b>비활성상태</b>')


@admin.register(ScrapingLog)
class ScrapingLogAdmin(admin.ModelAdmin):
    list_display = ("result_str", "error_status", "created_at", "updated_at")
    list_filter = ("is_error",)
    search_fields = ("result",)

    @admin.display(description="Scraping Result")
    def result_str(self, obj: ScrapingLog):
        return format_html("<div>{}</div>", obj.__str__())

    @admin.display(description="Error Status")
    def error_status(self, obj: ScrapingLog):
        if obj.is_error:
            return format_html('<span style="color: red;">●</span> Error')
        return format_html('<span style="color: green;">●</span> No Error')


@admin.register(ScrapingGroup)
class ScrapingGroupAdmin(admin.ModelAdmin):
    list_display = ("group_name", "created_at", "updated_at")
    search_fields = ("group_name",)
