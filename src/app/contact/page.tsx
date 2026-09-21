import Contacts from '../components/Contacts';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { buildRouteMetadata } from '@/lib/metadata';
import { it } from '@/i18n/locales/it';

export const metadata = buildRouteMetadata({
  path: '/contact',
  title: it.contact.title,
  description: it.contact.lead,
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Contacts />
      <ScrollToTop />
    </main>
  );
}
