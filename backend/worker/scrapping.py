import asyncio
import os
from concurrent.futures import ProcessPoolExecutor

from dotenv import load_dotenv
from aiohttp_retry import ExponentialRetry, RetryClient
from fake_useragent import UserAgent

from logger import SCRAPING_LOGGER as log
from src.db import Repository

load_dotenv()
DB_URL = os.getenv("DBMS_URL_PROD")

if not DB_URL:
    raise Exception("There is no DB_URL value in env value")


async def fetch_url(session: RetryClient, url: str):
    # 랜덤 사용자 에이전트 생성
    user_agent = UserAgent()
    headers = {
        "User-Agent": user_agent.random,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",  # Do Not Track Request Header
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
    }

    async with session.get(url, headers=headers) as response:
        return await response.text()


async def fetch_all_url(result: list[dict]):
    retry_options = ExponentialRetry(attempts=3)
    async with RetryClient(retry_options=retry_options) as session:
        tasks = [
            asyncio.create_task(fetch_url(session, scraping_url["website"]))
            for scraping_url in result
        ]
        stats_results = await asyncio.gather(*tasks)

        # 그룹 & 비동기 러닝 결과 묶어서 데이터 dump to dict
        # 여기서 fail 건 데이터 제대로 처리할 필요 있음
        for result in stats_results:
            try:
                if not result:
                    raise Exception("fail to request, result is empty")

                log.info(result)
            except Exception as e:
                log.error(f"error >> {e}, result >> {result}")
                continue

        return stats_results


async def scrapping(rep: Repository, group_id: str):
    result: list[dict] = await rep.get_all_scraping_urls_by_group(group_id)
    request_result = await fetch_all_url(result)

    # 키워드 체크 & 변화 체크 & 바뀌었으면 noti에 insert into
    await rep.close()


def run_scrapping(group_id):
    """asyncio 이벤트 루프 생성 및 scrapping 함수 실행, **동기여야 함**"""
    # 새 이벤트 루프 생성 및 설정
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    # Repository 인스턴스 생성
    rep = Repository(DB_URL)

    # scrapping 코루틴 실행
    try:
        loop.run_until_complete(scrapping(rep, group_id))
    finally:
        loop.close()


async def main():
    """코루틴 - 멀티프로세싱 (그룹개수만큼) 러닝 진입점"""
    rep = Repository(DB_URL)
    await rep.initialize()
    connection_successful = await rep.test_connection()
    log.info(f"Connection Successful: {connection_successful}")

    # 모든 데이터 스크레핑 타겟 그룹
    target_groups: list[dict] = await rep.get_all_scraping_groups()
    if not target_groups:
        log.info("empty target user")

    target_groups = [group["id"] for group in target_groups]
    await rep.close()
    # ProcessPoolExecutor를 사용하여 각 사용자에 대한 scrapping 함수를 별도의 프로세스에서 실행
    with ProcessPoolExecutor() as executor:
        executor.map(run_scrapping, target_groups)


if __name__ == "__main__":
    asyncio.run(main())
