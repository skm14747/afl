import type { EducationalContent } from "@/components/education/EducationalSections";

export const compositeChartEducation: EducationalContent = {
  toolId: "composite-chart",
  howItWorks: {
    paragraphs: [
      "A composite chart is created by calculating the midpoint of each planet pair between two natal charts. Your Sun's midpoint with your partner's Sun becomes the composite Sun, and so on for every planet and point.",
      "This calculator computes midpoints for the Sun, Moon, Mercury, Venus, Mars, Jupiter, and Saturn using the astronomy-engine ephemeris. When birth times are provided, it also calculates the composite Ascendant and Midheaven.",
      "The resulting chart represents the relationship itself — not either individual — and is interpreted as a standalone birth chart for the partnership.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "The relationship's identity", body: "The composite Sun sign and house describe the core purpose and identity of the relationship — what it is about at its best." },
      { heading: "Emotional tone", body: "The composite Moon describes how the relationship feels on a day-to-day basis. Its sign and aspects indicate the emotional climate of the partnership." },
      { heading: "Communication style", body: "Composite Mercury reveals how the couple communicates and makes decisions together. Its aspects show whether dialogue flows or requires effort." },
      { heading: "Love expression", body: "Composite Venus describes how the relationship expresses love and what brings the couple pleasure. It indicates the relationship's aesthetic and romantic style." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "The composite chart technique was popularized in the 1970s by John Townley and refined by Robert Hand. It differs from synastry in that it creates a single chart for the relationship rather than comparing two individual charts.",
      "The midpoint method works because midpoints represent the blended energy between two points. The composite chart captures the emergent properties of the relationship — dynamics that neither individual would create alone.",
      "Some astrologers also use the Davison chart (a time-space midpoint chart) as an alternative composite method. The Davison chart uses the midpoint of both birth dates and locations to find a real astronomical moment, while the standard composite chart uses mathematical midpoints that may not correspond to any actual sky configuration.",
    ],
  },
};
