import type { EducationalContent } from "@/components/education/EducationalSections";

export const relationshipNumerologyEducation: EducationalContent = {
  toolId: "relationship-numerology",
  howItWorks: {
    paragraphs: [
      "This calculator derives Life Path numbers for two people from their birth dates using the Pythagorean reduction method. Each date component (month, day, year) is reduced to a single digit (or master number: 11, 22, 33), then the three are summed and reduced again.",
      "The tool compares both Life Path numbers and calculates a Relationship Number by combining them. It assesses natural harmony, challenge areas, and the shared purpose the partnership is best suited to fulfill.",
      "Additionally, it examines Expression numbers (from full birth names) and Heart's Desire numbers (from vowels) when names are provided, adding depth to the compatibility picture.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Life Path compatibility", body: "Some number combinations naturally harmonize (like 2 and 6, both relationship-focused) while others challenge each other (like 1 and 8, both leadership-oriented). The tool explains the specific dynamic between your two numbers." },
      { heading: "Relationship number", body: "The combined Relationship Number reveals the shared energy and purpose of the partnership — what you are meant to build or learn together." },
      { heading: "Challenge numbers", body: "The difference between Life Path numbers points to areas of natural friction. These challenges are growth opportunities when approached consciously." },
      { heading: "Master number significance", body: "Master numbers (11, 22, 33) carry intensified energy. When one or both partners have a master number, the relationship operates at a higher vibration but with greater demands." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Numerology is a parallel system to astrology, using numbers rather than planets as its symbolic language. While astrology maps the positions of celestial bodies at birth, numerology derives meaning from the numerical values inherent in birth dates and names.",
      "The Pythagorean system (used here) assigns number values based on digit reduction — a process that traces back to the Greek mathematician Pythagoras, who believed numbers were the fundamental substance of reality. The Life Path number is considered the most important numerological indicator, analogous to the Sun sign in astrology.",
      "Many practitioners combine numerology with astrology for a more complete picture. The Life Path number and Sun sign often describe complementary facets of identity — the Life Path as your destined path, the Sun sign as your core being.",
    ],
  },
};
