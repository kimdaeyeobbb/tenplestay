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
nohub gunicorn --workers 3 --bind 0.0.0.0:8000 --log-level=info --log-file=./gunicorn.log --access-logfile=./gunicorn-access.log --error-logfile=./gunicorn-error.log config.wsgi:application --daemon
echo "==================== TenpleStay Django Application Run ===================="

sleep 1
ps -ef | grep gunicorn | grep -v grep

tail -f ./gunicorn-access.log