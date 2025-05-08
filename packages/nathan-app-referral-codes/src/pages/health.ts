import type { APIRoute } from 'astro'

export const HEAD: APIRoute = async () => {
  return new Response('OK', {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  })
}
