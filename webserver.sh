#!/bin/sh
fuser -k 8000/tcp
echo "\e[1;35mStarting HTTP.Server on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ... \e[0m"
/bin/python3 $(pwd)/webserver.py