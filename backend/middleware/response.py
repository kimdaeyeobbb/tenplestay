from rest_framework.response import Response


class StandardizeApiResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 먼저 다음 미들웨어 또는 뷰로 요청을 전달하고 응답을 받습니다.
        response = self.get_response(request)

        # api 요청 아니거나 drf-spectacular의 경로인 경우 바로 응답을 반환합니다.
        if not request.path.startswith("/api") or request.path.startswith(
            "/api/schema"
        ):
            return response

        # 여기서 response 형태를 표준화합니다.
        if isinstance(response, Response):
            # 표준 응답 형식 정의
            standardized_response = {
                "success": response.status_code in range(200, 299),
                "data": response.data
                if response.status_code in range(200, 299)
                else None,
                "error": response.data
                if response.status_code not in range(200, 299)
                else None,
            }
            response.data = standardized_response
            response.content = response.render().rendered_content

        return response
