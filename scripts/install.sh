#!/usr/bin/env bash
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/ndemasie/demasie.com/main/scripts/install.sh | bash

set -euo pipefail

GITHUB_USER="ndemasie"
GITHUB_REPO="demasie.com"
GHCR_USER="ndemasie"

BASE_URL="https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main"
INSTALL_DIR="${INSTALL_DIR:-$HOME/}"

COMPOSE_FILES=(
  compose.app.prod.yaml
  compose.tool.prod.yaml
  compose.infra.prod.yaml
)

DOCKER_NETWORKS=(
  app-network
  tool-network
)

# ── Setup ──────────────────────────────────────────────────────────────────────

echo "Installing to $INSTALL_DIR ..."
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# ── Download compose files ─────────────────────────────────────────────────────

for file in "${COMPOSE_FILES[@]}"; do
  echo "Downloading $file ..."
  curl -fsSL "${BASE_URL}/${file}" -o "$file"
done

# ── Check .env file ────────────────────────────────────────────────────────────

if [[ ! -f .env ]]; then
  echo -e "\033[0;31mError\033[0m: .env file not found. Please create and populate the .env file before proceeding."
  exit 1
fi

read -p "Have you loaded the .env file with all required values? (y/N): " confirm_env
if [[ "$confirm_env" != "y" ]]; then
  echo "Please load the .env file and re-run the script."
  exit 1
fi

# ── Docker networks ────────────────────────────────────────────────────────────

for network in "${DOCKER_NETWORKS[@]}"; do
  if ! docker network ls --format '{{.Name}}' | grep -qx "$network"; then
    echo "Creating Docker network: $network"
    docker network create "$network"
  fi
done

# ── GHCR login ─────────────────────────────────────────────────────────────────

if [[ -n "${GITHUB_GHCR_PAT:-}" ]]; then
  echo "$GITHUB_GHCR_PAT" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
fi

# ── Start services ─────────────────────────────────────────────────────────────

compose_args=()
for file in "${COMPOSE_FILES[@]}"; do
  compose_args+=("-f" "$file")
done

echo "Starting production services ..."
echo "docker compose ${compose_args[@]} up --detach --pull always"
docker compose "${compose_args[@]}" up --detach --pull always

echo -e "\033[0;32mDone.\033[0m"
