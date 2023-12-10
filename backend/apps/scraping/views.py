import random
from collections import Counter


from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from utils.utils import extract_domain
from .models import ScrapingUrl, ScrapingGroup
from .serializers import ScrapingUrlSerializer


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
