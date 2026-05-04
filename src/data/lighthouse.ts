export interface LighthouseSummary {
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

export const lighthouseSummary = {
  "sourceReport": "reports/lighthouse-report.json",
  "requestedUrl": "http://127.0.0.1:3000/",
  "finalUrl": "http://127.0.0.1:3000/",
  "generatedAt": "2026-05-04T11:58:14.944Z",
  "formFactor": "desktop",
  "lighthouseVersion": "13.1.0",
  "scores": {
    "performance": 100,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100
  }
} as const satisfies LighthouseSummary;
