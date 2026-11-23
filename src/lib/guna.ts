import { ZODIAC_SIGNS, type ZodiacSign } from "./astrology-data";
import { NAKSHATRAS, type Nakshatra } from "./chart-math";

export interface KootaScore {
  name: string;
  points: number;
  max: number;
  note: string;
}

export interface GunaResult {
  total: number;
  max: number;
  kootas: KootaScore[];
}

const VARNA: Record<ZodiacSign, number> = {
  Cancer: 4, Scorpio: 4, Pisces: 4,
  Aries: 3, Leo: 3, Sagittarius: 3,
  Taurus: 2, Virgo: 2, Capricorn: 2,
  Gemini: 1, Libra: 1, Aquarius: 1,
};

type Vashya = "manav" | "vanchar" | "chatushpad" | "jalchar" | "keet";

function vashyaOf(sign: ZodiacSign): Vashya {
  if (sign === "Leo") return "vanchar";
  if (sign === "Cancer" || sign === "Capricorn") return "jalchar";
  if (sign === "Scorpio") return "keet";
  if (sign === "Aries" || sign === "Taurus" || sign === "Sagittarius") return "chatushpad";
  return "manav";
}

function vashyaPoints(a: Vashya, b: Vashya): number {
  if (a === b) return 2;
  const pair = new Set([a, b]);
  if (pair.has("manav") && (pair.has("chatushpad") || pair.has("jalchar"))) return 1;
  if (pair.has("chatushpad") && pair.has("jalchar")) return 1;
  if (pair.has("vanchar") && pair.has("chatushpad")) return 1;
  return 0;
}

const YONI: Record<Nakshatra, string> = {
  Ashwini: "Horse", Bharani: "Elephant", Krittika: "Sheep", Rohini: "Serpent",
  Mrigashira: "Serpent", Ardra: "Dog", Punarvasu: "Cat", Pushya: "Sheep",
  Ashlesha: "Cat", Magha: "Rat", "Purva Phalguni": "Rat", "Uttara Phalguni": "Cow",
  Hasta: "Buffalo", Chitra: "Tiger", Swati: "Buffalo", Vishakha: "Tiger",
  Anuradha: "Deer", Jyeshtha: "Deer", Mula: "Dog", "Purva Ashadha": "Monkey",
  "Uttara Ashadha": "Mongoose", Shravana: "Monkey", Dhanishta: "Lion",
  Shatabhisha: "Horse", "Purva Bhadrapada": "Lion", "Uttara Bhadrapada": "Cow",
  Revati: "Elephant",
};

const YONI_ENEMIES = new Set([
  "Horse|Buffalo", "Elephant|Lion", "Sheep|Monkey", "Serpent|Mongoose",
  "Dog|Deer", "Cat|Rat", "Cow|Tiger",
]);

function yoniPoints(a: Nakshatra, b: Nakshatra): number {
  const ya = YONI[a];
  const yb = YONI[b];
  if (ya === yb) return 4;
  const key = [ya, yb].sort().join("|");
  if (YONI_ENEMIES.has(key)) return 0;
  return 2;
}

type Gana = "deva" | "manushya" | "rakshasa";

const GANA: Record<Nakshatra, Gana> = {
  Ashwini: "deva", Bharani: "manushya", Krittika: "rakshasa", Rohini: "manushya",
  Mrigashira: "deva", Ardra: "manushya", Punarvasu: "deva", Pushya: "deva",
  Ashlesha: "rakshasa", Magha: "rakshasa", "Purva Phalguni": "manushya",
  "Uttara Phalguni": "manushya", Hasta: "deva", Chitra: "rakshasa", Swati: "deva",
  Vishakha: "rakshasa", Anuradha: "deva", Jyeshtha: "rakshasa", Mula: "rakshasa",
  "Purva Ashadha": "manushya", "Uttara Ashadha": "manushya", Shravana: "deva",
  Dhanishta: "rakshasa", Shatabhisha: "rakshasa", "Purva Bhadrapada": "manushya",
  "Uttara Bhadrapada": "manushya", Revati: "deva",
};

