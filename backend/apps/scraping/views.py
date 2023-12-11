import random
from collections import Counter


from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bs4 import BeautifulSoup

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
            res = s.get(url, headers=get_header())
            html = BeautifulSoup(res.content, "lxml")
            return Response({"result": str(html)})
        else:
            # 유효하지 않은 데이터 처리 (예: 'my_data' 필드가 누락된 경우)
            return Response(serializer.errors, status=400)
