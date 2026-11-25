import type { EducationalContent } from "@/components/education/EducationalSections";

export const relationshipForecastEducation: EducationalContent = {
  toolId: "relationship-forecast",
  howItWorks: {
    paragraphs: [
      "This tool projects current and upcoming planetary transits against your composite chart or synastry aspects. It calculates where transiting planets currently sit relative to key relationship points and identifies periods of activation.",
      "The forecast highlights transits from slow-moving planets (Jupiter, Saturn, Uranus, Neptune, Pluto) to natal and composite Venus, Moon, and Sun — the placements that most influence relationship dynamics. Fast-moving transits (Moon, Mercury) are excluded because they last hours to days.",
      "Forecasts cover a rolling 12-month window. All transit calculations use real-time ephemeris data processed in your browser.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Upcoming relationship themes", body: "Each major transit activates specific themes — Venus transits bring romance, Saturn transits bring maturity or testing, Jupiter transits bring expansion and optimism." },
      { heading: "Challenge periods", body: "Hard transits (squares, oppositions) to relationship points indicate periods that require extra communication and patience. They are not bad — they catalyze growth." },
      { heading: "Opportunity windows", body: "Harmonious transits (trines, sextiles) to Venus or the composite Sun mark periods of ease, connection, and natural partnership flow." },
      { heading: "Long-term patterns", body: "Outer planet transits (Pluto, Neptune, Uranus) unfold over months to years. The forecast identifies when these transformative energies are active in the relationship." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "Transit astrology is one of the oldest predictive techniques, tracking where planets are currently and how they aspect natal chart positions. The principle is that transiting planets activate the potential described in the birth chart.",
      "In relationship forecasting, the most significant transits involve Saturn (which tests and matures), Jupiter (which expands and brings opportunities), and the outer planets (which transform). A Saturn transit to composite Venus might bring a period of seriousness or commitment decisions. A Jupiter transit to composite Moon might bring emotional expansion or a move.",
      "Forecasts describe energetic weather, not fate. The same transit can manifest differently depending on the people, their choices, and the broader context of the charts involved.",
    ],
  },
};
