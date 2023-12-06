from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        """
        ### AccountAdapter - `save_user`
        - adapter pattern으로 user를 실제로 만들어 주는 부분
        - 이 부분이 정의한 model과 core와 상이하면 login 할 때 vaildation 이 안됌
        """
        # data = form.cleaned_data.copy()
        # data["username"] = data.get("name")
        # form.cleaned_data = data.copy()
        # print(form.cleaned_data)
        # print("CustomAccountAdapter", user)
        return super().save_user(request, user, form, commit)

    # def save_user(self, request, user, form, commit=True):
    #     """
    #     ### AccountAdapter - save_user
    #     - adapter pattern으로 user를 실제로 만들어 주는 부분
    #     - 이 부분이 정의한 model과 core와 상이하면 login 할 때 vaildation 이 안됌
    #     """
    #     data = form.cleaned_data
    #     user.email = data.get("email")
    #     user.name = data.get("name")
    #     user.set_password(data["password"])
    #     self.populate_username(request, user)
    #     user.save()
    #     return user


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        oauth_data = sociallogin.account.extra_data
        user.name = oauth_data.get("name")
        user.save()
        return user
