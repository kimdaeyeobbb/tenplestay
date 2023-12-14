import os
import asyncio
import sys
from asyncio import sleep

from dotenv import load_dotenv

from logger import MESAGING_LOGGER as log
from src.db import Repository

# sys.path 로 런타임 중 모듈 임포트 경로 추가
sys.path.append("..")
from utils.messaging_module import MessagingModule

load_dotenv()
DB_URL = os.getenv("DBMS_URL_PROD")
SMS_ACCOUNT_ID = os.getenv("SMS_ACCOUNT_ID")
SMS_AUTH_TOKEN = os.getenv("SMS_AUTH_TOKEN")
SMS_FROM_NUM = os.getenv("SMS_FROM_NUM", "+12057516527")
EMAIL_API_KEY = os.getenv("EMAIL_API_KEY")
EMAIL_FROM_EMAIL = os.getenv("EMAIL_FROM_EMAIL", "hyeon.wo.dev@tenplestay.kro.kr")
NOTI_PLATFORM_CHOICES = {
    "1": "email",
    "2": "kakaotalk",
    "3": "sms",
}


if not DB_URL:
    raise Exception("There is no DB_URL value in env value")

if not SMS_ACCOUNT_ID or not SMS_AUTH_TOKEN or not EMAIL_API_KEY:
    raise Exception("There is no NOTI API value in env value")

settings = dict(
    SMS_ACCOUNT_ID=SMS_ACCOUNT_ID,
    SMS_AUTH_TOKEN=SMS_AUTH_TOKEN,
    SMS_FROM_NUM=SMS_FROM_NUM,
    EMAIL_API_KEY=EMAIL_API_KEY,
    EMAIL_FROM_EMAIL=EMAIL_FROM_EMAIL,
)

# 일단 retry 고민 없이, main platfrom으로만 단발성으로 발송 진행


async def send_noti(message_moduel: MessagingModule, noti_with_scraping: dict):
    # noti_with_scraping 는 `get_all_noti_with_scarping_url` 쿼리 결과 row 하나
    main_platform = NOTI_PLATFORM_CHOICES[
        str(noti_with_scraping["main_noti_platform_id"])
    ]
    if main_platform == "email":
        html_content = f"""
            <strong>공지드롭에서</strong> 제출하신 {noti_with_scraping["website"]} 에서 변화가 감지되었습니다. \n
            지금 들어가서 확인하세요! \n
            <button><a href="{noti_with_scraping["website"]}">확인하러가기</a></button>
        """
        result = message_moduel.send_email(noti_with_scraping["email"], html_content)
    elif main_platform == "sms":
        sms_content = f"""
            제출하신 {noti_with_scraping["website"]} 에서 변화가 감지되었습니다.
            지금 들어가서 확인하세요!
        """
        result = message_moduel.send_sms(
            noti_with_scraping["phone_number"], sms_content
        )
    return result


async def main():
    # while True:
    try:
        mm = MessagingModule("third-party", settings)
        rep = Repository(DB_URL)
        await rep.initialize()
        connection_successful = await rep.test_connection()
        log.info(f"Connection Successful: {connection_successful}")

        noti_with_scraping_list: list[dict] = await rep.get_all_noti_with_scarping_url()
        tasks = [
            asyncio.create_task(send_noti(mm, noti_with_scraping))
            for noti_with_scraping in noti_with_scraping_list
        ]
        noti_results = await asyncio.gather(*tasks)

        # 결과들을 모아서 bulk create (bulk insert into)
        bulk_send_log_data = list()
        for noti_with_scraping, noti_result in zip(
            noti_with_scraping_list, noti_results
        ):
            noti_with_scraping: dict
            noti_result: dict
            bulk_send_log_data.append((noti_with_scraping["id"], noti_result))
            await rep.update_noti_clear(noti_with_scraping["id"])

        # bulk insert query 본체
        await rep.bulk_create_noti_send_log(bulk_send_log_data)
        log.info(f"{len(noti_results)} 개 noti clear")
        await rep.close()
    except Exception as e:
        log.error(f"main error >> {e}, {e.__class__}")
    finally:
        await sleep(600)  # Sleep for 600 seconds (10 minutes)


if __name__ == "__main__":
    asyncio.run(main())
