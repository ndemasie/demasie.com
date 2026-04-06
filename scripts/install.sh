#!/usr/bin/env bash
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/ndemasie/demasie.com/main/scripts/install.sh | bash
#
# Or download and run directly:
#   curl -fsSL https://raw.githubusercontent.com/ndemasie/demasie.com/main/scripts/install.sh -o install.sh && bash install.sh

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
docker compose "${compose_args[@]}" up -d --pull always

echo "Done."
