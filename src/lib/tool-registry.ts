/**
 * AstrologyForLove — Centralized Tool Registry
 *
 * Single source of truth for every calculator / tool in the product.
 * New tools are added here; routing, sitemap, homepage, and navigation
 * all derive their data from this registry — no scattered hard-coding.
 *
 * Tier 1 = flagship launch tools (build first, evaluate, then expand)
 * Tier 2 = advanced tools (add once Tier 1 traffic is validated)
 * Tier 3 = long-tail opportunities
 */

// ── Types ──

export type ToolTier = 1 | 2 | 3;

export type ToolStatus =
  | "live"           // fully implemented and published
  | "coming-soon"    // registered but page not yet built
  | "draft"          // in development, not indexed
  | "retired";       // removed from product

export type ToolCategory =
  | "compatibility"
  | "attraction"
  | "emotional-needs"
  | "communication"
  | "relationship-patterns"
  | "relationship-timing"
  | "significant-events"
  | "marriage"
  | "self-discovery";

export type CalculationLayer =
  | "astronomical"            // real ephemeris / planetary positions
  | "traditional-astrology"   // classical interpretation rules
  | "scoring-model"           // product-specific weighted score
  | "ai-explanatory";         // generated interpretive text

export type InputType =
  | "zodiac-select"           // pick from 12 signs
  | "birth-date"              // date only
  | "birth-datetime"          // date + optional time
  | "birth-full"              // date + time + location
  | "event-date"              // date of a specific event
  | "dual-zodiac"             // two zodiac selects
  | "dual-birth-date"         // two birth dates
  | "dual-birth-datetime"     // two birth date+times
  | "dual-birth-full";        // two full birth details

export interface ToolDefinition {
  /** Unique slug used in URLs — must match the route folder name. */
  id: string;

  /** Priority tier. */
  tier: ToolTier;

  /** Current build status. */
  status: ToolStatus;

  /** Product category for grouping. */
  category: ToolCategory;

  /** Display order within the homepage grid (lower = earlier). */
  displayOrder: number;

  // ── SEO & Content ──

  /** English display title. */
  title: string;

  /** Short description for cards / meta description. */
  description: string;

  /** The user question this tool answers. */
  userQuestion: string;

  /** Target user persona. */
  targetUser: string;

  /** Primary search intent this page captures. */
  searchIntent: string;

  // ── UX ──

  /** Required inputs for the minimum viable calculation. */
  requiredInput: InputType;

  /** Optional advanced inputs that unlock deeper results. */
  optionalAdvancedInputs?: string[];

  // ── Calculation ──

  /** Which calculation layers this tool uses. */
  calculationLayers: CalculationLayer[];

  /** Plain-English description of the calculation method. */
  calculationMethod: string;

  /** What the user receives. */
  output: string;

  /** How results are interpreted / presented. */
  interpretationMethod: string;

  // ── Relationships ──

  /** IDs of related tools shown on the results page. */
  relatedTools: string[];

  /** Suggested editorial content topics. */
  relatedEditorial: string[];

  // ── Visual ──

  /** Lucide icon name for the homepage card. */
  iconName: string;

  /** CSS custom property for accent colour. */
  accent: string;

  /** Sitemap priority (0.0–1.0). */
  sitemapPriority: number;
}

// ── Registry ──

