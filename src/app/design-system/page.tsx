"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/branding/Logo";
import { CosmicSymbol } from "@/components/branding/CosmicSymbol";
import { Button } from "@/components/ui/Button";
import { Card, FeatureCard, ToolCard, ArticleCard, TestimonialCard, StatisticCard } from "@/components/ui/Card";
import {
  DisplayHeading,
  DisplayHeading2,
  SectionHeading,
  Heading3,
  Heading4,
  Eyebrow,
  BodyText,
  Caption,
  Metadata,
} from "@/components/ui/Typography";
import { TextInput, DateInput, Select, Checkbox, RadioGroup } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Tabs } from "@/components/ui/Tabs";
import { Tooltip } from "@/components/ui/Tooltip";
import { Modal } from "@/components/ui/Modal";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { ZodiacBadge } from "@/components/astrology/ZodiacBadge";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import { CompatibilityScore } from "@/components/astrology/CompatibilityScore";
import { CompatibilityMeter } from "@/components/astrology/CompatibilityMeter";
import { PlanetBadge } from "@/components/astrology/PlanetBadge";
import { StarRating } from "@/components/astrology/StarRating";
import { BirthDateInput } from "@/components/astrology/BirthDateInput";
import { CosmicInsightCard } from "@/components/astrology/CosmicInsightCard";
import { RelationshipScoreCard } from "@/components/astrology/RelationshipScoreCard";
import { LoveCompatibilityCard } from "@/components/astrology/LoveCompatibilityCard";
import { ZODIAC_SIGNS, PLANETS } from "@/lib/astrology-data";
import {
  Heart,
  Star,
  Sparkles,
  Moon,
  Sun,
  Compass,
  BookOpen,
  Calculator,
  Users,
  ArrowRight,
} from "lucide-react";

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 border-b border-[var(--color-border-subtle)]">
      <div className="mb-10">
        <Eyebrow className="mb-2 block">{id.replace(/-/g, " ")}</Eyebrow>
        <SectionHeading>{title}</SectionHeading>
        {description && (
          <BodyText className="mt-2 text-[var(--color-muted-fg)] max-w-2xl">{description}</BodyText>
        )}
      </div>
      {children}
    </section>
  );
}

function ColorSwatch({ name, variable, hex }: { name: string; variable: string; hex: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <span className="text-xs font-medium mt-2 text-center">{name}</span>
      <span className="text-[10px] text-[var(--color-muted-fg)]">{hex}</span>
    </div>
  );
}

