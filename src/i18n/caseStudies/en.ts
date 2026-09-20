import type { ReasoningDiagram } from '@/i18n/types';
import { caseStudySources as sources } from '@/data/caseStudySources';

export const caseStudies: Record<number, ReasoningDiagram> = {
  1: {
    objective: {
      title: 'Show what I can build, and how I work.',
      description: 'A bilingual portfolio that grows with the projects: clear paths, maintainable content and a recognisable visual identity.',
    },
    decisions: [
      {
        id: 'navigation',
        constraint: 'Projects, background and contact information competed on a single page.',
        title: 'A path for each visitor intent',
        reason: 'Moving from a single page to App Router separates project browsing, background and contact. Each case study gets a stable slug and its own metadata.',
        tradeoff: 'More pages require deliberate connections: consistent navigation, a return to the index and a next-project link.',
        evidence: 'The history records the move to multiple routes; shared helpers centralise slugs and metadata assigns a canonical URL to each route.',
        effect: 'Each project has a direct link and a dedicated reading path.',
        sources: sources.navigation,
      },
      {
        id: 'rendering',
        constraint: 'Visual identity has to coexist with reading speed and accessibility.',
        title: 'Content first, movement second',
        reason: 'The loader mounts the page immediately beneath the intro. Reveals move text without making it transparent; effects respect reduced motion and pause outside the viewport.',
        tradeoff: 'Animation has a clear budget: no mandatory wait before reading, and every effect needs a reduced-motion version.',
        evidence: 'Loader, registerIn and usePauseOffscreen expose these choices in code. The Lighthouse report supplies the scores published in the footer.',
        effect: 'Content is readable from the initial HTML, including with reduced motion.',
        sources: sources.rendering,
      },
      {
        id: 'content',
        constraint: 'Two languages and a PDF résumé increase the content to maintain.',
        title: 'Typed content, separate UI',
        reason: 'Data files and IT/EN dictionaries keep copy outside components. jsPDF generates the résumé in the browser using the active language.',
        tradeoff: 'The i18n system stays small, but translations and the résumé’s subset of content need explicit maintenance: types check structure, not equivalence between texts.',
        evidence: 'LocaleProvider manages language; generateCV reads t.cvData. A later redesign moves the résumé to a single column with dates in a dedicated gutter.',
        effect: 'The site and download share a language, with content updates outside components.',
        sources: sources.content,
      },
    ],
    outcome: {
      title: 'The portfolio also demonstrates the working method.',
      description: 'Routing, rendering and content support the same experience. The project keeps evolving through inspectable changes, a résumé generated in the browser and audits published in the footer.',
    },
  },
  2: {
    objective: {
      title: 'Connect a physical station to its digital model.',
      description: 'Arduino detects events; FlexSim represents the trains. Between them, positions, platforms and level crossings need shared state.',
    },
    contribution: {
      summary: 'I designed the data schema and built the Express backend, platform assignment and Jest/Supertest tests. I also documented the APIs and Process Flows and contributed to the FlexSim model.',
      team: 'My teammate developed the Arduino firmware; we both contributed to the FlexSim model.',
    },
    decisions: [
      {
        id: 'state',
        constraint: 'Hardware and simulation need to read the same information.',
        title: 'Coordinate state through APIs and a database',
        reason: 'An Express application exposes REST endpoints and separate services for trains, stations, routes and platforms. PostgreSQL stores the relationships; a service finds an available platform at the destination station.',
        tradeoff: 'The backend becomes a central dependency that must stay available. Choosing the first free platform is a simple rule, not a railway optimisation system.',
        evidence: 'app.js mounts the /api/v1 routes. Platform and route services implement available-platform lookup, assignment and release.',
        effect: 'Assignments and platform occupancy go through the same backend.',
        sources: sources.railwayState,
        contribution: {
          description: 'I defined the SQL schema, built backend services and endpoints, and implemented lookup and assignment of the first available platform for a train’s route stop.',
          sources: sources.railwayPersonalBackend,
        },
      },
      {
        id: 'synchronization',
        constraint: 'The physical position can drift from the position shown in the model.',
        title: 'Detect, poll, realign',
        reason: 'Arduino Nano sends position and crossing state over HTTP. FlexSim polls the server and realigns its AGV to the latest detected position; it waits for the barrier to close before advancing.',
        tradeoff: 'Polling is straightforward to integrate, but introduces delay and repeated requests. Reading frequently does not guarantee instantaneous synchronisation.',
        evidence: 'The sketch sends PUT requests to the APIs. The documented Process Flow compares positions and uses Teleport mode to correct the difference.',
        effect: 'Physical events guide the simulation’s progress.',
        sources: sources.railwaySync,
        contribution: {
          description: 'I implemented platform occupancy updates when route state changes, documented the Process Flows and contributed to the FlexSim model, including passengers at the second station.',
          sources: sources.railwayPersonalIntegration,
        },
      },
      {
        id: 'feedback',
        constraint: 'The integration must also provide feedback on the physical bench.',
        title: 'Close the loop with displays and tests',
        reason: 'The Nano reads platform state and passes it over serial to an Arduino UNO. The UNO updates an LCD and a servo. Jest and Supertest check services and endpoints separately.',
        tradeoff: 'Software tests alone cannot demonstrate that sensors, wiring and the 3D model work together: checking the complete loop also requires the hardware bench.',
        evidence: 'BinarioLCD.ino manages serial input, the LCD and the servo. The repository includes unit tests and API tests requiring a dedicated test database.',
        effect: 'State returns to the physical world as information and movement.',
        sources: sources.railwayFeedback,
        contribution: {
          description: 'I wrote service unit tests and API integration tests, including level crossings and platform assignment. My teammate wrote the Arduino code for the LCD and servo.',
          sources: sources.railwayPersonalTests,
        },
      },
    ],
    outcome: {
      title: 'A complete loop between events, state and representation.',
      description: 'The university prototype connects firmware, a backend and a FlexSim model: from train detection to the simulated position, through to the display and barrier. The central work is defining how different systems exchange information.',
    },
  },
  3: {
    objective: {
      title: 'Turn the rules of Ataxx into a game built as a team.',
      description: 'A Java terminal application: moves, captures and turns must remain consistent while the team delivers features in iterations.',
    },
    contribution: {
      summary: 'I reorganised the code into packages, implemented move input and execution, including jumps, wrote Color and Message tests and extended GameController tests. I merged pull requests and added class diagrams to the report.',
      team: 'Several team members developed the model, controller, interface and documentation. A teammate created the initial GameControllerTest structure; my commits extend its test cases.',
    },
    decisions: [
      {
        id: 'rules',
        constraint: 'Text commands and board rules have different responsibilities.',
        title: 'Separate entities, control and interface',
        reason: 'Entity-Control-Boundary separates Game, Field and Move from input/output classes. GameController coordinates move validation, board updates and captures.',
        tradeoff: 'The controller remains the coordination point and also calls output methods: the separation organises code without removing every interface dependency.',
        evidence: 'The report specifies ECB. Move calculates distance; GameController distinguishes duplication from movement and checks the involved squares.',
        effect: 'Rules have identifiable objects and responsibilities that can be tested.',
        sources: sources.ataxxRules,
        contribution: {
          description: 'I separated the code into model, controller, views and utils packages, implemented reading move coordinates and built movePiece, extending it to handle two-square jumps.',
          sources: sources.ataxxPersonalRules,
        },
      },
      {
        id: 'process',
        constraint: 'Several people need to integrate changes while keeping track of the work.',
        title: 'Deliver through sprints and reviews',
        reason: 'The team organises work into three sprints with planning, progress meetings and a GitHub board. Issues and pull requests connect tasks to changes; retrospectives document the process.',
        tradeoff: 'Coordination, reviews and documentation take time beyond implementing the game rules.',
        evidence: 'The report describes sprints and the board. The final changes fix endgame behaviour and empty-move output, making the finishing work visible too.',
        effect: 'Features and fixes leave a shared, inspectable history.',
        sources: sources.ataxxProcess,
        contribution: {
          description: 'I merged pull requests into the main branch, including the controller tests, and added and organised class diagrams in the report. These changes document my integration and documentation work within the team.',
          sources: sources.ataxxPersonalProcess,
        },
      },
      {
        id: 'verification',
        constraint: 'The delivered game needs to be verifiable and runnable elsewhere.',
        title: 'Repeat checks and prepare delivery',
        reason: 'JUnit 5 checks the classes; Gradle runs tests and static analysis and produces an executable JAR. GitHub Actions starts a build for pull requests changing src; the Dockerfile prepares the runtime environment.',
        tradeoff: 'Checkstyle, PMD and SpotBugs use ignoreFailures: their findings need review and do not automatically block the build.',
        evidence: 'build.gradle configures JUnit and the fat JAR. The workflow builds with JDK 19; the Dockerfile runs the resulting JAR. Test suites are collected in src/test.',
        effect: 'Delivery includes code, repeatable checks and instructions to run it.',
        sources: sources.ataxxChecks,
        contribution: {
          description: 'I wrote Color and Message tests and extended GameControllerTest, checking invalid moves and confirmation before abandoning a game. I added setTestCommand to supply controlled input during tests.',
          sources: sources.ataxxPersonalTests,
        },
      },
    ],
    outcome: {
      title: 'A game with a readable development process.',
      description: 'The repository brings together a terminal application, tests, design diagrams and a team report. Its history shows both feature development and fixes before delivery.',
    },
  },
};
