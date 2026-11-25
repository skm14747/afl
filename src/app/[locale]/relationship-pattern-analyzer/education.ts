import type { EducationalContent } from "@/components/education/EducationalSections";

export const relationshipPatternEducation: EducationalContent = {
  toolId: "relationship-pattern-analyzer",
  howItWorks: {
    paragraphs: [
      "This tool analyses your natal chart to identify recurring relationship patterns. It examines Venus aspects, 7th house placements, Moon-Pluto and Venus-Saturn contacts, and the nodes of the Moon to map out the patterns you tend to repeat in partnerships.",
      "The analyzer categorizes patterns into themes: attachment style (anxious, avoidant, secure), partner selection tendencies, conflict loops, and growth edges. Each pattern is linked to specific natal chart features.",
      "By understanding which planetary contacts drive your patterns, you can distinguish between patterns that serve you and patterns you may want to outgrow.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Attachment patterns", body: "Moon aspects and 4th house placements correlate with attachment style. Moon-Saturn contacts often indicate cautious attachment; Moon-Neptune contacts can indicate idealization patterns." },
      { heading: "Partner selection", body: "Your 7th house sign and its ruler describe the qualities you are drawn to in partners — sometimes consciously, often not. The Descendant reveals your 'type' at a deeper level than surface preferences." },
      { heading: "Conflict loops", body: "Mars aspects and 8th house placements describe how you handle power dynamics and conflict in intimate relationships. Repeating conflicts often trace back to these natal signatures." },
      { heading: "Growth direction", body: "The North Node by sign and house indicates the relational qualities you are growing toward in this lifetime. Relationships that push you toward your North Node feel challenging but ultimately fulfilling." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Pattern analysis in astrology draws on psychological astrology, a modern approach pioneered by Liz Greene and Howard Sasportas. It uses the natal chart as a map of psychological tendencies rather than fixed destiny.",
      "The 7th house (partnerships) and its ruler are central to relationship pattern analysis. The sign on the 7th house cusp (Descendant) describes qualities you project onto partners — the complementary energy you seek outside yourself. Understanding this projection is often the first step in breaking unhelpful patterns.",
      "Nodal axis analysis adds a growth dimension. The South Node represents comfortable but potentially stagnant patterns. The North Node represents the unfamiliar territory where growth lies. Relationships that activate the nodal axis tend to feel significant and transformative.",
    ],
  },
};
