import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Devanagari, Noto_Sans_JP, Noto_Sans_Arabic } from "next/font/google";
import { locales, isPublishedLocale, isRtl, type Locale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ConsentBanner } from "@/components/ui/ConsentBanner";

/** Root locale layout must read params for <html lang>, dir, fonts, and i18n messages. */
export const instant = false;
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  const published = isPublishedLocale(locale);

  // Middleware sets X-Robots-Tag only for draft-locale pages that are NOT
  // in the translated-route allowlist. If the header is absent and the locale
  // is not published, the page is an allowlisted translation.
  const reqHeaders = await headers();
  const robotsHeader = reqHeaders.get("x-robots-tag");
  const noindex = !published && robotsHeader?.includes("noindex");
  // For allowlisted translated pages, use the actual locale as lang.
  const htmlLang = published || (!published && !noindex) ? locale : "en";
  const rtl = (published || !noindex) && isRtl(locale as Locale);

  const fontVars = [
    cormorantGaramond.variable,
    dmSans.variable,
    (published || !noindex) && locale === "hi" ? notoDevanagari.variable : "",
    (published || !noindex) && locale === "ja" ? notoJP.variable : "",
    (published || !noindex) && locale === "ar" ? notoArabic.variable : "",
  ].filter(Boolean).join(" ");

  const useLocaleFont = published || !noindex;
  const bodyFontFamily =
    useLocaleFont && locale === "hi"
      ? "var(--font-devanagari), var(--font-dm-sans), var(--font-body)"
      : useLocaleFont && locale === "ja"
        ? "var(--font-jp), var(--font-dm-sans), var(--font-body)"
        : useLocaleFont && locale === "ar"
          ? "var(--font-arabic), var(--font-dm-sans), var(--font-body)"
          : "var(--font-dm-sans), var(--font-body)";

  return (
    <html
      lang={htmlLang}
      dir={rtl ? "rtl" : "ltr"}
      className={`${fontVars} h-full`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-4058029196087745" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4058029196087745"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPZL23HX');`}
        </Script>
      </head>
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: bodyFontFamily }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:bg-[var(--crimson-love)] focus:text-white focus:rounded focus:text-sm"
        >
          Skip to main content
        </a>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPZL23HX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ConsentBanner />
        <noscript>
          <p className="mx-auto max-w-2xl px-4 pb-8 text-sm text-center" style={{ color: "#a0a0a0" }}>
            The calculators on this site need JavaScript. All calculations run in your browser — no data is sent to any server.
          </p>
        </noscript>
      </body>
    </html>
  );
}