export const TOOL_REGISTRY: ToolDefinition[] = [
  // ═══════════════════════════════════════════
  // TIER 1 — Initial Priority (flagship)
  // ═══════════════════════════════════════════
  {
    id: "love-compatibility",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 1,
    title: "Love Compatibility Calculator",
    description: "Discover how your zodiac signs connect in love, communication, and romance.",
    userQuestion: "Are we compatible based on our zodiac signs?",
    targetUser: "Anyone curious about basic romantic compatibility with a partner or crush.",
    searchIntent: "zodiac love compatibility calculator",
    requiredInput: "dual-zodiac",
    calculationLayers: ["traditional-astrology", "scoring-model"],
    calculationMethod: "Evaluates the angular aspect (conjunction, sextile, square, trine, opposition) between two Sun signs, combined with elemental compatibility scoring.",
    output: "Overall compatibility percentage with breakdowns for emotional, communication, romance, values, and long-term dimensions, plus strengths and growth areas.",
    interpretationMethod: "Sign-distance-based scoring with element modifiers. Scores are product-specific and transparently explained.",
    relatedTools: ["venus-sign-calculator", "moon-sign-compatibility", "marriage-compatibility"],
    relatedEditorial: ["zodiac-compatibility-guide", "elements-in-love"],
    iconName: "Heart",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.9,
  },
  {
    id: "venus-sign-calculator",
    tier: 1,
    status: "live",
    category: "self-discovery",
    displayOrder: 2,
    title: "Venus Sign Calculator",
    description: "Find your Venus sign and understand your romantic nature and love language.",
    userQuestion: "What is my Venus sign and what does it say about how I love?",
    targetUser: "Someone who knows their Sun sign but wants to understand their romantic personality more deeply.",
    searchIntent: "venus sign calculator",
    requiredInput: "birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Calculates Venus's ecliptic longitude at birth using astronomy-engine ephemeris, then maps to tropical zodiac sign.",
    output: "Venus sign, degree, retrograde status, and five-dimension interpretation (love style, attraction, relationships, expression, needs).",
    interpretationMethod: "Traditional Venus-in-sign interpretations curated for a love-focused audience.",
    relatedTools: ["love-compatibility", "moon-sign-compatibility", "venus-mars-attraction"],
    relatedEditorial: ["venus-in-signs-guide", "love-languages-astrology"],
    iconName: "Sparkles",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.9,
  },
  {
    id: "moon-sign-compatibility",
    tier: 1,
    status: "live",
    category: "emotional-needs",
    displayOrder: 3,
    title: "Moon Sign Compatibility Calculator",
    description: "Compare Moon placements to reveal emotional compatibility and nurturing styles.",
    userQuestion: "Are we emotionally compatible based on our Moon signs?",
    targetUser: "Couples or dating partners wanting to understand emotional dynamics beyond Sun signs.",
    searchIntent: "moon sign compatibility calculator",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Calculates both Moons from ephemeris, then evaluates Moon-to-Moon aspect, element compatibility, and emotional style pairing.",
    output: "Moon signs for both people, emotional compatibility score, nurturing style comparison, and guidance for emotional harmony.",
    interpretationMethod: "Moon-sign pairing interpretation with element and modality analysis.",
    relatedTools: ["love-compatibility", "emotional-needs-calculator", "venus-sign-calculator"],
    relatedEditorial: ["moon-signs-emotional-needs", "nurturing-styles-by-moon"],
    iconName: "Moon",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.9,
  },
  {
    id: "love-language-calculator",
    tier: 1,
    status: "live",
    category: "self-discovery",
    displayOrder: 4,
    title: "Astrology Love Language Calculator",
    description: "Discover your astrological love language through Venus, Moon, and Mars placements.",
    userQuestion: "What is my love language according to my birth chart?",
    targetUser: "Someone who wants to understand how they give and receive love through an astrological lens.",
    searchIntent: "astrology love language calculator",
    requiredInput: "birth-datetime",
    optionalAdvancedInputs: ["birth-time", "birth-location"],
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Calculates Venus (giving love), Moon (receiving love), and Mars (desire expression) sign positions. Maps each placement to a love language profile using element, modality, and sign-specific weights.",
    output: "Primary and secondary love languages, giving vs receiving profile, element-based expression style, and personalised relationship advice.",
    interpretationMethod: "Weighted mapping of Venus/Moon/Mars placements to five love language dimensions (words, touch, gifts, service, quality time) based on sign element and modality.",
    relatedTools: ["venus-sign-calculator", "emotional-needs-calculator", "venus-mars-attraction"],
    relatedEditorial: ["love-languages-and-astrology", "venus-moon-mars-triad"],
    iconName: "MessageCircleHeart",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.9,
  },
  {
    id: "relationship-pattern-analyzer",
    tier: 1,
    status: "live",
    category: "relationship-patterns",
    displayOrder: 5,
    title: "Relationship Pattern Analyzer",
    description: "Uncover recurring themes in your love life through your natal chart.",
    userQuestion: "Why do I keep attracting the same type of partner or repeating the same relationship patterns?",
    targetUser: "Someone reflecting on recurring relationship dynamics — attraction patterns, attachment style, deal-breakers.",
    searchIntent: "relationship pattern astrology",
    requiredInput: "birth-datetime",
    optionalAdvancedInputs: ["birth-time", "birth-location"],
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Analyses Venus, Mars, Moon, Saturn, and 7th-house ruler (when birth time is available) to identify recurring attraction patterns, attachment tendencies, and growth edges.",
    output: "Attraction pattern profile, attachment style indicator, recurring lesson themes, and actionable growth recommendations.",
    interpretationMethod: "Pattern archetypes derived from planetary sign placements and aspects within the natal chart. Each archetype is mapped to observable relationship behaviours.",
    relatedTools: ["love-language-calculator", "venus-sign-calculator", "karmic-relationship-analyzer"],
    relatedEditorial: ["attachment-styles-astrology", "saturn-in-love"],
    iconName: "Orbit",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.9,
  },
  {
    id: "first-meeting-chart",
    tier: 1,
    status: "coming-soon",
    category: "significant-events",
    displayOrder: 6,
    title: "First Meeting Chart Calculator",
    description: "Cast a chart for the moment you met and discover the astrological signature of your connection.",
    userQuestion: "What do the stars say about the moment we first met?",
    targetUser: "Couples who remember when they first met and want cosmic perspective on that moment.",
    searchIntent: "first meeting astrology chart",
    requiredInput: "event-date",
    optionalAdvancedInputs: ["event-time", "event-location"],
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Casts a transit chart for the meeting date/time, highlighting Venus, Mars, Moon positions and notable aspects active at that moment.",
    output: "Meeting chart with key planetary positions, dominant aspects, and an interpretation of the connection's astrological fingerprint.",
    interpretationMethod: "Event chart analysis focusing on relational planets (Venus, Mars, Moon) and their aspects at the meeting moment.",
    relatedTools: ["love-compatibility", "relationship-forecast", "composite-chart"],
    relatedEditorial: ["electional-astrology-love", "timing-and-fate"],
    iconName: "CalendarHeart",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.8,
  },
  {
    id: "relationship-forecast",
    tier: 1,
    status: "live",
    category: "relationship-timing",
    displayOrder: 7,
    title: "Relationship Forecast",
    description: "See the next 12 months of a relationship from both birth charts. A compatibility score, the tightest contacts, and dated windows. Not a marriage or breakup prediction.",
    userQuestion: "What does the next year look like for this relationship?",
    targetUser: "Two people who want the present match and the dated stretches ahead.",
    searchIntent: "relationship forecast astrology two people",
    requiredInput: "dual-birth-datetime",
    optionalAdvancedInputs: ["birth-time", "birth-location"],
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Scores the two natal charts, then samples daily transits of Venus, Mars, Jupiter, and Saturn to the composite Sun, Moon, Venus, Mars, Saturn, and Jupiter for twelve months. A month with no major aspect inside the usual orb is omitted.",
    output: "A compatibility score, the three tightest cross-contacts, the composite Sun, Moon, and Venus, and up to twelve peak dates with a love theme.",
    interpretationMethod: "Each window is a planning marker: attraction, emotional weather, a commitment check, a tense patch, or ease. It is not a probability of marriage, staying, or splitting.",
    relatedTools: ["synastry-chart", "composite-chart", "marriage-compatibility"],
    relatedEditorial: ["venus-retrograde-guide", "jupiter-in-love"],
    iconName: "CalendarDays",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.8,
  },
  {
    id: "venus-mars-attraction",
    tier: 1,
    status: "live",
    category: "attraction",
    displayOrder: 8,
    title: "Venus-Mars Attraction Calculator",
    description: "Measure the magnetic chemistry between two people through their Venus and Mars placements.",
    userQuestion: "Is there real physical and romantic chemistry between us?",
    targetUser: "Someone who feels strong attraction and wants to understand it astrologically.",
    searchIntent: "venus mars compatibility calculator",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Calculates both people's Venus and Mars positions, then evaluates cross-aspects (Person A Venus to Person B Mars and vice versa) plus same-planet aspects.",
    output: "Attraction chemistry score, romantic vs physical breakdown, Venus-Mars cross-aspect analysis, and chemistry dynamics description.",
    interpretationMethod: "Cross-aspect analysis between Venus and Mars placements of both charts, weighted by aspect type and orb.",
    relatedTools: ["love-compatibility", "venus-sign-calculator", "soulmate-calculator"],
    relatedEditorial: ["venus-mars-chemistry", "physical-attraction-astrology"],
    iconName: "Flame",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.8,
  },
  {
    id: "marriage-compatibility",
    tier: 1,
    status: "live",
    category: "marriage",
    displayOrder: 9,
    title: "Marriage Compatibility Calculator",
    description: "Chart-based analysis of emotional, romantic, and long-term partnership potential.",
    userQuestion: "Are we astrologically compatible for marriage and long-term commitment?",
    targetUser: "Couples considering or planning marriage who want astrological perspective.",
    searchIntent: "marriage compatibility astrology calculator",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Full synastry focusing on Saturn aspects (commitment), Moon compatibility (emotional foundation), Venus harmony (shared values), and Sun-Moon cross-aspects (partnership identity).",
    output: "Marriage compatibility score with breakdowns for commitment, emotional foundation, shared values, communication, and long-term growth.",
    interpretationMethod: "Weighted synastry analysis emphasising Saturn and Moon aspects for marriage-specific dynamics.",
    relatedTools: ["love-compatibility", "commitment-compatibility", "composite-chart"],
    relatedEditorial: ["marriage-astrology-guide", "saturn-and-commitment"],
    iconName: "Shield",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.8,
  },
  {
    id: "soulmate-calculator",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 10,
    title: "Soulmate Synastry Calculator",
    description: "Explore deep synastry indicators traditionally associated with soulmate connections.",
    userQuestion: "Could this person be my soulmate based on our birth charts?",
    targetUser: "Someone in a deeply felt relationship wanting to understand the soul-level connection.",
    searchIntent: "soulmate astrology calculator synastry",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Evaluates North Node contacts, Vertex aspects, Sun-Moon conjunctions, and Pluto cross-aspects — indicators traditionally linked to karmic/soulmate bonds.",
    output: "Soulmate indicator score, key soul-connection aspects found, and interpretation of the bond's depth and purpose.",
    interpretationMethod: "Analysis of traditionally 'fated' aspect patterns in synastry.",
    relatedTools: ["karmic-relationship-analyzer", "twin-flame-calculator", "composite-chart"],
    relatedEditorial: ["soulmate-signs-astrology", "north-node-relationships"],
    iconName: "Star",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.8,
  },
  {
    id: "composite-chart",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 11,
    title: "Composite Relationship Chart Calculator",
    description: "Generate a composite midpoint chart and, with birth time and city, a Davison chart.",
    userQuestion: "What is the astrological identity of our relationship itself?",
    targetUser: "Established couples wanting to understand the relationship as its own entity.",
    searchIntent: "composite chart calculator relationship",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Calculates midpoints of each pair of planets between two natal charts to create a single composite chart representing the relationship entity.",
    output: "Composite chart with Sun, Moon, Venus, Mars midpoints plus dominant aspects and relationship personality profile.",
    interpretationMethod: "Midpoint composite interpretation with focus on relational dynamics.",
    relatedTools: ["davison-chart", "birth-chart-compatibility", "marriage-compatibility"],
    relatedEditorial: ["composite-vs-synastry", "relationship-identity"],
    iconName: "Compass",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.8,
  },
  {
    id: "best-date-romantic-occasion",
    tier: 1,
    status: "coming-soon",
    category: "relationship-timing",
    displayOrder: 12,
    title: "Best Date for Romantic Occasion",
    description: "Find the most astrologically auspicious dates for proposals, weddings, or special dates.",
    userQuestion: "When is the best time to propose, get married, or plan a romantic event?",
    targetUser: "Someone planning a proposal, wedding date, or significant romantic occasion.",
    searchIntent: "best wedding date astrology calculator",
    requiredInput: "birth-datetime",
    optionalAdvancedInputs: ["partner-birth-date", "date-range", "occasion-type"],
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Scans a date range for Venus, Jupiter, and Moon transits favourable to the natal chart, while avoiding Venus retrograde, Mercury retrograde, and challenging Mars aspects.",
    output: "Ranked list of auspicious dates with transit details and a brief explanation for each recommendation.",
    interpretationMethod: "Electional astrology principles applied to romantic occasions.",
    relatedTools: ["relationship-forecast", "marriage-compatibility", "first-meeting-chart"],
    relatedEditorial: ["electional-astrology-weddings", "venus-retrograde-dating"],
    iconName: "CalendarCheck",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.8,
  },

  // ═══════════════════════════════════════════
  // TIER 2 — Advanced Tools
  // ═══════════════════════════════════════════
  {
    id: "karmic-relationship-analyzer",
    tier: 2,
    status: "coming-soon",
    category: "relationship-patterns",
    displayOrder: 13,
    title: "Karmic Relationship Analyzer",
    description: "Identify karmic themes and past-life indicators in your synastry.",
    userQuestion: "Is there a karmic or past-life connection between us?",
    targetUser: "Someone who feels an inexplicable, fated quality to a relationship.",
    searchIntent: "karmic relationship astrology",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Analyses South Node contacts, Saturn cross-aspects, Pluto connections, and 12th-house overlays in synastry.",
    output: "Karmic theme profile, past-life indicator score, key karmic aspects, and guidance on navigating the karmic dynamic.",
    interpretationMethod: "Traditional karmic astrology indicators mapped to relational themes.",
    relatedTools: ["soulmate-calculator", "relationship-pattern-analyzer", "twin-flame-calculator"],
    relatedEditorial: ["karmic-astrology-guide", "south-node-relationships"],
    iconName: "Infinity",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.7,
  },
  {
    id: "relationship-strengths-friction",
    tier: 2,
    status: "coming-soon",
    category: "compatibility",
    displayOrder: 14,
    title: "Relationship Strengths & Friction Analyzer",
    description: "Identify specifically where your relationship flows and where it rubs.",
    userQuestion: "What are the specific strengths and friction points in our relationship?",
    targetUser: "Couples wanting practical insight into relationship dynamics for growth.",
    searchIntent: "relationship strengths weaknesses astrology",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Full synastry aspect analysis categorised into harmonious flows and challenging friction points, with planet-by-planet breakdown.",
    output: "Categorised list of strengths (trines, sextiles) and friction points (squares, oppositions) with specific guidance for each.",
    interpretationMethod: "Aspect-by-aspect synastry interpretation grouped by harmony vs tension.",
    relatedTools: ["love-compatibility", "communication-compatibility", "marriage-compatibility"],
    relatedEditorial: ["managing-squares-in-synastry", "relationship-growth"],
    iconName: "Scale",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.7,
  },
  {
    id: "progressed-synastry",
    tier: 2,
    status: "coming-soon",
    category: "relationship-timing",
    displayOrder: 15,
    title: "Progressed Synastry Calculator",
    description: "See how your relationship compatibility evolves over time through secondary progressions.",
    userQuestion: "How is our relationship compatibility changing over the years?",
    targetUser: "Long-term couples wanting to understand evolving dynamics.",
    searchIntent: "progressed synastry calculator",
    requiredInput: "dual-birth-full",
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Calculates secondary progressions for both charts at the current date, then evaluates progressed-to-natal and progressed-to-progressed cross-aspects.",
    output: "Current progressed compatibility snapshot, evolving aspect timeline, and phase-of-relationship indicator.",
    interpretationMethod: "Secondary progression cross-aspect interpretation with temporal framing.",
    relatedTools: ["relationship-forecast", "marriage-compatibility", "composite-chart"],
    relatedEditorial: ["progressions-explained", "evolving-love"],
    iconName: "TrendingUp",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.7,
  },
  {
    id: "davison-chart",
    tier: 2,
    status: "coming-soon",
    category: "compatibility",
    displayOrder: 16,
    title: "Davison Chart Calculator",
    description: "Create a Davison relationship chart based on the midpoint of both birth dates and locations.",
    userQuestion: "What does the Davison midpoint chart reveal about our relationship?",
    targetUser: "Astrology enthusiasts who know the difference between composite and Davison charts.",
    searchIntent: "davison chart calculator",
    requiredInput: "dual-birth-full",
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Calculates the midpoint date, time, and location between two birth charts, then casts a natal chart for that midpoint moment and place.",
    output: "Full Davison chart with planetary positions, aspects, and relationship personality interpretation.",
    interpretationMethod: "Davison midpoint chart interpretation as the relationship's 'birth chart'.",
    relatedTools: ["composite-chart", "birth-chart-compatibility", "soulmate-calculator"],
    relatedEditorial: ["davison-vs-composite", "relationship-charts-explained"],
    iconName: "GitMerge",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.7,
  },
  {
    id: "relationship-moon-phase",
    tier: 2,
    status: "coming-soon",
    category: "relationship-timing",
    displayOrder: 17,
    title: "Relationship Moon Phase Calculator",
    description: "Discover what Moon phase your relationship was born under and what it means.",
    userQuestion: "What Moon phase were we born under as a couple, and how does it shape our journey?",
    targetUser: "Couples curious about lunar influence on their relationship arc.",
    searchIntent: "relationship moon phase meaning",
    requiredInput: "event-date",
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Calculates the exact Moon phase (lunation cycle position) for the relationship start date, mapping it to one of eight phases.",
    output: "Moon phase at relationship start, phase meaning, relationship arc prediction, and guidance.",
    interpretationMethod: "Lunar phase cycle mapped to relationship developmental stages.",
    relatedTools: ["first-meeting-chart", "relationship-forecast", "moon-sign-compatibility"],
    relatedEditorial: ["moon-phases-love", "lunar-cycles-dating"],
    iconName: "MoonStar",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.7,
  },
  {
    id: "rising-sign-compatibility",
    tier: 2,
    status: "live",
    category: "compatibility",
    displayOrder: 18,
    title: "Rising Sign Compatibility Calculator",
    description: "Compare Ascendants for first-impression and partnership dynamics.",
    userQuestion: "How compatible are our rising signs for partnership?",
    targetUser: "Someone who knows their Ascendant and wants to explore its role in compatibility.",
    searchIntent: "rising sign compatibility calculator",
    requiredInput: "dual-birth-full",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Compares Ascendant signs using aspect, element, and modality compatibility analysis.",
    output: "Rising sign compatibility score, first-impression dynamics, and partnership style comparison.",
    interpretationMethod: "Ascendant pairing analysis with element and angular compatibility.",
    relatedTools: ["love-compatibility", "birth-chart-compatibility", "moon-sign-compatibility"],
    relatedEditorial: ["ascendant-in-love", "first-impressions-astrology"],
    iconName: "Sunrise",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.7,
  },

  // ═══════════════════════════════════════════
  // TIER 3 — Long-tail Opportunities
  // ═══════════════════════════════════════════
  {
    id: "crush-compatibility",
    tier: 3,
    status: "coming-soon",
    category: "attraction",
    displayOrder: 19,
    title: "Crush Compatibility Calculator",
    description: "Quick zodiac-based chemistry check for a new crush.",
    userQuestion: "Am I compatible with my crush?",
    targetUser: "Someone with a new crush wanting a quick, fun compatibility check.",
    searchIntent: "crush compatibility calculator zodiac",
    requiredInput: "dual-zodiac",
    calculationLayers: ["traditional-astrology", "scoring-model"],
    calculationMethod: "Lightweight Sun sign compatibility with added attraction and spark indicators.",
    output: "Crush chemistry score, flirting style comparison, and conversation starters.",
    interpretationMethod: "Playful Sun sign compatibility with attraction-focused framing.",
    relatedTools: ["love-compatibility", "venus-mars-attraction", "venus-sign-calculator"],
    relatedEditorial: ["crush-astrology-guide", "flirting-by-sign"],
    iconName: "HeartPulse",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.6,
  },
  {
    id: "long-distance-astrology",
    tier: 3,
    status: "coming-soon",
    category: "relationship-patterns",
    displayOrder: 20,
    title: "Long-Distance Relationship Astrology",
    description: "Astrological insights specific to long-distance relationship dynamics.",
    userQuestion: "What does astrology say about our long-distance relationship and when we might reunite?",
    targetUser: "Couples in long-distance relationships seeking timing and reassurance.",
    searchIntent: "long distance relationship astrology",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Synastry analysis focusing on Mercury (communication), 3rd/9th house overlays (travel), and upcoming Venus-Jupiter transits (reunion windows).",
    output: "LDR compatibility score, communication strength assessment, travel/reunion window suggestions, and bond-maintenance advice.",
    interpretationMethod: "Synastry filtered through LDR-specific planetary indicators.",
    relatedTools: ["communication-compatibility", "relationship-forecast", "love-compatibility"],
    relatedEditorial: ["long-distance-astrology-guide", "communication-across-distance"],
    iconName: "Plane",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.6,
  },
  {
    id: "communication-compatibility",
    tier: 3,
    status: "coming-soon",
    category: "communication",
    displayOrder: 21,
    title: "Communication Compatibility Calculator",
    description: "Compare Mercury placements to understand how you and your partner think and talk.",
    userQuestion: "Why do we miscommunicate, and how can we talk to each other better?",
    targetUser: "Couples experiencing communication friction or wanting to understand each other's thinking styles.",
    searchIntent: "communication compatibility astrology mercury",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Compares Mercury signs, elements, and aspects between two charts, plus Mercury-Moon cross-aspects for emotional communication.",
    output: "Communication style profiles for both people, compatibility score, common misunderstanding triggers, and communication tips.",
    interpretationMethod: "Mercury-to-Mercury and Mercury-to-Moon cross-aspect analysis.",
    relatedTools: ["love-compatibility", "relationship-strengths-friction", "moon-sign-compatibility"],
    relatedEditorial: ["mercury-in-relationships", "communication-styles-zodiac"],
    iconName: "MessageSquare",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.6,
  },
  {
    id: "emotional-needs-calculator",
    tier: 3,
    status: "coming-soon",
    category: "emotional-needs",
    displayOrder: 22,
    title: "Emotional Needs Calculator",
    description: "Understand your core emotional needs in relationships through your Moon and water placements.",
    userQuestion: "What do I truly need emotionally in a relationship?",
    targetUser: "Someone who feels emotionally unfulfilled and wants astrological clarity on their needs.",
    searchIntent: "emotional needs astrology calculator",
    requiredInput: "birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Analyses Moon sign, Moon aspects, water-sign placements, and 4th/8th house emphasis to build an emotional needs profile.",
    output: "Emotional needs profile with security, intimacy, independence, and expression dimensions, plus partner guidance.",
    interpretationMethod: "Moon-centric natal analysis with water-element emphasis.",
    relatedTools: ["moon-sign-compatibility", "love-language-calculator", "relationship-pattern-analyzer"],
    relatedEditorial: ["emotional-needs-by-moon", "water-signs-intimacy"],
    iconName: "Droplets",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.6,
  },
  {
    id: "commitment-compatibility",
    tier: 3,
    status: "coming-soon",
    category: "marriage",
    displayOrder: 23,
    title: "Commitment Compatibility Calculator",
    description: "Assess how aligned you are on commitment through Saturn and fixed-sign placements.",
    userQuestion: "Are we on the same page about commitment and long-term partnership?",
    targetUser: "Couples at the commitment decision point wanting astrological perspective.",
    searchIntent: "commitment compatibility astrology saturn",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Compares Saturn signs and cross-aspects, fixed-sign emphasis, and 7th/10th house indicators between both charts.",
    output: "Commitment alignment score, Saturn cross-aspect analysis, timeline readiness indicator, and partnership style comparison.",
    interpretationMethod: "Saturn-focused synastry with fixed-sign and angular-house emphasis.",
    relatedTools: ["marriage-compatibility", "relationship-pattern-analyzer", "love-compatibility"],
    relatedEditorial: ["saturn-commitment-astrology", "ready-for-commitment"],
    iconName: "ShieldCheck",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.6,
  },
  {
    id: "anniversary-chart",
    tier: 3,
    status: "coming-soon",
    category: "significant-events",
    displayOrder: 24,
    title: "Relationship Anniversary Chart Calculator",
    description: "Cast a solar return chart for your relationship anniversary to see the year ahead.",
    userQuestion: "What does this relationship year hold for us?",
    targetUser: "Established couples approaching an anniversary wanting yearly outlook.",
    searchIntent: "relationship anniversary astrology chart",
    requiredInput: "event-date",
    optionalAdvancedInputs: ["event-time", "current-year"],
    calculationLayers: ["astronomical", "traditional-astrology"],
    calculationMethod: "Casts a transit chart for the upcoming anniversary date, highlighting Venus, Mars, Jupiter positions and aspects to the original date chart.",
    output: "Anniversary year forecast with key themes, opportunities, challenges, and monthly highlights.",
    interpretationMethod: "Annual transit analysis with event chart overlay.",
    relatedTools: ["relationship-forecast", "first-meeting-chart", "relationship-moon-phase"],
    relatedEditorial: ["anniversary-astrology", "annual-love-forecast"],
    iconName: "Gift",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.6,
  },
  {
    id: "ex-compatibility",
    tier: 3,
    status: "live",
    category: "relationship-patterns",
    displayOrder: 25,
    title: "Ex-Relationship Compatibility Calculator",
    description: "Reflect on past relationship dynamics through an astrological lens.",
    userQuestion: "Why didn't my past relationship work, and what can I learn from it?",
    targetUser: "Someone processing a breakup or reflecting on a past relationship for growth.",
    searchIntent: "ex compatibility astrology calculator",
    requiredInput: "dual-zodiac",
    calculationLayers: ["traditional-astrology", "scoring-model"],
    calculationMethod: "Standard sign compatibility with reframing toward lessons, growth patterns, and what to look for next.",
    output: "Retrospective compatibility analysis, lesson themes, growth takeaways, and guidance for future relationships.",
    interpretationMethod: "Compatibility analysis with a reflective, growth-oriented lens.",
    relatedTools: ["relationship-pattern-analyzer", "love-compatibility", "venus-sign-calculator"],
    relatedEditorial: ["breakup-astrology", "learning-from-exes"],
    iconName: "RotateCcw",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.6,
  },
  {
    id: "twin-flame-calculator",
    tier: 3,
    status: "live",
    category: "compatibility",
    displayOrder: 26,
    title: "Twin Flame Calculator",
    description: "Examine synastry indicators traditionally associated with deep soul connections.",
    userQuestion: "Could this person be my twin flame?",
    targetUser: "Someone experiencing an intense, mirroring connection and wanting spiritual clarity.",
    searchIntent: "twin flame calculator astrology",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Evaluates mirror aspects (same-sign placements), nodal axis contacts, Pluto connections, and 12th-house overlays.",
    output: "Twin flame indicator analysis, mirror aspect count, soul connection themes, and guidance on navigating the intensity.",
    interpretationMethod: "Synastry analysis filtered through twin flame astrological indicators.",
    relatedTools: ["soulmate-calculator", "karmic-relationship-analyzer", "venus-mars-attraction"],
    relatedEditorial: ["twin-flame-astrology", "intense-connections"],
    iconName: "Flame",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.6,
  },
];

