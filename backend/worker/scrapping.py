import asyncio
import os
from concurrent.futures import ProcessPoolExecutor

from dotenv import load_dotenv

# from logger import MAIN_LOGGER as log
from src.db import Repository

load_dotenv()
DB_URL = os.getenv("DBMS_URL_PROD")

if not DB_URL:
    raise Exception("There is no DB_URL value in env value")


# async def scrapping(rep: Repository, user_id: str):
#     ...


# def run_scrapping(user_id):
#     """asyncio 이벤트 루프 생성 및 scrapping 함수 실행, **동기여야 함**"""
#     # 새 이벤트 루프 생성 및 설정
#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)

#     # Repository 인스턴스 생성
#     rep = Repository(DB_URL)

#     # scrapping 코루틴 실행
#     try:
#         loop.run_until_complete(scrapping(rep, user_id))
#     finally:
#         loop.close()


async def main():
    repo = Repository(DB_URL)
    await repo.initialize()
    connection_successful = await repo.test_connection()
    print("Connection Successful:", connection_successful)

    result = await repo.get_all_scraping_urls()
    print("get_all_scraping_urls:", result)

    result = await repo.get_all_scraping_groups()
    print("get_all_scraping_groups:", result)
    await repo.close()


#     rep = Repository(DB_URL)
#     # 모든 데이터 스크레핑 타겟 유저 가져오기
#     target_users: list[UserInfo] = await rep.find_users()

#     if not target_users:
#         log.info("empty target user")

#     target_users = [user.userId for user in target_users]

#     # ProcessPoolExecutor를 사용하여 각 사용자에 대한 scrapping 함수를 별도의 프로세스에서 실행
#     with ProcessPoolExecutor() as executor:
#         executor.map(run_scrapping, target_users)


if __name__ == "__main__":
    asyncio.run(main())
