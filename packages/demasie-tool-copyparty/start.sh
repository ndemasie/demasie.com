#!/usr/bin/env bash

source ./.env

# Start cloudflared in the background
cloudflared tunnel run \
  --token "${CLOUDFLARE_TUNNEL_TOKEN}" &

# Start copyparty
copyparty -c ./copyparty.conf