import type { CaseStudySource } from '@/i18n/types';

// Pin evidence to the revisions inspected for the case studies. Local guidance
// and temporary research checkouts must never become public sources.
const portfolio = 'https://github.com/vincxxdev/portfolio';
const railway = 'https://github.com/vincxxdev/Railway-Simulator';
const ataxx = 'https://github.com/softeng2324-inf-uniba/progetto-cocke';
// The local branch is ahead of its remote. Cite the published revision, not
// local-only commits that would produce broken GitHub links for visitors.
const portfolioRevision = '8b86d6d232b152e4d03ca848011378ecdba80a89';
const railwayRevision = 'f80a6ac6cc2fdd67e5d439ee53f28d41e7ae7a4e';
const ataxxRevision = '9227b8279b1765a43edf307652d09c903a732a7e';

function file(repo: string, revision: string, path: string, label: string): CaseStudySource {
  return { label, href: `${repo}/blob/${revision}/${path}` };
}

export const caseStudySources = {
  navigation: [
    { label: 'App Router · redesign', href: `${portfolio}/commit/835a24a` },
    file(portfolio, portfolioRevision, 'src/lib/projects.ts', 'projects.ts'),
    file(portfolio, portfolioRevision, 'src/lib/metadata.ts', 'metadata.ts'),
  ],
  rendering: [
    file(portfolio, portfolioRevision, 'src/app/components/Loader.tsx', 'Loader.tsx'),
    file(portfolio, portfolioRevision, 'src/app/components/motion.ts', 'motion.ts'),
    file(portfolio, portfolioRevision, 'src/app/components/hooks/usePauseOffscreen.ts', 'usePauseOffscreen.ts'),
  ],
  content: [
    file(portfolio, portfolioRevision, 'src/i18n/LocaleProvider.tsx', 'LocaleProvider.tsx'),
    file(portfolio, portfolioRevision, 'src/lib/generateCV.ts', 'generateCV.ts'),
    { label: 'CV · layout', href: `${portfolio}/commit/8b86d6d` },
  ],
  railwayState: [
    file(railway, railwayRevision, 'src/app.js', 'app.js'),
    file(railway, railwayRevision, 'src/services/platform.service.js', 'platform.service.js'),
    file(railway, railwayRevision, 'src/services/trainRoute.service.js', 'trainRoute.service.js'),
  ],
  railwaySync: [
    file(railway, railwayRevision, 'Arduino/Sensori/SensoriStazione.ino', 'SensoriStazione.ino'),
    { ...file(railway, railwayRevision, 'README.md', 'FlexSim · Process Flow'), href: `${railway}/blob/${railwayRevision}/README.md#322-process-flow-task-executer` },
  ],
  railwayFeedback: [
    file(railway, railwayRevision, 'Arduino/Display%20binari/BinarioLCD.ino', 'BinarioLCD.ino'),
    file(railway, railwayRevision, 'tests/integration/api/train.api.test.js', 'train.api.test.js'),
    file(railway, railwayRevision, 'tests/unit/services/platform.service.test.js', 'platform.service.test.js'),
  ],
  railwayPersonalBackend: [
    { label: '0a0e670 · SQL', href: `${railway}/commit/0a0e670` },
    { label: 'fd0b323 · Train service', href: `${railway}/commit/fd0b323` },
    { label: 'ef59541 · Platform assignment', href: `${railway}/commit/ef59541` },
  ],
  railwayPersonalIntegration: [
    { label: '1918c57 · Platform state', href: `${railway}/commit/1918c57` },
    { label: '48ecfe5 · Process Flow', href: `${railway}/commit/48ecfe5` },
    { label: '8a7b21f · FlexSim', href: `${railway}/commit/8a7b21f` },
  ],
  railwayPersonalTests: [
    { label: 'fd0b323 · Unit tests', href: `${railway}/commit/fd0b323` },
    { label: '98d7714 · API tests', href: `${railway}/commit/98d7714` },
    { label: 'ef59541 · Platform tests', href: `${railway}/commit/ef59541` },
  ],
  ataxxRules: [
    file(ataxx, ataxxRevision, 'docs/Report.md', 'Report · Entity-Control-Boundary'),
    file(ataxx, ataxxRevision, 'src/main/java/it/uniba/app/controller/GameController.java', 'GameController.java'),
    file(ataxx, ataxxRevision, 'src/main/java/it/uniba/app/model/Move.java', 'Move.java'),
  ],
  ataxxProcess: [
    file(ataxx, ataxxRevision, 'docs/Report.md', 'Report · Scrum'),
    { label: 'Fix · fine gioco / endgame', href: `${ataxx}/commit/082857a` },
    { label: 'Fix · mosse / moves', href: `${ataxx}/commit/6819fc4` },
  ],
  ataxxChecks: [
    file(ataxx, ataxxRevision, 'build.gradle', 'build.gradle · JUnit 5'),
    file(ataxx, ataxxRevision, '.github/workflows/gradle_build.yml', 'GitHub Actions · Gradle'),
    file(ataxx, ataxxRevision, 'Dockerfile', 'Dockerfile'),
  ],
  ataxxPersonalRules: [
    { label: 'PR #107 · Packages', href: `${ataxx}/pull/107` },
    { label: 'cd4c3ae · Move input', href: `${ataxx}/commit/cd4c3ae` },
    { label: '96b7d07 · movePiece', href: `${ataxx}/commit/96b7d07` },
    { label: '3d6a484 · Jump', href: `${ataxx}/commit/3d6a484` },
  ],
  ataxxPersonalProcess: [
    { label: '288ea41 · Merge PR #222', href: `${ataxx}/commit/288ea41` },
    { label: 'a629be8 · UML report', href: `${ataxx}/commit/a629be8` },
  ],
  ataxxPersonalTests: [
    { label: 'c2c42eb · Color / Message tests', href: `${ataxx}/commit/c2c42eb` },
    { label: '0fa47ab · Controller tests', href: `${ataxx}/commit/0fa47ab` },
    { label: 'cfff49f · Test input', href: `${ataxx}/commit/cfff49f` },
  ],
};
