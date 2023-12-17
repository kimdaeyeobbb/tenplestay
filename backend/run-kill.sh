#!/bin/bash

# 운영계에서만 사용할 script
# chmod +x run.sh

pkill -9 -ef "gunicorn"
pkill -9 -ef "scraping"
pkill -9 -ef "messaging"
sleep 1

echo "====================== process kill clear, check out the result ======================"
ps -ef | grep "gunicorn"
ps -ef | grep "scraping"
pkill -9 -ef "messaging"
