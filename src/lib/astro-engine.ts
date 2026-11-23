/**
 * AstrologyForLove — Astrology Calculation Engine
 *
 * Uses astronomy-engine for real ephemeris calculations.
 * Tropical zodiac. All calculations are browser-side (no server needed).
 */

import * as Astronomy from "astronomy-engine";
import { DateTime } from "luxon";
import { ZODIAC_SIGNS, ZODIAC_ELEMENTS as ZODIAC_ELEMENTS_MAP, type ZodiacSign } from "./astrology-data";
import {
  houseOfPlanet,
  meanNorthNode,
  partOfFortune,
  shortArcMidpoint,
  signFromLongitude,
  tropicalAscendant,
  wholeSignHouses,
} from "./chart-math";

// ── Types ──

export interface BirthDetails {
  date: string; // ISO date string YYYY-MM-DD
  time?: string; // HH:MM (24h). undefined = unknown
  latitude?: number;
  longitude?: number;
  /** IANA zone, used with luxon so daylight saving is applied on the birth date. */
  timeZone?: string;
  /** Fixed offset in hours east of UTC. Used only when timeZone is absent. */
  timezone?: number;
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
  ascendant?: PlanetPosition;
  houses?: ZodiacSign[];
  northNode?: PlanetPosition;
  partOfFortune?: PlanetPosition;
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

const MAJOR_ASPECTS = [
  { name: "Conjunction", angle: 0, orb: 8, nature: "neutral" as const },
  { name: "Sextile", angle: 60, orb: 6, nature: "harmonious" as const },
  { name: "Square", angle: 90, orb: 7, nature: "challenging" as const },
  { name: "Trine", angle: 120, orb: 8, nature: "harmonious" as const },
  { name: "Opposition", angle: 180, orb: 8, nature: "challenging" as const },
];

const MINOR_ASPECTS = [
  { name: "Semisextile", angle: 30, orb: 2, nature: "neutral" as const },
  { name: "Semisquare", angle: 45, orb: 2, nature: "challenging" as const },
  { name: "Sesquisquare", angle: 135, orb: 2, nature: "challenging" as const },
  { name: "Quincunx", angle: 150, orb: 3, nature: "challenging" as const },
];

export const CHART_PLANETS = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto",
] as const;

export type ChartPlanetKey = (typeof CHART_PLANETS)[number];

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
  return signFromLongitude(longitude);
}