function ganaPoints(girl: Gana, boy: Gana): number {
  if (girl === boy) return 6;
  if (girl === "deva" && boy === "manushya") return 5;
  if (girl === "manushya" && boy === "deva") return 5;
  if (girl === "deva" && boy === "rakshasa") return 1;
  return 0;
}

const SIGN_LORD: Record<ZodiacSign, string> = {
  Aries: "Mars", Taurus: "Venus", Gemini: "Mercury", Cancer: "Moon",
  Leo: "Sun", Virgo: "Mercury", Libra: "Venus", Scorpio: "Mars",
  Sagittarius: "Jupiter", Capricorn: "Saturn", Aquarius: "Saturn", Pisces: "Jupiter",
};

const FRIENDS: Record<string, string[]> = {
  Sun: ["Moon", "Mars", "Jupiter"],
  Moon: ["Sun", "Mercury"],
  Mars: ["Sun", "Moon", "Jupiter"],
  Mercury: ["Sun", "Venus"],
  Jupiter: ["Sun", "Moon", "Mars"],
  Venus: ["Mercury", "Saturn"],
  Saturn: ["Mercury", "Venus"],
};

const ENEMIES: Record<string, string[]> = {
  Sun: ["Venus", "Saturn"],
  Moon: [],
  Mars: ["Mercury"],
  Mercury: ["Moon"],
  Jupiter: ["Mercury", "Venus"],
  Venus: ["Sun", "Moon"],
  Saturn: ["Sun", "Moon", "Mars"],
};

function relation(from: string, to: string): "friend" | "enemy" | "neutral" {
  if (from === to) return "friend";
  if (FRIENDS[from]?.includes(to)) return "friend";
  if (ENEMIES[from]?.includes(to)) return "enemy";
  return "neutral";
}

function maitriPoints(signA: ZodiacSign, signB: ZodiacSign): number {
  const lordA = SIGN_LORD[signA];
  const lordB = SIGN_LORD[signB];
  if (lordA === lordB) return 5;
  const ab = relation(lordA, lordB);
  const ba = relation(lordB, lordA);
  const pair = [ab, ba].sort().join("-");
  if (pair === "friend-friend") return 5;
  if (pair === "friend-neutral") return 4;
  if (pair === "neutral-neutral") return 3;
  if (pair === "enemy-friend") return 1;
  if (pair === "enemy-neutral") return 0.5;
  return 0;
}

function lordsAreFriends(signA: ZodiacSign, signB: ZodiacSign): boolean {
  const lordA = SIGN_LORD[signA];
  const lordB = SIGN_LORD[signB];
  if (lordA === lordB) return true;
  return relation(lordA, lordB) === "friend" && relation(lordB, lordA) === "friend";
}

function taraOneWay(from: number, to: number): number {
  const steps = ((to - from + 27) % 27) + 1;
  const group = ((steps - 1) % 9) + 1;
  return group === 1 || group === 3 || group === 5 || group === 7 ? 0 : 1.5;
}

function bhakootPoints(girl: ZodiacSign, boy: ZodiacSign): { points: number; note: string } {
  const g = ZODIAC_SIGNS.indexOf(girl);
  const b = ZODIAC_SIGNS.indexOf(boy);
  const count = ((b - g + 12) % 12) + 1;
  const bad = count === 2 || count === 5 || count === 6 || count === 8 || count === 9 || count === 12;
  if (!bad) return { points: 7, note: "Moon signs sit in a supportive distance." };
  if (lordsAreFriends(girl, boy)) {
    return { points: 7, note: "Sign-distance dosha is cancelled because the Moon-sign lords are friends." };
  }
  return { points: 0, note: `Moon signs are ${count} and ${((g - b + 12) % 12) + 1} signs apart, a classic Bhakoot strain.` };
}

type Nadi = "adi" | "madhya" | "antya";

