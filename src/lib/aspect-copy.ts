import type { AspectInfo } from "./astro-engine";

const PLANET: Record<string, string> = {
  Sun: "identity and vitality",
  Moon: "emotional needs",
  Mercury: "conversation and thinking",
  Venus: "affection and attraction",
  Mars: "desire and initiative",
  Jupiter: "growth and shared beliefs",
  Saturn: "commitment and limits",
  Uranus: "independence and surprise",
  Neptune: "idealization and longing",
  Pluto: "intensity and transformation",
  Ascendant: "how someone meets the world",
  "North Node": "the direction of growth",
  Fortune: "where ease gathers",
};

const ASPECT: Record<string, string> = {
  Conjunction: "The two themes fuse and act together.",
  Sextile: "The contact is available when both people use it. It does not run on its own.",
  Square: "The contact creates friction that asks for a conscious adjustment.",
  Trine: "The contact moves easily, and can be taken for granted.",
  Opposition: "The contact is a mirror. Each person carries what the other is working on.",
  Semisextile: "The signs barely share a language. Small adjustments matter.",
  Semisquare: "A mild irritation that shows up in timing and tone.",
  Sesquisquare: "The same irritation as a semisquare, a little sharper.",
  Quincunx: "The needs do not match. The pair has to adjust rather than agree.",
};

function planetName(label: string): string {
  return label.replace(/\s+\([^)]+\)$/, "");
}

export function describeAspect(aspect: AspectInfo): string {
  const left = planetName(aspect.planet1);
  const right = planetName(aspect.planet2);
  const leftRole = PLANET[left] ?? "this placement";
  const rightRole = PLANET[right] ?? "this placement";
  const line = ASPECT[aspect.aspect] ?? "This is a measured contact between the two charts.";
  return `${left} (${leftRole}) ${aspect.aspect.toLowerCase()} ${right} (${rightRole}). ${line}`;
}
