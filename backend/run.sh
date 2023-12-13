#!/bin/bash

# 운영계에서만 사용할 script
# chmod +x run.sh

# 가상환경 액티베이션 & 라이브러리 설치
source  .venv/bin/activate
pip install -r requirements.txt

export DJANGO_SETTINGS_MODULE=config.settings.prod
python manage.py collectstatic --no-input
python manage.py migrate

sleep 1
gunicorn --workers 3 --bind 0.0.0.0:8000 --log-level=info --log-file=./gunicorn.log --access-logfile=./gunicorn-access.log --error-logfile=./gunicorn-error.log config.wsgi:application --daemon
ps -ef | grep gunicorn | grep -v grep

sleep 1

# 비동기 프로세스 실행
cd ./worker
nohup python scrapping.py > /dev/null 2>&1 &
nohup python message.py > /dev/null 2>&1 &
ps -ef | grep scrapping | grep -v grep
ps -ef | grep message | grep -v grep


cd ..
echo "<< ==================== TenpleStay All Service Run ==================== >>"
tail -f ./gunicorn-access.log
