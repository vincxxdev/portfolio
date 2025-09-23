import Skills from "./components/Skills";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--secondary-background)' }} className="min-h-screen">
      <Hero />
      <Skills />
    </main>
  );
}
