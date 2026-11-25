import type { EducationalContent } from "@/components/education/EducationalSections";

export const wetonJodohEducation: EducationalContent = {
  toolId: "weton-jodoh",
  howItWorks: {
    paragraphs: [
      "Weton Jodoh is a Javanese compatibility method that combines the Gregorian birth date with the Javanese five-day week (Pasaran: Pon, Wage, Kliwon, Legi, Pahing) and the seven-day week. Each day combination carries a numerical value (neptu).",
      "The calculator determines the Javanese weekday (Pasaran) for each person's birth date using a calendrical algorithm, then sums the neptu values for both partners. The total is evaluated against traditional Javanese compatibility guidelines.",
      "This method has been used in Javanese culture for centuries as one factor in assessing marriage suitability. All calculations are performed in your browser.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Weton value", body: "Each birth day has a combined neptu value from the seven-day week (1–7) and the five-day Pasaran (1–9). Your weton is the specific day+Pasaran combination, like Senin Pon or Jumat Kliwon." },
      { heading: "Pair compatibility", body: "The sum of both weton values is interpreted through traditional guidelines. Certain totals are considered highly auspicious for marriage, while others suggest areas requiring attention." },
      { heading: "Relationship themes", body: "Each weton combination carries specific themes — financial harmony, domestic happiness, communication patterns, and spiritual alignment." },
      { heading: "Cultural context", body: "Weton Jodoh is one part of a broader Javanese compatibility assessment that may also include petungan (calculations based on names and birth order) and guidance from family elders." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Weton Jodoh belongs to the Javanese primbon tradition — a centuries-old system of divination and practical guidance that blends Hindu-Buddhist, Islamic, and indigenous Javanese elements. It is distinct from both Western and Vedic astrology.",
      "The five-day Pasaran cycle is unique to Javanese and Balinese calendar systems. It interlocks with the seven-day week to create a 35-day cycle (5 × 7) that forms the basis for much Javanese scheduling, from farming to ceremonies to marriage compatibility.",
      "In modern Indonesia, particularly in Javanese communities, Weton Jodoh remains a living tradition. While many use it as one factor among several in relationship decisions, some families consider it an important step in the marriage process. This tool provides the calculation and traditional interpretation with cultural respect.",
    ],
  },
};
