import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Devanagari, Noto_Sans_JP, Noto_Sans_Arabic } from "next/font/google";
import { locales, isRtl, type Locale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const rtl = isRtl(locale as Locale);

  const fontVars = [
    cormorantGaramond.variable,
    dmSans.variable,
    notoDevanagari.variable,
    notoJP.variable,
    notoArabic.variable,
  ].join(" ");

  const bodyFontFamily =
    locale === "hi"
      ? "var(--font-devanagari), var(--font-dm-sans), var(--font-body)"
      : locale === "ja"
        ? "var(--font-jp), var(--font-dm-sans), var(--font-body)"
        : locale === "ar"
          ? "var(--font-arabic), var(--font-dm-sans), var(--font-body)"
          : "var(--font-dm-sans), var(--font-body)";

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${fontVars} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: bodyFontFamily }}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
