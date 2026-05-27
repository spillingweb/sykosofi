import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { client } from "../../tina/__generated__/client";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Route = createFileRoute("/om-meg")({
  loader: async () => {
    const [pageResult, utdanningResult] = await Promise.all([
      client.queries.pages({ relativePath: "om-meg.md" }),
      client.queries.utdanningConnection({ sort: 'ar' }),
    ]);
    return {
      page: pageResult,
      utdanning: utdanningResult,
    };
  },
  component: OmMeg,
});

function OmMeg() {
  const initialData = Route.useLoaderData();
  
  // Enable live preview when editing in TinaCMS
  const { data: pageData } = useTina({
    query: initialData.page.query,
    variables: initialData.page.variables,
    data: initialData.page.data,
  });
  
  const { data: utdanningData } = useTina({
    query: initialData.utdanning.query,
    variables: initialData.utdanning.variables,
    data: initialData.utdanning.data,
  });
  
  const page = pageData.pages;
  
  // Type guard: ensure we have standard template
  if (page.__typename !== 'PagesStandard') {
    throw new Error('Expected standard template for om-meg.md')
  }
  
  // Extract utdanning from connection
  const utdanningList = (utdanningData.utdanningConnection.edges || [])
    .map(edge => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null)
    .sort((a, b) => {
      const yearA = parseInt(a.ar || '0', 10);
      const yearB = parseInt(b.ar || '0', 10);
      return yearA - yearB;
    });

  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          Om meg
        </p>
        <h1 
          className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl"
          data-tina-field={tinaField(page, 'title')}
        >
          {page.title}
        </h1>
        {page.subtitle && (
          <p 
            className="mx-auto mb-4 max-w-2xl text-lg text-sea-ink-soft"
            data-tina-field={tinaField(page, 'subtitle')}
          >
            {page.subtitle}
          </p>
        )}
        {page.intro && (
          <p 
            className="mx-auto max-w-3xl text-sea-ink-soft leading-relaxed"
            data-tina-field={tinaField(page, 'intro')}
          >
            {page.intro}
          </p>
        )}
      </div>

      {/* Portrait + bio */}
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-3">
        {/* Portrait */}
        <div className="lg:col-span-1">
          <div className="island-shell overflow-hidden rounded-2xl">
            <img
              src={page.profileImage || '/uploads/profile.jpg'}
              alt={`${page.title} - Sykepleier og filosof`}
              className="aspect-square w-full object-cover"
              data-tina-field={tinaField(page, 'profileImage')}
            />
          </div>

          <div className="mt-5 space-y-2 rounded-xl bg-muted/40 p-4 text-sm text-sea-ink-soft">
            {page.contactName && (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="shrink-0 text-accent"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM1.5 14a6.5 6.5 0 0113 0H1.5z" />
                </svg>
                <span data-tina-field={tinaField(page, 'contactName')}>{page.contactName}</span>
              </div>
            )}
            {page.contactLocation && (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="shrink-0 text-accent"
                >
                  <path d="M8 1a5 5 0 00-3.536 8.536L8 13.07l3.536-3.534A5 5 0 008 1zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                <span data-tina-field={tinaField(page, 'contactLocation')}>{page.contactLocation}</span>
              </div>
            )}
            {page.contactEmail && (
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="shrink-0 text-accent"
                >
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zm-.034 6.876l-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 002 13h12a1 1 0 00.966-.741z" />
                </svg>
                <span data-tina-field={tinaField(page, 'contactEmail')}>{page.contactEmail}</span>
              </div>
            )}
          </div>
        </div>

        {/* Long bio */}
        <div className="space-y-6 lg:col-span-2">
          <div 
            className="island-shell rounded-2xl p-6 sm:p-8"
            data-tina-field={tinaField(page, 'body')}
          >
            <div className="prose max-w-none prose-headings:text-foreground prose-h2:display-title prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h3:mb-2 prose-h3:font-semibold prose-p:mb-4 prose-p:text-sea-ink-soft prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-li:text-sea-ink-soft prose-strong:font-semibold prose-strong:text-foreground">
              {page.body && <TinaMarkdown content={page.body} />}
            </div>
          </div>

          {/* Verdier */}
          {page.verdier && page.verdier.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Mine verdier
              </h2>
              <div className="grid gap-3 sm:grid-cols-2" data-tina-field={tinaField(page, 'verdier')}>
                {page.verdier
                  .filter((verdi): verdi is NonNullable<typeof verdi> => verdi !== null)
                  .map((verdi, idx) => (
                    <div key={idx} className="island-shell rounded-xl p-5">
                      <h3 
                        className="mb-2 font-semibold text-foreground"
                        data-tina-field={tinaField(verdi, 'tittel')}
                      >
                        {verdi.tittel}
                      </h3>
                      <p 
                        className="text-sm text-sea-ink-soft leading-relaxed"
                        data-tina-field={tinaField(verdi, 'tekst')}
                      >
                        {verdi.tekst}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Utdanning */}
          <div className="island-shell rounded-2xl p-6">
            <h2 className="mb-5 text-xl font-semibold text-foreground">
              Utdanning og kurs
            </h2>
            <ul className="space-y-4">
              {utdanningList.map((item) => (
                <li key={item.id} className="flex items-start gap-4">
                  <Badge variant="secondary" className="mt-0.5 shrink-0" data-tina-field={tinaField(item, 'ar')}>
                    {item.ar}
                  </Badge>
                  <div>
                    <p className="font-medium text-foreground" data-tina-field={tinaField(item, 'grad')}>
                      {item.grad}
                    </p>
                    <p className="text-sm text-sea-ink-soft" data-tina-field={tinaField(item, 'sted')}>
                      {item.sted}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
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
  );
}
