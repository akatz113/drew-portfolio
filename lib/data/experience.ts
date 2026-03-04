export interface Rotation {
  id: string;
  number: number;
  title: string;
  department: string;
  period: string;
  description: string;
  project: {
    title: string;
    description: string;
  };
  results: string[];
  skills: string[];
  isCurrent?: boolean;
  isUpcoming?: boolean;
}

export const program = {
  name: "Edison Engineering Program",
  company: "GE Appliances",
  location: "Louisville, KY",
  masters: {
    degree: "M.S. Mechanical Engineering",
    university: "University of Louisville",
    expectedGraduation: "August 2027",
  },
};

export const rotations: Rotation[] = [
  {
    id: "rotation-1",
    number: 1,
    title: "Commercial Laundry Engineer",
    department: "Commercial Laundry",
    period: "Mar 2024 – Sep 2024",
    description:
      "Developed an automated testing framework to detect software bugs across cloud, embedded, and app teams operating on independent OTA update schedules. Built on Microsoft Power Platform — integrating Power Automate, Power BI, Outlook, Forms, and Planner — the system gave the organization consistent, real-time visibility into update quality across every release pipeline.",
    project: {
      title: "Automated OTA Testing Framework",
      description:
        "Designed and deployed an end-to-end automated pipeline that triggered test sequences whenever any of the three software teams pushed an update, logged results in real time, and surfaced anomalies through a Power BI dashboard.",
    },
    results: ["40% increase in weekly bug identification rate"],
    skills: ["Power BI", "Power Automate", "GitHub", "Jira", "Python"],
  },
  {
    id: "rotation-2",
    number: 2,
    title: "Quality Engineer — Refrigeration",
    department: "Refrigeration Quality",
    period: "Sep 2024 – Mar 2025",
    description:
      "Embedded on the refrigeration factory floor to identify root causes of quality escapes driving customer service visits. Led end-to-end corrective actions — from redesigning problematic components to working directly with suppliers to tighten dimensional control — using 3D scanning and Polyworks digital assembly validation throughout.",
    project: {
      title: "Root Cause & Corrective Action Program",
      description:
        "Managed an active backlog of quality escapes, running data investigations across manufacturing and quality databases, performing 3D scans to quantify dimensional variation, and redesigning GD&T-annotated parts to eliminate recurrence.",
    },
    results: [],
    skills: ["GD&T Part Design", "Polyworks", "3D HandyScan", "Data Exploration", "Supplier Relations"],
  },
  {
    id: "rotation-3",
    number: 3,
    title: "AI Solutions Engineer",
    department: "Quality AI",
    period: "Mar 2025 – Sep 2025",
    description:
      "Built the company's first AI-powered quality analytics tool from scratch. The full-stack application unified service, manufacturing, and sales data and used AI to categorize every service call — transforming an incomplete, manually-tagged dataset into a fully automated intelligence feed for the quality organization. Owned the project end-to-end, from database architecture to cross-functional coordination and executive presentation.",
    project: {
      title: "Quality AI Tool",
      description:
        "Designed the database architecture, built ETL pipelines across SAS and BigQuery, and implemented the AI categorization engine — creating the organization's first autonomous quality trend-detection system.",
    },
    results: [
      "Service data utilization increased from 42% → 100% through AI categorization",
      "First autonomous quality trend-detection system developed at the company",
    ],
    skills: ["Python", "Agentic AI", "SQL", "BigQuery", "SAS", "GitHub"],
  },
  {
    id: "rotation-4",
    number: 4,
    title: "Cost Out Engineer — Laundry",
    department: "Laundry Engineering",
    period: "Sep 2025 – Present",
    description:
      "Qualifying new component suppliers for top-load washing machine platforms, with a focus on water valves and pumps. Applying reliability statistics and structured qualification processes to de-risk supplier transitions while maintaining product integrity. Continuing to build AI-powered productivity tools for the team — automating the processing of unstructured data and accelerating workflows across the department.",
    project: {
      title: "Supplier Qualification Program",
      description:
        "Leading the technical qualification of new water valve and pump suppliers — managing reliability testing, statistical analysis, and cross-functional alignment to ensure components meet design specifications before production introduction.",
    },
    results: [],
    skills: ["Project Management", "Reliability & Statistics", "Process Development", "AI Tools"],
    isCurrent: true,
  },
  {
    id: "rotation-5",
    number: 5,
    title: "TBD",
    department: "TBD",
    period: "Mar 2026 – Sep 2026",
    description: "",
    project: { title: "", description: "" },
    results: [],
    skills: [],
    isUpcoming: true,
  },
  {
    id: "rotation-6",
    number: 6,
    title: "TBD",
    department: "TBD",
    period: "Sep 2026 – Mar 2027",
    description: "",
    project: { title: "", description: "" },
    results: [],
    skills: [],
    isUpcoming: true,
  },
];
