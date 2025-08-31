// test_mcp.js
const url = 'http://localhost:8000/mcp'

async function callMCP(method, params = {}) {
  const body = {
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify(body),
  })

  const reader = res.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    // SSE delivers messages line-by-line
    let lines = buffer.split('\n')
    buffer = lines.pop() // keep incomplete line

    for (const line of lines) {
      if (line.startsWith('data:')) {
        const data = line.slice(5).trim()
        if (data) {
          try {
            console.log('←', JSON.parse(data))
          } catch {
            console.log('←', data)
          }
        }
      }
    }
  }
}

;(async () => {
  console.log('→ listMethods')
  await callMCP('listMethods')

  console.log('\n→ getTime')
  await callMCP('getTime')
})()
