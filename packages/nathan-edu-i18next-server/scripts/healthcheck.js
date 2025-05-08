import WebSocket from 'ws'

const ws = new WebSocket('ws://localhost:10200')

const timer = setTimeout(() => {
  console.error('Health check failed: WebSocket connection timed out')
  process.exit(1)
}, 5000)

ws.on('open', () => {
  clearTimeout(timer)
  console.log('Health check passed: WebSocket connection successful')
  process.exit(0)
})

ws.on('error', (err) => {
  clearTimeout(timer)
  console.error('Health check failed:', err.message)
  process.exit(1)
})
