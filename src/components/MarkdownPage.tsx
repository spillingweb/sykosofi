import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownPageProps {
  title: string
  subtitle?: string
  intro?: string
  body: string
}

export function MarkdownPage({ title, subtitle, intro, body }: MarkdownPageProps) {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="rise-in relative px-6 py-10 sm:py-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(197,164,122,0.24),transparent_66%)]" />
        <p className="island-kicker mb-3">Filosamtale</p>
        <h1 className="display-title mb-4 max-w-2xl text-4xl font-bold text-foreground sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mb-4 text-lg text-sea-ink-soft">{subtitle}</p>
        )}
        {intro && (
          <p className="max-w-2xl text-sea-ink-soft leading-relaxed">{intro}</p>
        )}
      </section>

      <div className="mx-auto max-w-4xl">
        <article className="island-shell prose prose-lg prose-slate mx-auto rounded-2xl p-6 sm:p-8 prose-headings:text-foreground prose-p:text-sea-ink-soft prose-a:text-accent prose-strong:text-foreground prose-ul:text-sea-ink-soft prose-ol:text-sea-ink-soft">
          <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
        </article>
      </div>
    </main>
  )
}
