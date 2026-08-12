import { cn } from '@/lib/utils'

interface FastLogoProps {
  className?: string
  /** Render on a dark surface (e.g. the sidebar) */
  onDark?: boolean
  /** Show the "AI Office" descriptor next to the mark */
  showDescriptor?: boolean
}

/**
 * FAST AI Office product wordmark.
 * This is the student-built product's own mark — not the official FAST-NUCES logo.
 */
export function FastLogo({ className, onDark = false, showDescriptor = true }: FastLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-[13px] font-bold tracking-tight text-primary-foreground"
      >
        F
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[15px] font-bold tracking-tight',
            onDark ? 'text-white' : 'text-foreground',
          )}
        >
          FAST <span className="text-primary">AI</span> Office
        </span>
        {showDescriptor && (
          <span
            className={cn(
              'mt-0.5 text-[10px] font-medium tracking-wide uppercase',
              onDark ? 'text-white/50' : 'text-muted-foreground',
            )}
          >
            FAST-NUCES Assistant
          </span>
        )}
      </span>
    </span>
  )
}
