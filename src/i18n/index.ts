export type { Locale, Translations } from './types';
export { it } from './locales/it';
export { en } from './locales/en';
export { LocaleProvider, useLocale } from './LocaleProvider';

export const defaultLocale: import('./types').Locale = 'it';
export const locales: import('./types').Locale[] = ['it', 'en'];
