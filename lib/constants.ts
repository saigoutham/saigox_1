import type { ImpactNumber, TimelineEntry } from "./types";

// ═══ Impact Numbers ═══
export const IMPACT_NUMBERS: ImpactNumber[] = [
  {
    value: 80,
    prefix: "$",
    suffix: "M+",
    label: "Annual Revenue",
    description: "Game revenue managed at Scopely",
  },
  {
    value: 10,
    prefix: "",
    suffix: "×",
    label: "Revenue Multiplier",
    description: "Spin Wheel feature revenue increase",
  },
  {
    value: 30,
    prefix: "",
    suffix: "+",
    label: "Player Cohorts",
    description: "Monetization segments built",
  },
  {
    value: 1000,
    prefix: "",
    suffix: "+",
    label: "Daily Payers",
    description: "New paying users per day",
  },
  {
    value: 100,
    prefix: "",
    suffix: "M+",
    label: "Transactions/Day",
    description: "Data pipeline capacity at Visa",
  },
  {
    value: 94,
    prefix: "",
    suffix: "%",
    label: "YoY Growth",
    description: "Revenue growth as CEO, IIML Store",
  },
];

// ═══ Career Timeline ═══
export const TIMELINE: TimelineEntry[] = [
  {
    company: "Scopely",
    role: "Product Manager — Monetization & LiveOps",
    period: "Apr 2023 – Present",
    location: "Bangalore",
    category: "gaming",
    highlights: [
      "Rebuilt Spin Wheel driving 10× revenue and 10,000+ daily payers",
      "Launched D2C store scaling 0% → 10% revenue share in 10 months",
      "Expanded segmentation from 6 to 30+ cohorts, +15% ARPDAU",
      "Automated 15K+ offer configurations, 40% faster with 30% fewer errors",
    ],
  },
  {
    company: "Hel(l)Mark — The IIML Store",
    role: "Chief Executive Officer",
    period: "May 2022 – Apr 2023",
    location: "Lucknow",
    category: "business",
    highlights: [
      "₹20L+ national sales with 94% YoY growth",
      "Managed 7-member team, launched 35+ products, 2K+ orders",
    ],
  },
  {
    company: "IIM Lucknow",
    role: "MBA — IT Systems, Strategy & Operations",
    period: "2021 – 2023",
    location: "Lucknow",
    category: "education",
    highlights: [
      "Dean's Merit List",
      "National Finalist — Microsoft PM Engage",
    ],
  },
  {
    company: "Visa Inc.",
    role: "Data Engineer",
    period: "Jul 2019 – Jun 2021",
    location: "Bangalore",
    category: "data",
    highlights: [
      "Built 1PB+ data pipelines for 100M+ transactions/day",
      "Employee of the Year (2×) — High Judgment, Ownership",
    ],
  },
  {
    company: "NIT Trichy",
    role: "B.Tech — Computer Science",
    period: "2015 – 2019",
    location: "Tiruchirappalli",
    category: "education",
    highlights: ["CGPA: 9.27 · Honors Degree · Minor in Management"],
  },
];

// ═══ Section IDs (for nav) ═══
export const SECTIONS = {
  HERO: "hero",
  NUMBERS: "numbers",
  ABOUT: "about",
  WORK: "work",
  PHOTOGRAPHY: "photography",
  AWARDS: "awards",
  CONTACT: "contact",
} as const;
