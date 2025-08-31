#!/usr/bin/env bash

# DESCRIPTION:
# Adds convenient functions for managing docker.

# Can be called like `./docker_functions clean` without need for sourcing file.

function compose() {
  local env=$1
  shift
  local categories=(app infra mcp tool)
  local selected=()

  # Check if the next argument matches a category
  for category in "${categories[@]}"; do
    if [[ $1 == "$category" ]]; then
      selected+=("$category")
      shift
    fi
  done

  # If no category was selected, use all
  if [ ${#selected[@]} -eq 0 ]; then
    selected=("${categories[@]}")
  fi

  local files=()
  for category in "${selected[@]}"; do
    local file="./compose.${category}.${env}.yaml"
    if [[ -f $file ]]; then
      files+=("-f" "$file")
    fi
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