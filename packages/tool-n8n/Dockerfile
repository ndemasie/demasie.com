# BASE
FROM n8nio/n8n AS base

ENV HOST=tool-n8n
ENV PORT=5678

HEALTHCHECK \
  --interval=30s \
  --timeout=10s \
  --retries=3 \
  --start-period=60s \
  CMD wget --spider http://${HOST}:${PORT}/healthz > /dev/null 2>&1 || exit 1

CMD ["start", "--tunnel"]