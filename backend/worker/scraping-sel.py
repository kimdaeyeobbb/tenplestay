import os
import difflib
import random
import asyncio
from asyncio import sleep
from concurrent.futures import ProcessPoolExecutor

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options as ChromeOptions
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from aiohttp_retry import ExponentialRetry, RetryClient
from fake_useragent import UserAgent

from logger import SCRAPING_LOGGER as log
from src.db import Repository

load_dotenv()
DB_URL = os.getenv("DBMS_URL_PROD")

if not DB_URL:
    raise Exception("There is no DB_URL value in env value")


async def fetch_url(url: str):
    user_agent = UserAgent()  # 랜덤 사용자 에이전트 생성
    # Chrome 옵션 설정
    chrome_options = ChromeOptions()
    chrome_options.add_argument("--headless")  # 브라우저를 머리 없이 실행
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(f"user-agent={user_agent.random}")

    # Selenium WebDriver 설정
    browsers = [DesiredCapabilities.CHROME, DesiredCapabilities.FIREFOX]
    selected_browser = random.choice(browsers)
    driver = webdriver.Remote(
        command_executor="http://localhost:4444/wd/hub",
        desired_capabilities=selected_browser,
        options=chrome_options,
    )

    try:
        driver.get(url)
        html_content = driver.page_source
        soup = BeautifulSoup(html_content, "lxml")

        # Remove all script tags
        for script_tag in soup.find_all("script"):
            script_tag.decompose()

        body = soup.body
        if body:
            return str(body)
        else:
            return ""

    finally:
        # WebDriver 종료
        driver.quit()


async def fetch_all_url(scraping_urls: list[dict]):
    """`result`는 scraping_scrapingurl table model list"""
    retry_options = ExponentialRetry(attempts=3)
    async with RetryClient(retry_options=retry_options) as session:
        tasks = [
            asyncio.create_task(fetch_url(session, scraping_url["website"]))
            for scraping_url in scraping_urls
        ]
        res_results = await asyncio.gather(*tasks)
        return res_results


async def scrapping(rep: Repository, group_id: str):
    await rep.initialize()

    log.info(f"start scraping group {group_id}")

    scraping_urls: list[dict] = await rep.get_all_scraping_urls_by_group(group_id)
    request_result = await fetch_all_url(scraping_urls)

    # 결과 값으로 변화 감지하기
    for scraping_url, scraping_result in zip(scraping_urls, request_result):
        try:
            if not scraping_result:
                raise Exception("fail to request, result is empty")

            scraping_result = scraping_result.strip()

            # ============================================================ #
            # scraping_url["last_scraping_log_id"] 가 비워져있으면 최초 수집,
            # 또는 is_error 가 True 라면 -> admin에서 확인을 해야함
            # 그냥 바로 저장 & scraping_url 의 log FK 값 update & continue
            # ============================================================ #
            if not scraping_url[
                "last_scraping_log_id"
            ] or await rep.is_lastscraping_error(scraping_url["id"]):
                await rep.create_scraping_log_and_update_scraping_url(
                    scraping_url["id"], scraping_result, False
                )
                continue

            # ============================================================ #
            # 변화 체크, request_result 는 새로운 scraping result
            # 새로 만들 scraping_log 값과 저장된 scraping_url의 FK - scraping_log 의
            # "result" 값들을 비교
            # ============================================================ #
            is_diff = False
            old_scraping_result = await rep.get_scrapingurl_log(scraping_url["id"])
            old_scraping_result = old_scraping_result["result"]
            if old_scraping_result != scraping_result:
                is_diff = True

            # 변화 있는데 키워드도 있으면 다시 체크
            if scraping_url["keywords"]:
                keyword_list = [
                    keyword.strip() for keyword in scraping_url["keywords"].split(",")
                ]
                is_diff = any(keyword in scraping_result for keyword in keyword_list)

            # 값이 달라졌다면?
            if is_diff:
                # differences = list(
                #     difflib.ndiff(old_scraping_result.split(), scraping_result.split())
                # )
                # print(
                #     f"========================= {differences} ========================="
                # )

                # log 추가 생성 및 FK 변경
                await rep.create_scraping_log_and_update_scraping_url(
                    scraping_url["id"], scraping_result, False
                )

                # 알림 추가
                await rep.create_noti(scraping_url)

        except Exception as e:
            err_msg = f"error >> {e}, {e.__class__}, scraping_url >> {scraping_url},"  # scraping_result >> {scraping_result}"
            log.error(err_msg)
            await rep.create_scraping_log_and_update_scraping_url(
                scraping_url["id"], err_msg, True
            )
            continue

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
    while True:
        try:
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

            # ProcessPoolExecutor를 사용하여 각 그룹에 대한
            # scrapping 함수를 별도의 프로세스에서 실행 -> 그룹 개수만큼 멀티프로세싱
            with ProcessPoolExecutor() as executor:
                executor.map(run_scrapping, target_groups)
        except Exception as e:
            log.error(f"main error > {e}, {e.__class__}")
        finally:
            await sleep(600)  # Sleep for 600 seconds (10 minutes)


if __name__ == "__main__":
    asyncio.run(main())
