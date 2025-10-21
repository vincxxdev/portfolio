import Skills from "../components/Skills";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Experience from "../components/Experience";
import Contacts from "../components/Contacts";
import AnimatedSection from "../components/ui/AnimatedSection";
import { ScrollToTop } from "../components/ui/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-secondary-background text-primary-text">
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
      <Footer />
    </>
  );
}
