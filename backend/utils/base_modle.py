from django.db import models


class BaseModel(models.Model):
    """생성일, 수정일 필드 베이스 모델"""

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="생성일",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="수정일",
    )

    class Meta:
        abstract = True
