#!/bin/bash

# Simple script to bring up all services
docker compose \
  -f docker-compose.yml \
  -f docker-compose.mongo.yml \
  -f docker-compose.api.yml \
  -f docker-compose.frontend.yml \
  -f docker-compose.caddy.yml \
  up --build