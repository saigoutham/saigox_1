import type { Relic } from "@/lib/types";

export const RELICS: Relic[] = [
  {
    id: "pipeline",
    value: "1PB+",
    label: "Data Processed",
    description:
      "Built distributed data pipelines handling petabyte-scale transaction data at Visa Inc.",
    icon: "Database",
    category: "data",
  },
  {
    id: "transactions",
    value: "100M+",
    label: "Transactions / Day",
    description:
      "Daily transaction throughput processed through high-availability data infrastructure.",
    icon: "Activity",
    category: "data",
  },
  {
    id: "qa-hours",
    value: "480+",
    label: "QA Hours Saved / Year",
    description:
      "Annual hours saved through automated validation frameworks for 30+ global data sources.",
    icon: "Clock",
    category: "data",
  },
  {
    id: "deployments",
    value: "100+",
    label: "DevOps Deployments",
    description:
      "Automated deployment workflows reducing manual effort by 60% across production systems.",
    icon: "Rocket",
    category: "data",
  },
  {
    id: "data-sources",
    value: "30+",
    label: "Global Data Sources",
    description:
      "Data sources validated across Visa's worldwide client reporting infrastructure.",
    icon: "Globe",
    category: "data",
  },
  {
    id: "eoy",
    value: "2×",
    label: "Employee of the Year",
    description:
      "Recognized for High Judgment (2020) and Ownership (2021) at Visa Inc.",
    icon: "Trophy",
    category: "recognition",
  },
  {
    id: "cgpa",
    value: "9.27",
    label: "CGPA · NIT Trichy",
    description:
      "B.Tech Computer Science with Honors and Minor in Management. 2015–2019.",
    icon: "GraduationCap",
    category: "education",
  },
  {
    id: "jee",
    value: "AIR 995",
    label: "JEE Main Rank",
    description:
      "All India Rank 995 out of 12.34L+ candidates in JEE Main 2015.",
    icon: "Medal",
    category: "education",
    easterEgg: "99.66% percentile",
  },
];
