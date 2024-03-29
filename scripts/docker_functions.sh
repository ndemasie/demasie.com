#!/usr/bin/env bash

# DESCRIPTION:
# Adds convenient functions for managing docker.

# Can be called like ./docker_functions clean without need for sourcing file.

function clean() {
  docker ps --all --quiet \
  | xargs docker rm && docker image ls --quiet --filter 'dangling=true' \
  | xargs docker rmi;
}

function free() {
  docker volume ls --quiet --filter 'dangling=true' \
  | xargs docker volume rm;
}

function stop() {
  docker ps --all --quiet \
  | xargs docker stop;
}

if declare -f "$1" > /dev/null
then
  "$@"
else
  echo "'$1' is not a known function name"
  exit 1
fi