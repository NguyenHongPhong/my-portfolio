export const i18n = {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
} as const;

export type Locale = (typeof i18n)['locales'][number];