function ColorScale({ name, shades }: { name: string; shades: { label: string; hex: string }[] }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-3 capitalize">{name}</h4>
      <div className="flex gap-1 flex-wrap">
        {shades.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-[var(--radius-md)] border border-[var(--color-border-subtle)]"
              style={{ backgroundColor: s.hex }}
            />
            <span className="text-[9px] text-[var(--color-muted-fg)] mt-1">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-[var(--cosmic-navy)] text-[var(--ivory)] py-20 bg-stars relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, var(--champagne-gold), transparent 60%)",
            }}
          />
          <Container size="standard" className="relative text-center">
            <div className="flex justify-center mb-6">
              <CosmicSymbol size={72} variant="gold" />
            </div>
            <DisplayHeading className="text-[var(--ivory)] mb-4">Design System</DisplayHeading>
            <BodyText size="lg" className="text-[var(--neutral-300)] max-w-2xl mx-auto">
              The visual foundation of AstrologyForLove — a cohesive design language for
              building premium astrology experiences.
            </BodyText>
            <p
              className="mt-6 text-sm italic text-[var(--champagne-gold)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Written in the Stars. Felt in the Heart.
            </p>
          </Container>
        </div>

        <Container size="standard">
          {/* Table of Contents */}
          <nav className="py-10 border-b border-[var(--color-border-subtle)]">
            <Heading4 className="mb-4">Contents</Heading4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "brand",
                "colors",
                "typography",
                "spacing",
                "buttons",
                "cards",
                "forms",
                "interactive",
                "astrology",
                "navigation",
              ].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm text-[var(--color-muted-fg)] hover:text-[var(--champagne-gold)] transition-colors capitalize px-2 py-1"
                >
                  {id}
                </a>
              ))}
            </div>
          </nav>

          {/* 1. Brand */}
          <Section id="brand" title="Brand & Logo" description="Logo variants and brand identity assets.">
            <div className="space-y-10">
              <div>
                <Heading4 className="mb-4">Logo Variants</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Light background logos */}
                  <Card variant="default" padding="lg">
                    <Caption className="block mb-4">Light Background</Caption>
                    <div className="space-y-6">
                      <Logo variant="horizontal" theme="light" size="lg" showTagline />
                      <Logo variant="horizontal" theme="light" size="md" />
                      <Logo variant="horizontal" theme="light" size="sm" />
                    </div>
                  </Card>
                  {/* Dark background logos */}
                  <Card variant="cosmic" padding="lg">
                    <Caption className="block mb-4 text-[var(--neutral-400)]">Dark Background</Caption>
                    <div className="space-y-6">
                      <Logo variant="horizontal" theme="gold" size="lg" showTagline />
                      <Logo variant="horizontal" theme="dark" size="md" />
                      <Logo variant="horizontal" theme="dark" size="sm" />
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Symbol Variants</Heading4>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-2">
                    <CosmicSymbol size={56} variant="gold" />
                    <Caption>Gold</Caption>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CosmicSymbol size={56} variant="light" />
                    <Caption>Light</Caption>
                  </div>
                  <div className="flex flex-col items-center gap-2 bg-[var(--cosmic-navy)] p-3 rounded-[var(--radius-lg)]">
                    <CosmicSymbol size={56} variant="dark" />
                    <Caption className="text-[var(--neutral-400)]">Dark</Caption>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CosmicSymbol size={56} variant="mono" />
                    <Caption>Mono</Caption>
                  </div>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Favicon / App Icon</Heading4>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[var(--cosmic-navy)] rounded-[var(--radius-md)] flex items-center justify-center">
                    <CosmicSymbol size={24} variant="gold" />
                  </div>
                  <div className="w-12 h-12 bg-[var(--cosmic-navy)] rounded-[var(--radius-lg)] flex items-center justify-center">
                    <CosmicSymbol size={36} variant="gold" />
                  </div>
                  <div className="w-16 h-16 bg-[var(--cosmic-navy)] rounded-[var(--radius-xl)] flex items-center justify-center">
                    <CosmicSymbol size={48} variant="gold" />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 2. Colors */}
          <Section id="colors" title="Color Palette" description="Brand colors, extended scales, and semantic tokens.">
            <div className="space-y-10">
              <div>
                <Heading4 className="mb-4">Primary Palette</Heading4>
                <div className="flex gap-6 flex-wrap">
                  <ColorSwatch name="Cosmic Navy" variable="--cosmic-navy" hex="#17152D" />
                  <ColorSwatch name="Mystic Plum" variable="--mystic-plum" hex="#392544" />
                  <ColorSwatch name="Champagne Gold" variable="--champagne-gold" hex="#D8AF79" />
                  <ColorSwatch name="Romantic Rose" variable="--romantic-rose" hex="#D99BA6" />
                  <ColorSwatch name="Ivory" variable="--ivory" hex="#F6F0E9" />
                  <ColorSwatch name="Lavender Mist" variable="--lavender-mist" hex="#B9A9C9" />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Extended Scales</Heading4>
                <ColorScale
                  name="Primary (Navy)"
                  shades={[
                    { label: "50", hex: "#EEEEF5" },
                    { label: "100", hex: "#D5D4E8" },
                    { label: "200", hex: "#ABAACD" },
                    { label: "300", hex: "#8180B2" },
                    { label: "400", hex: "#575697" },
                    { label: "500", hex: "#2D2C7C" },
                    { label: "600", hex: "#242361" },
                    { label: "700", hex: "#1E1C4A" },
                    { label: "800", hex: "#17152D" },
                    { label: "900", hex: "#100F20" },
                    { label: "950", hex: "#0A0914" },
                  ]}
                />
                <ColorScale
                  name="Gold"
                  shades={[
                    { label: "50", hex: "#FBF6EE" },
                    { label: "100", hex: "#F5E8D2" },
                    { label: "200", hex: "#EDD4A9" },
                    { label: "300", hex: "#E3C08A" },
                    { label: "400", hex: "#D8AF79" },
                    { label: "500", hex: "#C9985C" },
                    { label: "600", hex: "#B07F3F" },
                    { label: "700", hex: "#8E6632" },
                    { label: "800", hex: "#6B4D26" },
                    { label: "900", hex: "#48341A" },
                  ]}
                />
                <ColorScale
                  name="Rose"
                  shades={[
                    { label: "50", hex: "#FBF2F4" },
                    { label: "100", hex: "#F5DFE3" },
                    { label: "200", hex: "#EDBFC8" },
                    { label: "300", hex: "#E3A5B1" },
                    { label: "400", hex: "#D99BA6" },
                    { label: "500", hex: "#C47E8C" },
                    { label: "600", hex: "#AD6373" },
                    { label: "700", hex: "#8F4D5D" },
                    { label: "800", hex: "#6E3A47" },
                    { label: "900", hex: "#4D2832" },
                  ]}
                />
                <ColorScale
                  name="Neutral"
                  shades={[
                    { label: "50", hex: "#F8F6F3" },
                    { label: "100", hex: "#F0ECE6" },
                    { label: "200", hex: "#E0D9CF" },
                    { label: "300", hex: "#C9BFB2" },
                    { label: "400", hex: "#A99E8F" },
                    { label: "500", hex: "#8A7E6D" },
                    { label: "600", hex: "#6E6456" },
                    { label: "700", hex: "#534B40" },
                    { label: "800", hex: "#3A342C" },
                    { label: "900", hex: "#221F1A" },
                    { label: "950", hex: "#131210" },
                  ]}
                />
              </div>

              <div>
                <Heading4 className="mb-4">Semantic Colors</Heading4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Background", color: "var(--color-bg)" },
                    { label: "Foreground", color: "var(--color-fg)" },
                    { label: "Surface", color: "var(--color-surface)" },
                    { label: "Primary", color: "var(--color-primary)" },
                    { label: "Accent", color: "var(--color-accent)" },
                    { label: "Muted", color: "var(--color-muted)" },
                    { label: "Border", color: "var(--color-border)" },
                    { label: "Focus Ring", color: "var(--color-focus-ring)" },
                    { label: "Success", color: "var(--color-success)" },
                    { label: "Warning", color: "var(--color-warning)" },
                    { label: "Error", color: "var(--color-error)" },
                    { label: "Info", color: "var(--color-info)" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-[var(--radius-md)] border border-[var(--color-border-subtle)]"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-xs">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* 3. Typography */}
          <Section id="typography" title="Typography" description="Type scale, fonts, and text styles.">
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <Caption className="block mb-1">Display 1 — Cormorant Garamond</Caption>
                  <DisplayHeading>Written in the Stars</DisplayHeading>
                </div>
                <div>
                  <Caption className="block mb-1">Display 2</Caption>
                  <DisplayHeading2>Cosmic Connection</DisplayHeading2>
                </div>
                <div>
                  <Caption className="block mb-1">Section Heading (H2)</Caption>
                  <SectionHeading>Love Compatibility</SectionHeading>
                </div>
                <div>
                  <Caption className="block mb-1">Heading 3</Caption>
                  <Heading3>Soulmate Discovery</Heading3>
                </div>
                <div>
                  <Caption className="block mb-1">Heading 4</Caption>
                  <Heading4>Venus Interpretations</Heading4>
                </div>
                <div>
                  <Caption className="block mb-1">Eyebrow / Overline</Caption>
                  <Eyebrow>Love & Relationships</Eyebrow>
                </div>
                <div>
                  <Caption className="block mb-1">Body Large — DM Sans</Caption>
                  <BodyText size="lg">
                    The stars have always guided lovers. From ancient civilizations to the modern age,
                    celestial bodies have mapped the pathways of the heart.
                  </BodyText>
                </div>
                <div>
                  <Caption className="block mb-1">Body</Caption>
                  <BodyText>
                    Your Venus sign reveals how you express love and what you need in a partner.
                    Understanding this placement can transform your relationships.
                  </BodyText>
                </div>
                <div>
                  <Caption className="block mb-1">Body Small</Caption>
                  <BodyText size="sm">
                    Compatibility scores are based on traditional astrological aspects between natal charts.
                  </BodyText>
                </div>
                <div>
                  <Caption className="block mb-1">Caption</Caption>
                  <Caption>Last updated: November 2026</Caption>
                </div>
                <div>
                  <Caption className="block mb-1">Metadata</Caption>
                  <Metadata>By AstrologyForLove Editorial Team</Metadata>
                </div>
              </div>

              <div>
                <Heading4 className="mb-3">Gold Gradient Text</Heading4>
                <p
                  className="text-gold-gradient text-3xl font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Felt in the Heart
                </p>
              </div>
            </div>
          </Section>

          {/* 4. Spacing */}
          <Section id="spacing" title="Spacing Scale" description="4px-based spacing system.">
            <div className="space-y-3">
              {[
                { label: "space-1", value: "4px" },
                { label: "space-2", value: "8px" },
                { label: "space-3", value: "12px" },
                { label: "space-4", value: "16px" },
                { label: "space-6", value: "24px" },
                { label: "space-8", value: "32px" },
                { label: "space-10", value: "40px" },
                { label: "space-12", value: "48px" },
                { label: "space-16", value: "64px" },
                { label: "space-20", value: "80px" },
                { label: "space-24", value: "96px" },
                { label: "space-32", value: "128px" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <span className="text-xs text-[var(--color-muted-fg)] w-20 text-right font-mono">
                    {s.value}
                  </span>
                  <div
                    className="h-3 rounded-sm bg-[var(--champagne-gold)]"
                    style={{ width: s.value }}
                  />
                  <span className="text-xs text-[var(--color-muted-fg)] font-mono">{s.label}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 5. Buttons */}
          <Section id="buttons" title="Buttons" description="Button variants, sizes, and states.">
            <div className="space-y-8">
              <div>
                <Heading4 className="mb-4">Variants</Heading4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="icon" aria-label="Favorite">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Sizes</Heading4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">States</Heading4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                  <Button loading>Loading</Button>
                  <Button icon={<Sparkles className="w-4 h-4" />}>With Icon</Button>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Secondary Variants</Heading4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="secondary" size="sm">Small Gold</Button>
                  <Button variant="secondary" size="md">Medium Gold</Button>
                  <Button variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                    Get Your Reading
                  </Button>
                </div>
              </div>
            </div>
          </Section>

          {/* 6. Cards */}
          <Section id="cards" title="Cards & Surfaces" description="Card variants for different content types.">
            <div className="space-y-8">
              <div>
                <Heading4 className="mb-4">Card Variants</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card variant="default">
                    <Heading4 className="mb-2">Default Card</Heading4>
                    <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                      Standard surface with subtle border.
                    </BodyText>
                  </Card>
                  <Card variant="elevated">
                    <Heading4 className="mb-2">Elevated Card</Heading4>
                    <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                      Elevated with shadow for prominence.
                    </BodyText>
                  </Card>
                  <Card variant="outlined">
                    <Heading4 className="mb-2">Outlined Card</Heading4>
                    <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                      Transparent with visible border.
                    </BodyText>
                  </Card>
                  <Card variant="feature">
                    <Heading4 className="mb-2">Feature Card</Heading4>
                    <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                      Gold-accented for featured content.
                    </BodyText>
                  </Card>
                  <Card variant="cosmic">
                    <Heading4 className="mb-2">Cosmic Card</Heading4>
                    <BodyText size="sm" className="text-[var(--neutral-300)]">
                      Dark cosmic background.
                    </BodyText>
                  </Card>
                  <Card variant="default" hover>
                    <Heading4 className="mb-2">Hover Card</Heading4>
                    <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                      Hover to see elevation effect.
                    </BodyText>
                  </Card>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Feature Cards</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FeatureCard
                    icon={<Heart className="w-6 h-6" />}
                    title="Love Compatibility"
                    description="Discover your cosmic match and explore the depths of zodiac love connections."
                  />
                  <FeatureCard
                    icon={<Moon className="w-6 h-6" />}
                    title="Moon Sign Insights"
                    description="Your Moon sign reveals emotional needs and how you nurture relationships."
                  />
                  <FeatureCard
                    icon={<Sparkles className="w-6 h-6" />}
                    title="Soulmate Discovery"
                    description="Learn which zodiac placements indicate a deep soul-level connection."
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Tool Cards</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ToolCard
                    icon={<Calculator className="w-5 h-5" />}
                    title="Birth Chart Calculator"
                    description="Generate your complete natal chart with house placements."
                  />
                  <ToolCard
                    icon={<Users className="w-5 h-5" />}
                    title="Synastry Calculator"
                    description="Compare two charts to reveal your relationship dynamics."
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Article Cards</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ArticleCard
                    category="Venus Signs"
                    title="What Your Venus Sign Says About Your Love Language"
                    excerpt="Venus governs how we express affection and what attracts us in relationships. Your Venus placement is the key to understanding your romantic nature."
                    date="November 2026"
                  />
                  <ArticleCard
                    category="Compatibility"
                    title="The Most Compatible Zodiac Pairs for Marriage"
                    excerpt="Some zodiac combinations create a natural harmony that makes long-term partnership feel effortless."
                    date="November 2026"
                  />
                  <ArticleCard
                    category="Moon Signs"
                    title="Moon Sign Compatibility: The Emotional Bond"
                    excerpt="While Sun signs get most attention, Moon sign compatibility reveals the deeper emotional currents of a relationship."
                    date="October 2026"
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Testimonials</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TestimonialCard
                    quote="The compatibility report was incredibly detailed and accurate. It gave us real insight into our relationship dynamics."
                    author="Sarah & James"
                    role="Leo & Libra"
                  />
                  <TestimonialCard
                    quote="I finally understand why my past relationships didn't work. My Venus sign explained everything."
                    author="Elena M."
                    role="Scorpio Venus"
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Statistics</Heading4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <StatisticCard value="2M+" label="Readings Generated" />
                  <StatisticCard value="98%" label="Accuracy Rating" />
                  <StatisticCard value="144" label="Sign Combinations" />
                  <StatisticCard value="12" label="Zodiac Signs" />
                </div>
              </div>
            </div>
          </Section>

          {/* 7. Forms */}
          <Section id="forms" title="Form Components" description="Inputs, selects, checkboxes, and radio groups.">
            <div className="max-w-lg space-y-6">
              <TextInput label="Full Name" placeholder="Enter your name" />
              <TextInput label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email." />
              <TextInput label="With Error" placeholder="Invalid input" error="This field is required." />
              <DateInput label="Date of Birth" />
              <Select
                label="Your Zodiac Sign"
                placeholder="Select your sign..."
                options={ZODIAC_SIGNS.map((s) => ({ value: s.toLowerCase(), label: s }))}
              />
              <Checkbox label="I agree to the terms and conditions" />
              <Checkbox label="Send me weekly horoscope emails" />
              <RadioGroup
                name="relationship-status"
                label="Relationship Status"
                options={[
                  { value: "single", label: "Single" },
                  { value: "relationship", label: "In a Relationship" },
                  { value: "married", label: "Married" },
                  { value: "complicated", label: "It's Complicated" },
                ]}
              />
            </div>
          </Section>

          {/* 8. Interactive */}
          <Section id="interactive" title="Interactive Components" description="Badges, accordions, tabs, tooltips, modals, and progress.">
            <div className="space-y-10">
              <div>
                <Heading4 className="mb-4">Badges</Heading4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="gold">Gold</Badge>
                  <Badge variant="rose">Rose</Badge>
                  <Badge variant="cosmic">Cosmic</Badge>
                  <Badge variant="success">Compatible</Badge>
                  <Badge variant="warning">Challenging</Badge>
                  <Badge variant="error">Difficult</Badge>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Progress Indicators</Heading4>
                <div className="max-w-md space-y-4">
                  <ProgressIndicator value={85} label="Emotional Connection" showLabel variant="gold" />
                  <ProgressIndicator value={62} label="Communication" showLabel variant="rose" />
                  <ProgressIndicator value={45} label="Long-term Potential" showLabel variant="cosmic" />
                  <ProgressIndicator value={90} showLabel variant="default" size="sm" />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Star Rating</Heading4>
                <div className="space-y-2">
                  <StarRating rating={5} label="Exceptional Match" />
                  <StarRating rating={4} label="Strong Connection" />
                  <StarRating rating={3} label="Good Potential" />
                  <StarRating rating={2} label="Requires Effort" />
                  <StarRating rating={1} label="Challenging" size="sm" />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Accordion</Heading4>
                <div className="max-w-2xl">
                  <Accordion
                    items={[
                      {
                        id: "1",
                        title: "What is zodiac compatibility?",
                        content:
                          "Zodiac compatibility examines how two signs interact based on their elemental nature, modality, and planetary rulers. It considers multiple astrological factors beyond just Sun signs.",
                      },
                      {
                        id: "2",
                        title: "How accurate are compatibility readings?",
                        content:
                          "While Sun sign compatibility provides a helpful overview, a complete synastry reading comparing full birth charts gives the most accurate picture of relationship dynamics.",
                      },
                      {
                        id: "3",
                        title: "What role does Venus play in love astrology?",
                        content:
                          "Venus is the planet of love, beauty, and attraction. Your Venus sign describes how you express love, what you find beautiful, and what attracts you to others romantically.",
                      },
                    ]}
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Tabs</Heading4>
                <div className="max-w-2xl">
                  <Tabs
                    items={[
                      {
                        id: "overview",
                        label: "Overview",
                        content: (
                          <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                            Your Sun sign represents your core identity and ego. It is the zodiac sign that most
                            people identify with and shapes your fundamental personality traits.
                          </BodyText>
                        ),
                      },
                      {
                        id: "love",
                        label: "Love",
                        content: (
                          <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                            In love, your Sun sign determines how you shine in relationships, what kind of
                            partner you seek, and how you express your most authentic self.
                          </BodyText>
                        ),
                      },
                      {
                        id: "career",
                        label: "Career",
                        content: (
                          <BodyText size="sm" className="text-[var(--color-muted-fg)]">
                            Your Sun sign influences your career aspirations, leadership style, and professional
                            identity. It reveals where you naturally seek recognition and achievement.
                          </BodyText>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Tooltips</Heading4>
                <div className="flex gap-4">
                  <Tooltip content="Core identity and ego expression">
                    <Badge variant="gold">☉ Sun Sign</Badge>
                  </Tooltip>
                  <Tooltip content="Emotional needs and inner world">
                    <Badge variant="rose">☽ Moon Sign</Badge>
                  </Tooltip>
                  <Tooltip content="Love language and romantic nature" position="bottom">
                    <Badge variant="cosmic">♀ Venus Sign</Badge>
                  </Tooltip>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Modal</Heading4>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Your Cosmic Reading"
                >
                  <BodyText size="sm" className="text-[var(--color-muted-fg)] mb-4">
                    The stars reveal a powerful alignment between your Venus and their Moon.
                    This creates a deep emotional and romantic resonance that forms
                    the foundation of a lasting connection.
                  </BodyText>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                      Close
                    </Button>
                    <Button variant="secondary" size="sm">
                      Read Full Report
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </Section>

          {/* 9. Astrology Components */}
          <Section id="astrology" title="Astrology Components" description="Specialized components for zodiac signs, compatibility, and planetary data.">
            <div className="space-y-10">
              <div>
                <Heading4 className="mb-4">Zodiac Icons</Heading4>
                <div className="flex flex-wrap gap-3">
                  {ZODIAC_SIGNS.map((sign) => (
                    <ZodiacIcon key={sign} sign={sign} size="md" showElement />
                  ))}
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Zodiac Badges</Heading4>
                <div className="flex flex-wrap gap-2">
                  {ZODIAC_SIGNS.slice(0, 6).map((sign) => (
                    <ZodiacBadge key={sign} sign={sign} showDates />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ZODIAC_SIGNS.slice(0, 4).map((sign) => (
                    <ZodiacBadge key={sign} sign={sign} size="sm" />
                  ))}
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Compatibility Score</Heading4>
                <CompatibilityScore
                  sign1="Leo"
                  sign2="Libra"
                  overallScore={82}
                  summary="A radiant match where fire meets air. Leo's warmth and Libra's grace create a partnership full of romance, social charm, and mutual admiration."
                  categories={[
                    { label: "Emotional Connection", score: 78 },
                    { label: "Communication", score: 88 },
                    { label: "Romantic Chemistry", score: 85 },
                    { label: "Long-term Potential", score: 76 },
                  ]}
                />
              </div>

              <div>
                <Heading4 className="mb-4">Compatibility Meters</Heading4>
                <div className="flex flex-wrap gap-8">
                  <CompatibilityMeter score={92} label="Excellent" size="md" />
                  <CompatibilityMeter score={68} label="Good" size="md" />
                  <CompatibilityMeter score={35} label="Challenging" size="md" />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Planet Badges</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
                  {PLANETS.slice(0, 4).map((planet) => (
                    <PlanetBadge
                      key={planet.name}
                      name={planet.name}
                      symbol={planet.symbol}
                      meaning={planet.meaning}
                      influence={planet.influence}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Birth Date Input</Heading4>
                <div className="max-w-lg">
                  <BirthDateInput showTime showLocation />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Cosmic Insight Cards</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CosmicInsightCard
                    title="Venus in Scorpio"
                    insight="Your love runs deep — you seek intensity, loyalty, and transformative connection above all."
                    details="Venus in Scorpio natives love with an all-or-nothing intensity. They are drawn to mystery and emotional depth in their partners."
                    cta={{ label: "Explore Venus Signs", href: "/venus-sign" }}
                    icon={<Heart className="w-5 h-5" />}
                  />
                  <CosmicInsightCard
                    title="Moon in Cancer"
                    insight="You nurture through deep empathy — creating emotional safety is your gift in relationships."
                    details="Moon in Cancer provides strong emotional intelligence and an instinct to care for loved ones."
                    cta={{ label: "Discover Moon Signs", href: "/moon-sign" }}
                    icon={<Moon className="w-5 h-5" />}
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Relationship Score Card</Heading4>
                <div className="max-w-md">
                  <RelationshipScoreCard
                    title="Leo & Libra Relationship"
                    scores={[
                      { label: "Emotional Bond", score: 78, description: "Strong mutual understanding" },
                      { label: "Communication", score: 88, description: "Natural conversational flow" },
                      { label: "Romance", score: 92, description: "Deeply passionate connection" },
                      { label: "Trust", score: 72, description: "Requires open dialogue" },
                      { label: "Long-term", score: 80, description: "Promising future together" },
                    ]}
                  />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Love Compatibility Cards</Heading4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <LoveCompatibilityCard
                    sign1="Aries"
                    sign2="Leo"
                    rating={5}
                    summary="A fiery, passionate match of two bold spirits who inspire each other."
                    highlights={[
                      "Incredible physical chemistry",
                      "Mutual respect and admiration",
                      "Shared love of adventure",
                    ]}
                  />
                  <LoveCompatibilityCard
                    sign1="Cancer"
                    sign2="Pisces"
                    rating={4}
                    summary="A deep emotional bond where intuition and empathy create a nurturing love."
                    highlights={[
                      "Profound emotional understanding",
                      "Creative and romantic partnership",
                      "Strong spiritual connection",
                    ]}
                  />
                  <LoveCompatibilityCard
                    sign1="Virgo"
                    sign2="Sagittarius"
                    rating={2}
                    summary="Different approaches to life that require patience and compromise."
                    highlights={[
                      "Complementary strengths",
                      "Growth through differences",
                      "Needs clear communication",
                    ]}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* 10. Navigation */}
          <Section id="navigation" title="Navigation" description="Header and footer are rendered on this page. Scroll to top/bottom to preview.">
            <BodyText size="sm" className="text-[var(--color-muted-fg)]">
              The <strong>MainHeader</strong> (sticky at top) includes desktop/mobile navigation,
              logo, and CTA buttons. The <strong>Footer</strong> renders at the page bottom with
              link sections, brand identity, and tagline.
            </BodyText>
          </Section>

          {/* Decorative elements showcase */}
          <Section id="decorative" title="Decorative Elements" description="Celestial patterns, dividers, and visual language.">
            <div className="space-y-8">
              <div>
                <Heading4 className="mb-4">Celestial Divider</Heading4>
                <div className="divider-celestial">
                  <Star className="w-4 h-4 text-[var(--champagne-gold)]" />
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Star Background Pattern</Heading4>
                <div className="bg-[var(--cosmic-navy)] bg-stars rounded-[var(--radius-xl)] p-10 text-center">
                  <p
                    className="text-[var(--ivory)] text-lg italic"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    A cosmic background with subtle star particles
                  </p>
                </div>
              </div>

              <div>
                <Heading4 className="mb-4">Animations</Heading4>
                <BodyText size="sm" className="text-[var(--color-muted-fg)] mb-4">
                  Animations respect <code className="text-xs bg-[var(--color-muted)] px-1.5 py-0.5 rounded">prefers-reduced-motion</code>.
                </BodyText>
                <div className="flex gap-8 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--champagne-gold)] animate-twinkle" />
                    <Caption>Twinkle</Caption>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Star className="w-5 h-5 text-[var(--champagne-gold)] animate-float" />
                    <Caption>Float</Caption>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-[var(--lavender-mist)] animate-orbit" />
                    <Caption>Orbit</Caption>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--champagne-gold)] animate-glow" />
                    <Caption>Glow</Caption>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
