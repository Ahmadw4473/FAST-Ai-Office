import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { exampleQuestions } from '@/lib/fast-data'

export function Examples() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Ask anything
          </span>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            Real questions students ask every semester
          </h2>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exampleQuestions.map((q) => (
            <Link
              key={q}
              href="/chat"
              className="group flex items-center justify-between gap-3 rounded-lg border border-border border-l-2 border-l-transparent bg-card px-4 py-4 transition-all hover:border-l-primary hover:shadow-sm"
            >
              <span className="text-sm font-medium text-foreground">{q}</span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
