import Skills from "./components/Skills";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--secondary-background)' }} className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contacts />
    </main>
  );
}