export function birthDetailsToDate(details: BirthDetails): Date {
  const [year, month, day] = details.date.split("-").map(Number);
  if (!details.time) {
    return new Date(Date.UTC(year, month - 1, day, 12, 0));
  }
  const [hours, minutes] = details.time.split(":").map(Number);
  if (details.timeZone) {
    const local = DateTime.fromObject(
      { year, month, day, hour: hours, minute: minutes },
      { zone: details.timeZone },
    );
    if (local.isValid) return local.toUTC().toJSDate();
  }
  const tzOffset = details.timezone ?? 0;
  return new Date(Date.UTC(year, month - 1, day, hours - tzOffset, minutes));
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

  let ascendant: PlanetPosition | undefined;
  let houses: ZodiacSign[] | undefined;
  let partOfFortunePos: PlanetPosition | undefined;
  const located =
    birthTimeKnown &&
    typeof details.latitude === "number" &&
    typeof details.longitude === "number";
  if (located) {
    const ascLon = tropicalAscendant(date, details.latitude as number, details.longitude as number);
    const placed = longitudeToSign(ascLon);
    ascendant = { planet: "Ascendant", longitude: ascLon, ...placed, retrograde: false };
    houses = wholeSignHouses(ascLon);
    const fortune = partOfFortune(ascLon, moon.longitude, sun.longitude);
    const fortuneSign = longitudeToSign(fortune);
    partOfFortunePos = { planet: "Fortune", longitude: fortune, ...fortuneSign, retrograde: false };
  }

  const nodeLon = meanNorthNode(date);
  const nodeSign = longitudeToSign(nodeLon);

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
    ascendant,
    houses,
    northNode: { planet: "North Node", longitude: nodeLon, ...nodeSign, retrograde: true },
    partOfFortune: partOfFortunePos,
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

export interface AspectOptions {
  includeMinor?: boolean;
  /** Multiplies each aspect's default orb. Scores ignore this and use 1. */
  orbFactor?: number;
  labelA?: string;
  labelB?: string;
}

export function calculateAspects(
  chart1: NatalChart,
  chart2: NatalChart,
  options: AspectOptions = {},
): AspectInfo[] {
  const aspects: AspectInfo[] = [];
  const definitions = options.includeMinor ? [...MAJOR_ASPECTS, ...MINOR_ASPECTS] : MAJOR_ASPECTS;
  const factor = options.orbFactor ?? 1;
  const labelA = options.labelA ?? "Person A";
  const labelB = options.labelB ?? "Person B";

  for (const p1Name of CHART_PLANETS) {
    for (const p2Name of CHART_PLANETS) {
      const p1 = chart1[p1Name];
      const p2 = chart2[p2Name];
      const diff = angleDifference(p1.longitude, p2.longitude);

      for (const aspectDef of definitions) {
        const orb = Math.abs(diff - aspectDef.angle);
        if (orb <= aspectDef.orb * factor) {
          aspects.push({
            planet1: `${p1.planet} (${labelA})`,
            planet2: `${p2.planet} (${labelB})`,
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

export interface OverlayHit {
  planet: string;
  house: number;
  sign: ZodiacSign;
}

export function houseOverlays(source: NatalChart, target: NatalChart): OverlayHit[] {
  if (!target.ascendant) return [];
  return CHART_PLANETS.map((key) => {
    const planet = source[key];
    return {
      planet: planet.planet,
      house: houseOfPlanet(planet.longitude, target.ascendant!.longitude),
      sign: planet.sign,
    };
  });
}

function positionFromLongitude(planet: string, longitude: number, retrograde = false): PlanetPosition {
  return { planet, longitude, retrograde, ...longitudeToSign(longitude) };
}

export function compositeChart(chartA: NatalChart, chartB: NatalChart): NatalChart {
  const mid = (key: ChartPlanetKey) =>
    positionFromLongitude(
      chartA[key].planet,
      shortArcMidpoint(chartA[key].longitude, chartB[key].longitude),
      chartA[key].retrograde || chartB[key].retrograde,
    );
  let ascendant: PlanetPosition | undefined;
  let houses: ZodiacSign[] | undefined;
  if (chartA.ascendant && chartB.ascendant) {
    const lon = shortArcMidpoint(chartA.ascendant.longitude, chartB.ascendant.longitude);
    ascendant = positionFromLongitude("Ascendant", lon);
    houses = wholeSignHouses(lon);
  }
  const sun = mid("sun");
  const moon = mid("moon");
  return {
    sun,
    moon,
    mercury: mid("mercury"),
    venus: mid("venus"),
    mars: mid("mars"),
    jupiter: mid("jupiter"),
    saturn: mid("saturn"),
    uranus: mid("uranus"),
    neptune: mid("neptune"),
    pluto: mid("pluto"),
    ascendant,
    houses,
    northNode: chartA.northNode && chartB.northNode
      ? positionFromLongitude("North Node", shortArcMidpoint(chartA.northNode.longitude, chartB.northNode.longitude), true)
      : undefined,
    partOfFortune: ascendant
      ? positionFromLongitude("Fortune", partOfFortune(ascendant.longitude, moon.longitude, sun.longitude))
      : undefined,
    birthTimeKnown: Boolean(ascendant),
    moonUncertain: false,
  };
}

export function davisonDetails(a: BirthDetails, b: BirthDetails): BirthDetails | null {
  if (!a.date || !b.date || !a.time || !b.time) return null;
  if (typeof a.latitude !== "number" || typeof b.latitude !== "number") return null;
  if (typeof a.longitude !== "number" || typeof b.longitude !== "number") return null;
  const instant = new Date((birthDetailsToDate(a).getTime() + birthDetailsToDate(b).getTime()) / 2);
  const latitude = (a.latitude + b.latitude) / 2;
  const midpoint = shortArcMidpoint(a.longitude, b.longitude);
  const lon = midpoint > 180 ? midpoint - 360 : midpoint;
  const utc = DateTime.fromJSDate(instant, { zone: "utc" });
  return {
    date: utc.toFormat("yyyy-MM-dd"),
    time: utc.toFormat("HH:mm"),
    latitude,
    longitude: lon,
    timeZone: "UTC",
  };
}

export function transitAspects(chart: NatalChart, when = new Date()): AspectInfo[] {
  const sky = calculateNatalChart({
    date: DateTime.fromJSDate(when, { zone: "utc" }).toFormat("yyyy-MM-dd"),
    time: DateTime.fromJSDate(when, { zone: "utc" }).toFormat("HH:mm"),
    timeZone: "UTC",
    latitude: 0,
    longitude: 0,
  });
  return calculateAspects(sky, chart, { labelA: "Transit", labelB: "Natal" });
}

export type ForecastTheme = "attraction" | "emotional" | "commitment" | "tension" | "ease";

export interface ForecastWindow {
  /** YYYY-MM-DD, the day in that month when the contact is tightest. */
  peakDate: string;
  monthLabel: string;
  transiting: string;
  target: string;
  aspect: string;
  orb: number;
  theme: ForecastTheme;
}

export interface RelationshipForecast {
  windows: ForecastWindow[];
  /** True when either birth time is missing, so the composite Moon is a noon estimate. */
  timesApproximate: boolean;
}

const FORECAST_TRANSITS = ["Venus", "Mars", "Jupiter", "Saturn"] as const;
const FORECAST_TARGETS = ["sun", "moon", "venus", "mars", "saturn", "jupiter"] as const;
const TRANSIT_RANK: Record<(typeof FORECAST_TRANSITS)[number], number> = {
  Saturn: 0,
  Jupiter: 1,
  Mars: 2,
  Venus: 3,
};

function forecastTheme(
  transiting: string,
  target: string,
  nature: AspectInfo["nature"],
): ForecastTheme {
  const saturn = transiting === "Saturn" || target === "Saturn";
  if (nature === "challenging" && saturn) return "commitment";
  if (nature === "challenging") return "tension";
  if (transiting === "Jupiter" || target === "Jupiter") return "ease";
  if (target === "Moon") return "emotional";
  return "attraction";
}

/**
 * Up to twelve monthly windows of transits to the composite chart.
 * A month with no major aspect inside the usual orb is omitted.
 * Transiting Moon is left out: it would fill every month.
 */
export function relationshipForecast(
  chartA: NatalChart,
  chartB: NatalChart,
  from = new Date(),
): RelationshipForecast {
  const composite = compositeChart(chartA, chartB);
  const start = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), 1));
  const windows: ForecastWindow[] = [];

  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const monthStart = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + monthOffset, 1));
    const year = monthStart.getUTCFullYear();
    const month = monthStart.getUTCMonth();
    const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

    let best: {
      day: number;
      transiting: (typeof FORECAST_TRANSITS)[number];
      target: string;
      aspect: string;
      nature: AspectInfo["nature"];
      orb: number;
    } | null = null;

    for (let day = 1; day <= days; day++) {
      const when = new Date(Date.UTC(year, month, day, 12, 0, 0));
      for (const transiting of FORECAST_TRANSITS) {
        const sky = getPlanetPosition(transiting, when);
        for (const targetKey of FORECAST_TARGETS) {
          const target = composite[targetKey];
          const diff = angleDifference(sky.longitude, target.longitude);
          for (const aspectDef of MAJOR_ASPECTS) {
            const orb = Math.abs(diff - aspectDef.angle);
            if (orb > aspectDef.orb) continue;
            const tighter = best === null || orb < best.orb - 0.001;
            const tiedAndSlower =
              best !== null &&
              Math.abs(orb - best.orb) <= 0.001 &&
              TRANSIT_RANK[transiting] < TRANSIT_RANK[best.transiting];
            if (tighter || tiedAndSlower) {
              best = {
                day,
                transiting,
                target: target.planet,
                aspect: aspectDef.name,
                nature: aspectDef.nature,
                orb,
              };
            }
          }
        }
      }
    }

    if (!best) continue;
    const peak = new Date(Date.UTC(year, month, best.day));
    windows.push({
      peakDate: peak.toISOString().slice(0, 10),
      monthLabel: new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(monthStart),
      transiting: best.transiting,
      target: best.target,
      aspect: best.aspect,
      orb: Math.round(best.orb * 100) / 100,
      theme: forecastTheme(best.transiting, best.target, best.nature),
    });
  }

  return {
    windows,
    timesApproximate:
      !chartA.birthTimeKnown ||
      !chartB.birthTimeKnown ||
      chartA.moonUncertain ||
      chartB.moonUncertain,
  };
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
  const total = aspects.length || 1;

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

// ══════════════════════════════════════════════════════════════
// LOVE LANGUAGE CALCULATOR
// Maps Venus (giving), Moon (receiving), Mars (desire expression)
// to five love language dimensions using element + sign weights.
// ══════════════════════════════════════════════════════════════

export type LoveLanguageDimension =
  | "words-of-affirmation"
  | "physical-touch"
  | "gifts"
  | "acts-of-service"
  | "quality-time";

export interface LoveLanguageScore {
  dimension: LoveLanguageDimension;
  label: string;
  score: number; // 0–100
}

export interface LoveLanguageResult {
  /** All five dimensions, sorted highest-first. */
  dimensions: LoveLanguageScore[];
  /** Top giving language (Venus-driven). */
  primaryGiving: LoveLanguageDimension;
  /** Top receiving language (Moon-driven). */
  primaryReceiving: LoveLanguageDimension;
  /** Mars-influenced desire expression style. */
  desireExpression: string;
  /** Venus sign used. */
  venusSign: ZodiacSign;
  /** Moon sign used. */
  moonSign: ZodiacSign;
  /** Mars sign used. */
  marsSign: ZodiacSign;
  /** Whether birth time was provided. */
  birthTimeKnown: boolean;
  /** Whether Moon sign might differ without birth time. */
  moonUncertain: boolean;
  /** Element-based expression style summary. */
  elementStyle: string;
}

/**
 * Per-sign weight matrix for each love language dimension.
 * Values are 0–10 representing affinity. Derived from traditional
 * element, modality, and sign-specific astrological associations.
 */
const SIGN_LOVE_LANGUAGE_WEIGHTS: Record<ZodiacSign, Record<LoveLanguageDimension, number>> = {
  Aries:       { "words-of-affirmation": 7, "physical-touch": 8, "gifts": 3, "acts-of-service": 5, "quality-time": 4 },
  Taurus:      { "words-of-affirmation": 4, "physical-touch": 9, "gifts": 8, "acts-of-service": 6, "quality-time": 7 },
  Gemini:      { "words-of-affirmation": 10, "physical-touch": 4, "gifts": 5, "acts-of-service": 3, "quality-time": 7 },
  Cancer:      { "words-of-affirmation": 6, "physical-touch": 7, "gifts": 5, "acts-of-service": 8, "quality-time": 9 },
  Leo:         { "words-of-affirmation": 9, "physical-touch": 7, "gifts": 8, "acts-of-service": 4, "quality-time": 6 },
  Virgo:       { "words-of-affirmation": 5, "physical-touch": 4, "gifts": 3, "acts-of-service": 10, "quality-time": 7 },
  Libra:       { "words-of-affirmation": 8, "physical-touch": 6, "gifts": 7, "acts-of-service": 4, "quality-time": 8 },
  Scorpio:     { "words-of-affirmation": 5, "physical-touch": 9, "gifts": 4, "acts-of-service": 6, "quality-time": 8 },
  Sagittarius: { "words-of-affirmation": 7, "physical-touch": 5, "gifts": 4, "acts-of-service": 3, "quality-time": 9 },
  Capricorn:   { "words-of-affirmation": 4, "physical-touch": 5, "gifts": 6, "acts-of-service": 9, "quality-time": 7 },
  Aquarius:    { "words-of-affirmation": 7, "physical-touch": 3, "gifts": 5, "acts-of-service": 4, "quality-time": 8 },
  Pisces:      { "words-of-affirmation": 6, "physical-touch": 8, "gifts": 7, "acts-of-service": 5, "quality-time": 9 },
};

const LOVE_LANGUAGE_LABELS: Record<LoveLanguageDimension, string> = {
  "words-of-affirmation": "Words of Affirmation",
  "physical-touch": "Physical Touch",
  "gifts": "Receiving Gifts",
  "acts-of-service": "Acts of Service",
  "quality-time": "Quality Time",
};

const ELEMENT_STYLE_DESCRIPTIONS: Record<string, string> = {
  Fire: "You express love with enthusiasm, spontaneity, and bold gestures. Your passion is visible and contagious.",
  Earth: "You express love through tangible actions, reliability, and creating physical comfort. Your love is steady and grounding.",
  Air: "You express love through ideas, conversation, and intellectual connection. Your love thrives on shared perspectives.",
  Water: "You express love through emotional depth, intuition, and soulful presence. Your love is felt before it's spoken.",
};

const MARS_DESIRE_DESCRIPTIONS: Record<ZodiacSign, string> = {
  Aries: "Direct and assertive — you pursue what you want without hesitation and find hesitation unattractive.",
  Taurus: "Slow-building and sensual — you show desire through touch, patience, and creating an atmosphere.",
  Gemini: "Flirtatious and verbal — you express desire through wit, teasing, and constant communication.",
  Cancer: "Nurturing and protective — you express desire by caring for someone and creating emotional closeness.",
  Leo: "Dramatic and generous — you express desire through grand gestures, praise, and unwavering attention.",
  Virgo: "Attentive and devoted — you express desire through thoughtfulness, noticing details, and quiet dedication.",
  Libra: "Romantic and charming — you express desire through beauty, harmony, and making someone feel adored.",
  Scorpio: "Intense and magnetic — you express desire through deep eye contact, emotional vulnerability, and passion.",
  Sagittarius: "Adventurous and playful — you express desire through shared experiences, laughter, and freedom.",
  Capricorn: "Reserved but committed — you express desire through consistency, long-term planning, and quiet ambition.",
  Aquarius: "Unconventional and cerebral — you express desire through unique experiences and intellectual fascination.",
  Pisces: "Dreamy and selfless — you express desire through empathy, creativity, and merging emotionally.",
};

export function calculateLoveLanguage(details: BirthDetails): LoveLanguageResult {
  const chart = calculateNatalChart(details);
  const venusSign = chart.venus.sign;
  const moonSign = chart.moon.sign;
  const marsSign = chart.mars.sign;

  const venusWeights = SIGN_LOVE_LANGUAGE_WEIGHTS[venusSign];
  const moonWeights = SIGN_LOVE_LANGUAGE_WEIGHTS[moonSign];
  const marsWeights = SIGN_LOVE_LANGUAGE_WEIGHTS[marsSign];

  // Venus = giving weight (40%), Moon = receiving weight (40%), Mars = desire overlay (20%)
  const dimensions: LoveLanguageDimension[] = [
    "words-of-affirmation",
    "physical-touch",
    "gifts",
    "acts-of-service",
    "quality-time",
  ];

  const scores: LoveLanguageScore[] = dimensions.map((dim) => {
    const raw =
      venusWeights[dim] * 0.4 +
      moonWeights[dim] * 0.4 +
      marsWeights[dim] * 0.2;
    // Normalize 0-10 raw to 0-100 scale
    const score = Math.round(raw * 10);
    return { dimension: dim, label: LOVE_LANGUAGE_LABELS[dim], score };
  });

  scores.sort((a, b) => b.score - a.score);

  // Determine primary giving (Venus-dominant) and receiving (Moon-dominant)
  const givingScores = dimensions.map((dim) => ({ dim, score: venusWeights[dim] }));
  givingScores.sort((a, b) => b.score - a.score);
  const primaryGiving = givingScores[0].dim;

  const receivingScores = dimensions.map((dim) => ({ dim, score: moonWeights[dim] }));
  receivingScores.sort((a, b) => b.score - a.score);
  const primaryReceiving = receivingScores[0].dim;

  const venusElement = ZODIAC_ELEMENTS_MAP[venusSign];
  const elementStyle = ELEMENT_STYLE_DESCRIPTIONS[venusElement];
  const desireExpression = MARS_DESIRE_DESCRIPTIONS[marsSign];

  return {
    dimensions: scores,
    primaryGiving,
    primaryReceiving,
    desireExpression,
    venusSign,
    moonSign,
    marsSign,
    birthTimeKnown: chart.birthTimeKnown,
    moonUncertain: chart.moonUncertain,
    elementStyle,
  };
}

// ══════════════════════════════════════════════════════════════
// RELATIONSHIP PATTERN ANALYZER
// Analyses Venus, Mars, Moon, Saturn to identify recurring
// attraction patterns, attachment tendencies, and growth edges.
// ══════════════════════════════════════════════════════════════

export type AttachmentStyle = "secure" | "anxious" | "avoidant" | "fearful-avoidant";

export interface PatternTheme {
  title: string;
  description: string;
  planetaryBasis: string;
  growthAdvice: string;
}

export interface RelationshipPatternResult {
  /** Dominant attachment style tendency. */
  attachmentStyle: AttachmentStyle;
  attachmentDescription: string;
  /** What type of partner you tend to attract. */
  attractionPattern: string;
  attractionPlanetaryBasis: string;
  /** Recurring relationship themes (2–4). */
  themes: PatternTheme[];
  /** Key planetary placements driving the patterns. */
  keyPlacements: { planet: string; sign: ZodiacSign; role: string }[];
  /** Overall growth recommendation. */
  growthEdge: string;
  /** Planetary data used. */
  venusSign: ZodiacSign;
  marsSign: ZodiacSign;
  moonSign: ZodiacSign;
  saturnSign: ZodiacSign;
  birthTimeKnown: boolean;
  moonUncertain: boolean;
}

const ATTACHMENT_TENDENCIES: Record<string, { style: AttachmentStyle; weight: number }> = {
  // Moon sign element tendencies
  "Moon-Fire":  { style: "avoidant", weight: 2 },
  "Moon-Earth": { style: "secure", weight: 3 },
  "Moon-Air":   { style: "avoidant", weight: 2 },
  "Moon-Water": { style: "anxious", weight: 3 },
  // Venus sign element tendencies
  "Venus-Fire":  { style: "avoidant", weight: 1 },
  "Venus-Earth": { style: "secure", weight: 2 },
  "Venus-Air":   { style: "avoidant", weight: 1 },
  "Venus-Water": { style: "anxious", weight: 2 },
  // Saturn sign element tendencies
  "Saturn-Fire":  { style: "fearful-avoidant", weight: 1 },
  "Saturn-Earth": { style: "secure", weight: 1 },
  "Saturn-Air":   { style: "avoidant", weight: 1 },
  "Saturn-Water": { style: "anxious", weight: 1 },
};

const ATTACHMENT_DESCRIPTIONS: Record<AttachmentStyle, string> = {
  secure: "You tend toward a secure attachment style — able to trust, communicate openly, and balance closeness with independence. Your chart suggests emotional groundedness that supports stable relationships.",
  anxious: "Your chart suggests an anxious attachment tendency — you may crave closeness, worry about abandonment, and need frequent reassurance. This comes from deep emotional sensitivity, which is also your greatest strength in love.",
  avoidant: "Your chart suggests an avoidant attachment tendency — you may value independence highly, struggle with vulnerability, and need significant personal space. Learning to let people in is your growth edge.",
  "fearful-avoidant": "Your chart suggests a fearful-avoidant tendency — you desire closeness but may fear it simultaneously. This push-pull dynamic often stems from Saturn's influence, and awareness is the first step toward healthier patterns.",
};

const VENUS_ATTRACTION_PATTERNS: Record<ZodiacSign, string> = {
  Aries: "You're drawn to confident, assertive partners who match your energy. You may unconsciously avoid people who seem 'too easy' — the chase is part of the attraction.",
  Taurus: "You're drawn to stable, sensual, and reliable partners. You may unconsciously choose people who offer material or emotional security, sometimes at the cost of excitement.",
  Gemini: "You're drawn to witty, intellectually stimulating partners. You may unconsciously avoid deep emotional vulnerability by choosing partners who keep things light.",
  Cancer: "You're drawn to nurturing, emotionally available partners. You may unconsciously seek partners who need caretaking, sometimes losing yourself in the process.",
  Leo: "You're drawn to charismatic, admiring partners who make you feel special. You may unconsciously choose relationships where validation becomes the central dynamic.",
  Virgo: "You're drawn to thoughtful, competent partners. You may unconsciously try to 'fix' partners or choose people who need improvement, creating a helper-dynamic.",
  Libra: "You're drawn to charming, aesthetically-pleasing partners who value harmony. You may unconsciously avoid conflict to the point of losing your own needs.",
  Scorpio: "You're drawn to intense, emotionally deep partners. You may unconsciously choose high-drama relationships because calm feels boring.",
  Sagittarius: "You're drawn to adventurous, freedom-loving partners. You may unconsciously leave relationships when they become routine, confusing restlessness for incompatibility.",
  Capricorn: "You're drawn to ambitious, mature partners. You may unconsciously evaluate relationships through a lens of achievement and status.",
  Aquarius: "You're drawn to unique, independent thinkers. You may unconsciously choose emotionally unavailable partners because full intimacy feels threatening.",
  Pisces: "You're drawn to sensitive, creative, or wounded partners. You may unconsciously choose people who need saving, absorbing their pain as your own.",
};

function getPatternThemes(chart: NatalChart): PatternTheme[] {
  const themes: PatternTheme[] = [];
  const venusElement = ZODIAC_ELEMENTS_MAP[chart.venus.sign];
  const marsElement = ZODIAC_ELEMENTS_MAP[chart.mars.sign];
  const moonElement = ZODIAC_ELEMENTS_MAP[chart.moon.sign];
  const saturnElement = ZODIAC_ELEMENTS_MAP[chart.saturn.sign];

  // Venus-Mars element relationship
  if (venusElement === marsElement) {
    themes.push({
      title: "Aligned Desire and Affection",
      description: "Your Venus and Mars share the same element, meaning what you want and how you pursue it are naturally aligned. You tend to be consistent in relationships — what you say you need is genuinely what you pursue.",
      planetaryBasis: `Venus in ${chart.venus.sign} (${venusElement}) & Mars in ${chart.mars.sign} (${marsElement})`,
      growthAdvice: "Because your desires are aligned, your growth edge is ensuring you don't become too rigid in your 'type' — allow yourself to be surprised.",
    });
  } else if (
    (venusElement === "Fire" && marsElement === "Water") ||
    (venusElement === "Water" && marsElement === "Fire")
  ) {
    themes.push({
      title: "Passion Meets Emotion",
      description: "There's a tension between what you're attracted to (one is bold, the other deep). You may be drawn to partners who ignite conflict because the making-up feels intensely connecting.",
      planetaryBasis: `Venus in ${chart.venus.sign} (${venusElement}) & Mars in ${chart.mars.sign} (${marsElement})`,
      growthAdvice: "Seek partners who can hold both your fire and your water — not just one extreme.",
    });
  } else if (
    (venusElement === "Air" && marsElement === "Earth") ||
    (venusElement === "Earth" && marsElement === "Air")
  ) {
    themes.push({
      title: "Mind vs. Body",
      description: "You may notice a split between intellectual attraction and physical desire. You might be mentally drawn to one type of person but physically drawn to another.",
      planetaryBasis: `Venus in ${chart.venus.sign} (${venusElement}) & Mars in ${chart.mars.sign} (${marsElement})`,
      growthAdvice: "Integration is your path — find partners where both your mind and body say yes.",
    });
  }

  // Moon-Saturn relationship (attachment and fear)
  const moonIdx = ZODIAC_SIGNS.indexOf(chart.moon.sign);
  const saturnIdx = ZODIAC_SIGNS.indexOf(chart.saturn.sign);
  const moonSaturnDistance = Math.abs(moonIdx - saturnIdx);
  const normalizedMSD = moonSaturnDistance > 6 ? 12 - moonSaturnDistance : moonSaturnDistance;

  if (normalizedMSD === 0 || normalizedMSD === 6) {
    themes.push({
      title: "Emotional Guarding",
      description: "Moon and Saturn are in a tense configuration, suggesting you may build emotional walls as a protective mechanism. Past experiences (possibly from childhood) may cause you to test partners before trusting them.",
      planetaryBasis: `Moon in ${chart.moon.sign} ${normalizedMSD === 0 ? "conjunct" : "opposite"} Saturn in ${chart.saturn.sign}`,
      growthAdvice: "Practice showing vulnerability in small doses. Trust is built incrementally, not all-or-nothing.",
    });
  } else if (normalizedMSD === 3) {
    themes.push({
      title: "Emotional Friction with Security",
      description: "Moon square Saturn suggests a recurring theme where emotional needs feel at odds with stability and structure. You may feel that expressing needs leads to rejection.",
      planetaryBasis: `Moon in ${chart.moon.sign} square Saturn in ${chart.saturn.sign}`,
      growthAdvice: "Reframe structure as a container for emotions, not a cage. The right partner will make rules feel safe, not restrictive.",
    });
  } else if (normalizedMSD === 4) {
    themes.push({
      title: "Emotional Maturity",
      description: "Moon and Saturn in trine suggests you have a natural ability to blend emotional depth with emotional discipline. You may attract partners who appreciate your groundedness.",
      planetaryBasis: `Moon in ${chart.moon.sign} trine Saturn in ${chart.saturn.sign}`,
      growthAdvice: "Don't let your natural maturity become emotional suppression. Allow yourself to be messy sometimes.",
    });
  }

  // Mars sign pattern
  if (marsElement === "Fire") {
    themes.push({
      title: "The Chase Dynamic",
      description: "With Mars in a fire sign, you tend to be the pursuer in relationships. You may lose interest once the pursuit is over, confusing the thrill of the chase with genuine connection.",
      planetaryBasis: `Mars in ${chart.mars.sign} (Fire)`,
      growthAdvice: "Practice staying present after the initial spark fades. Real connection deepens where the chase ends.",
    });
  } else if (marsElement === "Water") {
    themes.push({
      title: "Emotional Intensity Seeking",
      description: "With Mars in a water sign, you pursue emotional depth and may unconsciously create intensity to feel 'alive' in relationships. Calm periods may feel like something is wrong.",
      planetaryBasis: `Mars in ${chart.mars.sign} (Water)`,
      growthAdvice: "Learn to find comfort in peace. Not all calm is stagnation — sometimes it's safety.",
    });
  }

  // Ensure at least 2 themes
  if (themes.length < 2) {
    themes.push({
      title: "Growth Through Partnership",
      description: "Your chart suggests that relationships are a primary vehicle for your personal growth. The partners you attract mirror what you need to develop within yourself.",
      planetaryBasis: `Venus in ${chart.venus.sign}, Moon in ${chart.moon.sign}`,
      growthAdvice: "View each relationship — successful or not — as a teacher. The patterns will shift as you grow.",
    });
  }

  return themes.slice(0, 4);
}

export function analyzeRelationshipPatterns(details: BirthDetails): RelationshipPatternResult {
  const chart = calculateNatalChart(details);

  // Determine attachment style from weighted element analysis
  const moonElement = ZODIAC_ELEMENTS_MAP[chart.moon.sign];
  const venusElement = ZODIAC_ELEMENTS_MAP[chart.venus.sign];
  const saturnElement = ZODIAC_ELEMENTS_MAP[chart.saturn.sign];

  const styleScores: Record<AttachmentStyle, number> = {
    secure: 0,
    anxious: 0,
    avoidant: 0,
    "fearful-avoidant": 0,
  };

  const keys: Array<[string, string]> = [
    ["Moon", moonElement],
    ["Venus", venusElement],
    ["Saturn", saturnElement],
  ];

  for (const [planet, element] of keys) {
    const key = `${planet}-${element}`;
    const tendency = ATTACHMENT_TENDENCIES[key];
    if (tendency) {
      styleScores[tendency.style] += tendency.weight;
    }
  }

  // Find dominant style
  let attachmentStyle: AttachmentStyle = "secure";
  let maxScore = 0;
  for (const [style, score] of Object.entries(styleScores)) {
    if (score > maxScore) {
      maxScore = score;
      attachmentStyle = style as AttachmentStyle;
    }
  }

  const themes = getPatternThemes(chart);

  const keyPlacements = [
    { planet: "Venus", sign: chart.venus.sign, role: "What you value and how you give love" },
    { planet: "Mars", sign: chart.mars.sign, role: "How you pursue and express desire" },
    { planet: "Moon", sign: chart.moon.sign, role: "Your emotional needs and security patterns" },
    { planet: "Saturn", sign: chart.saturn.sign, role: "Where you face fear, limitation, and growth in love" },
  ];

  const growthEdge = attachmentStyle === "secure"
    ? "Your growth edge is maintaining authenticity — secure attachment can sometimes become people-pleasing if you're not careful."
    : attachmentStyle === "anxious"
      ? "Your growth edge is self-soothing — learning to meet some of your own emotional needs rather than seeking all reassurance externally."
      : attachmentStyle === "avoidant"
        ? "Your growth edge is vulnerability — allowing yourself to need someone without seeing it as weakness."
        : "Your growth edge is consistency — staying present in relationships through the uncomfortable middle, rather than cycling between pursuit and withdrawal.";

  return {
    attachmentStyle,
    attachmentDescription: ATTACHMENT_DESCRIPTIONS[attachmentStyle],
    attractionPattern: VENUS_ATTRACTION_PATTERNS[chart.venus.sign],
    attractionPlanetaryBasis: `Venus in ${chart.venus.sign} (${venusElement} element)`,
    themes,
    keyPlacements,
    growthEdge,
    venusSign: chart.venus.sign,
    marsSign: chart.mars.sign,
    moonSign: chart.moon.sign,
    saturnSign: chart.saturn.sign,
    birthTimeKnown: chart.birthTimeKnown,
    moonUncertain: chart.moonUncertain,
  };
}
