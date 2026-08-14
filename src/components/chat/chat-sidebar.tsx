'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, LogOut, MessageSquare, Pencil, Plus, ShieldCheck, Trash2, X } from 'lucide-react'
import { FastLogo } from '@/components/fast-logo'
import { cn } from '@/lib/utils'

export interface ChatListItem {
  id: string
  title: string
  preview?: string
}

interface ChatSidebarProps {
  activeId?: string | null
  chats: ChatListItem[]
  userEmail?: string | null
  onSelect?: (id: string) => void
  onNewChat?: () => void
  onRename?: (id: string, title: string) => void
  onDelete?: (id: string) => void
  onSignOut?: () => void
}

export function ChatSidebar({
  activeId,
  chats,
  userEmail,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  onSignOut,
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftTitle, setDraftTitle] = useState('')

  function startRename(chat: ChatListItem) {
    setEditingId(chat.id)
    setDraftTitle(chat.title)
  }

  function saveRename() {
    if (!editingId) return
    const title = draftTitle.trim()
    if (title) onRename?.(editingId, title)
    setEditingId(null)
  }

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
          {chats.map((chat) => {
            const isActive = chat.id === activeId
            const isEditing = chat.id === editingId

            return (
              <li key={chat.id}>
                <div
                  className={cn(
                    'group flex w-full items-start gap-2.5 rounded-md px-2 py-2 transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-white'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white',
                  )}
                >
                  {/* <MessageSquare
                    className={cn(
                      'mt-0.5 size-4 shrink-0',
                      isActive ? 'text-primary' : 'text-sidebar-foreground/40',
                    )}
                  /> */}
                  {isEditing ? (
                    <div className="min-w-0 flex-1">
                      <input
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') saveRename()
                          if (event.key === 'Escape') setEditingId(null)
                        }}
                        className="h-7 w-full rounded-md border border-sidebar-border bg-sidebar px-2 text-sm text-white outline-none focus:border-primary/60"
                        autoFocus
                      />
                      <div className="mt-1 flex gap-1">
                        <button type="button" onClick={saveRename} aria-label="Save title">
                          <Check className="size-4 text-success" />
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} aria-label="Cancel rename">
                          <X className="size-4 text-sidebar-foreground/50" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => onSelect?.(chat.id)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <span className="block truncate text-sm font-medium">{chat.title}</span>
                        {chat.preview && (
                          <span className="block truncate text-xs text-sidebar-foreground/40">
                            {chat.preview}
                          </span>
                        )}
                      </button>
                      <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button type="button" onClick={() => startRename(chat)} aria-label="Rename chat">
                          <Pencil className="size-3.5 text-sidebar-foreground/50 hover:text-white" />
                        </button>
                        <button type="button" onClick={() => onDelete?.(chat.id)} aria-label="Delete chat">
                          <Trash2 className="size-3.5 text-sidebar-foreground/50 hover:text-destructive" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent font-mono text-sm font-semibold text-white">
            {userEmail?.slice(0, 2).toUpperCase() || 'FA'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{userEmail || 'FAST-NUCES'}</p>
            {/* <p className="flex items-center gap-1 text-xs text-success">
              <ShieldCheck className="size-3" />
              Authenticated
            </p> */}
          </div>
          <button type="button" onClick={onSignOut} aria-label="Sign out">
            <LogOut className="size-4 text-sidebar-foreground/50 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
