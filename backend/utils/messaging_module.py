import twilio
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class MessagingModule:
    def __init__(self, run_time: str = "django", settings: dict = {}) -> None:
        if run_time == "django":
            self._django_env()
        else:
            self.sms_account_sid = settings.get("SMS_ACCOUNT_ID")
            self.sms_auth_token = settings.get("SMS_AUTH_TOKEN")
            self.sms_from_num = settings.get("SMS_FROM_NUM")
            self.email_api_key = settings.get("EMAIL_API_KEY")
            self.email_from_mail = settings.get("EMAIL_FROM_EMAIL")

    def _django_env(self) -> None:
        from django.conf import settings

        self.sms_account_sid = settings["SMS_ACCOUNT_ID"]
        self.sms_auth_token = settings["SMS_AUTH_TOKEN"]
        self.sms_from_num = settings["SMS_FROM_NUM"]
        self.email_api_key = settings["EMAIL_API_KEY"]
        self.email_from_mail = settings["EMAIL_FROM_EMAIL"]

    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    # https://www.twilio.com/docs/python/install
    def send_sms(self, to_number: str, body: str) -> dict:
        client = Client(self.sms_account_sid, self.sms_auth_token)
        message = client.messages.create(
            body="[공지드롭] url 페이지 변동 알림" + body,
            from_=self.sms_from_num,
            to=to_number,
        )

        return dict(
            body=message.body,
            num_segments=message.num_segments,
            direction=message.direction,
            from_=message.from_,
            to=message.to,
            price=message.price,
            error_message=message.error_message,
            uri=message.uri,
            account_sid=message.account_sid,
            num_media=message.num_media,
            status=message.status,
            messaging_service_sid=message.messaging_service_sid,
            sid=message.sid,
            error_code=message.error_code,
            price_unit=message.price_unit,
            api_version=message.api_version,
            date_updated=(
                message.date_updated.isoformat() if message.date_updated else None
            ),
            date_sent=(message.date_sent.isoformat() if message.date_sent else None),
            date_created=(
                message.date_created.isoformat() if message.date_created else None
            ),
        )

    def send_email(self, to_address: str, html_content: str) -> dict:
        message = Mail(
            from_email=self.email_from_mail,
            to_emails=to_address,
            subject="[공지드롭] url 페이지 변동 알림",
            html_content=html_content,
        )
        try:
            sg = SendGridAPIClient(self.email_api_key)
            response = sg.send(message)
            return dict(
                status_code=response.status_code,
                body=response.body,
                headers=response.headers,
                error=None,
            )
        except Exception as e:
            return dict(
                status_code=response.status_code,
                body=response.body,
                headers=response.headers,
                error=e.message,
            )


if __name__ == "__main__":
    mm = MessagingModule()
    mm.send_sms("+821053285816", "문자 테스트")
    mm.send_email("qlgks1@naver.com", "메일 테스트")
