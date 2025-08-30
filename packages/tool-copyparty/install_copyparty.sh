#!/usr/bin/env bash

# Copyparty (Android install: https://github.com/9001/copyparty?tab=readme-ov-file#install-on-android)
yes | pkg upgrade && \
termux-setup-storage && \
yes | pkg install python termux-api && \
python -m ensurepip && \
python -m pip install --user -U copyparty && \
{ grep -qE 'PATH=.*\.local/bin' ~/.bashrc 2>/dev/null || { echo 'PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && . ~/.bashrc; }; }
echo $?

# Copyparty Thumbnails
pkg install ffmpeg && \
python3 -m pip install --user -U pillow