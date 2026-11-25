import type { EducationalContent } from "@/components/education/EducationalSections";

export const loveCompatEducation: EducationalContent = {
  toolId: "love-compatibility",
  howItWorks: {
    paragraphs: [
      "This calculator compares two Sun signs by measuring the angular distance between them on the zodiac wheel. That angle — 0°, 60°, 90°, 120°, or 180° — maps to a classical aspect: conjunction, sextile, square, trine, or opposition. Each aspect carries a different weight for emotional, communicative, romantic, and long-term compatibility.",
      "Scores are computed across five dimensions: emotional connection, communication style, romantic chemistry, shared values, and long-term stability. The overall score is a weighted blend of all five. The algorithm also considers elemental harmony (Fire, Earth, Air, Water) and modality alignment (Cardinal, Fixed, Mutable).",
      "All calculations run in your browser using astronomy-engine. No data is sent to a server.",
    ],
  },
  whatThisTellsYou: {
    points: [
      {
        heading: "Elemental harmony",
        body: "Whether your elements support each other (Fire–Air, Earth–Water) or create friction (Fire–Water, Earth–Air). Same-element pairs share instinctive understanding.",
      },
      {
        heading: "Communication patterns",
        body: "How your modalities interact. Two Cardinal signs both want to lead. Two Fixed signs both resist change. Two Mutable signs both adapt but may lack direction.",
      },
      {
        heading: "Romantic chemistry",
        body: "The aspect between your signs predicts the texture of attraction — effortless (trine), stimulating (sextile), tense but compelling (square), or magnetic (opposition).",
      },
      {
        heading: "Long-term outlook",
        body: "Whether the pairing tends toward stability or requires active effort. High-tension aspects can sustain passion but need intentional communication.",
      },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Sun sign compatibility is the most widely known branch of synastry — the astrological comparison of two charts. It works because the Sun represents core identity, ego, and life direction. When two Suns form a harmonious aspect, the people share compatible worldviews.",
      "The limitation is that Sun signs capture only one axis. Venus governs how you love, the Moon governs what you need emotionally, and Mars governs desire and conflict style. A full synastry chart compares all these placements and more. Sun sign compatibility is the starting point, not the full picture.",
      "Elemental theory dates to classical Greek astrology. Fire and Air signs are yang (active, outward-directed). Earth and Water signs are yin (receptive, inward-directed). The most natural pairings combine complementary polarities within compatible elements.",
    ],
  },
};
