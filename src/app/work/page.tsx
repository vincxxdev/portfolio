import Work from '../components/Work';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { buildRouteMetadata } from '@/lib/metadata';
import { it } from '@/i18n/locales/it';

export const metadata = buildRouteMetadata({
  path: '/work',
  title: it.work.title,
  description: it.work.lead,
});

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Work />
      <ScrollToTop />
    </main>
  );
}
