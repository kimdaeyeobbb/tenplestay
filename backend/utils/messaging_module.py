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

        self.sms_account_sid = settings.SMS_ACCOUNT_ID
        self.sms_auth_token = settings.SMS_AUTH_TOKEN
        self.sms_from_num = settings.SMS_FROM_NUM
        self.email_api_key = settings.EMAIL_API_KEY
        self.email_from_mail = settings.EMAIL_FROM_EMAIL

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
                status_code=str(response.status_code),
                body=str(response.body),
                headers=str(response.headers),
                error=None,
            )
        except Exception as e:
            return dict(
                status_code=str(response.status_code),
                body=str(response.body),
                headers=str(response.headers),
                error=e.message,
            )

    def get_sms_template(self, website: str) -> str:
        msg = f"""
            회원님!
            회원님이 공지드롭에 등록한 URL에 새로운 공지가 업데이트 소식을 알려드립니다. 💌

            ➡️ 업데이트 된 URL 확인하기
            https://tenplestay.kro.kr/

            *본 알림톡은 수신자가 신청한 URL 안내를 위한 안내 문자입니다.
        """
        return msg

    def get_email_template(self, website: str) -> str:
        html_content = f"""
            <strong>공지드롭에서</strong> 제출하신 {website} 에서 변화가 감지되었습니다. <br />
            지금 들어가서 확인하세요! <br />
            <button><a href="{website}">확인하러가기</a></button>
        """
        return html_content


if __name__ == "__main__":
    mm = MessagingModule()
    mm.send_sms("+821053285816", "문자 테스트")
    mm.send_email("qlgks1@naver.com", "메일 테스트")
