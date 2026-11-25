import type { EducationalContent } from "@/components/education/EducationalSections";

export const venusSignEducation: EducationalContent = {
  toolId: "venus-sign-calculator",
  howItWorks: {
    paragraphs: [
      "This calculator finds Venus's exact ecliptic longitude at the moment you were born, using the astronomy-engine ephemeris. It then maps that longitude to the tropical zodiac to determine which sign Venus occupied.",
      "If you enter a birth time, the calculation is precise. Without a birth time, the calculator uses noon as a default and flags cases where Venus may have changed signs during the day. Venus moves roughly 1° per day, so a missing birth time rarely changes the result — but it can near a sign boundary.",
      "Everything runs in your browser. No birth data is sent to any server.",
    ],
  },
  whatThisTellsYou: {
    points: [
      {
        heading: "Your love style",
        body: "Venus describes how you express affection. Some Venus signs are demonstrative (Leo, Sagittarius), others are reserved (Capricorn, Virgo). The sign shapes what feels natural when you show someone you care.",
      },
      {
        heading: "What you find attractive",
        body: "Venus rules aesthetic preference and romantic attraction. Your Venus sign reveals what qualities draw you in — whether that is intensity (Scorpio Venus), intellectual spark (Gemini Venus), or steadiness (Taurus Venus).",
      },
      {
        heading: "Relationship needs",
        body: "Each Venus placement has non-negotiables. Venus in Cancer needs emotional safety. Venus in Aquarius needs independence. Knowing your Venus sign helps you articulate what you actually need from a partner.",
      },
      {
        heading: "Compatibility clues",
        body: "Venus sign comparisons between two charts reveal shared or clashing love languages. Venus–Venus aspects describe mutual romantic understanding. Venus–Mars aspects describe physical chemistry.",
      },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Venus is one of the two benefic planets in traditional astrology (the other is Jupiter). It governs pleasure, beauty, art, money, and romantic love. In a birth chart, Venus's sign, house, and aspects describe the native's approach to all Venusian matters.",
      "Venus orbits closer to the Sun than Earth does, which means it never strays more than 48° from the Sun in your chart. This is why your Venus sign is always the same as your Sun sign, or one of the two adjacent signs. A person born with the Sun in Aries can only have Venus in Pisces, Aries, Taurus, Gemini, or Aquarius.",
      "When Venus is retrograde at birth (marked in results), the person may internalize Venusian energy — preferring private expressions of love, revisiting past relationships, or taking longer to trust new connections.",
    ],
  },
};
