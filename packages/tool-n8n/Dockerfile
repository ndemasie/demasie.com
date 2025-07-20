# BASE
FROM docker.n8n.io/n8nio/n8n:latest AS base

WORKDIR /app

ENV HOST=tool-n8n
ENV PORT=5678

EXPOSE ${PORT}

HEALTHCHECK \
  --interval=30s \
  --timeout=10s \
  --retries=3 \
  --start-period=60s \
  CMD wget --spider http://${HOST}:${PORT}/healthz > /dev/null 2>&1 || exit 1