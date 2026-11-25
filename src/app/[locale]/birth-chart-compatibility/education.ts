import type { EducationalContent } from "@/components/education/EducationalSections";

export const birthChartCompatEducation: EducationalContent = {
  toolId: "birth-chart-compatibility",
  howItWorks: {
    paragraphs: [
      "This calculator builds complete natal charts for two people using the astronomy-engine ephemeris, then runs a full synastry analysis. It computes positions for the Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto.",
      "The compatibility score is derived from inter-chart aspects (planet-to-planet angles), element balance, modality alignment, and — when birth times are available — house overlays. Each factor is weighted to reflect its significance in relationship astrology.",
      "All calculations run in your browser. Birth data never leaves your device.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Full-chart synastry", body: "Unlike Sun-sign-only comparisons, this tool checks every planet against every planet. A challenging Sun sign match can be offset by harmonious Venus, Moon, or Mars contacts." },
      { heading: "Aspect patterns", body: "The tool identifies clusters of harmonious and challenging aspects. A chart with many trines and sextiles flows easily; one with many squares and oppositions drives growth through friction." },
      { heading: "House activations", body: "When birth times are entered, you see which houses each partner's planets activate in the other's chart — revealing which life areas the relationship energises." },
      { heading: "Planetary balance", body: "The analysis shows whether the two charts share strong contacts in personal planets (Sun, Moon, Venus, Mars) or social/generational planets (Jupiter through Pluto)." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Birth chart compatibility is the most comprehensive Western synastry method. It evaluates the full planetary picture rather than isolating a single factor like Sun sign or Moon sign.",
      "The natal chart is a snapshot of the sky at the exact moment and place of birth. When two charts are compared, the astrologer (or algorithm) looks for aspects — angular relationships — between one person's planets and the other's. Each aspect type carries a traditional meaning refined over centuries of practice.",
      "The limitation is that no chart comparison can account for free will, personal growth, or the specific life circumstances of two people. Charts describe potential dynamics, not fixed outcomes.",
    ],
  },
};
