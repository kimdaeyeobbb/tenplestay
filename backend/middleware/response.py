from rest_framework.response import Response


class StandardizeApiResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # api 요청 아닌 것은 모두 skip
        if not request.path.startswith("/api"):
            return self.get_response(request)

        # drf-spectacular의 경로를 확인하고, 해당 경로에 대해서는 skip
        if request.path.startswith("/api/schema"):
            return self.get_response(request)

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
