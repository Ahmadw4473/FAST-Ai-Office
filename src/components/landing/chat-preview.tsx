import { Sparkles, ArrowUp } from 'lucide-react'
import { SourceCard } from '@/components/source-card'

export function ChatPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <span className="flex size-6 items-center justify-center rounded-md bg-primary">
          <Sparkles className="size-3.5 text-primary-foreground" />
        </span>
        <span className="text-sm font-semibold text-foreground">Fast AI Office</span>
        {/* <span className="ml-auto rounded-full bg-background px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
          FAST-NUCES
        </span> */}
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {/* user message */}
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-secondary px-4 py-2.5 text-sm text-secondary-foreground">
            Can I withdraw from a course after midterms?
          </p>
        </div>

        {/* AI answer */}
        <div className="flex gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </span>
          <div className="min-w-0 space-y-3">
            <p className="text-sm leading-relaxed text-foreground">
              Yes — course withdrawal is permitted up to the university&apos;s specified deadline,
              subject to approval. After midterms it is still possible within the withdrawal window
              defined in the academic regulations.
            </p>
            <SourceCard
              source={{
                document: 'Undergraduate Academic Rules & Regulations',
                edition: 'June 2026',
                section: 'Section 4.2',
                page: 'Page 37',
              }}
            />
          </div>
        </div>
      </div>

      {/* input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
          <span className="flex-1 truncate text-sm text-muted-foreground">
            Ask anything about FAST...
          </span>
          <span className="flex size-7 items-center justify-center rounded-md bg-primary">
            <ArrowUp className="size-4 text-primary-foreground" />
          </span>
        </div>
      </div>
    </div>
  )
}
