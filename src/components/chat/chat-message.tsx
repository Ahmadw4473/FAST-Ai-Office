import type { Source } from '@/lib/fast-data'
import ReactMarkdown from 'react-markdown';
export interface ChatMessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  source?: Source
  action?: { title: string; actionLabel: string }
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
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

      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-1">
          <ReactMarkdown
            components={{
              strong: ({ children }) => (
                <strong className="font-bold">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul className="list-disc ml-6 my-3">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal ml-6 my-3">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="mb-1">
                  {children}
                </li>
              ),

              p: ({ children }) => (
                <p className="mb-3">
                  {children}
                </p>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}