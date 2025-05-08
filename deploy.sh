#!/bin/bash
RUNNING_APPLICATION=$(docker ps | grep green)
DEFAULT_CONF="./"
BLUE_HEALTHCHECK="http://127.0.0.1:5001/"
GREEN_HEALTHCHECK="http://127.0.0.1:5002/"


if [ -z "$IS_GREEN"  ];then
	echo "BLUE => GREEN..."
	docker-compose pull backend-green
	docker-compose up -d backend-green
	
	while [ 1 == 1 ]; do
		echo "green health check...."
		sleep 3

        REQUEST=$(curl $GREEN_HEALTHCHECK) # green request
        if [ -n "$REQUEST" ]; then
            echo "health check success"
			break ;
		fi
	done;
	
    echo "backend-blue down"
    docker-compose stop backend-blue

else
	echo "GREEN => BLUE..."
	docker-compose pull backend-blue
    docker-compose up -d backend-blue
	
	while [ 1 == 1 ]; do
		echo "blue health check...."
            sleep 3

        REQUEST=$(curl $BLUE_HEALTHCHECK) # blue으로 request
        if [ -n "$REQUEST" ]; then
            echo "health check success"
			break ;
		fi
    done;
	
	docker-compose stop backend-green
fi