#!/usr/bin/env bash

# DESCRIPTION:
# Adds convenient functions for managing docker.

# Can be called like `./docker_functions clean` without need for sourcing file.

function compose() {
  local env=$1
  shift
  local files=()
  [[ -f ./docker-compose.app.${env}.yaml ]] && files+=("-f ./docker-compose.app.${env}.yaml")
  [[ -f ./docker-compose.tool.${env}.yaml ]] && files+=("-f ./docker-compose.tool.${env}.yaml")
  docker compose ${files[@]} "$@"
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