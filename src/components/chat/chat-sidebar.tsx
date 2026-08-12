'use client'

import Link from 'next/link'
import { Plus, MessageSquare, ShieldCheck } from 'lucide-react'
import { FastLogo } from '@/components/fast-logo'
import { recentConversations } from '@/lib/fast-data'
import { cn } from '@/lib/utils'

interface ChatSidebarProps {
  activeId?: string
  onSelect?: (id: string) => void
  onNewChat?: () => void
}

export function ChatSidebar({ activeId = '2', onSelect, onNewChat }: ChatSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center px-4 py-4">
        <Link href="/" aria-label="FAST AI Office home">
          <FastLogo onDark showDescriptor={false} />
        </Link>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New Chat
        </button>
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto px-3" aria-label="Recent conversations">
        <p className="px-2 pb-2 text-[11px] font-semibold tracking-wide text-sidebar-foreground/40 uppercase">
          Recent
        </p>
        <ul className="space-y-0.5">
          {recentConversations.map((conv) => (
            <li key={conv.id}>
              <button
                type="button"
                onClick={() => onSelect?.(conv.id)}
                className={cn(
                  'flex w-full items-start gap-2.5 rounded-md px-2 py-2 text-left transition-colors',
                  conv.id === activeId
                    ? 'bg-sidebar-accent text-white'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white',
                )}
              >
                <MessageSquare
                  className={cn(
                    'mt-0.5 size-4 shrink-0',
                    conv.id === activeId ? 'text-primary' : 'text-sidebar-foreground/40',
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{conv.title}</span>
                  <span className="block truncate text-xs text-sidebar-foreground/40">
                    {conv.preview}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent font-mono text-sm font-semibold text-white">
            AR
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">FAST-NUCES</p>
            <p className="flex items-center gap-1 text-xs text-success">
              <ShieldCheck className="size-3" />
              Verified student
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
