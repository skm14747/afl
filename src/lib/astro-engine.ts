/**
 * AstrologyForLove — Astrology Calculation Engine
 *
 * Uses astronomy-engine for real ephemeris calculations.
 * Tropical zodiac. All calculations are browser-side (no server needed).
 */

import * as Astronomy from "astronomy-engine";
import { ZODIAC_SIGNS, ZODIAC_ELEMENTS as ZODIAC_ELEMENTS_MAP, type ZodiacSign } from "./astrology-data";

// ── Types ──

export interface BirthDetails {
  date: string; // ISO date string YYYY-MM-DD
  time?: string; // HH:MM (24h). undefined = unknown
  latitude?: number;
  longitude?: number;
  timezone?: number; // offset in hours from UTC
}

export interface PlanetPosition {
  planet: string;
  longitude: number;
  sign: ZodiacSign;
  degree: number; // degree within sign (0-30)
  retrograde: boolean;
}

export interface NatalChart {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
  ascendant?: PlanetPosition; // only if birth time known
  birthTimeKnown: boolean;
  moonUncertain: boolean; // true if moon could be in different sign
}

export interface AspectInfo {
  planet1: string;
  planet2: string;
  aspect: string;
  angle: number;
  orb: number;
  nature: "harmonious" | "challenging" | "neutral";
}

export interface CompatibilityResult {
  overall: number;
  emotional: number;
  communication: number;
  romance: number;
  values: number;
  longTerm: number;
  aspects: AspectInfo[];
  strengths: string[];
  challenges: string[];
  summary: string;
}

// ── Constants ──

const SIGN_BOUNDARIES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const ASPECT_DEFINITIONS = [
  { name: "Conjunction", angle: 0, orb: 8, nature: "neutral" as const },
  { name: "Sextile", angle: 60, orb: 6, nature: "harmonious" as const },
  { name: "Square", angle: 90, orb: 7, nature: "challenging" as const },
  { name: "Trine", angle: 120, orb: 8, nature: "harmonious" as const },
  { name: "Opposition", angle: 180, orb: 8, nature: "challenging" as const },
];

// Map astronomy-engine body names
const PLANET_MAP: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mercury: Astronomy.Body.Mercury,
  Venus: Astronomy.Body.Venus,
  Mars: Astronomy.Body.Mars,
  Jupiter: Astronomy.Body.Jupiter,
  Saturn: Astronomy.Body.Saturn,
  Uranus: Astronomy.Body.Uranus,
  Neptune: Astronomy.Body.Neptune,
  Pluto: Astronomy.Body.Pluto,
};

// ── Core Calculations ──

function longitudeToSign(longitude: number): { sign: ZodiacSign; degree: number } {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const degree = normalized - signIndex * 30;
  return { sign: ZODIAC_SIGNS[signIndex], degree: Math.round(degree * 100) / 100 };
}

function birthDetailsToDate(details: BirthDetails): Date {
  const [year, month, day] = details.date.split("-").map(Number);
  if (details.time) {
    const [hours, minutes] = details.time.split(":").map(Number);
    const tzOffset = details.timezone ?? 0;
    // Convert local time to UTC
    const utcHours = hours - tzOffset;
    return new Date(Date.UTC(year, month - 1, day, utcHours, minutes));
  }
  // Default to noon UTC if no time given
  return new Date(Date.UTC(year, month - 1, day, 12, 0));
}

function makeAstroTime(d: Date): Astronomy.AstroTime {
  return Astronomy.MakeTime(d);
}

export function getPlanetPosition(planet: string, date: Date): PlanetPosition {
  const body = PLANET_MAP[planet];
  if (!body) throw new Error(`Unknown planet: ${planet}`);

  const astroTime = makeAstroTime(date);

  let longitude: number;
  if (planet === "Sun") {
    longitude = Astronomy.SunPosition(astroTime).elon;
  } else if (planet === "Moon") {
    longitude = Astronomy.EclipticGeoMoon(astroTime).lon;
  } else {
    longitude = Astronomy.EclipticLongitude(body, astroTime);
  }

  // Calculate if retrograde (not applicable to Sun/Moon)
  let retrograde = false;
  if (planet !== "Sun" && planet !== "Moon") {
    const dayBefore = new Date(date.getTime() - 86400000);
    const dayAfter = new Date(date.getTime() + 86400000);

    const lonBefore = Astronomy.EclipticLongitude(body, makeAstroTime(dayBefore));
    const lonAfter = Astronomy.EclipticLongitude(body, makeAstroTime(dayAfter));

    // Handle wrap-around at 0/360
    let diff = lonAfter - lonBefore;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    retrograde = diff < 0;
  }

  const { sign, degree } = longitudeToSign(longitude);

  return { planet, longitude, sign, degree, retrograde };
}

