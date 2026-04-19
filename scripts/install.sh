#!/usr/bin/env bash
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/ndemasie/demasie.com/main/scripts/install.sh | bash

set -euo pipefail

GITHUB_USER="ndemasie"
GITHUB_REPO="demasie.com"

BASE_URL="https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main"
INSTALL_DIR="${INSTALL_DIR:-$HOME/$GITHUB_REPO}"

# ── Setup ──────────────────────────────────────────────────────────────────────

echo "Installing to $INSTALL_DIR ..."
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# ── Apps ────────────────────────────────────────────────────────────────────────

COMPOSE_FILES=(
  compose.app.prod.yaml
  compose.tool.prod.yaml
  compose.infra.prod.yaml
)

DOCKER_NETWORKS=(
  app-network
  tool-network
)

GHCR_USER="ndemasie"

if [[ -n "${GITHUB_GHCR_PAT:-}" ]]; then
  echo "$GITHUB_GHCR_PAT" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
fi

if [[ ! -f .env ]]; then
  echo -e "\033[0;31mError\033[0m: .env file not found. Please create and populate the .env file before proceeding."
  exit 1
fi

read -p "Have you loaded the .env file with all required values? (y/N): " confirm_service_env </dev/tty
if [[ "$confirm_service_env" != "y" ]]; then
  echo "Please load the .env file and re-run the script."
  exit 1
fi

for file in "${COMPOSE_FILES[@]}"; do
  echo "Downloading $file ..."
  curl -fsSL "${BASE_URL}/${file}" -o "$file"
done

for network in "${DOCKER_NETWORKS[@]}"; do
  if ! docker network ls --format '{{.Name}}' | grep -qx "$network"; then
    echo "Creating Docker network: $network"
    docker network create "$network"
  fi
done

read -p "Start services? (y/N): " confirm_service_start </dev/tty
if [[ "$confirm_service_start" == "y" ]]; then
  compose_args=()
  for file in "${COMPOSE_FILES[@]}"; do
    compose_args+=("-f" "$file")
  done

  echo "Starting production services ..."
  echo "docker compose ${compose_args[@]} up --detach --pull always"
  docker compose "${compose_args[@]}" up --detach --pull always

  echo -e "\033[0;32mDone.\033[0m"
fi

# ── Dashboard  ────────────────────────────────────────────────────────────────

DASHBOARD_FILES=(
  tools/dashboard/main.py
  tools/dashboard/widget_container.py
  tools/dashboard/widget_hardware.py
  tools/dashboard/widget_process.py
  tools/dashboard/widget_timer.py
  tools/dashboard/widget_website.py
)

read -p "Download the dashboard tools? (y/N): " confirm_dashboard_install </dev/tty
if [[ "$confirm_dashboard_install" == "y" ]]; then
  rm -rf tools/dashboard
  mkdir -p tools/dashboard
  for file in "${DASHBOARD_FILES[@]}"; do
    echo "Downloading $file ..."
    curl -fsSL "${BASE_URL}/${file}" -o "$file"
  done
fi

if [[ -f tools/dashboard/main.py ]]; then
  read -p "Start the dashboard? (y/N): " confirm_dashboard_start </dev/tty
  if [[ "$confirm_dashboard_start" == "y" ]]; then
    python3 tools/dashboard/main.py
  fi
fi
