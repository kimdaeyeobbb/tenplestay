from django.core.validators import RegexValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from apps.accounts.models import User
from utils.base_modle import BaseModel


class ScrapingUrl(BaseModel):
    website = models.URLField(
        max_length=500,
        blank=False,
        null=False,
        help_text="웹사이트 URL을 입력하세요.",
        verbose_name="website url",
    )
    keywords = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="스크래이핑 이후 감지할 키워드 입니다. 콤마로 구분됩니다.",
        verbose_name="감지 키워드",
    )
    is_static = models.BooleanField(
        default=True,
        blank=False,
        null=False,
        help_text="정적인 HTTP 요청을 사용할지, daynamic rendering 요소까지 같이 고려할지 정하는 값입니다.",
        verbose_name="정적인 요소 여부",
    )
    is_activate = models.BooleanField(
        default=True,
        blank=False,
        null=False,
        help_text="변동 알림을 계속 받을 것인지, 활성화 여부를 저장하는 값입니다.",
        verbose_name="활성화 여부",
    )
    scraping_group = models.ForeignKey(
        "ScrapingGroup",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    last_scraping_log = models.ForeignKey(
        "ScrapingLog",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    # 기타 추가 정보
    website_name = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text="제출한 url의 title만 뽑아내서 저장한 필드 입니다.",
        verbose_name="url 도메인",
    )

    website_favicon = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        default="https://tenplestay.kro.kr/logo.svg",
        help_text="제출한 url의 favicon의 경로를 저장한 field 입니다.",
        verbose_name="favicon url",
    )

    # ================================================ #
    # 노티 플랫폼 관련
    # ================================================ #

    main_noti_platform = models.ForeignKey(
        "notifications.NotiPlatform",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text="사용자가 어떤 알림을 메인으로 받을지 저장하는 필드입니다.",
        verbose_name="메인 알림 플랫폼",
        related_name="scraping_main_platform",
    )
    sub_noti_platform = models.ForeignKey(
        "notifications.NotiPlatform",
        default=None,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text="사용자가 어떤 알림을 서브로 받을지 저장하는 필드입니다.",
        verbose_name="서브 알림 플랫폼",
        related_name="scraping_sub_platform",
    )
    phone_number = PhoneNumberField(
        verbose_name="알림 수신 번호",
        help_text="알림을 수신할 휴대폰 번호입니다. 문자에서만 활용됩니다.",
        blank=True,
        null=True,
    )

    class Meta:
        indexes = [
            models.Index(fields=["user", "website"], name="user_website_idx"),
        ]
        verbose_name = "스크레이핑URL"


class ScrapingLog(BaseModel):
    result = models.TextField(
        blank=True,
        null=True,
        help_text="스크래이핑 결과를 모두 저장하는 필드입니다.",
        verbose_name="스크래이핑 결과",
    )
    is_error = models.BooleanField(
        default=False,
        blank=False,
        null=False,
        help_text="스크래이핑 결과가 정상인지 과정에 오류는 없었는지 저장하는 필드입니다.",
        verbose_name="에러 여부",
    )

    def __str__(self) -> str:
        return f"{self.result[:40]}"

    class Meta:
        verbose_name = verbose_name_plural = "스크레이핑이력"


class ScrapingGroup(BaseModel):
    group_name = models.CharField(
        max_length=20,
        blank=False,
        null=False,
        help_text="스크래이핑될 그룹 이름입니다.",
        verbose_name="그룹이름",
        validators=[
            RegexValidator(
                regex="^[a-zA-Z]*$",
                message="그룹 이름은 영어 알파벳만 포함해야 합니다.",
                code="invalid_group_name",
            ),
        ],
    )

    def __str__(self) -> str:
        return f"스크래이핑 그룹: {self.group_name}"

    class Meta:
        verbose_name = verbose_name_plural = "스크레이핑그룹"