export function calculateNatalChart(details: BirthDetails): NatalChart {
  const date = birthDetailsToDate(details);
  const birthTimeKnown = !!details.time;

  const sun = getPlanetPosition("Sun", date);
  const moon = getPlanetPosition("Moon", date);
  const mercury = getPlanetPosition("Mercury", date);
  const venus = getPlanetPosition("Venus", date);
  const mars = getPlanetPosition("Mars", date);
  const jupiter = getPlanetPosition("Jupiter", date);
  const saturn = getPlanetPosition("Saturn", date);
  const uranus = getPlanetPosition("Uranus", date);
  const neptune = getPlanetPosition("Neptune", date);
  const pluto = getPlanetPosition("Pluto", date);

  // Check if Moon could be in a different sign (Moon moves ~12-14° per day)
  let moonUncertain = false;
  if (!birthTimeKnown) {
    const dateStart = new Date(Date.UTC(
      parseInt(details.date.split("-")[0]),
      parseInt(details.date.split("-")[1]) - 1,
      parseInt(details.date.split("-")[2]),
      0, 0
    ));
    const dateEnd = new Date(Date.UTC(
      parseInt(details.date.split("-")[0]),
      parseInt(details.date.split("-")[1]) - 1,
      parseInt(details.date.split("-")[2]),
      23, 59
    ));
    const moonStart = getPlanetPosition("Moon", dateStart);
    const moonEnd = getPlanetPosition("Moon", dateEnd);
    moonUncertain = moonStart.sign !== moonEnd.sign;
  }

  return {
    sun,
    moon,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
    ascendant: undefined, // Ascendant requires birth time + location + house system
    birthTimeKnown,
    moonUncertain,
  };
}

// ── Aspect Calculations ──

