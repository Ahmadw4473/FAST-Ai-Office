'use client'

import { useState } from 'react'
import { Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react'
import { SourceCard } from '@/components/source-card'
import { ActionCard } from '@/components/chat/action-card'
import { cn } from '@/lib/utils'
import type { Source } from '@/lib/fast-data'

export interface ChatMessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  source?: Source
  action?: { title: string; actionLabel: string }
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed text-secondary-foreground text-pretty">
          {message.content}
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Sparkles className="size-4 text-primary" />
      </span>
      <div className="min-w-0 flex-1 space-y-4">
        {/* AI answer */}
        <div className="space-y-1">
          {/* <span className="text-xs font-semibold text-primary">AI Answer</span> */}
          <p className="text-sm leading-relaxed text-foreground text-pretty">{message.content}</p>
        </div>

        {message.source && <SourceCard source={message.source} />}

        {message.action && (
          <ActionCard title={message.action.title} actionLabel={message.action.actionLabel} />
        )}

        {/* feedback */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-muted-foreground">Was this answer helpful?</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFeedback('up')}
              aria-label="Helpful"
              aria-pressed={feedback === 'up'}
              className={cn(
                'flex size-7 items-center justify-center rounded-md border transition-colors',
                feedback === 'up'
                  ? 'border-success/40 bg-success/10 text-success'
                  : 'border-border text-muted-foreground hover:bg-muted',
              )}
            >
              <ThumbsUp className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setFeedback('down')}
              aria-label="Not helpful"
              aria-pressed={feedback === 'down'}
              className={cn(
                'flex size-7 items-center justify-center rounded-md border transition-colors',
                feedback === 'down'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-muted',
              )}
            >
              <ThumbsDown className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
