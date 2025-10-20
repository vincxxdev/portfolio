import Skills from "./components/Skills";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";
import AnimatedSection from "./components/ui/AnimatedSection";
import { ScrollToTop } from "./components/ui/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary-background">
      <Hero />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Experience />
      </AnimatedSection>
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Contacts />
      </AnimatedSection>
      <ScrollToTop />
    </main>
  );
}
