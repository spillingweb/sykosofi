import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { sendKontaktskjema } from '#/server/kontakt'
import { useTina, tinaField } from 'tinacms/dist/react'

interface FooterProps {
  initialData: any
}

export default function Footer({ initialData }: FooterProps) {
  const year = new Date().getFullYear()
  const send = useServerFn(sendKontaktskjema)

  // Enable live preview for contact info
  const { data } = useTina({
    query: initialData.query,
    variables: initialData.variables,
    data: initialData.data,
  })
  
  const page = data.pages
  
  // Type guard: ensure we have kontakt template
  if (page.__typename !== 'PagesKontakt') {
    throw new Error('Expected kontakt template for kontakt-info.md')
  }

  const [form, setForm] = useState({ navn: '', epost: '', telefon: '', melding: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'feil'>('idle')
  const [feilmelding, setFeilmelding] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setFeilmelding('')
    try {
      const result = await send({ data: form })
      if (result.ok) {
        setStatus('ok')
        setForm({ navn: '', epost: '', telefon: '', melding: '' })
      } else {
        setStatus('feil')
        setFeilmelding(result.feilmelding ?? 'Noe gikk galt.')
      }
    } catch {
      setStatus('feil')
      setFeilmelding('Noe gikk galt. Vennligst pr├©v igjen.')
    }
  }

  return (
    <footer id="kontakt" className="site-footer mt-24 px-4 pb-16 pt-14">
      <div className="page-wrap">
        {/* Contact section */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: info */}
          <div>
            <p className="island-kicker mb-3" data-tina-field={tinaField(page, 'kicker')}>
              {page.kicker}
            </p>
            <h2 
              className="display-title mb-4 text-3xl font-bold text-foreground sm:text-4xl"
              data-tina-field={tinaField(page, 'heading')}
            >
              {page.heading}
            </h2>
            <p 
              className="mb-8 max-w-md text-sea-ink-soft leading-relaxed"
              data-tina-field={tinaField(page, 'description')}
            >
              {page.description}
            </p>

            <div className="space-y-4 text-sm text-sea-ink-soft">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" className="mt-0.5 shrink-0 text-accent">
                  <path d="M10 11a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
                  <path d="M10 2C6.686 2 4 4.686 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">Adresse</p>
                  <p data-tina-field={tinaField(page, 'addressLine1')}>{page.addressLine1}</p>
                  <p data-tina-field={tinaField(page, 'addressLine2')}>{page.addressLine2}</p>
                  {page.addressLine3 && (
                    <p data-tina-field={tinaField(page, 'addressLine3')}>{page.addressLine3}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" className="mt-0.5 shrink-0 text-accent">
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">E-post</p>
                  <a 
                    href={`mailto:${page.email}`}
                    className="hover:text-lagoon-deep"
                    data-tina-field={tinaField(page, 'email')}
                  >
                    {page.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" className="mt-0.5 shrink-0 text-accent">
                  <path d="M2 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.23 1.02L6.8 9.32a11.05 11.05 0 005.88 5.88l1.32-1.32a1 1 0 011.02-.23l3.3 1.1A1 1 0 0119 15.72V18a2 2 0 01-2 2h-1C7.16 20 0 12.84 0 4V3a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">Telefon</p>
                  <a 
                    href={`tel:${page.phone}`}
                    className="hover:text-lagoon-deep"
                    data-tina-field={tinaField(page, 'phone')}
                  >
                    {page.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="island-shell rounded-2xl p-6 sm:p-8">
            {status === 'ok' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <svg viewBox="0 0 20 20" width="28" height="28" fill="none">
                    <path d="M4 10l5 5 7-8" stroke="var(--palm)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Meldingen er sendt!</h3>
                <p className="text-sea-ink-soft">
                  Takk for din henvendelse. Jeg svarer deg innen to virkedager.
                </p>
                <Button variant="outline" onClick={() => setStatus('idle')}>
                  Send ny melding
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="navn">Navn *</Label>
                    <Input
                      id="navn"
                      placeholder="Ditt fulle navn"
                      value={form.navn}
                      onChange={(e) => setForm({ ...form, navn: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="epost">E-post *</Label>
                    <Input
                      id="epost"
                      type="email"
                      placeholder="din@epost.no"
                      value={form.epost}
                      onChange={(e) => setForm({ ...form, epost: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="telefon">Telefon</Label>
                  <Input
                    id="telefon"
                    type="tel"
                    placeholder="+47 000 00 000 (valgfritt)"
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="melding">Melding *</Label>
                  <Textarea
                    id="melding"
                    rows={5}
                    placeholder="Fortell gjerne hva du lurer p├Ñ, eller hva du ├©nsker hjelp til..."
                    value={form.melding}
                    onChange={(e) => setForm({ ...form, melding: e.target.value })}
                    required
                  />
                </div>

                {status === 'feil' && (
                  <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {feilmelding}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'SenderÔÇª' : 'Send melding'}
                </Button>
                <p className="text-center text-xs text-sea-ink-soft">
                  Informasjonen din behandles konfidensielt.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-semibold text-foreground">Filosamtale</span>
              <span className="text-sea-ink-soft">ÔÇö</span>
              <span className="text-sm text-sea-ink-soft">Fevik, Agder</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-sea-ink-soft">
              <Link to="/om-meg" className="hover:text-foreground">Om meg</Link>
              <Link to="/tjenester" className="hover:text-foreground">Tjenester</Link>
              <Link to="/blogg" className="hover:text-foreground">Blogg</Link>
              <Link to="/arrangementer" className="hover:text-foreground">Arrangementer</Link>
            </nav>
            <p className="text-sm text-sea-ink-soft">
              &copy; {year} Spilling Web. Alle rettigheter forbeholdt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

