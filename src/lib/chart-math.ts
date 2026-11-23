import * as Astronomy from "astronomy-engine";
import { ZODIAC_SIGNS, type ZodiacSign } from "./astrology-data";

export function normalizeDegrees(value: number): number {
  return ((value % 360) + 360) % 360;
}

export function signFromLongitude(longitude: number): { sign: ZodiacSign; degree: number } {
  const normalized = normalizeDegrees(longitude);
  const signIndex = Math.floor(normalized / 30);
  const degree = normalized - signIndex * 30;
  return { sign: ZODIAC_SIGNS[signIndex], degree: Math.round(degree * 100) / 100 };
}

export function julianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

/** Lahiri (Chitrapaksha) ayanamsa in degrees. About 23.85° at J2000, plus precession. */
export function lahiriAyanamsa(date: Date): number {
  const years = (julianDay(date) - 2451545.0) / 365.25;
  return 23.85305556 + years * (50.2388475 / 3600);
}

export function siderealLongitude(tropical: number, date: Date): number {
  return normalizeDegrees(tropical - lahiriAyanamsa(date));
}

/**
 * Tropical ascendant from Greenwich sidereal time, longitude (east positive), and latitude.
 * Whole-sign houses are counted from this degree.
 */
export function tropicalAscendant(date: Date, latitude: number, longitude: number): number {
  const time = Astronomy.MakeTime(date);
  const gastHours = Astronomy.SiderealTime(time);
  const lstHours = normalizeDegrees(gastHours * 15 + longitude) / 15;
  const ramc = (lstHours * 15 * Math.PI) / 180;
  const eps = (Astronomy.e_tilt(time).tobl * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const asc = Math.atan2(
    Math.cos(ramc),
    -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps)),
  );
  return normalizeDegrees((asc * 180) / Math.PI);
}

export function wholeSignHouses(ascendantLongitude: number): ZodiacSign[] {
  const start = Math.floor(normalizeDegrees(ascendantLongitude) / 30);
  return Array.from({ length: 12 }, (_, house) => ZODIAC_SIGNS[(start + house) % 12]);
}

export function houseOfPlanet(planetLongitude: number, ascendantLongitude: number): number {
  const ascSign = Math.floor(normalizeDegrees(ascendantLongitude) / 30);
  const planetSign = Math.floor(normalizeDegrees(planetLongitude) / 30);
  return ((planetSign - ascSign + 12) % 12) + 1;
}

export function shortArcMidpoint(a: number, b: number): number {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return normalizeDegrees(a + diff / 2);
}

/** Mean ascending lunar node, tropical longitude. */
export function meanNorthNode(date: Date): number {
  const t = (julianDay(date) - 2451545.0) / 36525;
  const omega =
    125.0445479 -
    1934.1362891 * t +
    0.0020754 * t * t +
    (t * t * t) / 467441 -
    (t * t * t * t) / 60616000;
  return normalizeDegrees(omega);
}

/** Day-formula Part of Fortune: ascendant + Moon − Sun. */
export function partOfFortune(ascendant: number, moon: number, sun: number): number {
  return normalizeDegrees(ascendant + moon - sun);
}

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
  "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
  "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati",
] as const;

export type Nakshatra = (typeof NAKSHATRAS)[number];

export function nakshatraIndex(siderealLon: number): number {
  return Math.floor(normalizeDegrees(siderealLon) / (360 / 27)) % 27;
}

export function nakshatraPada(siderealLon: number): number {
  const span = 360 / 27;
  const within = normalizeDegrees(siderealLon) % span;
  return Math.floor(within / (span / 4)) + 1;
}

const NAVAMSA_START = [0, 9, 6, 3];

export function navamsaSign(siderealLon: number): ZodiacSign {
  const lon = normalizeDegrees(siderealLon);
  const sign = Math.floor(lon / 30);
  const part = Math.min(8, Math.floor((lon % 30) / (30 / 9)));
  const start = NAVAMSA_START[sign % 4];
  return ZODIAC_SIGNS[(start + part) % 12];
}

const DASHA_LORDS = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"] as const;
const DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17];

export interface DashaPeriod {
  lord: string;
  start: string;
  end: string;
  years: number;
}

export function vimshottariDashas(siderealMoon: number, birth: Date): DashaPeriod[] {
  const span = 360 / 27;
  const lon = normalizeDegrees(siderealMoon);
  const index = Math.floor(lon / span);
  const into = (lon % span) / span;
  const lordIndex = index % 9;
  const remaining = DASHA_YEARS[lordIndex] * (1 - into);
  const periods: DashaPeriod[] = [];
  let cursor = birth.getTime();
  for (let i = 0; i < 9; i++) {
    const idx = (lordIndex + i) % 9;
    const years = i === 0 ? remaining : DASHA_YEARS[idx];
    const end = cursor + years * 365.25 * 86400000;
    periods.push({
      lord: DASHA_LORDS[idx],
      years: Math.round(years * 100) / 100,
      start: new Date(cursor).toISOString().slice(0, 10),
      end: new Date(end).toISOString().slice(0, 10),
    });
    cursor = end;
  }
  return periods;
}
