import Link from 'next/link'
import { FastLogo } from '@/components/fast-logo'

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <FastLogo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
              A student-built AI assistant for FAST-NUCES. Not an official FAST-NUCES service —
              always verify critical decisions with the administration office.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">Product</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/chat" className="hover:text-primary">Ask FAST AI</Link></li>
                <li><Link href="#how-it-works" className="hover:text-primary">How it works</Link></li>
                <li><Link href="#sources" className="hover:text-primary">Sources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">Topics</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/chat" className="hover:text-primary">Academics</Link></li>
                <li><Link href="/chat" className="hover:text-primary">Fees & Exams</Link></li>
                <li><Link href="/chat" className="hover:text-primary">Documents</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">Account</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/login" className="hover:text-primary">Sign in</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FAST AI Office. Built by students, for students.</p>
          <p>FAST National University of Computer and Emerging Sciences</p>
        </div>
      </div>
    </footer>
  )
}
