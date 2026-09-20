import { ArrowDown, ArrowUpRight, Check, ChevronDown } from 'lucide-react';

import type { CaseStudySource, ReasoningDiagram as Diagram, Translations } from '@/i18n/types';
import styles from './ReasoningDiagram.module.css';

type DiagramLabels = Translations['work']['caseStudy']['diagram'];

const Connector = () => (
  <div aria-hidden="true" className="flex h-8 shrink-0 items-center justify-center text-signal-ink">
    <ArrowDown className="h-5 w-5" />
  </div>
);

const SourceLinks = ({ sources }: { sources: CaseStudySource[] }) => (
  <ul className="mt-2 space-y-1" role="list">
    {sources.map((source) => (
      <li key={source.href}>
        <a href={source.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm text-signal-ink underline underline-offset-4">
          <span className="min-w-0 break-words">{source.label}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </li>
    ))}
  </ul>
);

/** Native disclosures keep the complete argument in the prerendered HTML and
 * remain operable without hydration. Branches are parallel decisions, each
 * following the same constraint → choice → effect sequence in DOM order. */
export default function ReasoningDiagram({
  diagram,
  labels,
}: {
  diagram: Diagram;
  labels: DiagramLabels;
}) {
  return (
    <section className="relative border-t border-hairline bg-sunken py-12 sm:py-16" aria-labelledby="reasoning-title">
      <div aria-hidden="true" className="bg-section-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="label-mono text-signal-ink">{labels.eyebrow}</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 id="reasoning-title" className="text-3xl text-ink sm:text-4xl">{labels.title}</h2>
          <p className="max-w-md text-sm leading-relaxed text-ink-2">{labels.description}</p>
        </div>

        <figure className="mt-10" aria-labelledby="reasoning-title" aria-describedby="reasoning-note">
          <div className="relative border border-hairline border-l-2 border-l-signal bg-raised p-5 sm:p-6">
            <p className="label-mono text-signal-ink">{labels.objective}</p>
            <p className="mt-3 max-w-3xl font-display text-xl font-bold text-ink sm:text-2xl">{diagram.objective.title}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-2">{diagram.objective.description}</p>
            {diagram.contribution && (
              <dl className="mt-6 grid gap-6 border-t border-hairline pt-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                <div>
                  <dt className="label-mono text-signal-ink">{labels.contribution}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ink">{diagram.contribution.summary}</dd>
                </div>
                <div>
                  <dt className="label-mono text-ink-3">{labels.team}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ink-2">{diagram.contribution.team}</dd>
                </div>
              </dl>
            )}
          </div>

          <div className={styles.trunk} aria-hidden="true" />

          <ol className={styles.branches} role="list">
            {diagram.decisions.map((decision, index) => (
              <li key={decision.id} className={styles.branch}>
                <div className="border border-hairline bg-canvas p-5">
                  <p className="label-mono text-ink-3">{labels.constraint}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{decision.constraint}</p>
                </div>

                <Connector />

                <details className="group/decision self-start border border-signal bg-raised">
                  <summary className="list-none p-5 marker:content-none hover:bg-canvas lg:min-h-44 [&::-webkit-details-marker]:hidden">
                    <span className="label-mono flex items-center justify-between gap-3 text-signal-ink">
                      <span>{labels.decision} {String(index + 1).padStart(2, '0')}</span>
                      <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-(--dur-2) ease-(--ease-snap) group-open/decision:rotate-180" />
                    </span>
                    <h3 className="mt-3 text-lg leading-snug text-ink">{decision.title}</h3>
                    <span className="mt-4 block text-sm text-signal-ink underline underline-offset-4">
                      <span className="group-open/decision:hidden">{labels.expand}</span>
                      <span className="hidden group-open/decision:inline">{labels.collapse}</span>
                    </span>
                  </summary>

                  <div className="border-t border-hairline p-5">
                    {decision.contribution && (
                      <div className="mb-6 border-b border-hairline pb-5">
                        <p className="label-mono text-signal-ink">{labels.contribution}</p>
                        <p className="mt-3 text-sm leading-relaxed text-ink">{decision.contribution.description}</p>
                        <SourceLinks sources={decision.contribution.sources} />
                      </div>
                    )}
                    <dl className="space-y-5 text-sm leading-relaxed">
                      {[
                        [labels.reason, decision.reason],
                        [labels.tradeoff, decision.tradeoff],
                        [labels.evidence, decision.evidence],
                      ].map(([label, description]) => (
                        <div key={label}>
                          <dt className="font-medium text-ink">{label}</dt>
                          <dd className="mt-1.5 text-ink-2">{description}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="label-mono mt-6 text-ink-3">{labels.sources}</p>
                    <SourceLinks sources={decision.sources} />
                  </div>
                </details>

                <Connector />

                <div className="border border-hairline bg-canvas p-5">
                  <p className="label-mono flex items-center gap-2 text-ink-3">
                    <Check className="h-3.5 w-3.5 text-signal-ink" aria-hidden="true" />
                    {labels.effect}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{decision.effect}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.trunk} aria-hidden="true" />

          <div className="border border-hairline border-l-2 border-l-signal bg-raised p-5 sm:p-6">
            <p className="label-mono text-signal-ink">{labels.outcome}</p>
            <h3 className="mt-3 max-w-3xl text-xl text-ink sm:text-2xl">{diagram.outcome.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-2">{diagram.outcome.description}</p>
          </div>

          <figcaption id="reasoning-note" className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-3">{labels.note}</figcaption>
        </figure>
      </div>
    </section>
  );
}
