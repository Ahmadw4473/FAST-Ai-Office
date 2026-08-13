import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return NextResponse.json({ error: 'API_URL is not configured.' }, { status: 500 })
  }

  const body = await request.json()
  const response = await fetch(new URL('/query', apiUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status })
  }

  return NextResponse.json({ answer: data.answer })
}
