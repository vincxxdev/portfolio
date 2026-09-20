import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    "id": 1,
    "slug": "personal-portfolio",
    "title": "Portfolio Personale",
    "description": "Portfolio bilingue con percorsi dedicati ai progetti, CV generato nel browser e audit Lighthouse pubblicati. Costruito con Next.js e TypeScript.",
    "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    "githubLink": "https://github.com/vincxxdev/portfolio",
    "liveDemo": "https://vincxx.dev",
    "animationType": "portfolio",
    "previewImage": "/images/og-image.png",
    "isCurrentSite": true
  },
  {
    "id": 2,
    "slug": "railway-simulator",
    "title": "Railway Simulator",
    "description": "Una stazione ferroviaria collega Arduino e FlexSim attraverso API Express e PostgreSQL, condividendo posizioni dei treni, binari e passaggi a livello.",
    "technologies": ["Node.js", "Express", "PostgreSQL", "FlexSim", "Arduino", "Git", "GitHub"],
    "githubLink": "https://github.com/vincxxdev/Railway-Simulator",
    "animationType": "railway",
    "previewImage": "/images/railway-simulator-preview.png"
  },
  {
    "id": 3,
    "slug": "ataxx",
    "title": "Ataxx",
    "description": "Ataxx da terminale in Java: regole organizzate con il pattern ECB, test JUnit e sviluppo in team attraverso tre sprint Scrum.",
    "technologies": ["Java", "JUnit", "Git", "GitHub"],
    "githubLink": "https://github.com/softeng2324-inf-uniba/progetto-cocke",
    "animationType": "ataxx",
    "previewImage": "/images/ataxx-preview.png"
  },
];
