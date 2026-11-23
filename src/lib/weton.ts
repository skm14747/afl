/**
 * Javanese weton jodoh (love-match) calculator.
 *
 * A weton is the combination of the 7-day week (saptawara) and the 5-day
 * Javanese market cycle (pancawara). Each carries a neptu value. This module
 * converts a Gregorian date to its weton, sums the neptu of two people, and
 * maps the result to one of eight traditional jodoh labels.
 *
 * The pancawara cycle is fixed and unbroken since at least the Mataram era.
 * We anchor it to a known reference: 17 August 1945 was a Friday Legi
 * (Indonesian Independence Day). Working backwards, 1 January 1900 was a
 * Monday Pahing.
 */

export interface WetonDay {
  /** Indonesian weekday name */
  hari: string;
  /** Javanese market day */
  pasaran: string;
  /** Sum of hari neptu + pasaran neptu */
  neptu: number;
}

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] as const;
const HARI_NEPTU = [5, 4, 3, 7, 8, 6, 9] as const;

const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"] as const;
const PASARAN_NEPTU = [5, 9, 7, 4, 8] as const;

/**
 * Epoch: 1 January 1900 (Monday = index 1 in JS getDay). Legi = pasaran index 0.
 * We count days from this date and mod into each cycle.
 */
const EPOCH = Date.UTC(1900, 0, 1); // Mon 1 Jan 1900
const EPOCH_HARI_INDEX = 1; // Monday
const EPOCH_PASARAN_INDEX = 1; // Pahing (verified: 17 Aug 1945 = Friday Legi)

export function wetonFromDate(date: Date): WetonDay {
  const utcMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const daysSinceEpoch = Math.round((utcMs - EPOCH) / 86_400_000);

  const hariIndex = ((EPOCH_HARI_INDEX + (daysSinceEpoch % 7) + 7) % 7);
  const pasaranIndex = ((EPOCH_PASARAN_INDEX + (daysSinceEpoch % 5) + 5) % 5);

  return {
    hari: HARI[hariIndex],
    pasaran: PASARAN[pasaranIndex],
    neptu: HARI_NEPTU[hariIndex] + PASARAN_NEPTU[pasaranIndex],
  };
}

export type JodohLabel =
  | "Pegat"
  | "Ratu"
  | "Jodoh"
  | "Topo"
  | "Tinari"
  | "Padu"
  | "Sujanan"
  | "Pesthi";

export interface JodohResult {
  label: JodohLabel;
  description: string;
}

const JODOH_TABLE: JodohResult[] = [
  { label: "Pesthi", description: "Rukun, tenteram, dan damai hingga tua. — Harmonious, peaceful, and enduring." },
  { label: "Pegat", description: "Ujian ego dan butuh kedewasaan komunikasi. — Tests the ego; maturity in communication is needed." },
  { label: "Ratu", description: "Dihormati, disegani, jodoh harmonis. — Respected and admired; a harmonious match." },
  { label: "Jodoh", description: "Saling melengkapi lahir dan batin sejati. — Complementary in body and spirit." },
  { label: "Topo", description: "Kerja keras di awal berbuah manis. — Hard work at the start, sweet fruit later." },
  { label: "Tinari", description: "Dimudahkan rezeki dan keberuntungan. — Fortune and blessings come easily." },
  { label: "Padu", description: "Dinamis, diselesaikan dengan pelukan. — Dynamic; resolved with an embrace." },
  { label: "Sujanan", description: "Fokus transparansi dan keterbukaan hati. — Transparency and openness are essential." },
];

/**
 * Sum both neptu and divide by 8; the remainder maps to the jodoh label.
 * Remainder 0 → Pesthi (index 0), 1 → Pegat (index 1), … 7 → Sujanan (index 7).
 */
export function jodohFromNeptu(neptuA: number, neptuB: number): JodohResult {
  const total = neptuA + neptuB;
  const remainder = total % 8;
  return JODOH_TABLE[remainder];
}
