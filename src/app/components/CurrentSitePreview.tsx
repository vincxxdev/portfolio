'use client';

import { MousePointer2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';

/** A live, localized cover for the project the visitor is already using. */
const CurrentSitePreview = () => {
  const { t } = useLocale();
  const copy = t.work.currentSite;

  return (
    <div className="current-site-preview @container relative h-full overflow-clip bg-canvas">
      <div aria-hidden="true" className="bg-section-grid pointer-events-none absolute inset-0" />
      <div className="relative flex h-full flex-col p-4 @min-[320px]:p-5 @min-[480px]:p-10">
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono text-ink-2">{siteConfig.name}</span>
          <span className="label-mono flex items-center gap-2 text-ink-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-moss" />
            {copy.label}
          </span>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 py-3 @min-[480px]:py-8">
          <p className="font-display text-preview font-extrabold text-ink">
            <span className="block">{copy.title}</span>
            <span className="block text-signal-ink">{copy.emphasis}</span>
          </p>

          <div aria-hidden="true" className="relative flex h-16 w-16 shrink-0 items-center justify-center border border-hairline-strong bg-raised @min-[480px]:h-28 @min-[480px]:w-28">
            <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-signal" />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-signal" />
            <MousePointer2 strokeWidth={1.5} className="h-8 w-8 text-signal-ink @min-[480px]:h-14 @min-[480px]:w-14" />
          </div>
        </div>

        <p className="border-t border-hairline pt-2 text-xs text-ink-2 @min-[480px]:pt-5 @min-[480px]:text-base">
          {copy.description}
        </p>
      </div>
    </div>
  );
};

export default CurrentSitePreview;
