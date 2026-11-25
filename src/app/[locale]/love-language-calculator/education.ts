import type { EducationalContent } from "@/components/education/EducationalSections";

export const loveLanguageEducation: EducationalContent = {
  toolId: "love-language-calculator",
  howItWorks: {
    paragraphs: [
      "This calculator maps your Venus and Moon signs to love language tendencies. Venus governs how you express love; the Moon governs how you need to receive it. By analysing both placements, the tool identifies your primary and secondary love languages.",
      "The five love languages (acts of service, quality time, physical touch, words of affirmation, and gift giving) each correlate with specific planetary and elemental signatures. Earth signs lean toward acts of service and physical touch. Air signs lean toward words and quality time.",
      "The calculator uses your birth date to determine Venus and Moon positions, then scores each love language based on the combination.",
    ],
  },
  whatThisTellsYou: {
    points: [
      { heading: "Your giving language", body: "Venus describes how you naturally express affection — the love language you default to when showing someone you care." },
      { heading: "Your receiving language", body: "The Moon describes what actually makes you feel loved. This is often different from how you give love, which is why mismatches occur in relationships." },
      { heading: "Partner alignment", body: "When both partners enter their birth details, the tool shows where love languages align and where they diverge — helping each person understand what the other actually needs." },
      { heading: "Actionable insights", body: "Each result includes specific suggestions for how to express love in a way that resonates with the other person's dominant language." },
    ],
  },
  astrologyBehindIt: {
    paragraphs: [
      "The love language framework was developed by Gary Chapman. This tool bridges Chapman's model with astrological placements by mapping planetary energies to love language categories. The correspondence is interpretive, not empirically validated — it uses astrological archetypes as a lens for self-reflection.",
      "Venus in earth signs (Taurus, Virgo, Capricorn) correlates with tangible expressions of love — gifts, acts of service, and physical presence. Venus in air signs (Gemini, Libra, Aquarius) correlates with verbal and intellectual expressions. Venus in fire signs (Aries, Leo, Sagittarius) correlates with quality time and bold gestures. Venus in water signs (Cancer, Scorpio, Pisces) correlates with emotional presence and devotion.",
      "The Moon modifies the picture by adding what you need emotionally. A person with Venus in Gemini (words) but Moon in Taurus (touch) might give love through conversation but need physical closeness to feel loved.",
    ],
  },
};
