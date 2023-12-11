from django.db import models

from apps.accounts.models import User
from apps.scraping.models import ScrapingUrl
from utils.base_modle import BaseModel

NOTI_PLATFORM_CHOICES = [
    (1, "email"),
    (2, "kakaotalk"),
    (3, "sms"),
]


class NotiPlatform(BaseModel):
    platform_num = models.IntegerField(choices=NOTI_PLATFORM_CHOICES)

    def __str__(self):
        return f"{self.platform_num} - {self.get_platform_num_display()}"


class Noti(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
    )
    scraping_url = models.ForeignKey(
        ScrapingUrl, on_delete=models.CASCADE, blank=False, null=False
    )
    main_noti_platform = models.ForeignKey(
        NotiPlatform,
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
        help_text="사용자가 어떤 알림을 메인으로 받을지 저장하는 필드입니다.",
        verbose_name="메인 알림 플랫폼",
        related_name="noti_main_platform",
    )
    sub_noti_platform = models.ForeignKey(
        NotiPlatform,
        default=None,
        blank=False,
        null=True,
        on_delete=models.SET_NULL,
        help_text="사용자가 어떤 알림을 서브로 받을지 저장하는 필드입니다.",
        verbose_name="서브 알림 플랫폼",
        related_name="noti_sub_platform",
    )
    retry_count = models.IntegerField(
        default=0,
        blank=False,
        null=False,
        help_text="알림 보내기 시도 횟수 저장하는 필드입니다.",
        verbose_name="알림 시도 횟수",
    )
