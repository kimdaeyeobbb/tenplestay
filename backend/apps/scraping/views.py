import random
from collections import Counter

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bs4 import BeautifulSoup
from langdetect import detect
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from konlpy.tag import Okt
import re

from utils.util_views import NClovaStudioApp
from utils.utils import extract_domain
from utils.retry_session import get_retry_session, get_header
from .models import ScrapingUrl, ScrapingGroup
from .serializers import ScrapingUrlSerializer, ScrapingUrlAPISerializer


class ScrapingUrlListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ScrapingUrlSerializer

    def get_queryset(self):
        return (
            ScrapingUrl.objects.filter(user=self.request.user)
            .select_related("last_scraping_log")
            .order_by("-id")
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        scraping_url: ScrapingUrl = serializer.save()

        # scraping_group, user, last_scraping_log 값 설정
        groups = ScrapingGroup.objects.all()
        if groups:
            scraping_url.scraping_group = random.choice(groups)

        scraping_url.user = request.user
        scraping_url.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ScrapingDomainStatsAPIView(APIView):
    """`ScrapingUrl` 모델의 website 필드값 도메인 추출해서 통계"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        urls = ScrapingUrl.objects.values_list("website", flat=True)
        domains = [extract_domain(url) for url in urls]
        domain_counts = Counter(domains)
        return Response(domain_counts)


class ScrapingUrlAPI(APIView):
    """사용자가 url 제출 누르면 미리보기를 위해 사용하는 API"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ScrapingUrlAPISerializer(data=request.data)
        if serializer.is_valid():
            url = request.data.get("url")
            s = get_retry_session()
            try:
                res = s.get(url, headers=get_header())
                html = BeautifulSoup(res.content, "lxml")
            except Exception as e:
                html = BeautifulSoup(res.content)
            finally:
                text_html = html.get_text()

                # 네이버 클라우드
                nstudio = NClovaStudioApp()
                summ = nstudio.get_summarization(text_html)

                lang_type = detect(text_html)
                if lang_type == "ko":
                    okt = Okt()
                    # 특수 문자 제거
                    clean_text = re.sub(r"[^가-힣\s]", "", text_html)
                    # 형태소 분석을 통해 명사 추출
                    tokens = okt.nouns(clean_text)
                else:
                    # 소문자로 변환 및 특수 문자 제거
                    text = re.sub(r"[^a-zA-Z0-9\s]", "", text_html).lower()
                    # 단어 토큰화
                    tokens = word_tokenize(text)
                    # 불용어 제거
                    tokens = [
                        word
                        for word in tokens
                        if not word in stopwords.words("english")
                    ]

                top_tokens = Counter(tokens).most_common(5)
                return Response(
                    {"result": {"summarization": summ, "tokens": top_tokens}}
                )

        else:
            # 유효하지 않은 데이터 처리 (예: 'my_data' 필드가 누락된 경우)
            return Response(serializer.errors, status=400)
