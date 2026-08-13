'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { FastLogo } from '@/components/fast-logo'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Sources', href: '#sources' },
  { label: 'About', href: '#about' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="FAST AI Office home">
          <FastLogo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg" nativeButton={false} render={<Link href="/login" />}>
            Sign in
          </Button>
          <Button size="lg" nativeButton={false} render={<Link href="/chat" />}>
            Ask FAST AI
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/login" />}>
                Sign in
              </Button>
              <Button size="lg" nativeButton={false} render={<Link href="/chat" />}>
                Ask FAST AI
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
