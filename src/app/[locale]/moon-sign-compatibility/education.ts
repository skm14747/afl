import type { EducationalContent } from "@/components/education/EducationalSections";

export const moonSignEducation: EducationalContent = {
  toolId: "moon-sign-compatibility",
  howItWorks: {
    paragraphs: [
      "This calculator finds the Moon's exact zodiac sign for two people at their moment of birth using the astronomy-engine ephemeris. It then compares the two Moon signs by element, modality, and angular distance to produce compatibility scores.",
      "The Moon moves quickly — roughly 13° per day, changing signs every 2.5 days. Without a birth time, the calculator uses noon and flags when the Moon may have changed signs during the day. When both birth times are provided, the Moon positions are precise.",
      "Scores cover emotional bond, communication style, nurturing match, and long-term stability. Each dimension weighs the Moon signs' elemental relationship and the aspect they form.",
    ],
  },
  whatThisTellsYou: {
    points: [
      {
        heading: "Emotional compatibility",
        body: "The Moon governs emotional needs, security patterns, and instinctive reactions. When two Moon signs share the same element (Fire, Earth, Air, Water), both people process emotions similarly and feel understood without explanation.",
      },
      {
        heading: "Nurturing patterns",
        body: "Each Moon sign has a characteristic way of giving and receiving care. Earth Moons nurture through practical action. Water Moons nurture through emotional presence. Knowing both patterns helps partners meet each other's real needs.",
      },
      {
        heading: "Conflict style",
        body: "The Moon also governs how people behave during emotional stress. Fire Moons express and release quickly. Earth Moons withdraw to stabilize. Air Moons intellectualize. Water Moons absorb and internalize. Incompatible conflict styles create recurring friction.",
      },
      {
        heading: "Long-term emotional fit",
        body: "Moon compatibility is one of the strongest predictors of long-term relationship satisfaction. After the initial Sun-sign attraction fades, the Moon takes over — it determines whether two people feel emotionally safe together day after day.",
      },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "In traditional astrology, the Moon represents the soul, the emotional body, and the native's relationship with security and nourishment. It is considered the most important luminary for understanding a person's inner life.",
      "The Moon's sign describes the emotional temperament. Its house (when birth time is known) describes the life area where emotional energy is focused. Its aspects to other planets describe how emotional patterns interact with the rest of the personality.",
      "In synastry, Moon contacts are especially significant. Moon conjunct Venus is traditionally considered one of the most favorable aspects for romantic compatibility — it blends emotional attunement with love and affection. Moon square Mars, conversely, creates emotional friction that requires conscious management.",
    ],
  },
};
