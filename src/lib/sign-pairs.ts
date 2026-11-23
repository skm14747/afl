/**
 * Sign-pair compatibility data for 78 unique zodiac combinations.
 *
 * Each pair has unique copy. Pairs are unordered (Aries + Taurus === Taurus + Aries),
 * so there are C(12,2) + 12 same-sign = 66 + 12 = 78 pairs.
 */

export const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

export type ZodiacSign = (typeof SIGNS)[number];

export const SIGN_DISPLAY: Record<
  ZodiacSign,
  { name: string; symbol: string; element: Element; modality: Modality; ruler: string; dates: string }
> = {
  aries: { name: "Aries", symbol: "♈", element: "fire", modality: "cardinal", ruler: "Mars", dates: "Mar 21 – Apr 19" },
  taurus: { name: "Taurus", symbol: "♉", element: "earth", modality: "fixed", ruler: "Venus", dates: "Apr 20 – May 20" },
  gemini: { name: "Gemini", symbol: "♊", element: "air", modality: "mutable", ruler: "Mercury", dates: "May 21 – Jun 20" },
  cancer: { name: "Cancer", symbol: "♋", element: "water", modality: "cardinal", ruler: "Moon", dates: "Jun 21 – Jul 22" },
  leo: { name: "Leo", symbol: "♌", element: "fire", modality: "fixed", ruler: "Sun", dates: "Jul 23 – Aug 22" },
  virgo: { name: "Virgo", symbol: "♍", element: "earth", modality: "mutable", ruler: "Mercury", dates: "Aug 23 – Sep 22" },
  libra: { name: "Libra", symbol: "♎", element: "air", modality: "cardinal", ruler: "Venus", dates: "Sep 23 – Oct 22" },
  scorpio: { name: "Scorpio", symbol: "♏", element: "water", modality: "fixed", ruler: "Pluto", dates: "Oct 23 – Nov 21" },
  sagittarius: { name: "Sagittarius", symbol: "♐", element: "fire", modality: "mutable", ruler: "Jupiter", dates: "Nov 22 – Dec 21" },
  capricorn: { name: "Capricorn", symbol: "♑", element: "earth", modality: "cardinal", ruler: "Saturn", dates: "Dec 22 – Jan 19" },
  aquarius: { name: "Aquarius", symbol: "♒", element: "air", modality: "fixed", ruler: "Uranus", dates: "Jan 20 – Feb 18" },
  pisces: { name: "Pisces", symbol: "♓", element: "water", modality: "mutable", ruler: "Neptune", dates: "Feb 19 – Mar 20" },
};

export type Element = "fire" | "earth" | "air" | "water";
export type Modality = "cardinal" | "fixed" | "mutable";

export const ELEMENT_EMOJI: Record<Element, string> = {
  fire: "🔥",
  earth: "🌍",
  air: "💨",
  water: "🌊",
};

export const ELEMENT_COMPAT: Record<string, { score: number; label: string }> = {
  "fire+fire": { score: 85, label: "Exciting and high-energy, but watch for burnout" },
  "fire+air": { score: 90, label: "Air fans the flame — inspiring and communicative" },
  "fire+earth": { score: 55, label: "Fire warms earth but can also scorch — patience needed" },
  "fire+water": { score: 50, label: "Steam or extinction — intense but tricky" },
  "earth+earth": { score: 80, label: "Stable and grounded, though sometimes too comfortable" },
  "earth+air": { score: 55, label: "Different languages — earth wants proof, air wants ideas" },
  "earth+water": { score: 85, label: "Water nourishes earth — nurturing and loyal" },
  "air+air": { score: 80, label: "Intellectually stimulating, but may avoid deep emotion" },
  "air+water": { score: 50, label: "Head meets heart — beautiful when balanced, confusing otherwise" },
  "water+water": { score: 85, label: "Deep emotional bond, but needs grounding" },
};

export function getElementCompat(e1: Element, e2: Element) {
  const key1 = `${e1}+${e2}`;
  const key2 = `${e2}+${e1}`;
  return ELEMENT_COMPAT[key1] || ELEMENT_COMPAT[key2]!;
}

/**
 * Aspect between two signs based on sign distance (0–6 signs apart).
 */
export function getSignAspect(s1: ZodiacSign, s2: ZodiacSign) {
  const i1 = SIGNS.indexOf(s1);
  const i2 = SIGNS.indexOf(s2);
  const dist = Math.abs(i1 - i2);
  const signDist = Math.min(dist, 12 - dist);

  const aspects: Record<number, { name: string; nature: string; score: number }> = {
    0: { name: "Conjunction", nature: "intense", score: 78 },
    1: { name: "Semi-sextile", nature: "mild tension", score: 55 },
    2: { name: "Sextile", nature: "harmonious", score: 85 },
    3: { name: "Square", nature: "challenging", score: 50 },
    4: { name: "Trine", nature: "harmonious", score: 92 },
    5: { name: "Quincunx", nature: "adjustment", score: 45 },
    6: { name: "Opposition", nature: "polarising", score: 65 },
  };

  return aspects[signDist]!;
}

/**
 * Modality compatibility.
 */
export function getModalityCompat(m1: Modality, m2: Modality): string {
  if (m1 === m2) return "Same modality — you operate at the same rhythm, which builds understanding but may amplify shared blind spots.";
  const pair = [m1, m2].sort().join("+");
  const map: Record<string, string> = {
    "cardinal+fixed": "One initiates, the other sustains. A powerful combination when you respect each role.",
    "cardinal+mutable": "One leads, the other adapts. Flexible and dynamic, though the mutable partner may need more consistency.",
    "fixed+mutable": "Stability meets flexibility. The fixed partner anchors, the mutable partner keeps things fresh.",
  };
  return map[pair]!;
}

/**
 * Generate the canonical pair slug (alphabetically ordered).
 */
export function pairSlug(s1: ZodiacSign, s2: ZodiacSign): string {
  const [a, b] = [s1, s2].sort();
  return `${a}-and-${b}`;
}

/**
 * Parse a pair slug back into two signs.
 */
