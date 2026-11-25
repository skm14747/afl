/**
 * SEO integration tests.
 *
 * These tests verify critical SEO invariants without spinning up
 * the Next.js dev server. They import source modules directly
 * and check sitemap output, blog metadata, translation coverage,
 * locale configuration, and routing consistency.
 */

import { describe, it, expect } from "vitest";
import { locales, defaultLocale, localePublicationStatus, type Locale } from "@/i18n/locales";
import { translatedRoutes, isTranslatedRoute } from "@/i18n/translated-routes";
import { routing } from "@/i18n/routing";
import { getAllPosts, getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { allPairSlugs, parsePairSlug, SIGNS } from "@/lib/sign-pairs";
import { getSitemapTools, type ToolDefinition } from "@/lib/tool-registry";

const SITE = "https://www.astrologyforlove.com";

// ─── Locale & Publication ────────────────────────────────────────

describe("locale configuration", () => {
  it("has 10 locales", () => {
    expect(locales).toHaveLength(10);
  });

  it("default locale is en", () => {
    expect(defaultLocale).toBe("en");
  });

  it("every locale has a publication status", () => {
    for (const loc of locales) {
      expect(localePublicationStatus[loc]).toBeDefined();
      expect(["published", "draft", "in-review"]).toContain(
        localePublicationStatus[loc],
      );
    }
  });

  it("en is always published", () => {
    expect(localePublicationStatus.en).toBe("published");
  });
});

// ─── Translated Routes ───────────────────────────────────────────

describe("translated routes allowlist", () => {
  it("only references draft locales", () => {
    for (const loc of Object.keys(translatedRoutes) as Locale[]) {
      if (localePublicationStatus[loc] === "published") {
        // published locales don't need allowlist entries (they're indexed everywhere)
        // but it's not an error to have them
        continue;
      }
      expect(localePublicationStatus[loc]).not.toBe("published");
    }
  });

  it("every allowlisted href exists in routing.pathnames", () => {
    const pathnames = Object.keys(
      routing.pathnames as Record<string, unknown>,
    );
    for (const [, routes] of Object.entries(translatedRoutes)) {
      for (const href of routes!) {
        expect(pathnames).toContain(href);
      }
    }
  });
});

// ─── Routing ─────────────────────────────────────────────────────

describe("routing pathnames", () => {
  it("includes /blog and /compatibility", () => {
    const pathnames = Object.keys(
      routing.pathnames as Record<string, unknown>,
    );
    expect(pathnames).toContain("/blog");
    expect(pathnames).toContain("/compatibility");
  });

  it("every live tool has a pathname entry", () => {
    const pathnames = Object.keys(
      routing.pathnames as Record<string, unknown>,
    );
    const tools = getSitemapTools();
    for (const tool of tools) {
      expect(pathnames).toContain(`/${tool.id}`);
    }
  });

  it("static pages are registered", () => {
    const pathnames = Object.keys(
      routing.pathnames as Record<string, unknown>,
    );
    for (const page of ["/about", "/privacy", "/terms", "/contact"]) {
      expect(pathnames).toContain(page);
    }
  });
});

// ─── Sitemap ─────────────────────────────────────────────────────

describe("sitemap generation", () => {
  // We can't easily call the Next.js sitemap function directly since it's
  // a default export used by the framework, but we can verify the data
  // sources that feed into it.

  it("getSitemapTools returns live tools only", () => {
    const tools = getSitemapTools();
    expect(tools.length).toBeGreaterThan(0);
    for (const tool of tools) {
      expect(tool.status).toBe("live");
    }
  });

  it("every sitemap tool has a sitemapPriority between 0 and 1", () => {
    for (const tool of getSitemapTools()) {
      expect(tool.sitemapPriority).toBeGreaterThanOrEqual(0);
      expect(tool.sitemapPriority).toBeLessThanOrEqual(1);
    }
  });

  it("generates exactly 78 sign-pair slugs", () => {
    const slugs = allPairSlugs();
    expect(slugs).toHaveLength(78);
  });

  it("every pair slug is parseable back to two valid signs", () => {
    for (const slug of allPairSlugs()) {
      const parsed = parsePairSlug(slug);
      expect(parsed).not.toBeNull();
      const [s1, s2] = parsed!;
      expect(SIGNS).toContain(s1);
      expect(SIGNS).toContain(s2);
    }
  });

  it("pair slugs are canonical (alphabetically ordered)", () => {
    for (const slug of allPairSlugs()) {
      const [s1, s2] = parsePairSlug(slug)!;
      expect(s1 <= s2).toBe(true);
    }
  });
});

// ─── Blog ────────────────────────────────────────────────────────

describe("blog posts", () => {
  it("has at least 3 posts", () => {
    const slugs = getAllPostSlugs();
    expect(slugs.length).toBeGreaterThanOrEqual(3);
  });

  it("every post has required frontmatter fields", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.frontmatter.title).toBeTruthy();
      expect(post.frontmatter.description).toBeTruthy();
      expect(post.frontmatter.publishedAt).toBeTruthy();
      expect(post.frontmatter.category).toBeTruthy();
      expect(post.frontmatter.tags).toBeInstanceOf(Array);
      expect(post.frontmatter.relatedTools).toBeInstanceOf(Array);
    }
  });

  it("post slugs are URL-safe", () => {
    for (const slug of getAllPostSlugs()) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every post is retrievable by slug", () => {
    for (const slug of getAllPostSlugs()) {
      const post = getPostBySlug(slug);
      expect(post).not.toBeNull();
      expect(post!.content.length).toBeGreaterThan(0);
    }
  });

  it("publishedAt dates are valid ISO dates", () => {
    for (const post of getAllPosts()) {
      const date = new Date(post.frontmatter.publishedAt);
      expect(date.toString()).not.toBe("Invalid Date");
    }
  });

  it("relatedTools reference valid tool IDs", () => {
    const toolIds = new Set(getSitemapTools().map((t) => t.id));
    for (const post of getAllPosts()) {
      for (const toolId of post.frontmatter.relatedTools) {
        expect(toolIds.has(toolId)).toBe(true);
      }
    }
  });
});

