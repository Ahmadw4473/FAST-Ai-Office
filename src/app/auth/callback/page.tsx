'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackStatus />}>
      <AuthCallback />
    </Suspense>
  )
}

function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function finishSignIn() {
      const error = searchParams.get('error_description') || searchParams.get('error')

      if (error) {
        router.replace(`/login?error=${encodeURIComponent(error)}`)
        return
      }

      for (let attempt = 0; attempt < 10; attempt += 1) {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          router.replace('/chat')
          return
        }

        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      router.replace('/login?error=No session was created after Google sign-in')
    }

    finishSignIn()
  }, [router, searchParams])

  return <CallbackStatus />
}

function CallbackStatus() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
      Signing you in...
    </div>
  )
}