const NADI: Record<Nakshatra, Nadi> = {
  Ashwini: "adi", Bharani: "madhya", Krittika: "antya", Rohini: "antya",
  Mrigashira: "madhya", Ardra: "adi", Punarvasu: "adi", Pushya: "madhya",
  Ashlesha: "antya", Magha: "antya", "Purva Phalguni": "madhya", "Uttara Phalguni": "adi",
  Hasta: "adi", Chitra: "madhya", Swati: "antya", Vishakha: "antya",
  Anuradha: "madhya", Jyeshtha: "adi", Mula: "adi", "Purva Ashadha": "madhya",
  "Uttara Ashadha": "antya", Shravana: "antya", Dhanishta: "madhya",
  Shatabhisha: "adi", "Purva Bhadrapada": "adi", "Uttara Bhadrapada": "madhya",
  Revati: "antya",
};

export function ashtakoota(
  girlSign: ZodiacSign,
  girlStar: Nakshatra,
  boySign: ZodiacSign,
  boyStar: Nakshatra,
): GunaResult {
  const girlStarIndex = NAKSHATRAS.indexOf(girlStar);
  const boyStarIndex = NAKSHATRAS.indexOf(boyStar);
  const varna = VARNA[boySign] >= VARNA[girlSign] ? 1 : 0;
  const vashya = vashyaPoints(vashyaOf(girlSign), vashyaOf(boySign));
  const tara = taraOneWay(girlStarIndex, boyStarIndex) + taraOneWay(boyStarIndex, girlStarIndex);
  const yoni = yoniPoints(girlStar, boyStar);
  const maitri = maitriPoints(girlSign, boySign);
  const gana = ganaPoints(GANA[girlStar], GANA[boyStar]);
  const bhakoot = bhakootPoints(girlSign, boySign);
  let nadi = NADI[girlStar] === NADI[boyStar] ? 0 : 8;
  let nadiNote = nadi === 8 ? "Different nadis. This koota passes." : "Same nadi. This is the heaviest single dosha.";
  if (nadi === 0 && girlSign === boySign) {
    nadi = 8;
    nadiNote = "Same nadi, cancelled because both Moons are in the same sign.";
  }

  const kootas: KootaScore[] = [
    { name: "Varna", points: varna, max: 1, note: varna ? "The groom’s Moon-sign varna is equal or higher." : "The groom’s Moon-sign varna is lower." },
    { name: "Vashya", points: vashya, max: 2, note: vashya === 2 ? "Same vashya type." : vashya === 1 ? "Partial vashya match." : "Vashya types do not attract." },
    { name: "Tara", points: tara, max: 3, note: tara === 3 ? "Both tara counts are favorable." : tara === 1.5 ? "One direction is favorable." : "Both tara counts are strained." },
    { name: "Yoni", points: yoni, max: 4, note: `${YONI[girlStar]} and ${YONI[boyStar]}.` },
    { name: "Graha Maitri", points: maitri, max: 5, note: `${SIGN_LORD[girlSign]} and ${SIGN_LORD[boySign]} rule the Moon signs.` },
    { name: "Gana", points: gana, max: 6, note: `${GANA[girlStar]} and ${GANA[boyStar]}.` },
    { name: "Bhakoot", points: bhakoot.points, max: 7, note: bhakoot.note },
    { name: "Nadi", points: nadi, max: 8, note: nadiNote },
  ];

  const total = kootas.reduce((sum, koota) => sum + koota.points, 0);
  return { total: Math.round(total * 10) / 10, max: 36, kootas };
}

export interface MangalResult {
  manglik: boolean;
  cancelled: boolean;
  house: number | null;
  note: string;
}

export function mangalDosha(marsSign: ZodiacSign, lagnaSign: ZodiacSign | undefined): MangalResult {
  if (!lagnaSign) {
    return { manglik: false, cancelled: false, house: null, note: "Birth time and place are required to judge Mangal dosha from the lagna." };
  }
  const house = ((ZODIAC_SIGNS.indexOf(marsSign) - ZODIAC_SIGNS.indexOf(lagnaSign) + 12) % 12) + 1;
  const exposed = [1, 2, 4, 7, 8, 12].includes(house);
  if (!exposed) {
    return { manglik: false, cancelled: false, house, note: `Sidereal Mars is in house ${house}, outside the Mangal houses.` };
  }
  const ownOrExalted = marsSign === "Aries" || marsSign === "Scorpio" || marsSign === "Capricorn";
  const houseExceptions =
    (house === 2 && (marsSign === "Gemini" || marsSign === "Virgo")) ||
    (house === 12 && (marsSign === "Taurus" || marsSign === "Libra")) ||
    (house === 4 && (marsSign === "Aries" || marsSign === "Scorpio")) ||
    (house === 7 && (marsSign === "Cancer" || marsSign === "Capricorn")) ||
    (house === 8 && (marsSign === "Sagittarius" || marsSign === "Pisces"));
  if (ownOrExalted || houseExceptions) {
    return {
      manglik: true,
      cancelled: true,
      house,
      note: `Mars is in house ${house} in ${marsSign}, a classical cancellation.`,
    };
  }
  return { manglik: true, cancelled: false, house, note: `Sidereal Mars in house ${house} forms Mangal dosha.` };
}

