import Skills from "./components/Skills";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Contacts from "./components/Contacts";
import AnimatedSection from "./components/ui/AnimatedSection";
import { ScrollToTop } from "./components/ui/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary-background text-primary-text">
      <Hero />
      <div className="h-8 bg-gradient-to-b from-primary-background to-secondary-background" />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Experience />
      </AnimatedSection>
      <AnimatedSection>
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Certifications />
      </AnimatedSection>
      <AnimatedSection>
        <Contacts />
      </AnimatedSection>
      <ScrollToTop />
    </main>
  );
}
