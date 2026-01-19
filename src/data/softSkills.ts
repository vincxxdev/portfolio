/**
 * Soft skills data for CV
 * These complement technical skills and are important for employers
 */

export interface SoftSkill {
  name: string;
  description?: string;
}

export const softSkillsData: SoftSkill[] = [
  {
    name: 'Problem Solving',
    description: 'Capacità di analizzare e risolvere problemi complessi',
  },
  {
    name: 'Team Working',
    description: 'Collaborazione efficace in team di sviluppo',
  },
  {
    name: 'Comunicazione Efficace',
    description: 'Abilità nel comunicare idee tecniche in modo chiaro',
  },
  {
    name: 'Apprendimento Continuo',
    description: 'Motivazione costante nell\'acquisire nuove competenze',
  },
  {
    name: 'Gestione del Tempo',
    description: 'Organizzazione efficiente delle attività e rispetto delle scadenze',
  },
  {
    name: 'Adattabilità',
    description: 'Flessibilità nell\'affrontare nuove sfide e cambiamenti',
  },
];
