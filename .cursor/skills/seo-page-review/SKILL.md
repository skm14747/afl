---
name: seo-page-review
description: Audits an AstrologyForLove page for indexability, metadata, content, keyword targeting, and accessibility. Use when reviewing SEO for a specific page, checking sitemap, robots, canonical URLs, or evaluating a love-astrology page's search readiness.
---

# SEO page review — AstrologyForLove

## When to use

Use this for one URL or a small set of related pages on AstrologyForLove (astrologyforlove.com). Do not claim a ranking you did not measure.

## Inputs

- Path or paths, such as `/` or `/compatibility`
- The target market, if known (default: Global English, with US, UK, and India English as priority)

## Steps

1. Read the route's `page.tsx` and any `layout.tsx` on that segment. Homepage metadata lives in `src/app/layout.tsx`.
2. If they exist, read `src/app/sitemap.ts`, `src/app/robots.ts`, and `seo/keyword-clusters.json`.
3. **Metadata check:** title (max 60 characters), description (150–160 characters), canonical, Open Graph title and description.
4. **Keyword alignment:** The title should lead with the phrase a person would search: zodiac compatibility, love astrology, soulmate, marriage astrology, Venus sign, Moon sign, or relationship compatibility. Match `seo/keyword-clusters.json` when that file exists.
5. **On-page content:** One visible `<h1>`. The opening copy answers the query in the first sentences. No false claims about calculations, data sources, or user counts.
6. **Internal links:** Related pages, nav, and footer links resolve to real routes.
7. **Structured data:** If JSON-LD is present, it matches visible content. No fabricated `AggregateRating`, `Review`, or author fields.
8. **Sitemap and robots:** When `sitemap.ts` or `robots.ts` exists, confirm the route is listed and is not blocked.
9. **Accessibility:** `lang` on `<html>`, labelled inputs, and image `alt`. Decorative marks such as `CosmicSymbol` may stay `aria-hidden`.

## Brand and topic fit

AstrologyForLove is a premium love and relationship astrology site: zodiac compatibility, soulmate discovery, marriage astrology, Venus and Moon interpretations, and relationship insights. Tagline: "Written in the Stars. Felt in the Heart."

Copy should sound editorial and specific. Flag generic horoscope filler, keyword stuffing, and claims the page does not support.

## Verification

Reproduce a finding from a file path or a page you opened. After an approved fix, re-read the changed route.

## Deliverable

Findings with severity, evidence, location, and a proposed fix:

- **Blocker:** indexable duplicate, wrong canonical, missing from sitemap, false claim
- **High:** missing substantive intro, broken internal link, invalid structured data
- **Medium:** weak title, weak keyword targeting, heading skip, thin content
- **Note:** market opportunity, unverified ranking

Fix only the issues the task approves.
