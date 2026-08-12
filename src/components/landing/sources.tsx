import { ShieldCheck, XCircle } from 'lucide-react'
import { SourceCard } from '@/components/source-card'

export function Sources() {
  return (
    <section id="sources" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Verified answers
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            Answers backed by official FAST sources
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            FAST AI Office does not simply guess. Every answer is grounded in official FAST-NUCES
            documents, and each response links to the exact document, section and page so you can
            verify it yourself.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3 text-sm text-foreground">
              <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-success" />
              Grounded in official academic rules, fee schedules and student handbooks
            </li>
            <li className="flex items-start gap-3 text-sm text-foreground">
              <XCircle className="mt-0.5 size-4.5 shrink-0 text-primary" />
              No made-up policies, no unofficial WhatsApp forwards
            </li>
          </ul>
        </div>

        <div>
          <SourceCard
            className="shadow-sm"
            source={{
              document: 'Undergraduate Academic Rules & Regulations',
              edition: 'June 2026',
              section: 'Section 4.2',
              page: 'Page 37',
            }}
          />
        </div>
      </div>
    </section>
  )
}
