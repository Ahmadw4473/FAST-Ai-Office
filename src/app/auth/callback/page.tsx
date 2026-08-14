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
      const code = searchParams.get('code')
      const error = searchParams.get('error_description') || searchParams.get('error')

      if (error) {
        router.replace(`/login?error=${encodeURIComponent(error)}`)
        return
      }

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
          router.replace(`/login?error=${encodeURIComponent(exchangeError.message)}`)
          return
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      router.replace(session ? '/chat' : '/login?error=No session was created after Google sign-in')
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
