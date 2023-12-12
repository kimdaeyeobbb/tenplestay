from django.conf import settings
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status

from utils.retry_session import get_retry_session


class PingAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, requset: Request):
        return Response(status=status.HTTP_200_OK)


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
