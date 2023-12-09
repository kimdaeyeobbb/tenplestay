from django.core.validators import RegexValidator
from django.db import models

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
    scraping_group = models.ForeignKey(
        "ScrapingGroup",
        on_delete=models.SET_NULL,
        null=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
    )
    last_scraping_log = models.ForeignKey(
        "ScrapingLog",
        on_delete=models.SET_NULL,
        null=True,
    )

    class Meta:
        indexes = [
            models.Index(fields=["user", "website"], name="user_website_idx"),
        ]


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
        return f"스크래이핑 결과: {self.is_error}, {self.result[:20]}"


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
