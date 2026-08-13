'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { X, Home, MessageSquare, Bookmark, User } from 'lucide-react'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { ChatMessage, type ChatMessageData } from '@/components/chat/chat-message'
import { ChatInput } from '@/components/chat/chat-input'
import { categories } from '@/lib/fast-data'
import { cn } from '@/lib/utils'

const seededConversation: ChatMessageData[] = [
  {
    id: 's1',
    role: 'user',
    content: 'Can I withdraw from CS301 after midterms?',
  },
  {
    id: 's2',
    role: 'assistant',
    content:
      'According to FAST-NUCES academic regulations, course withdrawal is subject to the university\u2019s specified withdrawal deadline and applicable approval requirements. Withdrawing from CS301 after midterms is possible provided you are still within the withdrawal window and obtain the required approvals.',
    source: {
      document: 'Undergraduate Academic Rules & Regulations',
      edition: 'June 2026',
      section: 'Section 4.2',
      page: 'Page 37',
    },
    action: {
      title: 'Need to start the withdrawal process?',
      actionLabel: 'Open Withdrawal Form',
    },
  },
]
async function fetchChatResponse(userMessage: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: userMessage,
    }),
  })

  if (!response.ok) {
    throw new Error('Unable to get a response right now.')
  }

  const data = await response.json()
  return data.answer
}

async function buildAssistantReply(question: string): Promise<ChatMessageData> {
  const response = await fetchChatResponse(question)
  return {
    id: `a-${Date.now()}`,
    role: 'assistant',
    content: response,
    source: {
      document: 'Undergraduate Academic Rules & Regulations',
      edition: 'June 2026',
      section: 'Section 4.2',
      page: 'Page 37',
    },
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageData[]>(seededConversation)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isEmpty = messages.length === 0

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handleSend(value: string) {
    const userMsg: ChatMessageData = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: value,
    }

    setMessages((prev) => [...prev, userMsg])

    try {
      const assistantReply = await buildAssistantReply(value)
      setMessages((prev) => [...prev, assistantReply])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: 'I could not reach the FAST AI Office service right now. Please try again.',
        },
      ])
    }
  }

  function handleNewChat() {
    setMessages([])
    setSidebarOpen(false)
  }

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning.'
    if (h < 18) return 'Good afternoon.'
    return 'Good evening.'
  })()

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border md:block">
        <ChatSidebar onNewChat={handleNewChat} onSelect={() => setMessages(seededConversation)} />
      </aside>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%]">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="absolute -right-10 top-3 flex size-8 items-center justify-center rounded-md bg-background text-foreground"
            >
              <X className="size-5" />
            </button>
            <ChatSidebar
              onNewChat={handleNewChat}
              onSelect={() => {
                setMessages(seededConversation)
                setSidebarOpen(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        {/* <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground md:hidden"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-foreground">AI Office</span>
            <span className="mt-0.5 text-[11px] text-muted-foreground">FAST-NUCES</span>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
            <ShieldCheck className="size-3" />
            Verified
          </span>
        </header> */}

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
            {isEmpty ? (
              <div className="flex min-h-[70vh] flex-col justify-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                  {greeting}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  How can I help you?
                </p>

                <div className="mt-8">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Quick categories
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSend(`Tell me about ${cat.label} at FAST.`)}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                      >
                        <cat.icon className="size-4 text-primary" />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* <SponsoredAd className="mt-8 max-w-sm" /> */}
              </div>
            ) : (
              <div className="space-y-8">
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
                {/* <SponsoredAd className="max-w-sm" /> */}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-border bg-background px-4 pb-3 pt-3 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <ChatInput onSend={handleSend} />
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              FAST AI Office can make mistakes. Verify critical details with the administration
              office.
            </p>
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <nav
          className="flex shrink-0 items-center justify-around border-t border-border bg-background pb-1 md:hidden"
          aria-label="Mobile navigation"
        >
          {[
            { icon: Home, label: 'Home', href: '/', active: false },
            { icon: MessageSquare, label: 'Chats', href: '/chat', active: true },
            { icon: Bookmark, label: 'Saved', href: '/chat', active: false },
            { icon: User, label: 'Profile', href: '/login', active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium',
                item.active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
