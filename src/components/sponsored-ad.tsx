import { Laptop, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SponsoredAdProps {
  className?: string
}

/**
 * Sponsored advertisement — deliberately styled to look distinct from official
 * FAST information. Clearly labelled "Sponsored" and never presented as a
 * university announcement or recommendation.
 */
export function SponsoredAd({ className }: SponsoredAdProps) {
  return (
    <aside
      aria-label="Sponsored advertisement"
      className={cn(
        'rounded-lg border border-dashed border-border bg-muted/40 p-4',
        className,
      )}
    >
      <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        Sponsored
      </span>
      <div className="mt-2.5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
          <Laptop className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Student discount on laptops</p>
          <p className="text-xs text-muted-foreground">XYZ Computers</p>
          <p className="mt-1 text-xs text-foreground">15% FAST student discount</p>
        </div>
      </div>
      <button
        type="button"
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
      >
        Learn More
        <ArrowUpRight className="size-3.5" />
      </button>
      <p className="mt-2 text-[10px] leading-tight text-muted-foreground">
        Not affiliated with or endorsed by FAST-NUCES.
      </p>
    </aside>
  )
}
