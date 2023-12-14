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
NOTI_PLATFORM_CHOICES = [
    (1, "email"),
    (2, "kakaotalk"),
    (3, "sms"),
]


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


async def main():
    try:
        mm = MessagingModule("third-party", settings)
        rep = Repository(DB_URL)
        await rep.initialize()
        connection_successful = await rep.test_connection()
        log.info(f"Connection Successful: {connection_successful}")
        
        

    except Exception as e:
        log.error(f"main error > {e}, {e.__class__}")


    # while True:
    #     try:
    #         rep = Repository(DB_URL)
    #         await rep.initialize()
    #         connection_successful = await rep.test_connection()
    #         log.info(f"Connection Successful: {connection_successful}")

    #     except Exception as e:
    #         log.error(f"main error > {e}, {e.__class__}")
    #     finally:
    #         await sleep(600)  # Sleep for 600 seconds (10 minutes)


if __name__ == "__main__":
    asyncio.run(main())
