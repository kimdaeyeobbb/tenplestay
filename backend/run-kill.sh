#!/bin/bash

# 운영계에서만 사용할 script
# chmod +x run.sh

ps -ef | grep "gunicorn"

sleep 1
pkill -9 -ef "gunicorn"