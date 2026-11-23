---
name: seo-audit
description: Runs a comprehensive AstrologyForLove SEO audit across technical, content, schema, performance, AI search, on-page, accessibility, and international readiness. Use for a full-site SEO audit, technical SEO review, schema audit, AI search readiness check, E-E-A-T review, GEO assessment, or international SEO review.
---

# SEO audit — AstrologyForLove

## When to use

Use this skill for a comprehensive multi-category SEO audit of the full site or a subset of pages. For a quick single-page review, use `seo-page-review` instead.

Triggers: "SEO audit", "full site SEO", "technical SEO", "schema audit", "AI search readiness", "E-E-A-T review", "GEO assessment", "SEO health check", "international SEO".

## Relationship to seo-page-review

`seo-page-review` checks one or a few URLs for indexability, metadata, and content. This skill is a scored audit across eight categories. Prefer this one when the request is broad.

## Inputs

- **Target:** URL, localhost port, or "all pages" (default). "All pages" means every route under `src/app/` that renders a page, plus static routes listed in `src/app/sitemap.ts` when that file exists.
- **Scope:** full audit (all categories) or a specific category (A through H below).
- **Live server:** whether a dev or production server is running. If not, skip curl and browser checks and note them as "requires live deployment to confirm".

## Reference files (read, never modify during audit)

Read these when they exist. Do not treat a missing future file as a passed check.

- `src/app/layout.tsx` — site metadata, title, description, `lang`
- `src/app/page.tsx` and other `page.tsx` routes — on-page content and headings
- `src/app/sitemap.ts` — sitemap entries, when present
- `src/app/robots.ts` — crawl rules, when present
- `src/components/` — shared nav, footer, and SEO components, when present
- `seo/keyword-clusters.json` — keyword research, when present
- `seo/content-map.md` — content strategy, when present
- `next.config.ts` — headers, redirects, env, when present

Brand context: AstrologyForLove (astrologyforlove.com). Premium love astrology, zodiac compatibility, soulmate discovery, marriage astrology, Venus and Moon sign interpretations, and relationship insights. Tagline: "Written in the Stars. Felt in the Heart."

## Audit categories

### Category A — Technical SEO (weight: 20%)

1. **Crawlability.** Check for unintentional `noindex`. Confirm robots rules do not block indexable pages.
2. **Sitemap completeness.** If `src/app/sitemap.ts` exists, compare it with real routes. If it does not exist, flag that as a finding once there is more than the homepage.
3. **Canonical URLs.** Confirm each indexable page sets `alternates.canonical` to the production URL on `https://astrologyforlove.com`.
4. **Duplicate paths.** Confirm no two routes resolve to the same content.
5. **Internal links.** Confirm nav, footer, and in-content links point at real routes.
6. **HTTPS.** Confirm the public site URL is `https://astrologyforlove.com`.
7. **Mobile viewport.** Check `src/app/layout.tsx` for a viewport export or meta viewport.

### Category B — Content quality / E-E-A-T (weight: 20%)

1. **Unique titles.** Each indexable page has its own title. Homepage title lives in `src/app/layout.tsx` until a route overrides it.
2. **Unique meta descriptions.** No two pages share a description.
3. **Single h1.** Each page renders exactly one `<h1>`.
4. **Substantive intro.** Tool and guide pages open with a direct answer, not a slogan alone.
5. **Server-rendered content.** Primary copy is in server components, not hidden behind client-only render.
6. **No false claims.** Calculations, ephemeris sources, and user or review counts match the code. Do not invent proof.
7. **Topic fit.** Pages stay on love, compatibility, soulmate, marriage, Venus, Moon, and relationship astrology. Flag generic horoscope filler.

### Category C — Schema / structured data (weight: 10%)

1. **JSON-LD present where it helps.** Article, FAQ, BreadcrumbList, or WebApplication only when the page actually is that thing.
2. **Valid types.** Note that Google retired `FAQPage` rich results for most sites in May 2026. Flag it if the only goal was a rich result.
3. **Content-schema match.** Structured data matches visible content.
4. **No fabricated markup.** No `AggregateRating`, `Review`, or fake `author` fields.

