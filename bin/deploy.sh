#!/bin/bash

if [[ ($1 = "prod" || $1 = "dev") && ($2 = "up" || $2 = "down") ]]; then 
    cd ..
    file_env="compose.${1}.yaml"
    down_or_up=$2
    echo "Running docker-compose -f compose.yaml -f $file_env $down_or_up"
    docker-compose -f compose.yaml -f $file_env $down_or_up
else
    echo "Need to follow format of ./deploy.sh <prod|dev> <up|down>"
fi
