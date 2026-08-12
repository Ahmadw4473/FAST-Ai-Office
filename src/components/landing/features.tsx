import { categories } from '@/lib/fast-data'

export function Features() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            Your digital FAST administration office
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            Stop searching through portals, PDFs, emails and WhatsApp groups. Ask one question and
            get a clear answer with the official source.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.id} className="group bg-card p-6 transition-colors hover:bg-muted/40">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <cat.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{cat.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
