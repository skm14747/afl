import type { EducationalContent } from "@/components/education/EducationalSections";

export const kundliMatchingEducation: EducationalContent = {
  toolId: "kundli-matching",
  howItWorks: {
    paragraphs: [
      "Kundli Matching (Ashtakoot Milan) is the Vedic astrological method for assessing marriage compatibility. It compares the Moon nakshatras (lunar mansions) of two people and assigns points across eight categories, with a maximum score of 36.",
      "This calculator determines each person's Moon nakshatra from their birth date and time using precise lunar longitude calculations. It then evaluates all eight koots: Varna (spiritual development), Vashya (mutual attraction), Tara (health and destiny), Yoni (sexual compatibility), Graha Maitri (mental compatibility), Gana (temperament), Bhakoot (love and financial prosperity), and Nadi (health and genetics).",
      "A score of 18 or above out of 36 is traditionally considered acceptable for marriage. All calculations are performed in your browser.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Ashtakoot score", body: "The total out of 36 reflects overall Vedic compatibility. Scores above 25 are considered excellent, 18–25 good, and below 18 may require further analysis by a Vedic astrologer." },
      { heading: "Nadi dosha", body: "Nadi carries the highest weight (8 points) and relates to health and progeny. A Nadi dosha (score of 0 in this category) is traditionally considered the most significant concern." },
      { heading: "Bhakoot dosha", body: "Bhakoot (7 points) relates to the emotional and financial aspects of the marriage. A dosha here may indicate challenges in mutual happiness." },
      { heading: "Temperament match", body: "Gana (6 points) classifies temperaments as Deva (divine), Manushya (human), or Rakshasa (demonic). Same-Gana matches are easiest; cross-Gana matches can work with awareness." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Kundli Matching originates from the Vedic astrological tradition of India, documented in classical texts like Brihat Parashara Hora Shastra. It has been used for centuries as part of the arranged marriage process, alongside horoscope analysis and family considerations.",
      "The system is based on the Moon's position in one of 27 nakshatras (lunar mansions), each spanning 13°20' of the zodiac. Unlike Western astrology, which centres on the Sun sign, Vedic compatibility centres on the Moon because it represents the mind (manas) and emotional nature.",
      "Modern practitioners often use Kundli Matching as one input among many, combining it with Mangal Dosha analysis, planetary period (Dasha) compatibility, and direct chart comparison. This tool covers the Ashtakoot Milan portion of the analysis.",
    ],
  },
};
