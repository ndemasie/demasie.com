#!/usr/bin/env bash

# DESCRIPTION:
# Adds convenient functions for managing docker.

# Can be called like `./docker_functions clean` without need for sourcing file.

function compose() {
  local env=$1
  shift
  local categories=(app tool infra)
  local selected=()

  # Check if the next argument matches a category
  for cat in "${categories[@]}"; do
    if [[ $1 == $cat ]]; then
      selected+=("$cat")
      shift
    fi
  done

  # If no category was selected, use all
  if [ ${#selected[@]} -eq 0 ]; then
    selected=("${categories[@]}")
  fi

  local files=()
  for cat in "${selected[@]}"; do
    local file="./docker-compose.${cat}.${env}.yaml"
    [[ -f $file ]] && files+=("-f" "$file")
  done
  echo "docker compose ${files[@]} $@"

  docker compose "${files[@]}" "$@"
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