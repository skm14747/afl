export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

export const ZODIAC_ELEMENTS: Record<ZodiacSign, "Fire" | "Earth" | "Air" | "Water"> = {
  Aries: "Fire",
  Taurus: "Earth",
  Gemini: "Air",
  Cancer: "Water",
  Leo: "Fire",
  Virgo: "Earth",
  Libra: "Air",
  Scorpio: "Water",
  Sagittarius: "Fire",
  Capricorn: "Earth",
  Aquarius: "Air",
  Pisces: "Water",
};

export const ZODIAC_DATE_RANGES: Record<ZodiacSign, string> = {
  Aries: "Mar 21 – Apr 19",
  Taurus: "Apr 20 – May 20",
  Gemini: "May 21 – Jun 20",
  Cancer: "Jun 21 – Jul 22",
  Leo: "Jul 23 – Aug 22",
  Virgo: "Aug 23 – Sep 22",
  Libra: "Sep 23 – Oct 22",
  Scorpio: "Oct 23 – Nov 21",
  Sagittarius: "Nov 22 – Dec 21",
  Capricorn: "Dec 22 – Jan 19",
  Aquarius: "Jan 20 – Feb 18",
  Pisces: "Feb 19 – Mar 20",
};

export const PLANETS = [
  { name: "Sun", symbol: "☉", meaning: "Core identity", influence: "Fundamental compatibility and ego expression" },
  { name: "Moon", symbol: "☽", meaning: "Emotions", influence: "Emotional needs and nurturing style" },
  { name: "Venus", symbol: "♀", meaning: "Love", influence: "Romantic attraction and love language" },
  { name: "Mars", symbol: "♂", meaning: "Passion", influence: "Physical chemistry and desire" },
  { name: "Mercury", symbol: "☿", meaning: "Communication", influence: "Mental connection and conversation style" },
  { name: "Jupiter", symbol: "♃", meaning: "Growth", influence: "Shared beliefs and expansion together" },
  { name: "Saturn", symbol: "♄", meaning: "Commitment", influence: "Long-term stability and responsibility" },
  { name: "Neptune", symbol: "♆", meaning: "Dreams", influence: "Spiritual bond and idealization" },
] as const;

export type Planet = (typeof PLANETS)[number];

export const ELEMENT_COLORS: Record<string, string> = {
  Fire: "var(--gold-500)",
  Earth: "var(--neutral-600)",
  Air: "var(--lavender-mist)",
  Water: "var(--romantic-rose)",
};
