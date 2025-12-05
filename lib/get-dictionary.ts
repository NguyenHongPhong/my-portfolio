//a helper to load the translation file
import "server-only";
import { Locale } from "../i18n-config";

export async function getDictionary(locale: Locale) {
    return import(`../locales/${locale}.json`).then((module) => module.default);
}
