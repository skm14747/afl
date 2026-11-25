import type { EducationalContent } from "@/components/education/EducationalSections";

export const marsSignEducation: EducationalContent = {
  toolId: "mars-sign-compatibility",
  howItWorks: {
    paragraphs: [
      "This calculator finds Mars's zodiac sign for two people from their birth dates using the astronomy-engine ephemeris, then compares the two Mars placements by element, modality, and aspect angle.",
      "Mars moves through each sign for roughly six weeks (longer during retrograde). The calculator is accurate to within a degree for any date in the modern era. Mars sign rarely changes within a single day, so birth time is less critical than for Moon sign.",
      "Scores cover physical chemistry, conflict style compatibility, drive alignment, and passion sustainability.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Physical chemistry", body: "Mars governs desire, physical energy, and sexual expression. When two Mars signs harmonize, physical chemistry feels natural. When they clash, it can be intensely magnetic or intensely frustrating." },
      { heading: "Conflict style", body: "Mars determines how you argue, assert yourself, and handle anger. Compatible Mars signs resolve conflict efficiently. Incompatible ones create recurring friction patterns." },
      { heading: "Drive and ambition", body: "Mars represents what motivates you to act. When two people's Mars signs align, they push toward goals in complementary ways. When they clash, one person's drive can feel threatening to the other." },
      { heading: "Passion longevity", body: "The Mars-to-Mars aspect indicates whether initial passion sustains or burns out. Trines sustain steadily, squares sustain through tension, and sextiles require active stoking." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Mars is the traditional ruler of Aries and the co-ruler of Scorpio. It represents the yang (active, assertive) principle in astrology. In a birth chart, Mars describes how you go after what you want — in love, career, and life.",
      "In synastry, Mars contacts are especially relevant for physical attraction and conflict dynamics. Venus-Mars contacts between two charts are considered the primary indicators of romantic and sexual chemistry. Mars-Mars contacts describe how two people's assertive energies interact.",
      "A Mars retrograde at birth (occurring roughly every two years for about 10 weeks) can internalize Mars energy — the person may be less outwardly aggressive but more strategically persistent. The calculator notes retrograde status when present.",
    ],
  },
};
