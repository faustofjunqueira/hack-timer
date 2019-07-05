#!/bin/bash

cd /home/fausto/app/hack-timer
git pull origin master
docker-compose up -d --build