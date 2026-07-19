import Hero from './components/Hero';
import LandingStatus from './components/LandingStatus';
import LandingPaths from './components/LandingPaths';
import SelectedWork from './components/SelectedWork';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { routeAlternates } from '@/lib/metadata';

// Alternates only: the branded title/description from defaultMetadata is the
// one CLAUDE.md says branded queries rank on, so it must not be overridden.
export const metadata = {
  alternates: routeAlternates(''),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Hero />
      <LandingStatus />
      <LandingPaths />
      <SelectedWork />
      <ScrollToTop />
    </main>
  );
}
