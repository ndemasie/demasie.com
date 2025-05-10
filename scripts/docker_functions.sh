#!/usr/bin/env bash

# DESCRIPTION:
# Adds convenient functions for managing docker.

# Can be called like `./docker_functions clean` without need for sourcing file.

function up() {
  local env=$1
  shift
  docker compose -f ./docker-compose.${env}.yaml up $@
}

function down() {
  local env=$1
  shift
  docker compose -f ./docker-compose.${env}.yaml down $@
}

function clean() {
  docker container ls --all --quiet | xargs -r docker rm;
  docker image ls --quiet --filter 'dangling=true' | xargs -r docker rmi;
}

function free() {
  docker volume ls --quiet --filter 'dangling=true' | xargs -r docker volume rm;
}

function stop() {
  docker container ls --all --quiet | xargs -r docker stop;
}

if declare -f "$1" > /dev/null
then
  "$@"
else
  echo "'$1' is not a known function name"
  exit 1
fi