function angleDifference(lon1: number, lon2: number): number {
  let diff = Math.abs(lon1 - lon2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

export function calculateAspects(chart1: NatalChart, chart2: NatalChart): AspectInfo[] {
  const aspects: AspectInfo[] = [];
  const planets1 = ["sun", "moon", "mercury", "venus", "mars"] as const;
  const planets2 = ["sun", "moon", "mercury", "venus", "mars"] as const;

  for (const p1Name of planets1) {
    for (const p2Name of planets2) {
      const p1 = chart1[p1Name];
      const p2 = chart2[p2Name];
      const diff = angleDifference(p1.longitude, p2.longitude);

      for (const aspectDef of ASPECT_DEFINITIONS) {
        const orb = Math.abs(diff - aspectDef.angle);
        if (orb <= aspectDef.orb) {
          aspects.push({
            planet1: `${p1.planet} (Person A)`,
            planet2: `${p2.planet} (Person B)`,
            aspect: aspectDef.name,
            angle: aspectDef.angle,
            orb: Math.round(orb * 100) / 100,
            nature: aspectDef.nature,
          });
        }
      }
    }
  }

  return aspects.sort((a, b) => a.orb - b.orb);
}

// ── Compatibility Scoring ──

export function getSignCompatibilityScore(sign1: ZodiacSign, sign2: ZodiacSign): CompatibilityResult {
  const idx1 = ZODIAC_SIGNS.indexOf(sign1);
  const idx2 = ZODIAC_SIGNS.indexOf(sign2);
  const distance = Math.abs(idx1 - idx2);
  const normalizedDistance = distance > 6 ? 12 - distance : distance;

  // Scoring based on traditional astrological aspects between signs
  // 0 = conjunction (same sign), 1 = semi-sextile, 2 = sextile, 3 = square,
  // 4 = trine, 5 = quincunx, 6 = opposition
  const baseScores: Record<number, { overall: number; emotional: number; communication: number; romance: number; values: number; longTerm: number }> = {
    0: { overall: 78, emotional: 82, communication: 80, romance: 75, values: 85, longTerm: 72 },  // Same sign
    1: { overall: 55, emotional: 50, communication: 58, romance: 52, values: 55, longTerm: 58 },  // Semi-sextile
    2: { overall: 80, emotional: 75, communication: 85, romance: 78, values: 78, longTerm: 82 },  // Sextile
    3: { overall: 52, emotional: 48, communication: 50, romance: 65, values: 45, longTerm: 48 },  // Square
    4: { overall: 88, emotional: 90, communication: 85, romance: 92, values: 86, longTerm: 90 },  // Trine
    5: { overall: 48, emotional: 45, communication: 50, romance: 55, values: 42, longTerm: 46 },  // Quincunx
    6: { overall: 72, emotional: 68, communication: 70, romance: 82, values: 65, longTerm: 70 },  // Opposition
  };

  const base = baseScores[normalizedDistance];

  // Add element-based modifiers
  const elem1 = ZODIAC_ELEMENTS_MAP[sign1];
  const elem2 = ZODIAC_ELEMENTS_MAP[sign2];

  let elementBonus = 0;
  if (elem1 === elem2) elementBonus = 5;
  else if (
    (elem1 === "Fire" && elem2 === "Air") || (elem1 === "Air" && elem2 === "Fire") ||
    (elem1 === "Earth" && elem2 === "Water") || (elem1 === "Water" && elem2 === "Earth")
  ) {
    elementBonus = 3;
  }

  // Clamp scores to 0-100
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const scores = {
    overall: clamp(base.overall + elementBonus),
    emotional: clamp(base.emotional + elementBonus),
    communication: clamp(base.communication + elementBonus),
    romance: clamp(base.romance + elementBonus),
    values: clamp(base.values + elementBonus),
    longTerm: clamp(base.longTerm + elementBonus),
  };

  const { aspects, strengths, challenges, summary } = generateCompatibilityInterpretation(
    sign1, sign2, scores, normalizedDistance
  );

  return { ...scores, aspects, strengths, challenges, summary };
}

export function calculateChartCompatibility(
  chart1: NatalChart,
  chart2: NatalChart
): CompatibilityResult {
  const aspects = calculateAspects(chart1, chart2);

  let harmonious = 0;
  let challenging = 0;
  let total = aspects.length || 1;

  for (const a of aspects) {
    if (a.nature === "harmonious") harmonious++;
    if (a.nature === "challenging") challenging++;
  }

  const harmonyRatio = harmonious / total;

  // Venus-Mars aspects are weighted for romance
  const venusMarsCross = aspects.filter(
    (a) =>
      (a.planet1.includes("Venus") && a.planet2.includes("Mars")) ||
      (a.planet1.includes("Mars") && a.planet2.includes("Venus"))
  );
  const romanceBonus = venusMarsCross.some((a) => a.nature === "harmonious") ? 10 : 0;

  // Moon aspects for emotional
  const moonAspects = aspects.filter(
    (a) => a.planet1.includes("Moon") || a.planet2.includes("Moon")
  );
  const emotionalBonus = moonAspects.filter((a) => a.nature === "harmonious").length * 3;

  // Mercury aspects for communication
  const mercuryAspects = aspects.filter(
    (a) => a.planet1.includes("Mercury") || a.planet2.includes("Mercury")
  );
  const commBonus = mercuryAspects.filter((a) => a.nature === "harmonious").length * 3;

  // Sun aspects for core values
  const sunAspects = aspects.filter(
    (a) => a.planet1.includes("Sun") || a.planet2.includes("Sun")
  );
  const valuesBonus = sunAspects.filter((a) => a.nature === "harmonious").length * 3;

  const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

  const baseScore = 50 + (harmonyRatio - 0.5) * 60;

  const scores = {
    overall: clamp(baseScore + (romanceBonus + emotionalBonus + commBonus) / 3),
    emotional: clamp(baseScore + emotionalBonus),
    communication: clamp(baseScore + commBonus),
    romance: clamp(baseScore + romanceBonus),
    values: clamp(baseScore + valuesBonus),
    longTerm: clamp(baseScore + (emotionalBonus + valuesBonus) / 2),
  };

  const strengths: string[] = [];
  const challenges: string[] = [];

  if (romanceBonus > 0) strengths.push("Strong Venus-Mars attraction suggests powerful romantic chemistry.");
  if (emotionalBonus > 3) strengths.push("Moon connections indicate deep emotional understanding.");
  if (commBonus > 3) strengths.push("Mercury harmony creates natural, flowing communication.");

  for (const a of aspects.filter((a) => a.nature === "challenging").slice(0, 3)) {
    challenges.push(`${a.planet1} ${a.aspect} ${a.planet2} may require patience and compromise.`);
  }

  if (strengths.length === 0) strengths.push("There is potential for growth through your differences.");
  if (challenges.length === 0) challenges.push("Maintaining individuality within the relationship is always important.");

  return {
    ...scores,
    aspects,
    strengths,
    challenges,
    summary: `Based on the planetary positions in both birth charts, this connection shows ${
      scores.overall >= 75 ? "strong" : scores.overall >= 55 ? "moderate" : "challenging but growth-oriented"
    } compatibility with particular emphasis on ${
      scores.romance >= scores.emotional ? "romantic attraction" : "emotional bonding"
    }.`,
  };
}

// ── Interpretation Generation ──

function generateCompatibilityInterpretation(
  sign1: ZodiacSign,
  sign2: ZodiacSign,
  scores: { overall: number; emotional: number; communication: number; romance: number; values: number; longTerm: number },
  distance: number
): { aspects: AspectInfo[]; strengths: string[]; challenges: string[]; summary: string } {
  const strengths: string[] = [];
  const challenges: string[] = [];

  // Generate contextual interpretations based on sign relationship
  const aspectNames = ["conjunction", "semi-sextile", "sextile", "square", "trine", "quincunx", "opposition"];
  const aspectName = aspectNames[distance];

  const summaryMap: Record<string, string> = {
    conjunction: `${sign1} and ${sign2} share the same zodiac energy, creating a deep mutual understanding. You mirror each other's strengths and weaknesses, making this a relationship of intense familiarity.`,
    "semi-sextile": `${sign1} and ${sign2} sit side by side in the zodiac, bringing different but adjacent energies. This pairing requires conscious effort but can create a complementary bond.`,
    sextile: `${sign1} and ${sign2} form a naturally harmonious sextile aspect. Your energies flow together easily, creating a supportive and stimulating connection with room to grow.`,
    square: `${sign1} and ${sign2} form a dynamic square aspect. While this brings tension and challenge, it also creates powerful attraction and opportunities for mutual growth.`,
    trine: `${sign1} and ${sign2} share a beautiful trine aspect — the most harmonious connection in astrology. Your elements naturally complement each other, creating ease, understanding, and flow.`,
    quincunx: `${sign1} and ${sign2} form an inconjunct aspect, meaning your energies don't naturally align. This requires adjustment and flexibility, but can lead to a uniquely enriching bond.`,
    opposition: `${sign1} and ${sign2} sit across the zodiac wheel in opposition. This creates a magnetic attraction of complementary forces — you each have what the other lacks.`,
  };

  if (scores.romance >= 80) strengths.push("Strong romantic chemistry and mutual attraction.");
  if (scores.emotional >= 80) strengths.push("Deep emotional understanding and empathy.");
  if (scores.communication >= 80) strengths.push("Natural ease in communication and sharing ideas.");
  if (scores.values >= 80) strengths.push("Aligned core values and life priorities.");
  if (scores.longTerm >= 80) strengths.push("Excellent potential for a lasting, stable partnership.");

  if (scores.romance < 55) challenges.push("Romantic expression styles may differ significantly.");
  if (scores.emotional < 55) challenges.push("Emotional needs may require careful communication.");
  if (scores.communication < 55) challenges.push("Communication styles differ — patience is key.");
  if (scores.values < 55) challenges.push("Different priorities may need compromise and understanding.");

  if (strengths.length === 0) strengths.push("There is potential for growth and learning in this connection.");
  if (challenges.length === 0) challenges.push("Every relationship benefits from continued effort and empathy.");

  return {
    aspects: [],
    strengths,
    challenges,
    summary: summaryMap[aspectName] || `${sign1} and ${sign2} bring unique energies to this relationship.`,
  };
}

// ── Venus Sign Interpretation Data ──

export const VENUS_SIGN_INTERPRETATIONS: Record<ZodiacSign, {
  loveStyle: string;
  attracted: string;
  relationship: string;
  expression: string;
  needs: string;
}> = {
  Aries: {
    loveStyle: "Bold, spontaneous, and passionate. You pursue love with fearless enthusiasm.",
    attracted: "Confidence, independence, and a daring spirit.",
    relationship: "You need excitement and challenge. Routine is your enemy in love.",
    expression: "Direct and fiery — you show love through action and initiative.",
    needs: "Freedom, adventure, and a partner who can keep up with your pace.",
  },
  Taurus: {
    loveStyle: "Sensual, devoted, and steady. You build love through patience and presence.",
    attracted: "Physical beauty, stability, and emotional reliability.",
    relationship: "You seek lasting security and deep physical connection.",
    expression: "Through touch, gifts, and creating beautiful shared experiences.",
    needs: "Loyalty, consistency, and tangible expressions of love.",
  },
  Gemini: {
    loveStyle: "Witty, curious, and versatile. You fall in love with minds first.",
    attracted: "Intelligence, humor, and excellent conversation.",
    relationship: "You need mental stimulation and variety to stay engaged.",
    expression: "Through words, ideas, and constant communication.",
    needs: "Intellectual connection, social interaction, and room to explore.",
  },
  Cancer: {
    loveStyle: "Nurturing, protective, and deeply emotional. You love with your whole heart.",
    attracted: "Emotional depth, family values, and vulnerability.",
    relationship: "You seek emotional security and a true sense of home with your partner.",
    expression: "Through caring, cooking, remembering details, and creating emotional safety.",
    needs: "Emotional reassurance, loyalty, and a partner who values intimacy.",
  },
  Leo: {
    loveStyle: "Generous, dramatic, and warm. You love grandly and expect devotion in return.",
    attracted: "Confidence, charisma, and someone who appreciates your warmth.",
    relationship: "You need admiration, romance, and a partner who celebrates you.",
    expression: "Through grand gestures, gifts, praise, and unwavering loyalty.",
    needs: "Recognition, affection, and a love that feels special and exciting.",
  },
  Virgo: {
    loveStyle: "Thoughtful, devoted, and quietly caring. You show love through acts of service.",
    attracted: "Intelligence, cleanliness, and attention to detail.",
    relationship: "You seek a partnership built on mutual improvement and practical support.",
    expression: "Through helping, organizing, remembering preferences, and quiet dedication.",
    needs: "Appreciation, order, and a partner who notices your efforts.",
  },
  Libra: {
    loveStyle: "Romantic, harmonious, and partnership-oriented. Love is your art form.",
    attracted: "Beauty, charm, fairness, and social grace.",
    relationship: "You seek balance, equality, and an aesthetically pleasing partnership.",
    expression: "Through romance, compromise, creating beauty, and always considering your partner.",
    needs: "Harmony, reciprocity, and a relationship that feels fair and beautiful.",
  },
  Scorpio: {
    loveStyle: "Intense, transformative, and all-consuming. You love with volcanic depth.",
    attracted: "Mystery, emotional depth, and raw authenticity.",
    relationship: "You seek soul-level connection and complete emotional honesty.",
    expression: "Through deep emotional bonding, loyalty, and powerful intimacy.",
    needs: "Trust, honesty, depth, and a partner who can handle your intensity.",
  },
  Sagittarius: {
    loveStyle: "Adventurous, honest, and freedom-loving. Love is an exploration.",
    attracted: "Open-mindedness, humor, and a love of adventure.",
    relationship: "You need growth, travel, and philosophical connection.",
    expression: "Through shared adventures, honesty, humor, and expansive experiences.",
    needs: "Freedom, growth, laughter, and a partner who shares your wanderlust.",
  },
  Capricorn: {
    loveStyle: "Committed, traditional, and deeply loyal. You build love that lasts.",
    attracted: "Ambition, maturity, and long-term reliability.",
    relationship: "You seek a partnership that grows stronger and more valuable with time.",
    expression: "Through commitment, providing, building a future, and steady devotion.",
    needs: "Respect, stability, shared goals, and a partner who values longevity.",
  },
  Aquarius: {
    loveStyle: "Unconventional, intellectual, and freedom-oriented. Love is a meeting of minds.",
    attracted: "Uniqueness, intelligence, and humanitarian values.",
    relationship: "You need space, friendship, and a partnership that respects individuality.",
    expression: "Through friendship, shared causes, intellectual connection, and acceptance.",
    needs: "Independence, mental connection, and a partner who embraces your uniqueness.",
  },
  Pisces: {
    loveStyle: "Compassionate, dreamy, and boundlessly romantic. You love without limits.",
    attracted: "Sensitivity, creativity, and spiritual depth.",
    relationship: "You seek a soulful, almost otherworldly connection.",
    expression: "Through empathy, creativity, sacrifice, and spiritual intimacy.",
    needs: "Emotional connection, gentleness, and a partner who sees your soul.",
  },
};

// ── Moon Sign Interpretation Data ──

export const MOON_SIGN_INTERPRETATIONS: Record<ZodiacSign, {
  emotionalNature: string;
  needs: string;
  inRelationships: string;
  nurturingStyle: string;
}> = {
  Aries: {
    emotionalNature: "Quick to feel, quick to express. Your emotions are fiery and immediate.",
    needs: "Independence, action, and the freedom to express feelings directly.",
    inRelationships: "You bring passion and honesty. You need a partner who isn't afraid of emotional directness.",
    nurturingStyle: "You nurture through encouragement, motivation, and protecting those you love.",
  },
  Taurus: {
    emotionalNature: "Calm, steady, and deeply grounded. Your emotions are reliable and enduring.",
    needs: "Physical comfort, routine, and tangible security.",
    inRelationships: "You bring stability and devotion. You need consistency and patience from your partner.",
    nurturingStyle: "Through comfort — good food, warm touches, and creating a safe, beautiful home.",
  },
  Gemini: {
    emotionalNature: "Mentally oriented and changeable. You process emotions through conversation and analysis.",
    needs: "Variety, stimulation, and the ability to talk about feelings.",
    inRelationships: "You bring humor and adaptability. You need a partner who communicates openly.",
    nurturingStyle: "Through conversation, checking in, sharing information, and keeping things light.",
  },
  Cancer: {
    emotionalNature: "Profoundly sensitive and intuitive. Your emotional world is deep and responsive.",
    needs: "Safety, belonging, and deep emotional connection.",
    inRelationships: "You bring empathy and nurturing love. You need emotional reciprocity and reassurance.",
    nurturingStyle: "Through caring, feeding, remembering, and creating a home of emotional warmth.",
  },
  Leo: {
    emotionalNature: "Warm, expressive, and proud. Your heart is generous and needs to shine.",
    needs: "Recognition, creative expression, and love that feels special.",
    inRelationships: "You bring warmth and loyalty. You need appreciation and to feel truly seen.",
    nurturingStyle: "Through celebration, praise, grand gestures, and making loved ones feel important.",
  },
  Virgo: {
    emotionalNature: "Analytical and understated. You process feelings through order and service.",
    needs: "Usefulness, routine, and the ability to help and improve.",
    inRelationships: "You bring reliability and attention. You need a partner who appreciates quiet devotion.",
    nurturingStyle: "Through acts of service, organization, health care, and thoughtful practical help.",
  },
  Libra: {
    emotionalNature: "Relationship-oriented and harmony-seeking. Your emotions seek balance.",
    needs: "Fairness, partnership, and aesthetically pleasing surroundings.",
    inRelationships: "You bring diplomacy and grace. You need equality and genuine partnership.",
    nurturingStyle: "Through creating harmony, mediating, beautifying spaces, and considerate gestures.",
  },
  Scorpio: {
    emotionalNature: "Intensely deep and private. Your emotional world is powerful and transformative.",
    needs: "Emotional truth, control, and deep intimate bonds.",
    inRelationships: "You bring intensity and loyalty. You need absolute trust and emotional honesty.",
    nurturingStyle: "Through fierce protection, emotional depth, and unwavering presence in crisis.",
  },
  Sagittarius: {
    emotionalNature: "Optimistic, restless, and philosophical. You process emotions through meaning and adventure.",
    needs: "Freedom, truth, and space to explore and grow.",
    inRelationships: "You bring humor and expansion. You need a partner who respects your need for space.",
    nurturingStyle: "Through encouragement, shared experiences, humor, and inspiring others to grow.",
  },
  Capricorn: {
    emotionalNature: "Controlled, reserved, and deeply responsible. Emotions are managed carefully.",
    needs: "Structure, achievement, and respect.",
    inRelationships: "You bring commitment and reliability. You need a partner who values your steadiness.",
    nurturingStyle: "Through providing, planning, taking responsibility, and steady long-term support.",
  },
  Aquarius: {
    emotionalNature: "Detached yet humanitarian. You process emotions intellectually and value collective good.",
    needs: "Independence, mental freedom, and connection to community.",
    inRelationships: "You bring originality and friendship. You need space and intellectual respect.",
    nurturingStyle: "Through friendship, shared ideals, giving freedom, and respecting individuality.",
  },
  Pisces: {
    emotionalNature: "Boundlessly empathetic and intuitive. Your emotional world is vast and permeable.",
    needs: "Spiritual connection, creative expression, and emotional gentleness.",
    inRelationships: "You bring compassion and understanding. You need a partner who handles your sensitivity gently.",
    nurturingStyle: "Through empathy, spiritual support, creative expression, and unconditional acceptance.",
  },
};

// ── Numerology ──

export function calculateLifePathNumber(dateStr: string): number {
  const digits = dateStr.replace(/-/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

export const LIFE_PATH_MEANINGS: Record<number, { title: string; traits: string; inLove: string }> = {
  1: { title: "The Leader", traits: "Independent, ambitious, pioneering", inLove: "You need a partner who respects your autonomy and supports your ambitions." },
  2: { title: "The Diplomat", traits: "Sensitive, cooperative, harmonious", inLove: "Partnership is your natural state. You thrive in balanced, loving relationships." },
  3: { title: "The Creative", traits: "Expressive, joyful, artistic", inLove: "You bring warmth and creativity to relationships and need playful, communicative partners." },
  4: { title: "The Builder", traits: "Practical, stable, hardworking", inLove: "You build lasting partnerships on trust, reliability, and shared effort." },
  5: { title: "The Explorer", traits: "Adventurous, versatile, freedom-loving", inLove: "You need variety and freedom in relationships. Routine is your challenge." },
  6: { title: "The Nurturer", traits: "Caring, responsible, harmonious", inLove: "Love and family are central to your life. You are a devoted, nurturing partner." },
  7: { title: "The Seeker", traits: "Introspective, analytical, spiritual", inLove: "You need intellectual and spiritual depth in relationships. Surface-level won't do." },
  8: { title: "The Achiever", traits: "Powerful, ambitious, material", inLove: "You seek a partner who shares your drive and respects your need for achievement." },
  9: { title: "The Humanitarian", traits: "Compassionate, idealistic, generous", inLove: "You love broadly and deeply. You need a partner who shares your ideals." },
  11: { title: "The Intuitive", traits: "Visionary, sensitive, inspiring", inLove: "You experience love at a deep spiritual level and need a partner who understands your intensity." },
  22: { title: "The Master Builder", traits: "Visionary, practical, powerful", inLove: "You need a partnership that supports your grand vision while grounding your energy." },
  33: { title: "The Master Teacher", traits: "Compassionate, selfless, spiritual", inLove: "You love unconditionally and seek a partner who shares your devotion to others." },
};

// ── Utility: Get Sun sign from date ──

export function getSunSignFromDate(dateStr: string): ZodiacSign {
  const date = new Date(dateStr + "T12:00:00Z");
  const pos = getPlanetPosition("Sun", date);
  return pos.sign;
}
