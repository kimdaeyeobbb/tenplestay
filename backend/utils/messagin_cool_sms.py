import time
import datetime
import uuid
import hmac
import hashlib
import requests
import platform


def generate_unique_id():
    """Generate a unique identifier."""
    return str(uuid.uuid1().hex)


def get_iso_datetime():
    """Get current time in ISO format with UTC offset."""
    utc_offset_sec = time.altzone if time.localtime().tm_isdst else time.timezone
    utc_offset = datetime.timedelta(seconds=-utc_offset_sec)
    return (
        datetime.datetime.now()
        .replace(tzinfo=datetime.timezone(offset=utc_offset))
        .isoformat()
    )


def create_signature(api_secret, msg):
    """Create HMAC SHA256 signature."""
    return hmac.new(api_secret.encode(), msg.encode(), hashlib.sha256).hexdigest()


def prepare_headers(api_key, api_secret):
    """Prepare headers for the request."""
    date = get_iso_datetime()
    salt = generate_unique_id()
    signature = create_signature(api_secret, date + salt)

    return {
        "Authorization": f"HMAC-SHA256 ApiKey={api_key}, Date={date}, salt={salt}, signature={signature}",
        "Content-Type": "application/json; charset=utf-8",
    }


def construct_url(path):
    """Construct URL for API request."""
    url = "https://api.coolsms.co.kr"
    return url + path


def send_bulk_messages(messages, API_KEY, API_SECRET):
    """Send bulk messages."""
    url = construct_url("/messages/v4/send-many")
    headers = prepare_headers(API_KEY, API_SECRET)
    data = {
        "messages": messages,
        "agent": {
            "sdkVersion": "python/4.2.0",
            "osPlatform": platform.platform() + " | " + platform.python_version(),
        },
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()


def send_a_message(API_KEY, API_SECRET, from_number: str, to_number: str, body: str):
    url = construct_url("/messages/v4/send-many")
    headers = prepare_headers(API_KEY, API_SECRET)
    data = {
        "messages": [
            {
                "to": to_number,
                "from": from_number,  # 발신자임
                "text": body,
            },
        ],
        "agent": {
            "sdkVersion": "python/4.2.0",
            "osPlatform": platform.platform() + " | " + platform.python_version(),
        },
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()


# if __name__ == "__main__":
#     messages = [
#         {
#             "to": "-",
#             "from": "-",
#             "text": "한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다.",
#         },
#         {
#             "to": "-",
#             "from": "-",
#             "text": "한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다.",
#         },
#     ]
#     response = send_bulk_messages(messages)
#     print(json.dumps(response, indent=2, ensure_ascii=False))
