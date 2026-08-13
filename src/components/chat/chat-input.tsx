'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import { ArrowUp, Paperclip } from 'lucide-react'

interface ChatInputProps {
  onSend: (value: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-primary/40">
      <button
        type="button"
        aria-label="Attach a file"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {/* <Paperclip className="size-4.5" /> */}
      </button>
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          e.target.style.height = 'auto'
          e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about FAST..."
        className="max-h-40 flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="button"
        onClick={submit}
        disabled={!value.trim()}
        aria-label="Send message"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
      >
        <ArrowUp className="size-4.5" />
      </button>
    </div>
  )
}
