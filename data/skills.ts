import type { SkillBranch } from "@/lib/types";

export const SKILL_BRANCHES: SkillBranch[] = [
  {
    id: "monetization",
    name: "Monetization Systems",
    color: "#FF6B6B",
    nodes: [
      {
        id: "spin-wheel",
        branch: "monetization",
        title: "Spin Wheel Reforged",
        subtitle: "Legacy feature rebuilt from scratch with segmented rewards",
        metrics: [
          { value: "10×", label: "Revenue Lift" },
          { value: "10,000+", label: "New Daily Payers" },
          { value: "+8%", label: "D7 Retention" },
        ],
        position: { x: 20, y: 15 },
      },
      {
        id: "d2c",
        branch: "monetization",
        title: "D2C Ascension",
        subtitle: "Direct-to-customer web store bypassing app store fees",
        metrics: [
          { value: "0%→10%", label: "Revenue Share" },
          { value: "+22%", label: "Margin per Transaction" },
          { value: "+12%", label: "Conversion Lift" },
        ],
        position: { x: 10, y: 35 },
      },
    ],
  },
  {
    id: "segmentation",
    name: "Player Segmentation",
    color: "#10b981",
    nodes: [
      {
        id: "cohort-engine",
        branch: "segmentation",
        title: "Cohort Engine Expansion",
        subtitle: "Redesigned segmentation for granular behavior-based pricing",
        metrics: [
          { value: "6→30+", label: "Daily Cohorts" },
          { value: "+15%", label: "ARPDAU Lift" },
          { value: "+10%", label: "ARPPU Lift" },
          { value: "+5%", label: "Conversion Lift" },
        ],
        position: { x: 75, y: 15 },
      },
      {
        id: "config-automation",
        branch: "segmentation",
        title: "Config Automation Engine",
        subtitle: "Automated offer configuration at scale",
        metrics: [
          { value: "15K+", label: "Offers Launched" },
          { value: "40%", label: "Faster Turnaround" },
          { value: "30%", label: "Fewer Errors" },
        ],
        position: { x: 85, y: 35 },
      },
    ],
  },
  {
    id: "liveops",
    name: "LiveOps Architecture",
    color: "#f59e0b",
    nodes: [
      {
        id: "festival-engine",
        branch: "liveops",
        title: "Festival Engine",
        subtitle: "In-game event systems driving seasonal engagement",
        metrics: [
          { value: "15–20%", label: "Event Revenue Lift" },
          { value: "50+", label: "A/B Tests Executed" },
        ],
        position: { x: 20, y: 70 },
      },
    ],
  },
  {
    id: "experimentation",
    name: "A/B Experimentation",
    color: "#ef4444",
    nodes: [
      {
        id: "experiment-velocity",
        branch: "experimentation",
        title: "Experiment Velocity",
        subtitle: "Rapid hypothesis testing across monetization surfaces",
        metrics: [
          { value: "50+", label: "A/B Tests Run" },
          { value: "30+", label: "Cohort Variants" },
        ],
        position: { x: 75, y: 70 },
      },
    ],
  },
  {
    id: "revenue",
    name: "Revenue Strategy",
    color: "#a855f7",
    nodes: [
      {
        id: "portfolio",
        branch: "revenue",
        title: "$80M+ Portfolio",
        subtitle: "Annual revenue managed across Scopely titles",
        metrics: [
          { value: "$80M+", label: "Annual Revenue" },
          { value: "1,000+", label: "Daily Payers" },
        ],
        position: { x: 50, y: 80 },
      },
    ],
  },
];