// ── Supplementary tools (not in the 26-tool roadmap but already built) ──

export const SUPPLEMENTARY_TOOLS: ToolDefinition[] = [
  {
    id: "synastry-chart",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 104,
    title: "Synastry Chart Calculator",
    description: "Generate a free synastry chart from two birth dates. See every planet-to-planet aspect, house overlays, and relationship themes.",
    userQuestion: "What does the full synastry chart between our two birth charts look like?",
    targetUser: "Anyone who wants a detailed visual comparison of two natal charts, beyond a simple compatibility score.",
    searchIntent: "synastry chart calculator free",
    requiredInput: "dual-birth-full",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Calculates both natal charts from ephemeris, generates full inter-chart aspect grid, house overlays, and themed relationship analysis.",
    output: "Visual biwheel chart, categorised aspect table (chemistry, emotional, communication, long-term), house overlays, and compatibility themes.",
    interpretationMethod: "Complete synastry aspect grid grouped by relationship theme, with orb-sorted listings.",
    relatedTools: ["birth-chart-compatibility", "composite-chart", "mars-sign-compatibility", "moon-phase-soulmate"],
    relatedEditorial: ["synastry-explained", "reading-aspect-grids", "how-to-read-synastry"],
    iconName: "Orbit",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.9,
  },
  {
    id: "moon-phase-soulmate",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 105,
    title: "Moon Phase Soulmate Calculator",
    description: "Enter two birth dates to find each person's birth moon phase and see if your moons make one full moon together.",
    userQuestion: "Are we moon phase soulmates — do our birth moon phases complete a full moon?",
    targetUser: "Anyone curious about the viral TikTok moon phase soulmate trend, calculated with real astronomy.",
    searchIntent: "moon phase soulmate calculator",
    requiredInput: "dual-birth-date",
    calculationLayers: ["astronomical"],
    calculationMethod: "Calculates Moon elongation from Sun at noon UTC on each birth date using astronomy-engine ephemeris, identifies the phase, and measures angular distance for soulmate fit.",
    output: "Birth moon phase for each person, visual moon disc, full-moon fit score, compatibility band, and explanation.",
    interpretationMethod: "Phase-distance scoring: opposite phases (180° apart) score highest as the viral 'soulmate' match.",
    relatedTools: ["moon-sign-compatibility", "synastry-chart", "soulmate-calculator", "love-compatibility"],
    relatedEditorial: ["moon-phase-soulmate-explained", "moon-phases-love"],
    iconName: "Moon",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.9,
  },
  {
    id: "mars-sign-compatibility",
    tier: 1,
    status: "live",
    category: "attraction",
    displayOrder: 106,
    title: "Mars Sign Compatibility Calculator",
    description: "Compare two Mars signs for passion, sexual chemistry, drive, and conflict style.",
    userQuestion: "How compatible are our Mars signs for passion, desire, and conflict?",
    targetUser: "Anyone who wants to understand physical chemistry and conflict dynamics with a partner or crush.",
    searchIntent: "mars sign compatibility calculator",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Calculates both Mars signs from ephemeris, then evaluates element compatibility, aspect distance, and Mars-specific passion/conflict pairing.",
    output: "Mars signs for both people, compatibility score, passion/chemistry reading, conflict dynamic, and actionable advice.",
    interpretationMethod: "Mars-in-sign pairing analysis with element, aspect, and modality scoring focused on desire and conflict.",
    relatedTools: ["venus-sign-calculator", "synastry-chart", "birth-chart-compatibility", "moon-phase-soulmate"],
    relatedEditorial: ["mars-in-signs-guide", "venus-mars-chemistry", "physical-attraction-astrology"],
    iconName: "Flame",
    accent: "var(--romantic-rose)",
    sitemapPriority: 0.9,
  },
  {
    id: "relationship-numerology",
    tier: 3,
    status: "live",
    category: "self-discovery",
    displayOrder: 100,
    title: "Relationship Numerology",
    description: "Compare Life Path numbers for numerological relationship insights.",
    userQuestion: "What do our Life Path numbers say about our relationship?",
    targetUser: "Someone interested in numerology alongside astrology.",
    searchIntent: "relationship numerology calculator",
    requiredInput: "dual-birth-date",
    calculationLayers: ["scoring-model"],
    calculationMethod: "Life Path number calculation from birth dates with compatibility pairing analysis.",
    output: "Life Path numbers for both people, compatibility assessment, and numerological relationship advice.",
    interpretationMethod: "Numerological pairing analysis using Pythagorean Life Path system.",
    relatedTools: ["love-compatibility", "soulmate-calculator"],
    relatedEditorial: ["numerology-love-guide"],
    iconName: "Hash",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.7,
  },
  {
    id: "zodiac-love",
    tier: 3,
    status: "live",
    category: "self-discovery",
    displayOrder: 101,
    title: "Zodiac Love Guide",
    description: "Explore how each zodiac sign expresses love, with strengths and best matches.",
    userQuestion: "How does my zodiac sign love?",
    targetUser: "Anyone curious about their sign's love profile.",
    searchIntent: "zodiac sign love guide",
    requiredInput: "zodiac-select",
    calculationLayers: ["traditional-astrology"],
    calculationMethod: "Editorial content organised by zodiac sign.",
    output: "Sign-specific love profile with strengths, challenges, and best matches.",
    interpretationMethod: "Traditional sign-based love profiles.",
    relatedTools: ["love-compatibility", "venus-sign-calculator"],
    relatedEditorial: ["zodiac-love-profiles"],
    iconName: "BookOpen",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.8,
  },
  {
    id: "kundli-matching",
    tier: 1,
    status: "live",
    category: "marriage",
    displayOrder: 103,
    title: "Kundli Matching",
    description: "Vedic 36-guna match with Mangal dosha, porutham, Navamsa, and Vimshottari dasha.",
    userQuestion: "What is our Ashtakoota score and Mangal dosha?",
    targetUser: "Couples and families checking a marriage match in the Vedic tradition.",
    searchIntent: "kundli matching guna milan",
    requiredInput: "dual-birth-full",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Lahiri sidereal Moon and Mars. Eight kootas, Mangal houses, ten poruthams, Navamsa Moon, and Vimshottari dasha.",
    output: "Guna total out of 36, koota notes, Mangal status, porutham list, and dasha periods.",
    interpretationMethod: "Classical Ashtakoota and Tamil porutham rules. Separate from the tropical marriage score.",
    relatedTools: ["marriage-compatibility", "composite-chart"],
    relatedEditorial: ["guna-milan-explained"],
    iconName: "Moon",
    accent: "var(--lavender-mist)",
    sitemapPriority: 0.8,
  },
  {
    id: "birth-chart-compatibility",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 102,
    title: "Birth Chart Compatibility",
    description: "Full synastry analysis comparing two natal charts across all personal planets.",
    userQuestion: "What does a full birth chart comparison reveal about our relationship?",
    targetUser: "Astrology-literate users who want detailed synastry beyond Sun signs.",
    searchIntent: "birth chart compatibility calculator synastry",
    requiredInput: "dual-birth-datetime",
    calculationLayers: ["astronomical", "traditional-astrology", "scoring-model"],
    calculationMethod: "Complete synastry aspect grid between all personal planets of both charts.",
    output: "Full aspect grid, weighted compatibility scores, and planet-by-planet interpretation.",
    interpretationMethod: "Complete synastry analysis with aspect-by-aspect interpretation.",
    relatedTools: ["composite-chart", "soulmate-calculator", "marriage-compatibility"],
    relatedEditorial: ["synastry-explained", "reading-aspect-grids"],
    iconName: "Compass",
    accent: "var(--champagne-gold)",
    sitemapPriority: 0.8,
  },
  {
    id: "weton-jodoh",
    tier: 1,
    status: "live",
    category: "compatibility",
    displayOrder: 104,
    title: "Weton Jodoh",
    description: "Javanese weton love match from two birth dates. Neptu, pasaran, and the eight jodoh labels.",
    userQuestion: "What is our weton jodoh according to Javanese tradition?",
    targetUser: "Indonesians and anyone interested in Javanese primbon tradition.",
    searchIntent: "weton jodoh kecocokan",
    requiredInput: "dual-birth-date",
    calculationLayers: ["traditional-astrology"],
    calculationMethod: "Converts each Gregorian date to its saptawara (7-day) and pancawara (5-day) components, sums the neptu, and maps the remainder mod 8 to one of eight jodoh labels.",
    output: "Each person's weton (hari + pasaran + neptu), the neptu total, and the jodoh label with its reading.",
    interpretationMethod: "Classical primbon jodoh tradition. The result is a cultural reading, not a prediction.",
    relatedTools: ["love-compatibility", "kundli-matching"],
    relatedEditorial: ["javanese-weton-explained"],
    iconName: "Moon",
    accent: "var(--rose-gold)",
    sitemapPriority: 0.8,
  },
];