const RAJJU = ["pada", "kati", "nabhi", "kanta", "siro"] as const;

function rajjuOf(index: number): (typeof RAJJU)[number] {
  const groups: number[][] = [
    [0, 8, 9, 17, 18, 26],
    [1, 7, 10, 16, 19, 25],
    [2, 6, 11, 15, 20, 24],
    [3, 5, 12, 14, 21, 23],
    [4, 13, 22],
  ];
  const found = groups.findIndex((group) => group.includes(index));
  return RAJJU[found === -1 ? 0 : found];
}

const VEDHA = new Set([
  "0|17", "1|16", "2|15", "3|14", "5|21", "6|20", "7|19", "8|18",
  "9|26", "10|25", "11|24", "12|23", "4|22",
]);

export interface PoruthamRow {
  name: string;
  pass: boolean;
  note: string;
}

export function tenPorutham(
  girlSign: ZodiacSign,
  girlStar: Nakshatra,
  boySign: ZodiacSign,
  boyStar: Nakshatra,
): PoruthamRow[] {
  const g = NAKSHATRAS.indexOf(girlStar);
  const b = NAKSHATRAS.indexOf(boyStar);
  const steps = ((b - g + 27) % 27) + 1;
  const dinaGroup = ((steps - 1) % 9) + 1;
  const dina = ![1, 3, 5, 7].includes(dinaGroup);
  const gana = ganaPoints(GANA[girlStar], GANA[boyStar]) > 0;
  const mahendra = [4, 7, 10, 13, 16, 19, 22, 25].includes(steps);
  const deergha = steps > 13;
  const yoni = yoniPoints(girlStar, boyStar) > 0;
  const bhakoot = bhakootPoints(girlSign, boySign).points > 0;
  const rasiLord = maitriPoints(girlSign, boySign) >= 1;
  const vashya = vashyaPoints(vashyaOf(girlSign), vashyaOf(boySign)) > 0;
  const rajju = rajjuOf(g) !== rajjuOf(b);
  const vedhaKey = [g, b].sort((x, y) => x - y).join("|");
  const vedha = !VEDHA.has(vedhaKey);

  return [
    { name: "Dina", pass: dina, note: dina ? "Star count is favorable." : "Star count falls in a strained tara." },
    { name: "Gana", pass: gana, note: `${GANA[girlStar]} with ${GANA[boyStar]}.` },
    { name: "Mahendra", pass: mahendra, note: mahendra ? "The count supports children and wellbeing." : "Mahendra count is absent." },
    { name: "Stree Deergha", pass: deergha, note: deergha ? "More than 13 stars from bride to groom." : "Fewer than 14 stars from bride to groom." },
    { name: "Yoni", pass: yoni, note: `${YONI[girlStar]} and ${YONI[boyStar]}.` },
    { name: "Rasi", pass: bhakoot, note: bhakoot ? "Moon-sign distance passes." : "Moon-sign distance is strained." },
    { name: "Rasi Adhipathi", pass: rasiLord, note: rasiLord ? "Moon-sign lords are not enemies." : "Moon-sign lords are enemies." },
    { name: "Vashya", pass: vashya, note: vashya ? "Vashya types can attract." : "Vashya types do not attract." },
    { name: "Rajju", pass: rajju, note: rajju ? "Different rajju." : "Same rajju. This porutham fails." },
    { name: "Vedha", pass: vedha, note: vedha ? "No vedha pair." : "These nakshatras are a vedha pair." },
  ];
}
