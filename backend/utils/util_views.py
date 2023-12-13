import os

from django.conf import settings
from django.shortcuts import render
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status

from utils.retry_session import get_retry_session


class PingAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, requset: Request):
        return Response(status=status.HTTP_200_OK)


def log_file_reader(log_file_path):
    if not os.path.isfile(log_file_path):
        return f"{log_file_path} 에 log file 이 존재하지 않거나, localhost 입니다."

    # 파일의 마지막 부분 읽기 (예: 마지막 1000 바이트)
    with open(log_file_path, "rb") as file:
        file.seek(0, os.SEEK_END)  # 파일의 끝으로 이동
        file_size = file.tell()  # 현재 위치를 얻어 파일의 크기 확인

        seek_position = -min(1000, file_size)  # 파일 크기와 1000바이트 중 작은 값만큼 뒤로 이동
        file.seek(seek_position, os.SEEK_END)  # 뒤로 이동

        content = file.read().decode("utf-8", errors="replace")
        return content


def log_view(request):
    scraping_log_file_path = (
        "/root/tenplestay/backend/worker/logs/tenplestay-scraping-worker.log"
    )
    messaging_log_file_path = (
        "/root/tenplestay/backend/worker/logs/tenplestay-messaging-worker.log"
    )

    return render(
        request,
        "log_template.html",
        {
            "scraping_log_content": log_file_reader(scraping_log_file_path),
            "messaging_log_content": log_file_reader(messaging_log_file_path),
        },
    )


class NClovaStudioApp:
    """
    ### 네이버 클로바 스튜디오 API
    - https://clovastudio.ncloud.com/explorer/tools/summarization/v2
    - 길고 복잡한 문장을 간략하게 요약합니다.
    """

    def __init__(self) -> None:
        self.url = "https://clovastudio.apigw.ntruss.com/testapp/v1/api-tools/summarization/v2/6875a176076a4c9da483f57c4cf82575"
        self.headers = {
            "X-NCP-CLOVASTUDIO-API-KEY": settings.X_NCP_CLOVASTUDIO_API_KEY,
            "X-NCP-APIGW-API-KEY": settings.X_NCP_APIGW_API_KEY,
            "X-NCP-CLOVASTUDIO-REQUEST-ID": settings.X_NCP_CLOVASTUDIO_REQUEST_ID,
            "Content-Type": "application/json",
        }

    def set_payload(self, text: str) -> dict:
        return {
            "texts": [text],
            "segMinSize": 300,
            "includeAiFilters": True,
            "maxTokens": 256,
            "autoSentenceSplitter": True,
            "segCount": -1,
            "segMaxSize": 1000,
        }

    def get_summarization(self, text: str) -> dict:
        if not text:
            raise Exception("요약하기 위한 문자열로 빈 문자열이 올 수 없습니다.")

        s = get_retry_session()
        res = s.post(self.url, json=self.set_payload(text), headers=self.headers).json()
        return res["result"]
