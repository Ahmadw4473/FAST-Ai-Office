import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return NextResponse.json({ error: 'API_URL is not configured.' }, { status: 500 })
  }

  const body = await request.json()
  const response = await fetch(new URL('/query', apiUrl).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const text = await response.text()
  const data = parseJson(text)

  if (!response.ok) {
    console.error('FAST backend request failed', {
      url: new URL('/query', apiUrl).toString(),
      status: response.status,
      body: text,
    })

    return NextResponse.json(
      {
        error:
          data?.error ||
          data?.detail ||
          text ||
          `Backend request failed with status ${response.status}.`,
      },
      { status: response.status },
    )
  }

  return NextResponse.json({ answer: data?.answer ?? text })
}

function parseJson(text: string): Record<string, string> | null {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
