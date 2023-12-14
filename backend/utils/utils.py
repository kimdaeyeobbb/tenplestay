import os
from urllib.parse import urlparse

import psutil


def extract_domain(url):
    parsed_url = urlparse(url)
    return parsed_url.netloc


def is_process_running(process_name):
    # 모든 실행 중인 프로세스를 순회합니다.
    for proc in psutil.process_iter(["pid", "name"]):
        # 특정 프로세스 이름이 있는지 확인합니다.
        if process_name.lower() in proc.info["name"].lower():
            return True
    return False


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