export function parsePairSlug(slug: string): [ZodiacSign, ZodiacSign] | null {
  const match = slug.match(/^([a-z]+)-and-([a-z]+)$/);
  if (!match) return null;
  const s1 = match[1] as ZodiacSign;
  const s2 = match[2] as ZodiacSign;
  if (!SIGNS.includes(s1) || !SIGNS.includes(s2)) return null;
  return [s1, s2];
}

/**
 * Generate all 78 pair slugs.
 */
export function allPairSlugs(): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < SIGNS.length; i++) {
    for (let j = i; j < SIGNS.length; j++) {
      slugs.push(pairSlug(SIGNS[i], SIGNS[j]));
    }
  }
  return slugs;
}

export interface PairInsight {
  /** Short unique tagline for this pair. */
  tagline: string;
  /** 2-3 sentence unique description for the pair. */
  description: string;
  /** Key strengths (3 items). */
  strengths: string[];
  /** Growth areas (2-3 items). */
  challenges: string[];
  /** Famous couple or cultural reference (optional). */
  famousExample?: string;
}

/**
 * Unique copy for each of the 78 pairs.
 * Key is the canonical slug (alphabetical order).
 */
export const PAIR_INSIGHTS: Record<string, PairInsight> = {
  // ── Same-sign pairs (12) ──
  "aries-and-aries": {
    tagline: "Double fire, double drive",
    description: "Two Aries together are a force of nature — competitive, spontaneous, and fiercely independent. The spark is instant, but so is the stubbornness. This pairing works when both learn that compromise isn't defeat.",
    strengths: ["Shared energy and ambition", "Honest, direct communication", "Adventure is never in short supply"],
    challenges: ["Power struggles over who leads", "Impatience with each other's pace", "Needs conscious effort to slow down and listen"],
  },
  "taurus-and-taurus": {
    tagline: "Comfort built to last",
    description: "Two Bulls create a world of sensory pleasure and financial security. Loyalty runs deep, but so does stubbornness. When both dig in their heels, nothing moves. The key is learning to bend without breaking.",
    strengths: ["Rock-solid loyalty and trust", "Shared love of comfort and beauty", "Patient, steady affection"],
    challenges: ["Stubbornness creates stalemates", "Resistance to change can stagnate growth", "Possessiveness if boundaries aren't discussed"],
  },
  "gemini-and-gemini": {
    tagline: "A conversation that never ends",
    description: "Two Geminis are a whirlwind of ideas, laughter, and social energy. Boredom is impossible — but so is pinning things down. This pair needs to build depth alongside their breadth.",
    strengths: ["Endless intellectual stimulation", "Playful, light-hearted energy", "Social versatility as a couple"],
    challenges: ["Difficulty committing to decisions", "Surface-level connection if depth isn't intentional", "Restlessness when routine sets in"],
  },
  "cancer-and-cancer": {
    tagline: "A sanctuary of feeling",
    description: "Two Cancers build an emotional fortress together. The nurturing is profound, the intuition uncanny. But when both retreat into their shells simultaneously, communication can stall. Safety must include vulnerability.",
    strengths: ["Deep emotional understanding", "Natural caregiving and domesticity", "Fierce protectiveness of each other"],
    challenges: ["Mood swings amplify each other", "Avoidance of direct confrontation", "Risk of codependency"],
  },
  "leo-and-leo": {
    tagline: "Two monarchs, one throne",
    description: "Leo with Leo is dramatic, generous, and magnetic. Both crave admiration and give it lavishly — until ego clashes arise. When each learns to celebrate the other's spotlight, this becomes an unbeatable power couple.",
    strengths: ["Mutual admiration and pride", "Grand romantic gestures", "Confidence radiates as a pair"],
    challenges: ["Competition for attention", "Neither backs down from pride", "Needs to share the stage equally"],
  },
  "virgo-and-virgo": {
    tagline: "Perfectionism, doubled",
    description: "Two Virgos create an efficient, detail-oriented partnership. They understand each other's need for order and improvement. The risk? Turning that critical eye on each other instead of the world around them.",
    strengths: ["Shared work ethic and standards", "Practical, grounded communication", "Genuine helpfulness toward each other"],
    challenges: ["Mutual criticism can wound deeply", "Overthinking replaces spontaneity", "Difficulty expressing emotion openly"],
  },
  "libra-and-libra": {
    tagline: "Harmony seeking harmony",
    description: "Two Libras create a beautiful, balanced partnership on the surface. Both value fairness, aesthetics, and partnership itself. The challenge is making real decisions — someone has to go first.",
    strengths: ["Natural diplomacy and fairness", "Shared appreciation for beauty and culture", "Genuine enjoyment of partnership"],
    challenges: ["Indecisiveness compounds", "Conflict avoidance lets issues fester", "People-pleasing can mask real needs"],
  },
  "scorpio-and-scorpio": {
    tagline: "Intensity to the power of two",
    description: "Two Scorpios together is all or nothing. The emotional depth is oceanic, the loyalty absolute, and the jealousy… nuclear. This pair must build radical trust or the power struggles will consume them.",
    strengths: ["Unmatched emotional depth and loyalty", "Transformative, growth-oriented bond", "Powerful shared intuition"],
    challenges: ["Jealousy and possessiveness amplified", "Power struggles run deep", "Difficulty letting go of past hurts"],
  },
  "sagittarius-and-sagittarius": {
    tagline: "The world is your playground",
    description: "Two Archers together is a perpetual adventure — travel, philosophy, and boundless optimism. Commitment may need a different vocabulary here, because freedom is non-negotiable for both.",
    strengths: ["Shared wanderlust and curiosity", "Optimistic, growth-oriented outlook", "Intellectual and philosophical depth"],
    challenges: ["Commitment can feel like a cage", "Bluntness hurts without cushion", "Difficulty building routine and stability"],
  },
  "capricorn-and-capricorn": {
    tagline: "Ambition meets its match",
    description: "Two Capricorns build empires together. The work ethic is unmatched, the loyalty earned through actions not words. But all work and no play makes for a partnership that forgets to enjoy what it's built.",
    strengths: ["Shared ambition and long-term vision", "Deep respect for each other's achievements", "Reliability you can build a life on"],
    challenges: ["Emotional expression doesn't come naturally", "Work-life balance tilts toward work", "Needs conscious effort to inject fun and romance"],
  },
  "aquarius-and-aquarius": {
    tagline: "Two rebels with a cause",
    description: "Two Aquarians form a meeting of minds that can reshape their corner of the world. Independence is sacred, convention is optional. The challenge is building emotional intimacy alongside intellectual partnership.",
    strengths: ["Intellectual kinship and shared ideals", "Respect for each other's independence", "Progressive, unconventional approach to love"],
    challenges: ["Emotional detachment can feel cold", "Both avoid vulnerability", "Friendship can overshadow romantic depth"],
  },
  "pisces-and-pisces": {
    tagline: "Swimming in shared dreams",
    description: "Two Pisces create a world of imagination, empathy, and spiritual connection. The bond feels telepathic. But without grounding, this pair can drift — both need at least one anchor to reality.",
    strengths: ["Profound empathy and intuition", "Creative and spiritual synergy", "Unconditional emotional acceptance"],
    challenges: ["Escapism when reality feels hard", "Boundaries dissolve too easily", "Needs practical grounding from outside the relationship"],
  },

  // ── Cross-sign pairs (66) ──
  "aries-and-taurus": {
    tagline: "The spark and the steady flame",
    description: "Aries charges ahead; Taurus plants roots. This pairing works when Aries learns patience and Taurus embraces spontaneity. The result is a relationship with both excitement and staying power.",
    strengths: ["Aries brings energy, Taurus brings endurance", "Physical chemistry is strong (Mars + Venus)", "They cover each other's blind spots"],
    challenges: ["Aries' impulsiveness clashes with Taurus' caution", "Different paces can frustrate both", "Stubbornness from both sides"],
  },
  "aries-and-gemini": {
    tagline: "Fast minds, faster hearts",
    description: "Aries and Gemini keep each other endlessly entertained. Both love novelty, movement, and independence. The pace is exhilarating — just don't forget to build something that lasts beyond the thrill.",
    strengths: ["Mutual love of adventure and ideas", "Lively, stimulating conversations", "Neither tries to control the other"],
    challenges: ["Depth can be sacrificed for speed", "Follow-through on commitments", "Aries wants action, Gemini wants options"],
  },
  "aries-and-cancer": {
    tagline: "The warrior and the nurturer",
    description: "Aries' boldness meets Cancer's tenderness. This pairing has beautiful protective instincts but clashes over emotional style — Aries is direct, Cancer is indirect. Learning each other's language is the work.",
    strengths: ["Aries protects, Cancer nurtures", "Both are cardinal — they get things started", "Passion meets emotional depth"],
    challenges: ["Aries' bluntness wounds Cancer deeply", "Cancer's moods confuse action-oriented Aries", "Different conflict styles"],
  },
  "aries-and-leo": {
    tagline: "Fire meets fire — and the room notices",
    description: "Aries and Leo are a power couple that turns heads. Both are confident, passionate, and generous. The mutual admiration is genuine — as long as neither tries to outshine the other.",
    strengths: ["Incredible mutual energy and confidence", "Generous, warm-hearted affection", "Shared love of adventure and excitement"],
    challenges: ["Ego clashes over leadership", "Both need to feel like number one", "Arguments can be theatrical"],
  },
  "aries-and-virgo": {
    tagline: "Impulse meets analysis",
    description: "Aries leaps first; Virgo plans every step. This unlikely pair works when Aries appreciates Virgo's care and Virgo trusts Aries' instincts. Together, they balance vision and execution.",
    strengths: ["Complementary strengths: big picture + details", "Both value self-improvement", "High work ethic from different angles"],
    challenges: ["Aries finds Virgo too cautious", "Virgo finds Aries too reckless", "Critical Virgo + impatient Aries = friction"],
  },
  "aries-and-libra": {
    tagline: "Opposites across the zodiac wheel",
    description: "Aries and Libra are the classic zodiac opposition — self vs. partnership. The attraction is magnetic: Aries' decisiveness fascinates Libra, and Libra's grace softens Aries. The tension is what makes it grow.",
    strengths: ["Magnetic opposing-sign attraction", "Balance of independence and togetherness", "Aries inspires action, Libra inspires harmony"],
    challenges: ["Decision-making styles clash", "Aries' directness vs. Libra's diplomacy", "The opposition requires conscious integration"],
  },
  "aries-and-scorpio": {
    tagline: "Mars-ruled intensity",
    description: "Both ruled by Mars (traditional), Aries and Scorpio share raw passion and determination. This is never a lukewarm pairing — it's deeply magnetic or deeply combative. Usually both.",
    strengths: ["Passionate, all-in commitment", "Shared Mars energy and determination", "Neither is afraid of intensity"],
    challenges: ["Power struggles are fierce", "Scorpio's depth vs. Aries' directness", "Trust must be earned layer by layer"],
  },
  "aries-and-sagittarius": {
    tagline: "The great adventure",
    description: "Fire meets fire in the most optimistic way possible. Aries and Sagittarius share enthusiasm, honesty, and wanderlust. This pair feels like freedom — the challenge is building a home base between adventures.",
    strengths: ["Shared passion for exploration", "Honest, straightforward communication", "Mutual respect for independence"],
    challenges: ["Commitment timeline may differ", "Both can be blunt to the point of carelessness", "Routine feels suffocating to both"],
  },
  "aries-and-capricorn": {
    tagline: "The warrior and the architect",
    description: "Aries attacks goals with passion; Capricorn builds toward them with strategy. This cardinal pair respects ambition in each other. The friction comes from tempo — Aries sprints, Capricorn runs the marathon.",
    strengths: ["Mutual respect for ambition and drive", "Cardinal initiative from both sides", "They push each other to achieve more"],
    challenges: ["Aries' impulsiveness vs. Capricorn's caution", "Different emotional temperatures", "Work-related stress can dominate"],
  },
  "aries-and-aquarius": {
    tagline: "Independent spirits, united",
    description: "Aries and Aquarius both prize independence and originality. This pairing is energising and unconventional — a true partnership of equals who refuse to conform. Emotional depth takes intentional effort.",
    strengths: ["Mutual respect for freedom", "Innovative and forward-thinking together", "Neither is clingy or possessive"],
    challenges: ["Emotional intimacy doesn't come naturally", "Aries wants personal passion, Aquarius wants collective ideals", "Stubbornness from both sides"],
  },
  "aries-and-pisces": {
    tagline: "The hero and the dreamer",
    description: "Aries' confidence draws out Pisces' imagination. Pisces softens Aries' edges with empathy. This works beautifully when Aries protects without overpowering and Pisces shares feelings without drowning Aries.",
    strengths: ["Aries' strength comforts sensitive Pisces", "Pisces' intuition deepens Aries' self-awareness", "Creative and passionate chemistry"],
    challenges: ["Aries can overwhelm gentle Pisces", "Pisces' indirectness frustrates Aries", "Different conflict styles"],
  },
  "taurus-and-gemini": {
    tagline: "The gardener and the butterfly",
    description: "Taurus wants to settle in; Gemini wants to explore. This pair stretches each other — Taurus teaches Gemini patience, Gemini shows Taurus that change isn't a threat. The growth is in the difference.",
    strengths: ["Gemini brings mental stimulation to Taurus' world", "Taurus grounds Gemini's scattered energy", "Venus + Mercury = love through words and touch"],
    challenges: ["Very different paces and priorities", "Taurus wants consistency, Gemini craves variety", "Requires real effort to meet in the middle"],
  },
  "taurus-and-cancer": {
    tagline: "Home is wherever you are",
    description: "Taurus and Cancer are natural homebuilders. Both value security, comfort, and loyalty. This is one of the most naturally compatible pairings — the challenge is ensuring comfort doesn't become complacency.",
    strengths: ["Deep mutual need for security and stability", "Sensual, nurturing affection", "Natural domestic harmony"],
    challenges: ["Resistance to change from both sides", "Possessiveness can creep in", "Comfort zone may limit growth"],
  },
  "taurus-and-leo": {
    tagline: "Luxury meets royalty",
    description: "Both love the finer things and grand gestures. Taurus provides material comfort; Leo provides warmth and drama. The fixed-sign clash comes when stubbornness meets pride — neither yields easily.",
    strengths: ["Shared appreciation for quality and luxury", "Loyal, devoted partnership", "Strong physical attraction"],
    challenges: ["Fixed-sign stubbornness from both", "Leo needs attention, Taurus needs calm", "Financial approaches may differ"],
  },
  "taurus-and-virgo": {
    tagline: "Earth's most practical love story",
    description: "Taurus and Virgo share a language of reliability, patience, and tangible affection. This trine pairing flows naturally — the quiet devotion here is the kind that builds lifetimes.",
    strengths: ["Shared practical values and work ethic", "Earthy, sensual connection", "Mutual attention to detail and quality"],
    challenges: ["Virgo's criticism can wound Taurus", "Both can be too conservative with risk", "May need to inject more spontaneity"],
  },
  "taurus-and-libra": {
    tagline: "Venus, two ways",
    description: "Both ruled by Venus, Taurus and Libra share a love of beauty, harmony, and pleasure. But Taurus expresses Venus through the body and senses; Libra through the mind and aesthetics. Same planet, different languages.",
    strengths: ["Shared Venusian love of beauty and harmony", "Refined, aesthetically pleasing partnership", "Genuine enjoyment of each other's company"],
    challenges: ["Taurus is possessive, Libra needs social freedom", "Decision-making styles differ", "Taurus wants earthly comfort, Libra wants social grace"],
  },
  "taurus-and-scorpio": {
    tagline: "The magnetic opposition",
    description: "Taurus and Scorpio sit opposite each other on the zodiac wheel — the axis of desire, possession, and transformation. The attraction is powerful and primal. This pair transforms each other, for better or worse.",
    strengths: ["Intense magnetic attraction", "Deep loyalty and commitment from both", "Transformative emotional and physical bond"],
    challenges: ["Jealousy and possessiveness amplified", "Power struggles over control", "Both dig in — compromise is hard-won"],
  },
  "taurus-and-sagittarius": {
    tagline: "Roots and wings",
    description: "Taurus builds the garden; Sagittarius roams the world. This pair must negotiate between security and adventure. When they find the balance, Taurus gains perspective and Sagittarius gains grounding.",
    strengths: ["Each offers what the other lacks", "Both are honest in different ways", "Potential for real growth through friction"],
    challenges: ["Fundamentally different lifestyles", "Taurus feels abandoned, Sagittarius feels caged", "Requires significant compromise"],
  },
  "taurus-and-capricorn": {
    tagline: "The power couple that builds empires",
    description: "Taurus and Capricorn are earth's dream team — practical, ambitious, and loyal. They build together with shared values and long timelines. The only risk is forgetting that life needs play as well as work.",
    strengths: ["Shared material values and long-term goals", "Deep mutual respect and reliability", "Understated but rock-solid devotion"],
    challenges: ["Emotional expression can be limited", "Risk of all-work-no-play dynamic", "Stubbornness squared"],
  },
  "taurus-and-aquarius": {
    tagline: "Tradition meets revolution",
    description: "Fixed earth meets fixed air in one of the zodiac's most stubborn squares. Taurus wants the familiar; Aquarius wants the future. When both stop trying to convert the other, genuine respect emerges.",
    strengths: ["Both are incredibly loyal once committed", "Different perspectives spark growth", "Fixed determination means neither gives up easily"],
    challenges: ["Fundamental value clashes", "Taurus wants physical presence, Aquarius needs space", "Neither budges without a fight"],
  },
  "taurus-and-pisces": {
    tagline: "The artist and the muse",
    description: "Taurus' earthy sensuality meets Pisces' dreamy romanticism. This sextile pairing flows easily — Taurus gives Pisces stability, Pisces gives Taurus imagination. A gentle, creative love story.",
    strengths: ["Natural ease and flow between them", "Sensual and romantic chemistry", "Taurus grounds Pisces' dreams into reality"],
    challenges: ["Pisces' escapism frustrates practical Taurus", "Communication styles differ", "Taurus needs certainty, Pisces lives in feeling"],
  },
  "cancer-and-gemini": {
    tagline: "Head and heart in conversation",
    description: "Gemini processes through thinking; Cancer processes through feeling. This pairing works when Gemini learns to listen to emotions and Cancer learns to articulate them. The curiosity they bring to each other is the bridge.",
    strengths: ["Gemini helps Cancer express feelings verbally", "Cancer gives Gemini emotional depth", "Both are adaptable and care about connection"],
    challenges: ["Gemini's detachment hurts Cancer", "Cancer's moods confuse logical Gemini", "Different attachment styles"],
  },
  "gemini-and-leo": {
    tagline: "The storyteller and the star",
    description: "Gemini and Leo light up any room together. Gemini's wit meets Leo's warmth in a sextile that feels effortless. Both love social life, creativity, and play. The bond is joyful when both feel seen.",
    strengths: ["Mutual love of fun, creativity, and socialising", "Gemini's words make Leo feel admired", "Leo's warmth makes Gemini feel valued"],
    challenges: ["Gemini's flirtatiousness can trigger Leo's jealousy", "Leo needs loyalty, Gemini needs freedom", "Depth requires conscious effort"],
  },
  "gemini-and-virgo": {
    tagline: "Mercury's two faces",
    description: "Both ruled by Mercury, Gemini and Virgo are sharp, verbal, and analytical. But Gemini scatters while Virgo organises. This square pair can either nitpick each other apart or build something brilliantly functional.",
    strengths: ["Shared intellectual curiosity", "Excellent communicators", "Mercury-ruled mental agility"],
    challenges: ["Gemini's chaos vs. Virgo's order", "Virgo's criticism meets Gemini's defensiveness", "Square tension requires active management"],
  },
  "gemini-and-libra": {
    tagline: "Air signs in perfect conversation",
    description: "Gemini and Libra are the zodiac's most socially gifted trine. Both love ideas, beauty, and connection. This pairing is intellectually electric and genuinely fun — the work is adding emotional depth.",
    strengths: ["Effortless intellectual connection", "Shared love of culture and socialising", "Balanced, fair-minded partnership"],
    challenges: ["Both avoid heavy emotions", "Indecisiveness compounds", "Needs grounding to build lasting commitment"],
  },
  "gemini-and-scorpio": {
    tagline: "Curiosity meets secrets",
    description: "Gemini asks every question; Scorpio guards every answer. This quincunx pairing requires significant adjustment. When it works, Gemini gains depth and Scorpio gains lightness. When it doesn't, trust crumbles.",
    strengths: ["Intellectual fascination with each other", "Scorpio's depth answers Gemini's curiosity", "Neither is boring to the other"],
    challenges: ["Trust issues — Gemini's openness vs. Scorpio's secrecy", "Very different emotional needs", "Requires major adjustment from both"],
  },
  "gemini-and-sagittarius": {
    tagline: "The great debate across the zodiac",
    description: "Gemini and Sagittarius are the opposing-sign duo of knowledge — Gemini collects facts, Sagittarius seeks meaning. The attraction is intellectual and adventurous. Both need space, which they readily give.",
    strengths: ["Passionate intellectual connection", "Shared love of learning and travel", "Mutual respect for independence"],
    challenges: ["Sagittarius' bluntness can wound", "Gemini's surface skimming frustrates Sagittarius", "Commitment timelines may differ"],
  },
  "gemini-and-capricorn": {
    tagline: "The free spirit and the strategist",
    description: "Gemini darts between interests; Capricorn builds a career. This quincunx pair must bridge a real gap in approach to life. When they do, Gemini adds levity and Capricorn adds substance.",
    strengths: ["Capricorn provides structure Gemini needs", "Gemini brings humour and flexibility", "Both are intelligent in complementary ways"],
    challenges: ["Very different priorities", "Capricorn sees Gemini as flaky", "Gemini sees Capricorn as too serious"],
  },
  "gemini-and-aquarius": {
    tagline: "Minds that spark",
    description: "Gemini and Aquarius are the zodiac's most intellectually alive trine. Both prize ideas, independence, and unconventional thinking. This pairing is stimulating and free — depth of feeling is the growth edge.",
    strengths: ["Brilliant intellectual chemistry", "Shared love of freedom and innovation", "Neither tries to cage the other"],
    challenges: ["Emotional depth requires conscious effort", "Both can intellectualise feelings away", "Routine bores both — stability needs work"],
  },
  "gemini-and-pisces": {
    tagline: "The storyteller and the poet",
    description: "Both mutable, both imaginative, both changeable. Gemini communicates through words, Pisces through feeling. This square pair either creates something magical or talks past each other entirely.",
    strengths: ["Shared creativity and imagination", "Both are adaptable and flexible", "Potential for deeply romantic connection"],
    challenges: ["Gemini's logic vs. Pisces' emotion", "Mutable instability from both sides", "Misunderstandings are common"],
  },
  "cancer-and-leo": {
    tagline: "The nurturer and the king",
    description: "Cancer provides the emotional foundation; Leo provides the warmth and confidence. This semi-sextile pair works when Leo appreciates Cancer's care and Cancer basks in Leo's sunshine rather than retreating from it.",
    strengths: ["Cancer's devotion meets Leo's generosity", "Strong family-oriented values", "Warm, loyal, and protective of each other"],
    challenges: ["Cancer's moods vs. Leo's need for positivity", "Leo's social life vs. Cancer's homebody nature", "Different attention needs"],
  },
  "cancer-and-virgo": {
    tagline: "Quiet devotion, loud results",
    description: "Cancer and Virgo share a sextile that speaks through acts of service and attention. Both show love through doing — cooking, fixing, remembering. The bond is understated but deeply felt.",
    strengths: ["Shared value of service and care", "Natural domestic harmony", "Both notice and remember the small things"],
    challenges: ["Virgo's criticism vs. Cancer's sensitivity", "Both can worry excessively", "Emotional expression needs to be explicit, not assumed"],
  },
  "cancer-and-libra": {
    tagline: "The home and the horizon",
    description: "Cancer wants a cosy nest; Libra wants a beautiful social life. This cardinal square pair must negotiate between private comfort and public partnership. When they balance it, the home is gorgeous and the bond is real.",
    strengths: ["Both value partnership deeply", "Cardinal energy gets things moving", "Libra's charm + Cancer's warmth = great hosts"],
    challenges: ["Cancer's clinginess vs. Libra's need for balance", "Conflict styles differ — emotional vs. rational", "Square tension requires ongoing negotiation"],
  },
  "cancer-and-scorpio": {
    tagline: "The deepest waters",
    description: "Cancer and Scorpio form one of the zodiac's most emotionally powerful trines. The intuition is telepathic, the loyalty fierce, the emotional depth oceanic. This pair understands each other without words.",
    strengths: ["Profound emotional and intuitive bond", "Fierce mutual loyalty and protectiveness", "Effortless understanding of each other's needs"],
    challenges: ["Intensity can become consuming", "Both hold grudges", "Needs lightness and humour to balance the depth"],
  },
  "cancer-and-sagittarius": {
    tagline: "The nest and the open road",
    description: "Cancer builds home; Sagittarius explores the world. This quincunx pair must find a way to honour both needs — rootedness and roaming. It's uncomfortable but potentially transformative.",
    strengths: ["Sagittarius expands Cancer's world", "Cancer gives Sagittarius a home to return to", "Both have generous hearts"],
    challenges: ["Fundamental lifestyle differences", "Cancer feels abandoned, Sagittarius feels trapped", "Requires significant adjustment from both"],
  },
  "cancer-and-capricorn": {
    tagline: "The parent axis",
    description: "Cancer and Capricorn are the zodiac opposition of family and career, home and ambition. The attraction is about completing each other — Cancer provides the emotional base, Capricorn provides the structure.",
    strengths: ["Complementary strengths: emotion + practicality", "Both take commitment seriously", "Natural builders of family and legacy"],
    challenges: ["Emotional vs. stoic approaches to problems", "Both can be controlling in different ways", "Work-life balance is the central negotiation"],
  },
  "cancer-and-aquarius": {
    tagline: "Heart meets mind",
    description: "Cancer leads with emotion; Aquarius leads with ideas. This quincunx pairing feels alien to both at first. The growth happens when Cancer learns detachment and Aquarius learns tenderness.",
    strengths: ["Aquarius broadens Cancer's perspective", "Cancer warms Aquarius' emotional world", "Both care deeply, just in different ways"],
    challenges: ["Vastly different emotional languages", "Cancer needs closeness, Aquarius needs space", "Understanding requires real patience"],
  },
  "cancer-and-pisces": {
    tagline: "Emotion ocean",
    description: "Water trine partners, Cancer and Pisces swim in shared emotional depths. The empathy is automatic, the romance cinematic. Both feel deeply — the work is ensuring someone keeps one foot on dry land.",
    strengths: ["Instant emotional recognition", "Deeply romantic and imaginative bond", "Mutual tenderness and compassion"],
    challenges: ["Emotional overwhelm when both are down", "Avoidance of practical matters", "Needs grounding from outside the relationship"],
  },
  "leo-and-virgo": {
    tagline: "The spotlight and the backstage",
    description: "Leo performs; Virgo perfects. This semi-sextile pair has real potential when Leo appreciates Virgo's quiet support and Virgo celebrates Leo's confidence rather than critiquing it.",
    strengths: ["Virgo's attention to detail supports Leo's vision", "Leo's confidence brings out Virgo's fun side", "Both are incredibly hardworking"],
    challenges: ["Leo's pride vs. Virgo's criticism", "Very different social needs", "Virgo's modesty vs. Leo's need for recognition"],
  },
  "leo-and-libra": {
    tagline: "The royal couple",
    description: "Leo and Libra are the zodiac's most socially graceful sextile. Both love beauty, culture, and being admired. Together they create a partnership that is as elegant as it is warm.",
    strengths: ["Shared love of beauty, art, and social life", "Natural charm as a couple", "Libra's diplomacy soothes Leo's fire"],
    challenges: ["Both need external validation", "Decision-making can stall", "Superficiality if depth isn't cultivated"],
  },
  "leo-and-scorpio": {
    tagline: "Fixed fire meets fixed water",
    description: "Leo's warmth meets Scorpio's depth in one of the zodiac's most intense fixed squares. The attraction is undeniable, the power dynamics complex. Neither yields — the relationship is forged in that tension.",
    strengths: ["Incredible passion and loyalty", "Both commit fully when they're in", "Transformative intensity"],
    challenges: ["Power struggles are real and deep", "Leo's openness vs. Scorpio's secrecy", "Fixed stubbornness from both sides"],
  },
  "leo-and-sagittarius": {
    tagline: "Fire blazing bright",
    description: "Leo and Sagittarius are the zodiac's most exuberant fire trine. Joy, adventure, and optimism define this pair. Both are generous, confident, and ready for anything. The fun never stops.",
    strengths: ["Natural ease and joy together", "Shared optimism and adventurous spirit", "Mutual admiration and respect"],
    challenges: ["Both can be excessive", "Sagittarius' bluntness may wound Leo's pride", "Long-term planning isn't either's strength"],
  },
  "leo-and-capricorn": {
    tagline: "The star and the CEO",
    description: "Leo wants recognition; Capricorn wants achievement. This quincunx pair admires each other's drive but speaks different success languages. When they align, they're a power couple. When they don't, it's a cold war.",
    strengths: ["Mutual respect for ambition", "Both bring strong leadership qualities", "Impressive together in public"],
    challenges: ["Very different emotional temperatures", "Leo needs warmth, Capricorn gives respect", "Status competition can undermine the bond"],
  },
  "leo-and-aquarius": {
    tagline: "Opposites that electrify",
    description: "Leo and Aquarius are the creativity-community axis of the zodiac. Leo creates from the heart; Aquarius innovates for the future. The magnetic opposition is about learning to celebrate both individual and collective.",
    strengths: ["Electric opposing-sign attraction", "Creative and visionary partnership", "Both are fixed and committed once in"],
    challenges: ["Leo wants personal adoration, Aquarius wants universal ideals", "Stubbornness from both sides", "Warmth vs. detachment"],
  },
  "leo-and-pisces": {
    tagline: "The lion and the ocean",
    description: "Leo's confidence meets Pisces' sensitivity in a quincunx that requires real adjustment. When Leo's warmth shields Pisces' vulnerability and Pisces' empathy softens Leo's ego, something tender and powerful emerges.",
    strengths: ["Leo's strength protects Pisces' sensitivity", "Pisces' devotion fulfils Leo's need for adoration", "Creative, romantic, and imaginative together"],
    challenges: ["Leo's directness overwhelms Pisces", "Pisces' passivity frustrates Leo", "Very different ways of processing the world"],
  },
  "virgo-and-libra": {
    tagline: "The editor and the aesthete",
    description: "Virgo refines through analysis; Libra refines through beauty. This semi-sextile pair shares a love of improvement but approaches it differently. Together, they create something both functional and beautiful.",
    strengths: ["Shared value of refinement and quality", "Complementary approaches to problem-solving", "Both are considerate and thoughtful partners"],
    challenges: ["Virgo's criticism vs. Libra's need for peace", "Different social needs", "Analysis paralysis when combined"],
  },
  "virgo-and-scorpio": {
    tagline: "The detective duo",
    description: "Virgo and Scorpio both see what others miss. This sextile pair is perceptive, analytical, and deeply committed to understanding truth — in the world and in each other. The bond runs quiet and deep.",
    strengths: ["Shared depth of perception and analysis", "Quiet but powerful loyalty", "Neither wastes time on superficiality"],
    challenges: ["Both can be intensely critical", "Trust is earned slowly for both", "Emotional expression needs to be cultivated, not assumed"],
  },
  "virgo-and-sagittarius": {
    tagline: "Details vs. the big picture",
    description: "Virgo examines the trees; Sagittarius surveys the forest. This mutable square challenges both to widen their lens. The friction is real but productive — these two make each other more complete.",
    strengths: ["Sagittarius inspires Virgo to dream bigger", "Virgo helps Sagittarius execute plans", "Both are mutable and adaptable"],
    challenges: ["Virgo finds Sagittarius careless", "Sagittarius finds Virgo limiting", "Different standards of precision"],
  },
  "virgo-and-capricorn": {
    tagline: "Earth's quiet masterpiece",
    description: "Virgo and Capricorn are the zodiac's most reliable earth trine. Both value competence, loyalty, and tangible results. The love here is expressed through actions — steady, dependable, and built to last.",
    strengths: ["Shared practical values and work ethic", "Deep mutual respect", "Love expressed through dependable actions"],
    challenges: ["Emotional walls on both sides", "Risk of a functional but unromantic dynamic", "Needs conscious injection of warmth and play"],
  },
  "virgo-and-aquarius": {
    tagline: "The analyst and the visionary",
    description: "Virgo improves what exists; Aquarius reimagines what could exist. This quincunx pair must bridge concrete and abstract thinking. The payoff is a partnership that is both practical and innovative.",
    strengths: ["Intellectual respect for different approaches", "Both value self-improvement and progress", "Humanitarian common ground"],
    challenges: ["Very different operational styles", "Virgo wants details, Aquarius wants concepts", "Emotional connection requires effort"],
  },
  "virgo-and-pisces": {
    tagline: "Service meets surrender",
    description: "Virgo and Pisces are the zodiac's healing opposition — practical service meets spiritual compassion. Each has what the other needs. The attraction is about becoming whole through the other's gift.",
    strengths: ["Deeply complementary strengths", "Shared desire to help and heal", "Opposition brings balance and wholeness"],
    challenges: ["Virgo's order vs. Pisces' chaos", "Pisces' vagueness frustrates Virgo", "Requires accepting fundamentally different worldviews"],
  },
  "libra-and-scorpio": {
    tagline: "Charm meets intensity",
    description: "Libra's social grace meets Scorpio's emotional depth. This semi-sextile pair is attracted to what the other has — Libra wants Scorpio's depth, Scorpio wants Libra's lightness. The challenge is respecting both.",
    strengths: ["Scorpio's depth gives Libra substance", "Libra's lightness gives Scorpio relief", "Both value one-on-one partnership"],
    challenges: ["Libra's socialising triggers Scorpio's jealousy", "Scorpio's intensity overwhelms Libra", "Different conflict styles"],
  },
  "libra-and-sagittarius": {
    tagline: "Beauty meets adventure",
    description: "Libra and Sagittarius are a sextile pair that shares optimism, social energy, and a love of culture. Together they explore the world with grace and enthusiasm. Building depth is the growth work.",
    strengths: ["Shared love of culture, travel, and socialising", "Optimistic and positive dynamic", "Natural ease and flow"],
    challenges: ["Both can avoid difficult emotions", "Sagittarius' bluntness vs. Libra's sensitivity", "Commitment timing may differ"],
  },
  "libra-and-capricorn": {
    tagline: "The socialite and the executive",
    description: "Libra values partnership; Capricorn values achievement. This cardinal square pair respects ambition but expresses it differently. When aligned, they're a polished, impressive duo. When not, it's a tug of war.",
    strengths: ["Both are cardinal go-getters", "Impressive and respected as a couple", "Shared appreciation for status and quality"],
    challenges: ["Libra needs social harmony, Capricorn needs results", "Square tension around priorities", "Emotional warmth can be lacking"],
  },
  "libra-and-aquarius": {
    tagline: "Air signs building a better world",
    description: "Libra and Aquarius are the zodiac's most idealistic air trine. Both value fairness, ideas, and social progress. This pair communicates effortlessly and shares a vision for how things should be.",
    strengths: ["Brilliant intellectual and social connection", "Shared idealism and fairness", "Natural ease and understanding"],
    challenges: ["Both avoid deep emotional processing", "Idealism can override practicality", "Needs grounding to build lasting security"],
  },
  "libra-and-pisces": {
    tagline: "The romantic and the mystic",
    description: "Both ruled by relationship-focused planets (Venus and Neptune), Libra and Pisces share a deep romantic idealism. This quincunx pairing creates beautiful moments but must bridge fundamentally different worldviews.",
    strengths: ["Shared romantic idealism", "Both are gentle, considerate partners", "Creative and aesthetically aligned"],
    challenges: ["Libra needs logic, Pisces needs feeling", "Both can idealize the partner", "Practical matters get neglected"],
  },
  "scorpio-and-sagittarius": {
    tagline: "Depth meets breadth",
    description: "Scorpio goes deep; Sagittarius goes wide. This semi-sextile pair is fascinated by each other's approach to life. When Scorpio learns to trust Sagittarius' optimism and Sagittarius respects Scorpio's boundaries, real growth happens.",
    strengths: ["Mutual fascination and intensity", "Both are transformative in different ways", "Passionate about their convictions"],
    challenges: ["Scorpio's jealousy vs. Sagittarius' freedom", "Very different social and emotional needs", "Trust styles clash"],
  },
  "scorpio-and-capricorn": {
    tagline: "Power recognises power",
    description: "Scorpio and Capricorn are the zodiac's most strategically formidable sextile. Both play the long game, value loyalty, and respect strength. The bond is deeply private and profoundly committed.",
    strengths: ["Shared strategic intelligence", "Deep, earned mutual respect", "Both commit fully and permanently"],
    challenges: ["Emotional vulnerability is hard for both", "Can become too insular", "Power dynamics need transparency"],
  },
  "scorpio-and-aquarius": {
    tagline: "The alchemist and the revolutionary",
    description: "Fixed water meets fixed air in one of the zodiac's most stubborn squares. Scorpio transforms through emotion; Aquarius transforms through intellect. The clash is about how to change the world — but both want to.",
    strengths: ["Both are deeply committed to their vision", "Fixed loyalty once trust is established", "Transformative potential in the relationship"],
    challenges: ["Scorpio's emotional intensity vs. Aquarius' detachment", "Power struggles are profound", "Neither compromises easily"],
  },
  "scorpio-and-pisces": {
    tagline: "Soul recognition",
    description: "Scorpio and Pisces are the zodiac's most soulful water trine. The emotional connection feels karmic, pre-verbal, and overwhelming in the best way. Both understand the unspoken — this pair communicates through feeling.",
    strengths: ["Instant soul-level recognition", "Deep emotional and intuitive bond", "Shared spiritual and creative depths"],
    challenges: ["Emotional intensity can become consuming", "Boundaries dissolve too easily", "Both need external grounding"],
  },
  "sagittarius-and-capricorn": {
    tagline: "The explorer and the builder",
    description: "Sagittarius dreams of what's possible; Capricorn builds what's practical. This semi-sextile pair clashes on approach but shares a respect for growth. Together, they can dream big AND deliver.",
    strengths: ["Sagittarius inspires, Capricorn executes", "Both value personal growth and achievement", "Complementary worldviews"],
    challenges: ["Very different paces and priorities", "Sagittarius finds Capricorn too serious", "Capricorn finds Sagittarius irresponsible"],
  },
  "sagittarius-and-aquarius": {
    tagline: "Freedom's favourite pair",
    description: "Sagittarius and Aquarius are the zodiac's most freedom-loving sextile. Both are independent, idealistic, and resistant to convention. This pair builds a unique relationship on shared principles rather than rules.",
    strengths: ["Shared love of freedom and independence", "Intellectual and philosophical depth", "Neither tries to change the other"],
    challenges: ["Emotional depth takes work", "Both avoid being pinned down", "Practical matters get postponed"],
  },
  "sagittarius-and-pisces": {
    tagline: "The philosopher and the mystic",
    description: "Both ruled by Jupiter (traditional), Sagittarius and Pisces share expansive vision and spiritual curiosity. This mutable square is idealistic but grounding-challenged. The connection is meaningful when both commit to reality.",
    strengths: ["Shared spiritual and philosophical curiosity", "Jupiter-ruled generosity and optimism", "Creative, imaginative bond"],
    challenges: ["Both avoid practical responsibilities", "Mutable instability from both sides", "Sagittarius' bluntness vs. Pisces' sensitivity"],
  },
  "capricorn-and-aquarius": {
    tagline: "The traditional and the progressive",
    description: "Both ruled by Saturn (traditional), Capricorn and Aquarius share discipline and long-term thinking. But Capricorn builds within the system; Aquarius reinvents the system. The tension is productive when respected.",
    strengths: ["Shared Saturnian discipline and structure", "Both are intelligent and future-oriented", "Mutual respect for each other's strengths"],
    challenges: ["Conservative vs. progressive worldviews", "Emotional expression is difficult for both", "Different visions of success"],
  },
  "capricorn-and-pisces": {
    tagline: "The mountain and the sea",
    description: "Capricorn's structure meets Pisces' fluidity in a sextile that balances perfectly. Capricorn gives Pisces form; Pisces gives Capricorn feeling. This pair creates something both solid and soulful.",
    strengths: ["Capricorn's structure grounds Pisces' dreams", "Pisces softens Capricorn's rigidity", "Natural sextile ease and flow"],
    challenges: ["Capricorn can dismiss Pisces' sensitivity", "Pisces can frustrate Capricorn's pragmatism", "Different languages for expressing love"],
  },
  "aquarius-and-pisces": {
    tagline: "The visionary and the empath",
    description: "Aquarius dreams of the future; Pisces feels the present. This semi-sextile pair sits at the zodiac's very end — where intellect meets intuition. The bridge between them creates something neither could build alone.",
    strengths: ["Both are humanitarian and caring", "Shared creativity and imagination", "Each expands the other's worldview"],
    challenges: ["Very different emotional processing styles", "Aquarius intellectualises, Pisces absorbs", "Practical matters need attention"],
  },
};

/**
 * Get insight for a pair. Handles either ordering.
 */
export function getPairInsight(s1: ZodiacSign, s2: ZodiacSign): PairInsight | undefined {
  const slug = pairSlug(s1, s2);
  return PAIR_INSIGHTS[slug];
}

/**
 * Overall compatibility score from multiple factors.
 */
export function calculatePairScore(s1: ZodiacSign, s2: ZodiacSign) {
  const d1 = SIGN_DISPLAY[s1];
  const d2 = SIGN_DISPLAY[s2];
  const elementCompat = getElementCompat(d1.element, d2.element);
  const aspect = getSignAspect(s1, s2);

  const overall = Math.round(elementCompat.score * 0.4 + aspect.score * 0.6);

  return {
    overall,
    elementScore: elementCompat.score,
    elementLabel: elementCompat.label,
    aspectName: aspect.name,
    aspectNature: aspect.nature,
    aspectScore: aspect.score,
    modalityNote: getModalityCompat(d1.modality, d2.modality),
  };
}
