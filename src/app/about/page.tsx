import About from '../components/About';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { buildRouteMetadata } from '@/lib/metadata';
import { it } from '@/i18n/locales/it';

export const metadata = buildRouteMetadata({
  path: '/about',
  title: it.about.title,
  description: it.about.lead,
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <About />
      <ScrollToTop />
    </main>
  );
}
