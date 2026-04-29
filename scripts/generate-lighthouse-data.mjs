import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const reportPath = resolve(process.argv[2] ?? 'reports/lighthouse-report.json');
const outputPath = resolve(process.argv[3] ?? 'src/data/lighthouse.ts');

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

const toScore = (category, name) => {
  if (!category || typeof category.score !== 'number') {
    throw new Error(`Missing Lighthouse category score: ${name}`);
  }

  return Math.round(category.score * 100);
};

const report = await readJson(reportPath);
const categories = report.categories ?? {};
const configSettings = report.configSettings ?? {};

const summary = {
  sourceReport: reportPath.replace(`${process.cwd()}/`, ''),
  requestedUrl: report.requestedUrl ?? '',
  finalUrl: report.finalDisplayedUrl ?? report.finalUrl ?? report.requestedUrl ?? '',
  generatedAt: report.fetchTime ?? new Date().toISOString(),
  formFactor: configSettings.formFactor ?? configSettings.emulatedFormFactor ?? 'desktop',
  lighthouseVersion: report.lighthouseVersion ?? '',
  scores: {
    performance: toScore(categories.performance, 'performance'),
    accessibility: toScore(categories.accessibility, 'accessibility'),
    bestPractices: toScore(categories['best-practices'], 'best-practices'),
    seo: toScore(categories.seo, 'seo'),
  },
};

const contents = `export interface LighthouseSummary {
  sourceReport: string;
  requestedUrl: string;
  finalUrl: string;
  generatedAt: string;
  formFactor: string;
  lighthouseVersion: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

export const lighthouseSummary = ${JSON.stringify(summary, null, 2)} as const satisfies LighthouseSummary;
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, contents);

console.log(`Generated ${outputPath} from ${reportPath}`);
