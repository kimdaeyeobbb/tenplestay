from requests.sessions import Session
from requests.adapters import HTTPAdapter, Retry
from fake_useragent import UserAgent


def get_header():
    # 랜덤 사용자 에이전트 생성
    user_agent = UserAgent()
    return {
        "User-Agent": user_agent.random,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",  # Do Not Track Request Header
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
    }


def get_retry_session() -> Session:
    s = Session()
    limit_retries = 3
    backoff_factor = 0.5
    RETRY_AFTER_STATUS_CODES = (400, 403, 500, 503)

    retry_strategy = Retry(
        total=limit_retries,
        backoff_factor=backoff_factor,
        status_forcelist=RETRY_AFTER_STATUS_CODES,
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    s.mount("http://", adapter)
    s.mount("https://", adapter)
    return s
