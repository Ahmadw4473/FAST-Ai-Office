import { FileCheck2, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Source } from '@/lib/fast-data'

interface SourceCardProps {
  source: Source
  className?: string
}

export function SourceCard({ source, className }: SourceCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-card',
        'border-l-2 border-l-primary',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <FileCheck2 className="size-3.5 text-primary" />
        <span className="font-mono text-[11px] font-semibold tracking-widest text-primary uppercase">
          Official FAST Source
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 px-4 py-3.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground text-balance">{source.document}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{source.edition}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
            <span>{source.section}</span>
            <span className="text-border">·</span>
            <span>{source.page}</span>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
        >
          View source
          <ArrowUpRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
