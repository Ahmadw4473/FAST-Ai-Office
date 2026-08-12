import { MessageSquare, FileCheck2, Eye, FileText, ArrowRight } from 'lucide-react'

const steps = [
  { icon: MessageSquare, label: 'Ask question', detail: 'Type it in plain English' },
  { icon: FileCheck2, label: 'Get official answer', detail: 'Clear, direct response' },
  { icon: Eye, label: 'View source', detail: 'See the exact document' },
  { icon: FileText, label: 'Take action', detail: 'Open the right form' },
]

export function Flow() {
  return (
    <section id="how-it-works" className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            How it works
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl">
            From question to action
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 text-pretty">
            FAST AI Office does not stop at an answer. It points you to the official source and the
            exact next step you need to take.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.label} className="relative rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <step.icon className="size-4.5" />
                </span>
                <span className="font-mono text-xs text-white/40">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{step.label}</h3>
              <p className="mt-1 text-sm text-white/55">{step.detail}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-white/25 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/30 bg-primary/10 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-white/60">Example outcome</p>
            <p className="mt-1 text-lg font-semibold text-white text-balance">
              &ldquo;You need to submit a Course Withdrawal Form.&rdquo;
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <FileText className="size-4" />
            Open Form
          </button>
        </div>
      </div>
    </section>
  )
}
