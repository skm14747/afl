export const locales = ["en", "es", "fr", "de", "pt", "hi", "it", "ja", "id", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  hi: "हिन्दी",
  it: "Italiano",
  ja: "日本語",
  id: "Bahasa Indonesia",
  ar: "العربية",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

/** Publication status per locale. Only "published" locales are indexed. */
export type PublicationStatus = "draft" | "in-review" | "published";

export const localePublicationStatus: Record<Locale, PublicationStatus> = {
  en: "published",
  es: "published",
  fr: "published",
  de: "published",
  pt: "published",
  hi: "published",
  it: "published",
  ja: "published",
  id: "published",
  ar: "published",
};
