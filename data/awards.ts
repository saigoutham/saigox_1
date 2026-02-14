export interface AwardData {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
}

export const AWARDS: AwardData[] = [
  {
    id: "eoy-judgment",
    title: "Employee of the Year — High Judgment",
    organization: "Visa Inc.",
    year: "2020",
    description: "Recognized for demonstrating exceptional judgment in data pipeline decisions impacting global client reporting.",
    icon: "Trophy",
  },
  {
    id: "eoy-ownership",
    title: "Employee of the Year — Ownership",
    organization: "Visa Inc.",
    year: "2021",
    description: "Recognized for taking full ownership of critical data infrastructure and deployment automation.",
    icon: "Trophy",
  },
  {
    id: "spot-1",
    title: "Spot Award — Product Execution",
    organization: "Scopely",
    year: "2023",
    description: "For exceptional execution on monetization feature launches driving measurable revenue impact.",
    icon: "Zap",
  },
  {
    id: "spot-2",
    title: "Spot Award — Performance",
    organization: "Scopely",
    year: "2024",
    description: "For consistently delivering high-impact work across D2C, segmentation, and LiveOps.",
    icon: "Zap",
  },
  {
    id: "spot-3",
    title: "Spot Award — Performance",
    organization: "Scopely",
    year: "2025",
    description: "For continued excellence in monetization strategy and cross-functional collaboration.",
    icon: "Zap",
  },
  {
    id: "deans-list",
    title: "Dean's Merit List",
    organization: "IIM Lucknow",
    year: "2021-2023",
    description: "Academic distinction for outstanding performance in MBA program.",
    icon: "GraduationCap",
  },
  {
    id: "jee-main",
    title: "JEE Main — AIR 995",
    organization: "National Testing Agency",
    year: "2015",
    description: "All India Rank 995 out of 12.34L+ candidates. 99.66 percentile.",
    icon: "Medal",
  },
  {
    id: "microsoft-engage",
    title: "National Finalist — Microsoft PM Engage",
    organization: "Microsoft",
    year: "2022",
    description: "National-level finalist in Microsoft's product management competition.",
    icon: "Award",
  },
];
