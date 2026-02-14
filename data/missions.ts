import type { Mission } from "@/lib/types";

export const MISSIONS: Mission[] = [
  {
    slug: "spin-cycle",
    title: "Spin Wheel Rebuild",
    codename: "OPERATION SPIN CYCLE",
    company: "Scopely",
    period: "2023 – 2024",
    category: "gaming",
    brief:
      "The legacy Spin Wheel was underperforming — a flat, single-reward mechanic with no player segmentation. The mission: rebuild it from scratch with segmented rewards and jackpot mechanics to drive daily revenue and payer conversion.",
    approach: [
      "Conducted competitive analysis of spin mechanics across top-grossing casino titles",
      "Designed tiered reward pools segmented by player spend behavior",
      "Introduced jackpot mechanics with escalating probability to drive repeat engagement",
      "Built A/B test framework to validate reward distribution before full rollout",
    ],
    results: [
      { metric: "Revenue Lift", value: "10×", description: "From baseline to post-launch daily revenue" },
      { metric: "New Daily Payers", value: "1,000+", description: "Net new daily payers attributed to the feature" },
      { metric: "Retention Impact", value: "+8%", description: "D7 retention lift for engaged spin users" },
    ],
    learnings: [
      "Jackpot near-miss mechanics significantly increase session length",
      "Segmented rewards prevent value inflation for high-spend cohorts",
      "Visual presentation of reward tiers matters as much as the actual value",
    ],
    tags: ["Monetization", "Feature Design", "A/B Testing", "Segmentation"],
  },
  {
    slug: "d2c-store",
    title: "D2C Web Store Launch",
    codename: "OPERATION DIRECT LINE",
    company: "Scopely",
    period: "2023 – 2024",
    category: "gaming",
    brief:
      "Platform fees were eroding margins on in-app purchases. The mission: build a segmented direct-to-customer web store with personalized offers, bypassing app store commissions.",
    approach: [
      "Designed web store UX tailored to existing player behaviors and spend patterns",
      "Implemented personalized offer logic based on 30+ player cohorts",
      "Built price localization and currency support for global player base",
      "Created A/B test pipeline for offer presentation and pricing strategies",
    ],
    results: [
      { metric: "Revenue Share", value: "0% → 5%", description: "D2C revenue share grew from zero to 5% in 10 months" },
      { metric: "Margin Lift", value: "+22%", description: "Per-transaction margin increase vs. app store purchases" },
      { metric: "Conversion Lift", value: "+12%", description: "Higher conversion on personalized web offers" },
    ],
    learnings: [
      "Players respond strongly to exclusivity framing on web offers",
      "Price anchoring against in-app equivalents drives perceived value",
      "Reducing friction in payment flow has outsized impact on conversion",
    ],
    tags: ["D2C", "Monetization", "Personalization", "Margin Optimization"],
  },
  {
    slug: "cohort-segmentation",
    title: "Cohort Segmentation Expansion",
    codename: "OPERATION PRISM",
    company: "Scopely",
    period: "2023 – 2025",
    category: "gaming",
    brief:
      "The game's monetization was running on just 6 broad player cohorts — a blunt instrument for an $80M+ title. The mission: redesign the segmentation framework to enable granular, behavior-based pricing at scale.",
    approach: [
      "Analyzed spend distribution curves across existing cohorts",
      "Designed 30+ cohort framework based on recency, frequency, and monetary spend behavior",
      "Built layered pricing strategies with base economy curves and segment overlays",
      "Ran 50+ A/B tests validating pricing elasticity across new cohort definitions",
    ],
    results: [
      { metric: "ARPDAU Lift", value: "+15%", description: "Across all active segments post-migration" },
      { metric: "ARPPU Lift", value: "+10%", description: "For active payers through tailored value propositions" },
      { metric: "Conversion Lift", value: "+5%", description: "For lapsed and non-spending cohorts" },
    ],
    learnings: [
      "Granular segmentation requires robust data pipelines — invest in infrastructure first",
      "The 'whale' segment is not monolithic; sub-segmenting high-spenders unlocks significant value",
      "Pricing experiments on smaller cohorts reduce risk while maintaining statistical power",
    ],
    tags: ["Segmentation", "Pricing", "A/B Testing", "Data-Driven"],
  },
  {
    slug: "visa-pipeline",
    title: "1PB Data Pipeline",
    codename: "OPERATION PIPELINE",
    company: "Visa Inc.",
    period: "2019 – 2021",
    category: "data",
    brief:
      "Visa's global transaction data needed reliable, high-throughput pipelines to process 100M+ daily transactions. The mission: build and maintain the data infrastructure powering reporting for 14K+ clients worldwide.",
    approach: [
      "Designed distributed data pipelines handling petabyte-scale transaction data",
      "Implemented automated deployment workflows reducing manual effort by 60%",
      "Built validation frameworks for 30+ global data sources",
      "Optimized query performance for real-time business intelligence dashboards",
    ],
    results: [
      { metric: "Data Processed", value: "1PB+", description: "Total data volume managed" },
      { metric: "Transactions", value: "100M+/day", description: "Daily transaction throughput" },
      { metric: "QA Hours Saved", value: "480+/yr", description: "Annual hours saved through automated validation" },
    ],
    learnings: [
      "At petabyte scale, data quality issues compound exponentially — validate early and often",
      "Automated deployments are not optional at this scale; they are survival",
      "Building trust with stakeholders through transparent data quality metrics",
    ],
    tags: ["Data Engineering", "Big Data", "Automation", "DevOps"],
  },
  {
    slug: "iiml-store",
    title: "IIML Merchandise Store",
    codename: "OPERATION MERCH",
    company: "Hel(l)Mark — The IIML Store",
    period: "2022 – 2023",
    category: "business",
    brief:
      "Won the operational bid to run IIM Lucknow's official merchandise store. The mission: build a profitable e-commerce operation from scratch.",
    approach: [
      "Negotiated supplier contracts and designed 35+ product SKUs",
      "Built and managed a 7-member team across sales, inventory, and fulfillment",
      "Implemented seasonal merchandising strategy aligned with campus events",
      "Set up e-commerce platform with payment processing and delivery logistics",
    ],
    results: [
      { metric: "Revenue", value: "₹20L+", description: "National sales within 12 months" },
      { metric: "Growth", value: "94% YoY", description: "Year-over-year revenue growth" },
      { metric: "Orders", value: "2,000+", description: "Total orders processed and delivered" },
    ],
    learnings: [
      "Seasonal demand spikes require pre-built inventory buffers",
      "Campus word-of-mouth is the most powerful marketing channel",
      "Managing a physical supply chain teaches constraints software never does",
    ],
    tags: ["Entrepreneurship", "E-Commerce", "Operations", "Leadership"],
  },
];
