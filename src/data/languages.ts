/**
 * Language skills data for CV
 * Levels follow CEFR (Common European Framework of Reference for Languages)
 */

export interface Language {
  name: string;
  level: string;           // CEFR level: A1, A2, B1, B2, C1, C2, or "Madrelingua"
  levelDescription?: string; // Optional description like "Fluente", "Intermedio"
  percentage: number;      // For visual representation (0-100)
}

export const languagesData: Language[] = [
  {
    name: 'Italiano',
    level: 'Madrelingua',
    percentage: 100,
  },
  {
    name: 'Inglese',
    level: 'B2',
    levelDescription: 'Intermedio-Avanzato',
    percentage: 75,
  },
];
