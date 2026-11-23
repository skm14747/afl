import { calculateNatalChart, compositeChart, relationshipForecast } from "../src/lib/astro-engine";
import { ashtakoota } from "../src/lib/guna";
import { NAKSHATRAS, nakshatraIndex, siderealLongitude } from "../src/lib/chart-math";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const diana = calculateNatalChart({
  date: "1961-07-01",
  time: "19:45",
  latitude: 52.8286,
  longitude: 0.5144,
  timeZone: "Europe/London",
});
assert(diana.ascendant?.sign === "Sagittarius", `Diana ascendant was ${diana.ascendant?.sign} ${diana.ascendant?.degree}`);

const obama = calculateNatalChart({
  date: "1961-08-04",
  time: "19:24",
  latitude: 21.3069,
  longitude: -157.8583,
  timeZone: "Pacific/Honolulu",
});
assert(obama.ascendant?.sign === "Aquarius", `Obama ascendant was ${obama.ascendant?.sign} ${obama.ascendant?.degree}`);

const a = calculateNatalChart({ date: "1990-01-01", time: "12:00", timeZone: "UTC", latitude: 0, longitude: 0 });
const b = calculateNatalChart({ date: "1992-06-15", time: "18:30", timeZone: "UTC", latitude: 10, longitude: 20 });
const composite = compositeChart(a, b);
const sunMid = ((a.sun.longitude + b.sun.longitude) % 360);
assert(Math.abs(composite.sun.degree) <= 30, "composite sun degree out of sign");
assert(composite.sun.sign.length > 0, "composite sun missing");
void sunMid;

const forecastA = relationshipForecast(a, b, new Date("2026-01-01T00:00:00Z"));
const forecastB = relationshipForecast(a, b, new Date("2026-01-15T18:00:00Z"));
assert(
  JSON.stringify(forecastA.windows) === JSON.stringify(forecastB.windows),
  "forecast peak dates shifted inside the same start month",
);
assert(forecastA.windows.length > 0 && forecastA.windows.length <= 12, `expected 1–12 windows, got ${forecastA.windows.length}`);
assert(forecastA.windows.every((window) => window.orb <= 8), "forecast orb wider than a major aspect");
const datedOnly = relationshipForecast(
  calculateNatalChart({ date: "1990-01-01" }),
  calculateNatalChart({ date: "1992-06-15" }),
  new Date("2026-01-01T00:00:00Z"),
);
assert(datedOnly.timesApproximate, "missing birth times should mark the forecast approximate");
assert(datedOnly.windows.length > 0, "missing birth times should still return planet windows");

const moonA = siderealLongitude(a.moon.longitude, new Date("1990-01-01T12:00:00Z"));
const moonB = siderealLongitude(b.moon.longitude, new Date("1992-06-15T18:30:00Z"));
const guna = ashtakoota(
  a.moon.sign,
  NAKSHATRAS[nakshatraIndex(moonA)],
  b.moon.sign,
  NAKSHATRAS[nakshatraIndex(moonB)],
);
assert(guna.total >= 0 && guna.total <= 36, `guna total ${guna.total}`);
assert(guna.kootas.length === 8, "expected 8 kootas");

console.log("engine checks passed", {
  diana: `${diana.ascendant?.sign} ${diana.ascendant?.degree}`,
  obama: `${obama.ascendant?.sign} ${obama.ascendant?.degree}`,
  compositeSun: `${composite.sun.sign} ${composite.sun.degree}`,
  guna: guna.total,
});