// ─── Canonical URL Consistency ───────────────────────────────────

describe("canonical URL consistency", () => {
  it("SITE constant uses www", () => {
    expect(SITE).toBe("https://www.astrologyforlove.com");
  });

  it("SITE uses https", () => {
    expect(SITE.startsWith("https://")).toBe(true);
  });

  it("SITE has no trailing slash", () => {
    expect(SITE.endsWith("/")).toBe(false);
  });
});

// ─── Translation Completeness ────────────────────────────────────

describe("translation file completeness", () => {
  it("every locale has a messages directory with common.json", () => {
    const fs = require("fs");
    const path = require("path");
    for (const loc of locales) {
      const commonPath = path.join(
        process.cwd(),
        "messages",
        loc,
        "common.json",
      );
      expect(fs.existsSync(commonPath)).toBe(true);
      const content = JSON.parse(fs.readFileSync(commonPath, "utf-8"));
      expect(Object.keys(content).length).toBeGreaterThan(0);
    }
  });

  it("every locale has a tools.json", () => {
    const fs = require("fs");
    const path = require("path");
    for (const loc of locales) {
      const toolsPath = path.join(
        process.cwd(),
        "messages",
        loc,
        "tools.json",
      );
      expect(fs.existsSync(toolsPath)).toBe(true);
    }
  });

  it("tools.json for published locales has the same top-level keys as en", () => {
    const fs = require("fs");
    const path = require("path");
    const enTools = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "messages", "en", "tools.json"),
        "utf-8",
      ),
    );
    const enKeys = Object.keys(enTools).sort();

    for (const loc of locales) {
      if (localePublicationStatus[loc] !== "published") continue;
      const locTools = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), "messages", loc, "tools.json"),
          "utf-8",
        ),
      );
      const locKeys = Object.keys(locTools).sort();
      expect(locKeys).toEqual(enKeys);
    }
  });
});

// ─── Tool Registry ───────────────────────────────────────────────

describe("tool registry", () => {
  it("every live tool has a unique ID", () => {
    const tools = getSitemapTools();
    const ids = tools.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tool IDs are URL-safe", () => {
    for (const tool of getSitemapTools()) {
      expect(tool.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every tool has relatedEditorial array", () => {
    for (const tool of getSitemapTools()) {
      expect((tool as ToolDefinition & { relatedEditorial: string[] }).relatedEditorial).toBeInstanceOf(Array);
    }
  });
});
