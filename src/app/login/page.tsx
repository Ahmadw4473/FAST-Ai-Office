'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Lock, Mail, ShieldCheck } from 'lucide-react'
import { FastLogo } from '@/components/fast-logo'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authError = searchParams.get('error')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/chat')
    })
  }, [router])

  async function handleEmailAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const authCall =
      mode === 'signin'
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password })

    const { error } = await authCall
    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    router.replace('/chat')
  }

  async function handleGoogleAuth() {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setLoading(false)
      setMessage(error.message)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" aria-label="FAST AI Office home">
          <FastLogo />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Sign in or create an account with any email.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 rounded-lg border border-border bg-card p-1">
            {(['signin', 'signup'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`h-9 rounded-md text-sm font-medium ${
                  mode === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                {item === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleEmailAuth}>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:border-primary/40">
                <Mail className="size-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-11 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:border-primary/40">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className="h-11 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {(message || authError) && (
              <p className="text-sm text-destructive">{message || authError}</p>
            )}

            <Button size="lg" className="h-11 w-full text-[15px]" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            size="lg"
            className="h-11 w-full text-[15px]"
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <GoogleMark />
            Continue with Google
          </Button>

          
        </div>
      </main>
    </div>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75Z"
      />
    </svg>
  )
}
