#!/usr/bin/env bash

sudo apt-get update

# Setup cloudflared
if ! command -v cloudflared >/dev/null 2>&1; then
	sudo apt-get install cloudflared -y
fi

if command -v cloudflared >/dev/null 2>&1; then
	echo "cloudflared is installed"
fi

# Setup copyparty
if ! command -v copyparty >/dev/null 2>&1; then
	./install_copyparty.sh
fi

if command -v copyparty >/dev/null 2>&1; then
	echo "copyparty is installed"
fi

source ./.env
sed -i '' "s/COPYPARTY_PASSWORD/${COPYPARTY_PASSWORD}/g" ./copyparty.conf
