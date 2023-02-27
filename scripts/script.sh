#!/bin/bash
# docker build -t blogapi .
# docker run -p 4000:4000 -d blogapi
# docker-compose --env-file .env  up -d
docker rm -f `docker ps -aq -f name=blogapi*`
set -a
source .env
cat ${COMPOSE_CONFIG} | envsubst | docker-compose -f - -p "blogapi" up -d