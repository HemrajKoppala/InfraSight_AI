// MoSPI IPMIS Authentic Central Sector Projects Data & Decision Support Intelligence

export const REPORT_METADATA = {
  cycle: "July 2026 Review Cycle",
  docTitle: "Monthly Flash Report on Central Sector Infrastructure Projects",
  threshold: "Projects Costing ₹150 Crore and Above",
  dataSource: "Infrastructure and Project Monitoring Division (IPMD), MoSPI & IPMIS Portal",
  lastUpdated: "31-Jul-2026",
  currency: "INR (Crores)",
};

export const MINISTRIES = [
  { id: "ALL", name: "All Line Ministries", code: "ALL" },
  { id: "MORTH", name: "Ministry of Road Transport & Highways", code: "MoRTH" },
  { id: "MOR", name: "Ministry of Railways", code: "MoR" },
  { id: "MOP", name: "Ministry of Power", code: "MoP" },
  { id: "MOPNG", name: "Ministry of Petroleum & Natural Gas", code: "MoPNG" },
  { id: "MOCOAL", name: "Ministry of Coal", code: "MoCoal" },
  { id: "MOHUA", name: "Ministry of Housing & Urban Affairs", code: "MoHUA" },
  { id: "MOWR", name: "Ministry of Jal Shakti (DWR, RD & GR)", code: "DWR, RD & GR" },
  { id: "DPIIT", name: "Dept. for Promotion of Industry & Internal Trade", code: "DPIIT" },
  { id: "MOD", name: "Ministry of Defence", code: "MoD" },
  { id: "MOCA", name: "Ministry of Civil Aviation", code: "MoCA" },
];

export const SECTORS = [
  { id: "ALL", name: "All Sectors" },
  { id: "Road Transport", name: "Road Transport and Highways" },
  { id: "Railways", name: "Railways" },
  { id: "Power", name: "Power & Transmission" },
  { id: "Petroleum", name: "Petroleum & Natural Gas" },
  { id: "Coal", name: "Coal & Mines" },
  { id: "Water Resources", name: "Water Resources & River Linking" },
  { id: "Urban Development", name: "Urban Development & Real Estate" },
  { id: "Civil Aviation", name: "Civil Aviation & Ports" },
];

// Central Sector Portfolio KPIs (Dynamically loaded from /api/dashboard/summary in runtime)
export const PORTFOLIO_KPIS = {
  totalProjects: 0,
  newlyAdded: 0,
  completedMonth: 0,
  sanctionedCost: 0,
  anticipatedCost: 0,
  costEscalationAmount: 0,
  costEscalationPercent: 0,
  cumulativeExpenditure: 0,
  expenditurePercent: 0,
  delayedProjectsCount: 0,
  delayedProjectsPercent: 0,
  averageDelayMonths: 0,
  criticalRiskCount: 0,
  highRiskCount: 0,
  mediumRiskCount: 0,
  lowRiskCount: 0,
};

export const STATES_DATA = [
  { code: "OD", name: "Odisha", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "MH", name: "Maharashtra", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "UP", name: "Uttar Pradesh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "GJ", name: "Gujarat", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "KA", name: "Karnataka", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "TN", name: "Tamil Nadu", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "AP", name: "Andhra Pradesh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "RJ", name: "Rajasthan", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "MP", name: "Madhya Pradesh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "WB", name: "West Bengal", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "BR", name: "Bihar", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "TG", name: "Telangana", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "KL", name: "Kerala", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "JH", name: "Jharkhand", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "CT", name: "Chhattisgarh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "AS", name: "Assam", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "HR", name: "Haryana", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "PB", name: "Punjab", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "JK", name: "Jammu & Kashmir", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "UK", name: "Uttarakhand", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "HP", name: "Himachal Pradesh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "GA", name: "Goa", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "SK", name: "Sikkim", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "AR", name: "Arunachal Pradesh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "ML", name: "Meghalaya", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "MN", name: "Manipur", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "MZ", name: "Mizoram", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "NL", name: "Nagaland", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "TR", name: "Tripura", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "CH", name: "Chandigarh", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "PY", name: "Puducherry", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "AN", name: "Andaman and Nicobar", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "LD", name: "Lakshadweep", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "DN", name: "Dadra and Nagar Haveli", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "DD", name: "Daman and Diu", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "NE", name: "Other NE States", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
  { code: "UT", name: "Delhi & Other UTs", count: 0, projectCount: 0, originalCost: 0, revisedCost: 0, expenditure: 0, completedThisMonth: 0, newlyAdded: 0, delayedCount: 0, criticalRiskCount: 0, riskLevel: "Normal" },
];

// NOTE: Real projects, sectors, and early warning advisories are fetched dynamically from the database
export const PROJECTS_REQUIRING_ATTENTION = [];
export const SECTOR_STATISTICS = [];
export const EARLY_WARNING_ADVISORIES = [];

export const OFFICIAL_PUBLICATIONS = [
  {
    title: "Monthly Flash Report on Central Sector Projects - July 2026",
    date: "August 2026",
    category: "Monthly Flash Report",
    size: "4.2 MB PDF",
    description: "Statistical summary of 1,824 central sector projects costing ₹150 crore and above, detailing time and cost overruns across 16 line ministries.",
  },
  {
    title: "Annual Review of Infrastructure Projects 2025-26",
    date: "June 2026",
    category: "Annual Compendium",
    size: "18.6 MB PDF",
    description: "Comprehensive analytical report on systemic bottlenecks, land acquisition timelines, and inter-ministerial resolution mechanisms.",
  },
  {
    title: "Methodological Framework for AI-Driven Project Cost Forecasting",
    date: "April 2026",
    category: "Technical Monograph",
    size: "2.8 MB PDF",
    description: "Technical reference on SHAP-based feature attribution and early warning risk indices for public infrastructure investments.",
  },
  {
    title: "Guidelines for Standardized Milestone Reporting in IPMIS 2.0",
    date: "January 2026",
    category: "Operational Circular",
    size: "1.4 MB PDF",
    description: "Mandatory protocols for Project Implementation Units (PIUs) to submit georeferenced monthly physical and financial progress data.",
  },
];
