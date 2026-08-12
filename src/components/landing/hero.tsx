import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatPreview } from '@/components/landing/chat-preview'

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            FAST-NUCES Student Assistant
          </span> */}

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Your FAST. <span className="text-primary">One Conversation.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Get instant answers about academics, fees, exams, policies, deadlines and student
            services backed by official FAST sources.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-6 text-[15px]"
              nativeButton={false}
              render={<Link href="/chat" />}
            >
              Ask FAST AI
              <ArrowRight className="size-4" />
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-[15px]"
              nativeButton={false}
              render={<Link href="#how-it-works" />}
            >
              How it works
            </Button> */}
          </div>

          {/* <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex size-4 items-center justify-center rounded-full bg-success/15">
              <ShieldCheck className="size-2.5 text-success" />
            </span>
            Answers cite the exact official document, section and page.
          </p> */}
        </div>

        <div className="md:pl-4">
          <ChatPreview />
        </div>
      </div>
    </section>
  )
}
