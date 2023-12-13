import asyncio
from urllib.parse import urlparse, unquote
from typing import Union

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

    async def get_all_scraping_urls_by_group(
        self, group_id: Union[int, str]
    ) -> list[dict]:
        sql = f"""
            select *
            from scraping_scrapingurl ss 
            where ss.scraping_group_id = {group_id}
        """
        result = await self.conn.fetch(sql)
        return [dict(record) for record in result]

    async def get_all_scraping_groups(self) -> list[dict]:
        sql = """
            select *
            from scraping_scrapinggroup;
        """
        result = await self.conn.fetch(sql)
        return [dict(record) for record in result]

    async def create_scraping_log_and_update_scraping_url(
        self, scraping_url_id: int, response: str, is_error: bool
    ) -> None:
        # 로그 데이터 삽입 쿼리
        insert_scraping_log_sql = """
            INSERT INTO scraping_scrapinglog (result, is_error, created_at, updated_at) 
            VALUES ($1, $2, NOW(), NOW())
            RETURNING id;
        """
        # 새 로그 ID를 반환받음
        new_scraping_log_pk: int = await self.conn.fetchval(
            insert_scraping_log_sql, response, is_error
        )

        # scrapingurl 테이블 업데이트 쿼리
        update_scraping_url_sql = """
            UPDATE scraping_scrapingurl
            SET last_scraping_log_id = $1, updated_at = NOW()
            WHERE id = $2;
        """
        await self.conn.execute(
            update_scraping_url_sql, new_scraping_log_pk, scraping_url_id
        )

    async def is_lastscraping_error(self, scraping_url_id: int):
        sql = """
            select ss2.is_error 
            from scraping_scrapingurl ss 
            inner join scraping_scrapinglog ss2 
            on ss.last_scraping_log_id = ss2.id 
            where ss.id = $1;
        """
        result = await self.conn.fetch(sql, scraping_url_id)
        return result[0].get("is_error")

    async def get_scrapingurl_log(self, scraping_url_id: int) -> dict:
        sql = f"""
            select ss2.*
            from scraping_scrapingurl ss 
            inner join scraping_scrapinglog ss2 
            on ss.last_scraping_log_id = ss2.id 
            where ss.id = $1;
        """
        result = await self.conn.fetch(sql, scraping_url_id)
        return dict(result[0])

    async def create_noti(self, scraping_url: dict):
        sql = """
            INSERT INTO notifications_noti 
                (user_id, scraping_url_id, main_noti_platform_id, sub_noti_platform_id, 
                retry_count, is_send, created_at, updated_at) 
            VALUES 
                ($1, $2, $3, $4, 0, false, NOW(), NOW());
        """
        await self.conn.execute(
            sql,
            scraping_url["user_id"],
            scraping_url["id"],
            scraping_url["main_noti_platform_id"],
            scraping_url["sub_noti_platform_id"],
        )

    async def close(self):
        if self.conn:
            await self.conn.close()


# async def main():
#     db_url = "db_url"
#     rep = Repository(db_url)
#     await rep.initialize()
#     connection_successful = await rep.test_connection()
#     print("Connection Successful:", connection_successful)
#     scraping_urls: list[dict] = await rep.get_all_scraping_urls_by_group(1)
#     print(scraping_urls)
#     await rep.close()


# asyncio.run(main())
