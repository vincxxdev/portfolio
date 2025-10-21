export const projectsDataTranslations = {
  it: [
    {
      id: 1,
      title: "Portfolio Personale",
      description: "Portfolio personale moderno e responsivo costruito con Next.js 15, TypeScript e Tailwind CSS. Include animazioni fluide, tema dark/light, e architettura scalabile.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      githubLink: "https://github.com/vincxxdev/portfolio",
      liveDemo: "https://vincxx.dev",
      animationType: "portfolio" as const,
      previewImage: "/images/portfolio-preview.svg"
    },
    {
      id: 2,
      title: "Railway Simulator",
      description: "Progetto realizzato in gruppo con un collega universitario. Backend in Node.js (Express) e frontend in FlexSim. Simula una stazione ferroviaria interagendo via Arduino.",
      technologies: ["Node.js", "Express", "FlexSim", "Arduino", "Git", "GitHub"],
      githubLink: "https://github.com/zeltarave/Railway-Simulator",
      liveDemo: undefined,
      animationType: "railway" as const,
      previewImage: "/images/railway-simulator-preview.png"
    },
    {
      id: 3,
      title: "Ataxx",
      description: "Progetto universitario in gruppo per la realizzazione del gioco Ataxx in Java usando la tecnica di sviluppo Agile Scrum.",
      technologies: ["Java", "JUnit", "Git", "GitHub"],
      githubLink: "https://github.com/softeng2324-inf-uniba/progetto-cocke",
      liveDemo: undefined,
      animationType: "ataxx" as const,
      previewImage: "/images/ataxx-preview.png"
    },
  ],
  en: [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "Modern and responsive personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark/light theme, and scalable architecture.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      githubLink: "https://github.com/vincxxdev/portfolio",
      liveDemo: "https://vincxx.dev",
      animationType: "portfolio" as const,
      previewImage: "/images/portfolio-preview.svg"
    },
    {
      id: 2,
      title: "Railway Simulator",
      description: "Group project developed with a university colleague. Node.js (Express) backend and FlexSim frontend. Simulates a railway station interacting via Arduino.",
      technologies: ["Node.js", "Express", "FlexSim", "Arduino", "Git", "GitHub"],
      githubLink: "https://github.com/zeltarave/Railway-Simulator",
      liveDemo: undefined,
      animationType: "railway" as const,
      previewImage: "/images/railway-simulator-preview.png"
    },
    {
      id: 3,
      title: "Ataxx",
      description: "University group project for the implementation of the Ataxx game in Java using the Agile Scrum development technique.",
      technologies: ["Java", "JUnit", "Git", "GitHub"],
      githubLink: "https://github.com/softeng2324-inf-uniba/progetto-cocke",
      liveDemo: undefined,
      animationType: "ataxx" as const,
      previewImage: "/images/ataxx-preview.png"
    },
  ],
} as const;
