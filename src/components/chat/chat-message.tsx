import type { Source } from '@/lib/fast-data'

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
      {/* <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Sparkles className="size-4 text-primary" />
      </span> */}
      <div className="min-w-0 flex-1 space-y-4">
        {/* AI answer */}
        <div className="space-y-1">
          {/* <span className="text-xs font-semibold text-primary">AI Answer</span> */}
          <FormattedMessage content={message.content} />
        </div>

        {/* {message.action && (
          <ActionCard title={message.action.title} actionLabel={message.action.actionLabel} />
        )} */}
      </div>
    </div>
  )
}

function FormattedMessage({ content }: { content: string }) {
  const blocks = content.replace(/\\n/g, '\n').split(/\n{2,}/)

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground">
      {blocks.map((block, index) => {
        const lines = block.split('\n').filter(Boolean)
        const isList = lines.every((line) => line.trim().startsWith('* '))

        if (isList) {
          return (
            <ul key={index} className="ml-5 list-disc space-y-1">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="pl-1">
                  {line.trim().replace(/^\* /, '')}
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className="text-pretty">
            {lines.join(' ')}
          </p>
        )
      })}
    </div>
  )
}
