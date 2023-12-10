from rest_framework import viewsets

from .models import ScrapingUrl
from .serializers import ScrapingUrlSerializer


class ScrapingUrlViewSet(viewsets.ModelViewSet):
    queryset = ScrapingUrl.objects.all()
    serializer_class = ScrapingUrlSerializer
