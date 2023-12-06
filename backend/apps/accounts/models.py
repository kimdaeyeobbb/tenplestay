from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        return self.create_user(
            email,
            password=password,
            is_staff=True,
            is_superuser=True,
            is_active=True,
            **extra_fields,
        )


class User(AbstractBaseUser, PermissionsMixin):
    """
    - User table model
    """

    email = models.EmailField(  # 사용자 ID (email format)
        verbose_name="이메일",
        max_length=255,
        unique=True,
    )
    name = models.CharField(
        max_length=50, verbose_name="사용자 이름", help_text="사용자가 가입시 입력한 이름입니다."
    )
    is_staff = models.BooleanField(default=False, verbose_name="staff 또는 관리자 유무")
    is_active = models.BooleanField(
        default=True, verbose_name="계정 활성 상태", help_text="탈퇴시 비활성이 먼저됩니다."
    )
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="가입일", help_text="계정을 생성한 날짜입니다. 곧 가입일과 동일합니다."
    )

    objects = UserManager()  # 재정의 된 UserManager 사용 선언

    USERNAME_FIELD = "email"  # email을 ID 필드로 사용 선언
    REQUIRED_FIELDS = ["name"]  # 사용자 이름은 필수 필드

    def __str__(self):
        return self.email

    class Meta:
        app_label = "accounts"
