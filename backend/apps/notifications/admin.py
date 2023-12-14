import json

from django.contrib import admin, messages
from django.utils.html import format_html
from django.db.models import QuerySet

from utils.messaging_module import MessagingModule
from .models import NotiPlatform, Noti, NotiSendLog


NOTI_PLATFORM_CHOICES = {
    "1": "email",
    "2": "kakaotalk",
    "3": "sms",
}


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
    list_filter = ("is_send", "main_noti_platform", "sub_noti_platform")
    search_fields = (
        "user__username",
        "scraping_url__id",
        "scraping_url__website",
        "main_noti_platform__platform_num",
        "sub_noti_platform__platform_num",
    )
    actions = ["admin_send_action"]

    @admin.display(description="Sending Status")
    def send_status(self, obj: Noti):
        if obj.is_send:
            return format_html('<span style="color: green;">●</span> Y')
        return format_html('<span style="color: red;">●</span> N')

    @admin.display(description="알림 다시 전송하기")
    def admin_send_action(self, request, queryset: QuerySet[Noti]):
        message_moduel = MessagingModule(run_time="django")

        for noti in queryset:
            main_platform = NOTI_PLATFORM_CHOICES[str(noti.main_noti_platform.id)]
            if main_platform == "email":
                html_content = message_moduel.get_email_template(
                    noti.scraping_url.website
                )
                result = message_moduel.send_email(noti.user.email, html_content)
            elif main_platform == "sms":
                sms_content = message_moduel.get_sms_template(noti.scraping_url.website)
                result = message_moduel.send_sms(
                    str(noti.scraping_url.phone_number), sms_content
                )

            # 신규 발송 로그 저장
            new_noti_send_log = NotiSendLog(noti=noti, result=result)
            new_noti_send_log.save()
            noti.is_send = True
            noti.save()

        self.message_user(
            request,
            f"{queryset.count()} 개의 알림에 대한 재알림 처리되었습니다. '알림 전송 이력' 에서 상세 결과 확인해 주세요!",
            messages.SUCCESS,
        )


@admin.register(NotiSendLog)
class NotiSendLogAdmin(admin.ModelAdmin):
    list_display = ("noti", "created_at", "updated_at", "pretty_json")

    @admin.display(description="Sending Result")
    def pretty_json(self, instance):
        """JSON 필드를 이쁘게 표시하는 메서드"""
        return format_html("<pre>{}</pre>", json.dumps(instance.result, indent=4))
