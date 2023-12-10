import asyncio
from urllib.parse import urlparse, unquote

import asyncpg
import pytz


# execute: 이 메서드는 주로 INSERT, UPDATE, DELETE 등의 SQL 명령을 실행할 때 사용
# 이는 쿼리의 결과를 반환하지 않고, 대신 영향 받은 행의 수를 반환
# fetch: SELECT 쿼리를 실행하고 그 결과를 반환할 때 사용


class Repository:
    def __init__(self, db_url: str) -> None:
        self.tz = pytz.timezone("Asia/Seoul")
        self.conn = None
        self.db_url = db_url

    async def initialize(self):
        parsed_url = urlparse(self.db_url)
        db_name = parsed_url.path[1:]
        user = parsed_url.username
        password = unquote(parsed_url.password)
        host = parsed_url.hostname
        port = parsed_url.port
        self.conn = await asyncpg.connect(
            database=db_name, user=user, password=password, host=host, port=port
        )

    async def test_connection(self) -> bool:
        try:
            await self.conn.fetch("SELECT 1")
            return True
        except Exception:
            return False

    async def get_all_scraping_urls(self):
        try:
            sql = """
                select *
                from scraping_scrapingurl;
            """
            result = await self.conn.fetch(sql)
            return result
        except Exception as e:
            print(e)

    async def get_all_scraping_groups(self):
        try:
            sql = """
                select *
                from scraping_scrapinggroup;
            """
            result = await self.conn.fetch(sql)
            return result
        except Exception as e:
            print(e)

    async def close(self):
        if self.conn:
            await self.conn.close()


# async def main():
#     db_url = "db_url"
#     repo = Repository(db_url)
#     await repo.initialize()
#     connection_successful = await repo.test_connection()
#     print("Connection Successful:", connection_successful)
#     await repo.close()


# asyncio.run(main())