// ── Helpers ──

/** All tools (roadmap + supplementary), sorted by displayOrder. */
export function getAllTools(): ToolDefinition[] {
  return [...TOOL_REGISTRY, ...SUPPLEMENTARY_TOOLS].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

/** Only tools that are live (have published pages). */
export function getLiveTools(): ToolDefinition[] {
  return getAllTools().filter((t) => t.status === "live");
}

/** Tools for the homepage grid (live tools, capped). */
export function getHomepageTools(limit?: number): ToolDefinition[] {
  const live = getLiveTools();
  return limit ? live.slice(0, limit) : live;
}

/** Look up a single tool by slug. */
export function getToolById(id: string): ToolDefinition | undefined {
  return getAllTools().find((t) => t.id === id);
}

/** Get related tool definitions for a given tool. */
export function getRelatedToolDefinitions(toolId: string): ToolDefinition[] {
  const tool = getToolById(toolId);
  if (!tool) return [];
  return tool.relatedTools
    .map((id) => getToolById(id))
    .filter((t): t is ToolDefinition => t !== undefined && t.status === "live");
}

/** All tools in a given tier. */
export function getToolsByTier(tier: ToolTier): ToolDefinition[] {
  return getAllTools().filter((t) => t.tier === tier);
}

/** All tools in a given category. */
export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return getAllTools().filter((t) => t.category === category);
}

/** Tools that need routes registered (live + coming-soon). */
export function getRoutableTools(): ToolDefinition[] {
  return getAllTools().filter((t) => t.status === "live" || t.status === "coming-soon");
}

/** Tools that should appear in the sitemap (live only). */
export function getSitemapTools(): ToolDefinition[] {
  return getLiveTools();
}
