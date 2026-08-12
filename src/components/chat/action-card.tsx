import { FileText, ArrowRight } from 'lucide-react'

interface ActionCardProps {
  title: string
  actionLabel: string
}

export function ActionCard({ title, actionLabel }: ActionCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-accent/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-primary">
          <FileText className="size-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">
            Recommended action
          </p>
          <p className="mt-0.5 text-sm font-medium text-foreground text-pretty">{title}</p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {actionLabel}
        <ArrowRight className="size-4" />
      </button>
    </div>
  )
}