### Category D — Performance (weight: 10%)

1. **Build output.** When a build is in scope, run `npm run build` and flag routes above 150 kB First Load JS.
2. **Images.** Check `next/image` usage and `alt` attributes.
3. **Fonts.** Confirm `next/font` usage in `src/app/layout.tsx` (Cormorant Garamond and DM Sans) and that weights are limited.

### Category E — AI search readiness / GEO (weight: 10%)

1. **AI bot access.** Check robots for blocks of GPTBot, Anthropic, or similar that would also hide the site from AI answers. Keep Googlebot allowed.
2. **Quotable content.** Opening paragraphs and headings state a direct answer.
3. **Extractable identity.** Visible copy and any JSON-LD name the product, the page topic, and who it is for.

### Category F — On-page SEO (weight: 15%)

1. **Internal linking.** Money pages (compatibility, soulmate, marriage, sign guides) are linked from the homepage, nav, or footer once those pages exist.
2. **URL structure.** Clean paths such as `/compatibility`, `/soulmate`, `/venus-sign`. No query-string duplicates.
3. **Open Graph.** Title, description, and URL are set. Add an OG image when a branded asset exists.
4. **hreflang.** Add `alternates.languages` only when a real translated URL exists. Do not emit hreflang for languages that have no page.
5. **Breadcrumbs.** If breadcrumbs are visible, their JSON-LD matches them.

### Category G — Accessibility (weight: 5%)

1. **Language attribute.** Confirm `<html lang="en">` in `src/app/layout.tsx`.
2. **Labelled inputs.** Tool controls use `aria-label` or `<label>`.
3. **Image alt text.** Content images have `alt`. Decorative symbols may be `aria-hidden`.
4. **Focus indicators.** Interactive controls have a visible focus style. Accent for focus is champagne gold (`--champagne-gold: #D8AF79`) on the cosmic navy and ivory surfaces in `src/styles/tokens.css`.

### Category H — International readiness (weight: 10%)

AstrologyForLove is an English-first international brand. Do not require Hindi or Vedic-only coverage.

1. **English keyword targeting.** Priority queries are love astrology, zodiac compatibility, soulmate astrology, marriage astrology, Venus sign, and Moon sign compatibility for US, UK, Canada, Australia, and India English.
2. **Market clarity.** A page states who it is for when the advice depends on a tradition (Western tropical versus Vedic sidereal). Do not mix the two without saying so.
3. **Localization.** If `src/lib/i18n/` appears later, every indexable locale needs its own title, description, and canonical or hreflang pair. Missing locale files are a gap only after a locale is in scope.
4. **Content gaps.** Cross-reference `seo/keyword-clusters.json` when it exists. Flag missing pages for high-intent compatibility and relationship queries.

## Scoring methodology

Score each category 0–100 based on the fraction of checks that pass. A check that cannot be performed because the site has not built that surface yet is "not scored", not a pass.

```
overall = (A * 0.20) + (B * 0.20) + (C * 0.10) + (D * 0.10) + (E * 0.10) + (F * 0.15) + (G * 0.05) + (H * 0.10)
```

Omit a category from the weighted total when every check in it was "not scored", and renormalize the remaining weights.

### Severity levels

- **Critical:** blocks indexing or causes duplicate content
- **High:** impacts rankings or user trust
- **Medium:** optimization opportunity
- **Low:** nice-to-have or a later market expansion

## Verification rules

1. Do not claim Lighthouse scores, Core Web Vitals, or Search Console metrics unless you ran the tool.
2. Do not fabricate traffic numbers, ranking positions, or indexing status.
3. Mark each finding as "Verified from source", "Verified from build", "Verified from curl", or "Requires live deployment".
4. Do not treat a check as passed unless you performed it in this session.

## Deliverable

Save a Markdown report to `seo/audit-YYYY-MM-DD.md` with:

- Summary table (overall score, pages audited, issues by severity)
- Category scores table (A–H with weights)
- Findings by severity (Critical, then High, Medium, Low)
- Each finding: Issue, Evidence, Verification method, Fix, Confirm fix
- Checks not performed, with reasons

Fix only the issues the task approves.
