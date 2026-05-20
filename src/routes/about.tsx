import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/about')({
  component: OmMeg,
})

const verdier = [
  {
    tittel: 'Nysgjerrighet',
    tekst: 'Ekte filosofi begynner med vilje til å stille spørsmål ved det vi tar for gitt — inkludert egne forestillinger.',
  },
  {
    tittel: 'Respekt og trygghet',
    tekst: 'Alle samtaler er konfidensielle. Det er ingen dumme spørsmål, og ingen «riktig» måte å tenke på.',
  },
  {
    tittel: 'Praktisk visdom',
    tekst: 'Filosofi er ikke bare teori — det er et levd praksisfelt som gir konkrete verktøy for et bedre liv.',
  },
  {
    tittel: 'Helhetlig menneskesyn',
    tekst: 'Som sykepleier og filosof ser jeg hele mennesket: kropp, sjel og de spørsmålene vi bærer på.',
  },
]

const utdanning = [
  { år: '2016', grad: 'Master i filosofi', sted: 'Universitetet i Oslo' },
  { år: '2008', grad: 'Bachelorgrad i sykepleie', sted: 'Universitetet i Agder' },
  { år: '2022', grad: 'Videreutdanning i filosofisk praksis', sted: 'NFPF (Norsk Forening for Filosofisk Praksis)' },
]

function OmMeg() {
  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <section className="rise-in relative px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(197,164,122,0.24),transparent_66%)]" />
        <p className="island-kicker mb-3">Om meg</p>
        <h1 className="display-title mb-4 max-w-2xl text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Tina Marie Lie
        </h1>
        <p className="mb-4 text-lg text-[var(--sea-ink-soft)]">
          Sykepleier · Filosof · Grunnlegger av Filosamtale
        </p>
        <p className="max-w-2xl text-[var(--sea-ink-soft)] leading-relaxed">
          Jeg er bosatt i Fevik i Aust-Agder, og har jobbet med filosofisk praksis siden 2016.
          Min bakgrunn kombinerer klinisk sykepleiepraksis med akademisk filosofi — og det er nettopp
          denne kombinasjonen som preger min tilnærming til samtale og veiledning.
        </p>
      </section>

      {/* Portrait + bio */}
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-3">
        {/* Portrait */}
        <div className="lg:col-span-1">
          <div className="island-shell overflow-hidden rounded-2xl">
            <div className="flex aspect-square w-full items-end justify-center bg-[radial-gradient(ellipse_at_30%_20%,rgba(79,184,178,0.14),transparent_60%),radial-gradient(ellipse_at_70%_80%,rgba(197,164,122,0.14),transparent_60%),var(--bg-base)] p-4">
              <div className="relative flex h-full w-full items-end justify-center">
                <div className="absolute bottom-0 h-[68%] w-28 rounded-t-full bg-[var(--sand)] opacity-50" />
                <div className="absolute bottom-[66%] h-20 w-20 rounded-full bg-[var(--sand)] opacity-50" />
                <p className="relative z-10 mb-4 text-center text-xs text-[var(--sea-ink-soft)]">Profilbilde kommer snart</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H1z" />
              </svg>
              Tina Marie Lie
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M8 1a5 5 0 00-3.536 8.536L8 13.07l3.536-3.534A5 5 0 008 1zm0 7a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
              Fevik, Aust-Agder
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" className="text-[var(--lagoon)]">
                <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v1H2V3zm0 2h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" />
              </svg>
              hei@filosamtale.no
            </div>
          </div>
        </div>

        {/* Long bio */}
        <div className="space-y-6 lg:col-span-2">
          <div className="island-shell rounded-2xl p-6 sm:p-8">
            <h2 className="display-title mb-4 text-2xl font-bold text-[var(--sea-ink)]">
              Min bakgrunn
            </h2>
            <div className="space-y-4 text-[var(--sea-ink-soft)] leading-relaxed">
              <p>
                Jeg tok sykepleierutdanningen ved Universitetet i Agder og arbeidet i ti år som
                klinisk sykepleier — primært innen geriatri og palliativ omsorg. Det var i møtet
                med alvorlig syke og døende pasienter at jeg virkelig begynte å forstå hvor
                sentralt de eksistensielle spørsmålene er i menneskers liv.
              </p>
              <p>
                Pasienter ba ikke bare om smertelindring og stell. De ba om en som kunne sitte ned
                og snakke om det som egentlig plaget dem: om meningen med livet de hadde levd, om
                angsten for det ukjente, om uforløste relasjoner og uoppfylte drømmer. Medisinen
                hadde lite å tilby disse samtalene. Filosofien hadde mye.
              </p>
              <p>
                Jeg begynte å studere filosofi ved siden av jobben, og tok etter hvert en
                mastergrad ved Universitetet i Oslo med fokus på eksistensfilosofi og fenomenologi.
                I 2016 etablerte jeg Filosamtale som en selvstendig praksis i Fevik.
              </p>
              <p>
                I dag tilbyr jeg filosofisk dialog og veiledning til privatpersoner, grupper og
                helsepersonell. Jeg holder også seminarer og kurs — både lokalt i Agder og på nett.
              </p>
            </div>
          </div>

          {/* Verdier */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">Mine verdier</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {verdier.map(({ tittel, tekst }) => (
                <div key={tittel} className="island-shell rounded-xl p-4">
                  <h3 className="mb-1.5 font-semibold text-[var(--sea-ink)]">{tittel}</h3>
                  <p className="text-sm text-[var(--sea-ink-soft)] leading-relaxed">{tekst}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Utdanning */}
          <div className="island-shell rounded-2xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-[var(--sea-ink)]">Utdanning og kurs</h2>
            <ul className="space-y-3">
              {utdanning.map(({ år, grad, sted }) => (
                <li key={grad} className="flex items-start gap-4">
                  <Badge variant="secondary" className="mt-0.5 shrink-0">
                    {år}
                  </Badge>
                  <div>
                    <p className="font-medium text-[var(--sea-ink)]">{grad}</p>
                    <p className="text-sm text-[var(--sea-ink-soft)]">{sted}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button asChild>
              <Link to="/tjenester">Se tjenester og priser</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#kontakt">Ta kontakt</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

