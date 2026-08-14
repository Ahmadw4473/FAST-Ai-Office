'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, Home, MessageSquare, User, X } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { ChatSidebar, type ChatListItem } from '@/components/chat/chat-sidebar'
import { ChatMessage, type ChatMessageData } from '@/components/chat/chat-message'
import { ChatInput } from '@/components/chat/chat-input'
import { categories } from '@/lib/fast-data'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface StoredMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

async function fetchChatResponse(userMessage: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: userMessage }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || 'Unable to get a response right now.')
  }

  const data = await response.json()
  const answer = typeof data.answer === 'string' ? data.answer.trim() : ''

  if (!answer) {
    throw new Error('The chat service returned an empty answer. Please try again.')
  }

  return answer
}

function titleFromMessage(message: string) {
  return message.length > 42 ? `${message.slice(0, 39)}...` : message
}

export default function ChatPage() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [chats, setChats] = useState<ChatListItem[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessageData[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const isEmpty = messages.length === 0

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/login')
        return
      }

      setSession(data.session)
      loadChats(data.session.user.id)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!nextSession) router.replace('/login')
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [router])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function loadChats(userId: string) {
    setLoading(true)
    const { data, error } = await supabase
      .from('chats')
      .select('id,title,messages(content,created_at)')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (!error && data) {
      setChats(
        data.map((chat) => ({
          id: chat.id,
          title: chat.title,
          preview: chat.messages?.[0]?.content,
        })),
      )
    }
    setLoading(false)
  }

  async function loadMessages(chatId: string) {
    setActiveChatId(chatId)
    setSidebarOpen(false)

    const { data, error } = await supabase
      .from('messages')
      .select('id,role,content')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setMessages(
        (data as StoredMessage[]).map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
        })),
      )
    }
  }

  async function createChat(firstMessage: string) {
    if (!session) throw new Error('Please sign in again.')

    const title = titleFromMessage(firstMessage)
    const { data, error } = await supabase
      .from('chats')
      .insert({ user_id: session.user.id, title })
      .select('id,title')
      .single()

    if (error) throw error
    const chat = { id: data.id, title: data.title, preview: firstMessage }
    setChats((prev) => [chat, ...prev])
    setActiveChatId(data.id)
    return data.id
  }

  async function saveMessage(chatId: string, role: 'user' | 'assistant', content: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({ chat_id: chatId, role, content })
      .select('id')
      .single()

    if (error) throw error
    await supabase.from('chats').update({ updated_at: new Date().toISOString() }).eq('id', chatId)
    return data.id as string
  }

  async function handleSend(value: string) {
    const chatId = activeChatId || (await createChat(value))
    const tempUserId = `u-${Date.now()}`
    setMessages((prev) => [...prev, { id: tempUserId, role: 'user', content: value }])
    setChats((prev) =>
      prev.map((chat) => (chat.id === chatId ? { ...chat, preview: value } : chat)),
    )

    try {
      const userId = await saveMessage(chatId, 'user', value)
      setMessages((prev) => prev.map((m) => (m.id === tempUserId ? { ...m, id: userId } : m)))

      const response = await fetchChatResponse(value)
      const tempAssistantId = `a-${Date.now()}`
      setMessages((prev) => [...prev, { id: tempAssistantId, role: 'assistant', content: response }])
      saveMessage(chatId, 'assistant', response)
        .then((assistantId) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempAssistantId ? { ...m, id: assistantId } : m)),
          )
        })
        .catch((saveError) => {
          console.error('Unable to save assistant message', saveError)
        })
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'I could not reach the FAST AI Office service right now. Please try again.',
        },
      ])
    }
  }

  function handleNewChat() {
    setActiveChatId(null)
    setMessages([])
    setSidebarOpen(false)
  }

  async function handleRename(id: string, title: string) {
    setChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, title } : chat)))
    await supabase.from('chats').update({ title }).eq('id', id)
  }

  async function handleDelete(id: string) {
    await supabase.from('chats').delete().eq('id', id)
    setChats((prev) => prev.filter((chat) => chat.id !== id))
    if (id === activeChatId) handleNewChat()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning.'
    if (h < 18) return 'Good afternoon.'
    return 'Good evening.'
  })()

  const sidebar = (
    <ChatSidebar
      activeId={activeChatId}
      chats={chats}
      userEmail={session?.user.email}
      onNewChat={handleNewChat}
      onSelect={loadMessages}
      onRename={handleRename}
      onDelete={handleDelete}
      onSignOut={handleSignOut}
    />
  )

  if (loading) {
    return <div className="flex h-dvh items-center justify-center bg-background text-sm">Loading chats...</div>
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border md:block">{sidebar}</aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%]">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="absolute -right-10 top-3 flex size-8 items-center justify-center rounded-md bg-background text-foreground"
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
            {isEmpty ? (
              <div className="flex min-h-[70vh] flex-col justify-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                  {greeting}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">How can I help you?</p>
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
              </div>
            ) : (
              <div className="space-y-8">
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-border bg-background px-4 pb-3 pt-3 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <ChatInput onSend={handleSend} />
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              FAST AI Office can make mistakes. Verify critical details with the administration office.
            </p>
          </div>
        </div>

        <nav className="flex shrink-0 items-center justify-around border-t border-border bg-background pb-1 md:hidden" aria-label="Mobile navigation">
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
