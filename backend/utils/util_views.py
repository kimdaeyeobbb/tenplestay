from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status


class PingAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, requset: Request):
        return Response(status=status.HTTP_200_OK)
