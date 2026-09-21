'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { registerIn } from '../motion';

interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  description?: string;
  highlighted?: boolean;
  status?: string;
}

const Timeline = ({ entries }: { entries: TimelineEntry[] }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ol className="mt-8">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative pb-6 pl-9 last:pb-0 sm:pl-12">
          {/* Each segment runs from this marker's centre to the next one's.
              The rail stays fixed; only the content has an entrance motion. */}
          {index < entries.length - 1 && (
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 left-2 top-7 w-0.5 -translate-x-1/2 bg-hairline-strong" />
          )}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-5 flex h-4 w-4 items-center justify-center border bg-canvas ${entry.highlighted ? 'border-signal' : 'border-hairline-strong'}`}
          >
            <span className={`h-1.5 w-1.5 ${entry.highlighted ? 'bg-signal' : 'bg-ink-3'}`} />
          </span>

          <motion.div
            {...registerIn(!!shouldReduceMotion, 8, index * 0.05)}
            className="grid min-w-0 gap-3 border-t border-hairline py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
          >
            <div className="flex min-w-0 flex-wrap items-start gap-2 sm:flex-col sm:gap-3">
              <span className={`font-mono text-xs leading-relaxed tabular-nums ${entry.highlighted ? 'text-signal-ink' : 'text-ink-3'}`}>
                {entry.period}
              </span>
              {entry.status && (
                <span className="label-mono inline-flex items-center gap-2 text-moss">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-moss" />
                  {entry.status}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-lg text-ink sm:text-xl">{entry.title}</h3>
              <p className="mt-1 text-sm font-medium text-ink-2">{entry.organization}</p>
              {entry.description && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">{entry.description}</p>
              )}
            </div>
          </motion.div>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
