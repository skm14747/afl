import type { EducationalContent } from "@/components/education/EducationalSections";

export const marriageEducation: EducationalContent = {
  toolId: "marriage-compatibility",
  howItWorks: {
    paragraphs: [
      "This calculator builds full natal charts for both partners and runs a comprehensive synastry analysis weighted toward long-term partnership factors. It computes positions for the Sun, Moon, Mercury, Venus, Mars, Jupiter, and Saturn, then scores compatibility across six dimensions.",
      "Marriage compatibility emphasizes Saturn contacts (commitment and stability), Moon compatibility (emotional security), and Venus alignment (shared love language) more heavily than casual compatibility tools. The scoring reflects what matters most in a lifelong partnership.",
      "When birth times and locations are provided, the calculator includes house overlays and ascendant compatibility. All calculations use the astronomy-engine ephemeris in your browser.",
    ],
  },
  whatThisTellsYou: {
    points: [
      {
        heading: "Partnership stability",
        body: "Saturn aspects between charts indicate whether two people can build a lasting structure together. Harmonious Saturn contacts create mutual respect and reliability. Challenging ones create tension around responsibility and control.",
      },
      {
        heading: "Emotional foundation",
        body: "Moon-to-Moon and Moon-to-Venus contacts reveal whether both partners feel emotionally nourished. A strong emotional foundation means the partnership can weather external stress.",
      },
      {
        heading: "Communication and conflict resolution",
        body: "Mercury aspects predict how partners discuss problems and make decisions together. Mercury-Mercury harmony makes negotiation easier. Mercury-Mars contacts affect how arguments unfold.",
      },
      {
        heading: "Shared values and direction",
        body: "Sun and Jupiter contacts indicate shared vision and growth direction. When both partners' Suns harmonize, their core life goals tend to align rather than compete.",
      },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Marriage compatibility in Western astrology draws from synastry (chart comparison) and composite charts (the midpoint chart of the relationship itself). This tool focuses on synastry, comparing the two natal charts directly.",
      "Traditional astrologers considered the 7th house (partnership), Venus (love), and the Moon (emotional nature) as the primary indicators for marriage. Modern practice adds Saturn (commitment and longevity) and considers the full aspect grid.",
      "In Vedic astrology, marriage compatibility is assessed through Kundli Matching (Ashtakoot Milan), which uses a different system based on Moon nakshatras and assigns points across eight categories. This tool uses the Western synastry approach. For the Vedic method, use the Kundli Matching calculator on this site.",
    ],
  },
};
