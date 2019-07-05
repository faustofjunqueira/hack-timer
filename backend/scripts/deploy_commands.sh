#!/bin/bash

cd /home/fausto/app/hack-timer
git pull origin master
cd ./backend
docker-compose up -d --build