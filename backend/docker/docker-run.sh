#!/bin/bash

docker compose -f ./grid-sel-compose.yaml -p grid-sel stop
docker compose -f ./grid-sel-compose.yaml -p grid-sel down
docker compose -f ./grid-sel-compose.yaml -p grid-sel up -d

sleep 1
docker compose -f ./grid-sel-compose.yaml -p grid-sel logs -f