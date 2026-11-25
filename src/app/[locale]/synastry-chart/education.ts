import type { EducationalContent } from "@/components/education/EducationalSections";

export const synastryEducation: EducationalContent = {
  toolId: "synastry-chart",
  howItWorks: {
    paragraphs: [
      "Synastry compares two complete natal charts. This calculator computes planetary positions for both people using the astronomy-engine ephemeris, then checks every planet-to-planet combination for classical aspects: conjunction (0°), sextile (60°), square (90°), trine (120°), and opposition (180°).",
      "When birth times are provided, the calculator also computes house overlays — where each of one person's planets falls in the other's house system. House overlays reveal which life areas a partner activates for you.",
      "Aspects are grouped by theme (Chemistry, Emotional Bond, Communication, Long-term Growth) and color-coded by nature (harmonious green, tense rose). The orb — how many degrees an aspect deviates from exact — indicates how strongly the contact is felt.",
    ],
  },
  whatThisTellsYou: {
    points: [
      {
        heading: "Chemistry and attraction",
        body: "Venus–Mars aspects between charts drive physical and romantic attraction. A Venus–Mars trine feels effortless. A Venus–Mars square creates friction that can be compelling.",
      },
      {
        heading: "Emotional connection",
        body: "Moon aspects describe emotional attunement. Moon conjunct Moon means similar emotional rhythms. Moon square Saturn can feel emotionally restrictive but builds stability over time.",
      },
      {
        heading: "Communication dynamics",
        body: "Mercury aspects show how well two people exchange ideas. Mercury trine Mercury is easy conversation. Mercury square Mercury means different thought processes that require patience.",
      },
      {
        heading: "Growth and longevity",
        body: "Saturn and Pluto aspects indicate staying power and transformation. Saturn contacts stabilize but can feel heavy. Pluto contacts intensify and sometimes challenge power dynamics.",
      },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Synastry is the oldest form of relationship astrology. Historical records show Hellenistic astrologers comparing charts as early as the 2nd century CE. The technique assumes that when two people interact, their natal planetary energies activate each other.",
      "Modern synastry considers both the aspect grid (planet-to-planet angles) and house overlays (where one chart's planets fall in the other's houses). The composite chart, a separate technique, creates a single chart for the relationship itself by midpointing both charts.",
      "No single aspect makes or breaks a relationship. Astrologers look for patterns: a preponderance of harmonious contacts suggests ease, while multiple hard aspects (squares, oppositions) indicate a relationship that challenges both people to grow. Many strong relationships have a mix of both.",
    ],
  },
};
