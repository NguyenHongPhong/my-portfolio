import { Locale, i18n } from "../i18n-config";

export async function getDictionary(locale: Locale) {
    if (!locale || !i18n.locales.includes(locale)) locale = "en";
    return import(`../locales/${locale}.json`).then((module) => module.default);
}
