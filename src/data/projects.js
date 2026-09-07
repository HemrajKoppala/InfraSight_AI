export const projects = [
  {
    id: "INF-001",
    name: "National Highway Development Corridor NH-44",
    sector: "Road Transport",
    ministry: "Ministry of Road Transport & Highways",
    state: "Karnataka",
    implementingAgency: "NHAI",
    contractor: "Larsen & Toubro Ltd.",
    originalCost: 18500,
    revisedCost: 22100,
    expenditure: 16400,
    physicalProgress: 72,
    financialProgress: 74,
    targetProgress: 88,
    startDate: "Jan 2022",
    originalEndDate: "Dec 2026",
    revisedEndDate: "Jun 2027",
    milestoneDelay: 6,
    costRisk: 82,
    delayRisk: 76,
    overallRisk: 80,
    status: "Delayed",
    riskCategory: "High",
    location: "Bengaluru - Hubballi Stretch (412 km)",
    riskFactors: [
      "Material cost escalation (Steel/Cement +18%)",
      "Right of Way (RoW) acquisition pending in 2 packages",
      "Low physical progress vs baseline target"
    ],
    aiInsights: {
      predictedCostOverrun: "+19.4% (₹3,600 Cr)",
      predictedTimeOverrun: "+6.5 months",
      confidenceScore: 94.2,
      topDriver: "Land Acquisition & RoW Clearance",
      shapValues: [
        { feature: "RoW Acquisition Delay", impact: "+34%" },
        { feature: "Material Inflation Index", impact: "+28%" },
        { feature: "Contractor Equipment Utilization", impact: "+16%" },
        { feature: "Monsoon Downtime", impact: "+12%" }
      ],
      recommendedAction: "Convene High-Level State Empowered Committee (SEC) review for expedited 14.8 hectare forest clearance in Belagavi division."
    },
    milestones: [
      { name: "Feasibility & DPR Approval", status: "Completed", date: "Mar 2022", delay: 0 },
      { name: "Phase 1 Earthworks & Grading", status: "Completed", date: "Jan 2023", delay: 1 },
      { name: "Bridges & Overpasses Substructure", status: "Completed", date: "Nov 2023", delay: 2 },
      { name: "Pavement & Bituminous Layer P-1", status: "Delayed", date: "May 2024", delay: 4 },
      { name: "Toll Plaza & Smart ITS Integration", status: "Pending", date: "Jan 2025", delay: 6 },
      { name: "Final Inspection & Commissioning", status: "Pending", date: "Jun 2027", delay: 6 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 4200, actual: 3900, aiPredicted: 3900 },
      { period: "Q2 2023", planned: 8500, actual: 7800, aiPredicted: 7800 },
      { period: "Q3 2023", planned: 12400, actual: 11200, aiPredicted: 11200 },
      { period: "Q4 2023", planned: 15600, actual: 14100, aiPredicted: 14100 },
      { period: "Q1 2024", planned: 18500, actual: 16400, aiPredicted: 17200 },
      { period: "Q2 2024 (Forecast)", planned: 18500, actual: null, aiPredicted: 19800 },
      { period: "Q4 2024 (Forecast)", planned: 18500, actual: null, aiPredicted: 22100 }
    ]
  },
  {
    id: "INF-002",
    name: "Eastern Dedicated Freight Corridor (EDFC)",
    sector: "Railways",
    ministry: "Ministry of Railways",
    state: "Uttar Pradesh",
    implementingAgency: "DFCCIL",
    contractor: "Tata Projects - Aldesa JV",
    originalCost: 14200,
    revisedCost: 15100,
    expenditure: 11800,
    physicalProgress: 84,
    financialProgress: 86,
    targetProgress: 89,
    startDate: "May 2021",
    originalEndDate: "Mar 2027",
    revisedEndDate: "May 2027",
    milestoneDelay: 2,
    costRisk: 38,
    delayRisk: 31,
    overallRisk: 34,
    status: "On Track",
    riskCategory: "Low",
    location: "Sonnagar - New Khurja Section (534 km)",
    riskFactors: [
      "Minor signaling subcontract integration delay",
      "Moderate cost variation due to currency fluctuation on imported rail track"
    ],
    aiInsights: {
      predictedCostOverrun: "+6.3% (₹900 Cr)",
      predictedTimeOverrun: "+1.8 months",
      confidenceScore: 91.5,
      topDriver: "Signaling & Overhead Electrification (OHE)",
      shapValues: [
        { feature: "Signaling Vendor Sync", impact: "+18%" },
        { feature: "Material Inflation Index", impact: "+10%" },
        { feature: "Land Possession Index", impact: "-15%" }
      ],
      recommendedAction: "Fast-track final European Train Control System (ETCS) Level 2 testing window with RDSO."
    },
    milestones: [
      { name: "Formation & Earthwork", status: "Completed", date: "Sep 2022", delay: 0 },
      { name: "Major & Minor Bridge Construction", status: "Completed", date: "Apr 2023", delay: 1 },
      { name: "Track Linking (Flash Butt Welding)", status: "Completed", date: "Dec 2023", delay: 1 },
      { name: "25kV AC Overhead Electrification", status: "In Progress", date: "Aug 2024", delay: 2 },
      { name: "Automated Signalling & SCADA", status: "Pending", date: "Feb 2025", delay: 2 },
      { name: "Trial Run & Freight Commissioning", status: "Pending", date: "May 2027", delay: 2 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 3800, actual: 3600, aiPredicted: 3600 },
      { period: "Q2 2023", planned: 7200, actual: 6900, aiPredicted: 6900 },
      { period: "Q3 2023", planned: 10100, actual: 9700, aiPredicted: 9700 },
      { period: "Q4 2023", planned: 12500, actual: 11800, aiPredicted: 11800 },
      { period: "Q1 2024", planned: 14200, actual: null, aiPredicted: 13900 },
      { period: "Q4 2024 (Forecast)", planned: 14200, actual: null, aiPredicted: 15100 }
    ]
  },
  {
    id: "INF-003",
    name: "Urban Metro Expansion Phase II - Line 3 & 4",
    sector: "Urban Transport",
    ministry: "Ministry of Housing & Urban Affairs",
    state: "Tamil Nadu",
    implementingAgency: "CMRL",
    contractor: "Afcons - Transtonnelstroy JV",
    originalCost: 9800,
    revisedCost: 12400,
    expenditure: 6200,
    physicalProgress: 51,
    financialProgress: 63,
    targetProgress: 76,
    startDate: "Aug 2021",
    originalEndDate: "Sep 2026",
    revisedEndDate: "Aug 2027",
    milestoneDelay: 11,
    costRisk: 89,
    delayRisk: 91,
    overallRisk: 90,
    status: "High Risk",
    riskCategory: "Critical",
    location: "Chennai Metropolitan Corridor (36.2 km Underground & Elevated)",
    riskFactors: [
      "Severe Tunnel Boring Machine (TBM) geology bottleneck",
      "Land acquisition delay near key interchange hubs",
      "Significant contractor cost escalation claims",
      "Repeated milestone slippage across underground packages"
    ],
    aiInsights: {
      predictedCostOverrun: "+26.5% (₹2,600 Cr)",
      predictedTimeOverrun: "+11.2 months",
      confidenceScore: 96.8,
      topDriver: "Sub-surface Geological Obstacles & TBM Downtime",
      shapValues: [
        { feature: "TBM Hard Rock Penetration Index", impact: "+41%" },
        { feature: "Utility Shifting Delays", impact: "+26%" },
        { feature: "Contractor Cashflow Constraints", impact: "+21%" },
        { feature: "Traffic Police No-Objection Delays", impact: "+12%" }
      ],
      recommendedAction: "Deploy additional slurry TBM unit at Gemini interchange and release provisional milestone mobilization advances."
    },
    milestones: [
      { name: "Tender Award & Mobilization", status: "Completed", date: "Nov 2021", delay: 2 },
      { name: "Elevated Viaduct Superstructure", status: "Completed", date: "Jan 2023", delay: 4 },
      { name: "Underground TBM Tunnel Drive 1", status: "Delayed", date: "Dec 2023", delay: 8 },
      { name: "Underground TBM Tunnel Drive 2", status: "Delayed", date: "Jul 2024", delay: 11 },
      { name: "Station Box Civil Structure", status: "In Progress", date: "Jan 2025", delay: 11 },
      { name: "Rolling Stock Delivery & Testing", status: "Pending", date: "Aug 2027", delay: 11 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 2900, actual: 2300, aiPredicted: 2300 },
      { period: "Q2 2023", planned: 5400, actual: 4100, aiPredicted: 4100 },
      { period: "Q3 2023", planned: 7600, actual: 5400, aiPredicted: 5400 },
      { period: "Q4 2023", planned: 9800, actual: 6200, aiPredicted: 6200 },
      { period: "Q1 2024 (Forecast)", planned: 9800, actual: null, aiPredicted: 8900 },
      { period: "Q4 2024 (Forecast)", planned: 9800, actual: null, aiPredicted: 12400 }
    ]
  },
  {
    id: "INF-004",
    name: "National Water Grid & River Interlinking Link-A",
    sector: "Water Resources",
    ministry: "Ministry of Jal Shakti",
    state: "Telangana",
    implementingAgency: "NWDA",
    contractor: "Megha Engineering & Infrastructures Ltd.",
    originalCost: 7600,
    revisedCost: 8100,
    expenditure: 5900,
    physicalProgress: 79,
    financialProgress: 77,
    targetProgress: 82,
    startDate: "Jan 2021",
    originalEndDate: "Nov 2026",
    revisedEndDate: "Jan 2027",
    milestoneDelay: 3,
    costRisk: 29,
    delayRisk: 35,
    overallRisk: 32,
    status: "On Track",
    riskCategory: "Low",
    location: "Godavari-Cauvery Interlink Canal (180 km)",
    riskFactors: [
      "Minor seasonal canal lining downtime due to unseasonal rainfall",
      "Minor forest compensatory afforestation certificate processing"
    ],
    aiInsights: {
      predictedCostOverrun: "+6.5% (₹500 Cr)",
      predictedTimeOverrun: "+2.0 months",
      confidenceScore: 89.4,
      topDriver: "Pumping Station Electro-mechanical Equipment",
      shapValues: [
        { feature: "Seasonal Inflow Variation", impact: "+16%" },
        { feature: "Cement Lining Quality Clearance", impact: "+11%" },
        { feature: "Right of Canal Possession", impact: "-20%" }
      ],
      recommendedAction: "Execute 24/7 pump-house dry testing to compress commissioning schedule by 45 days."
    },
    milestones: [
      { name: "Canal Alignment Survey & Soil Geo", status: "Completed", date: "Jun 2021", delay: 0 },
      { name: "Earth Excavation & Embankment", status: "Completed", date: "Aug 2022", delay: 1 },
      { name: "Canal Bed Concrete Lining", status: "Completed", date: "Feb 2023", delay: 2 },
      { name: "Lift Pumping Station House", status: "In Progress", date: "Nov 2023", delay: 3 },
      { name: "Aqueducts & Syphons Installation", status: "In Progress", date: "May 2024", delay: 3 },
      { name: "Water Inundation & Trial Flow", status: "Pending", date: "Jan 2027", delay: 3 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 2400, actual: 2300, aiPredicted: 2300 },
      { period: "Q2 2023", planned: 4600, actual: 4200, aiPredicted: 4200 },
      { period: "Q3 2023", planned: 6200, actual: 5500, aiPredicted: 5500 },
      { period: "Q4 2023", planned: 7600, actual: 5900, aiPredicted: 5900 },
      { period: "Q2 2024 (Forecast)", planned: 7600, actual: null, aiPredicted: 7100 },
      { period: "Q4 2024 (Forecast)", planned: 7600, actual: null, aiPredicted: 8100 }
    ]
  },
  {
    id: "INF-005",
    name: "Renewable Energy Ultra Mega Green Transmission Corridor",
    sector: "Energy",
    ministry: "Ministry of Power",
    state: "Rajasthan",
    implementingAgency: "POWERGRID",
    contractor: "Sterlite Power Transmission",
    originalCost: 11300,
    revisedCost: 13900,
    expenditure: 7200,
    physicalProgress: 57,
    financialProgress: 61,
    targetProgress: 72,
    startDate: "Oct 2021",
    originalEndDate: "Jun 2027",
    revisedEndDate: "Dec 2027",
    milestoneDelay: 7,
    costRisk: 71,
    delayRisk: 68,
    overallRisk: 70,
    status: "At Risk",
    riskCategory: "Medium",
    location: "Bhadla - Fatehgarh - Khetri 765kV High Voltage Line",
    riskFactors: [
      "765kV Transformer equipment delivery delay (Global supply chain bottleneck)",
      "Great Indian Bustard (GIB) underground cable diverter regulatory mandate",
      "Tower foundation construction in desert sandy terrain"
    ],
    aiInsights: {
      predictedCostOverrun: "+23.0% (₹2,600 Cr)",
      predictedTimeOverrun: "+6.0 months",
      confidenceScore: 92.1,
      topDriver: "Bird Diverters & Underground Cabling Mandate",
      shapValues: [
        { feature: "Environmental GIB Supreme Court Compliance", impact: "+37%" },
        { feature: "High Voltage Transformer Lead Times", impact: "+29%" },
        { feature: "Desert Tower Erection Speed", impact: "+14%" }
      ],
      recommendedAction: "Fast-track import clearance for optical bird flight diverters and approve revised EPC package for underground portion."
    },
    milestones: [
      { name: "Survey & Tower Spotting Approval", status: "Completed", date: "Jan 2022", delay: 0 },
      { name: "Tower Foundation Pile Driving", status: "Completed", date: "Nov 2022", delay: 3 },
      { name: "Tower Erection 765kV Lines", status: "Delayed", date: "Oct 2023", delay: 5 },
      { name: "Bird Diverters Installation", status: "Delayed", date: "May 2024", delay: 7 },
      { name: "Substation 765/400kV Fatehgarh", status: "In Progress", date: "Nov 2024", delay: 7 },
      { name: "Charging & Grid Synchronization", status: "Pending", date: "Dec 2027", delay: 7 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 3100, actual: 2800, aiPredicted: 2800 },
      { period: "Q2 2023", planned: 6400, actual: 5100, aiPredicted: 5100 },
      { period: "Q3 2023", planned: 9200, actual: 6800, aiPredicted: 6800 },
      { period: "Q4 2023", planned: 11300, actual: 7200, aiPredicted: 7200 },
      { period: "Q2 2024 (Forecast)", planned: 11300, actual: null, aiPredicted: 10400 },
      { period: "Q4 2024 (Forecast)", planned: 11300, actual: null, aiPredicted: 13900 }
    ]
  },
  {
    id: "INF-006",
    name: "Vadodara-Mumbai Expressway (Phase I & II)",
    sector: "Road Transport",
    ministry: "Ministry of Road Transport & Highways",
    state: "Gujarat",
    implementingAgency: "NHAI",
    contractor: "IRB Infrastructure Developers",
    originalCost: 24500,
    revisedCost: 26800,
    expenditure: 21900,
    physicalProgress: 88,
    financialProgress: 89,
    targetProgress: 94,
    startDate: "Jul 2020",
    originalEndDate: "Jan 2026",
    revisedEndDate: "May 2026",
    milestoneDelay: 4,
    costRisk: 42,
    delayRisk: 40,
    overallRisk: 41,
    status: "Delayed",
    riskCategory: "Medium",
    location: "Vadodara - Kim - JNPT Port Access (379 km)",
    riskFactors: [
      "Overbridge construction over Western Railway main line",
      "Minor monsoon drainage redesign in coastal zones"
    ],
    aiInsights: {
      predictedCostOverrun: "+9.3% (₹2,300 Cr)",
      predictedTimeOverrun: "+4.0 months",
      confidenceScore: 95.0,
      topDriver: "Railway Block Clearance for ROB",
      shapValues: [
        { feature: "Railway Clearance Windows", impact: "+24%" },
        { feature: "Drainage Culvert Redesign", impact: "+16%" },
        { feature: "Bitumen Supply Stream", impact: "-10%" }
      ],
      recommendedAction: "Coordinate 72-hour special rail traffic block with Ministry of Railways for girder launching."
    },
    milestones: [
      { name: "Civil Package 1-4 Subgrade", status: "Completed", date: "Dec 2021", delay: 0 },
      { name: "Bridge & Culvert Crossings", status: "Completed", date: "Jan 2023", delay: 2 },
      { name: "Rigid Pavement PQC Laying", status: "Completed", date: "Aug 2023", delay: 2 },
      { name: "Railway Overbridge Girder Erection", status: "Delayed", date: "Jun 2024", delay: 4 },
      { name: "Toll Integration & Green Landscaping", status: "In Progress", date: "Dec 2024", delay: 4 },
      { name: "Commercial Operations Date (COD)", status: "Pending", date: "May 2026", delay: 4 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 8200, actual: 8000, aiPredicted: 8000 },
      { period: "Q2 2023", planned: 14500, actual: 13900, aiPredicted: 13900 },
      { period: "Q3 2023", planned: 19800, actual: 18700, aiPredicted: 18700 },
      { period: "Q4 2023", planned: 24500, actual: 21900, aiPredicted: 21900 },
      { period: "Q2 2024 (Forecast)", planned: 24500, actual: null, aiPredicted: 24900 },
      { period: "Q4 2024 (Forecast)", planned: 24500, actual: null, aiPredicted: 26800 }
    ]
  },
  {
    id: "INF-007",
    name: "Deep Water Mega Transshipment Port Vizhinjam",
    sector: "Shipping & Ports",
    ministry: "Ministry of Ports, Shipping & Waterways",
    state: "Kerala",
    implementingAgency: "Kerala Port Authority / Adani Ports",
    contractor: "Adani Vizhinjam Port Pvt Ltd",
    originalCost: 7700,
    revisedCost: 8867,
    expenditure: 7100,
    physicalProgress: 82,
    financialProgress: 85,
    targetProgress: 90,
    startDate: "Dec 2018",
    originalEndDate: "Oct 2024",
    revisedEndDate: "Dec 2026",
    milestoneDelay: 8,
    costRisk: 65,
    delayRisk: 62,
    overallRisk: 64,
    status: "Delayed",
    riskCategory: "Medium",
    location: "Vizhinjam International Seaport, Thiruvananthapuram",
    riskFactors: [
      "Breakwater armor rock supply shortage during monsoon seasons",
      "Local fisherfolk rehabilitation package renegotiation"
    ],
    aiInsights: {
      predictedCostOverrun: "+15.1% (₹1,167 Cr)",
      predictedTimeOverrun: "+26 months total (historical baseline)",
      confidenceScore: 93.3,
      topDriver: "Breakwater Construction & Granite Stone Logistics",
      shapValues: [
        { feature: "Quarry Granite Logistics", impact: "+32%" },
        { feature: "Monsoon Sea Swell Downtime", impact: "+28%" },
        { feature: "Crane Berth Superstructure", impact: "-14%" }
      ],
      recommendedAction: "Streamline coastal barge shipment of granite from Tamil Nadu quarries."
    },
    milestones: [
      { name: "Dredging & Reclamation Phase 1", status: "Completed", date: "May 2021", delay: 4 },
      { name: "Breakwater 3.1 km Berth Core", status: "Completed", date: "Feb 2023", delay: 8 },
      { name: "Automated Ship-to-Shore Cranes Arrival", status: "Completed", date: "Oct 2023", delay: 6 },
      { name: "Trial Vessel Berthing", status: "Completed", date: "Jul 2024", delay: 8 },
      { name: "Customs & Port Logistics Park", status: "In Progress", date: "Dec 2024", delay: 8 },
      { name: "Full Scale Commercial Commissioning", status: "Pending", date: "Dec 2026", delay: 8 }
    ],
    financialTimeline: [
      { period: "Q1 2023", planned: 2900, actual: 2700, aiPredicted: 2700 },
      { period: "Q2 2023", planned: 4800, actual: 4400, aiPredicted: 4400 },
      { period: "Q3 2023", planned: 6500, actual: 6100, aiPredicted: 6100 },
      { period: "Q4 2023", planned: 7700, actual: 7100, aiPredicted: 7100 },
      { period: "Q2 2024 (Forecast)", planned: 7700, actual: null, aiPredicted: 8200 },
      { period: "Q4 2024 (Forecast)", planned: 7700, actual: null, aiPredicted: 8867 }
    ]
  }
];

export const sectorStats = [
  { sector: "Road Transport", projects: 2, original: 43000, revised: 48900, avgRisk: 61, color: "#2563eb" },
  { sector: "Railways", projects: 1, original: 14200, revised: 15100, avgRisk: 34, color: "#059669" },
  { sector: "Urban Transport", projects: 1, original: 9800, revised: 12400, avgRisk: 90, color: "#dc2626" },
  { sector: "Water Resources", projects: 1, original: 7600, revised: 8100, avgRisk: 32, color: "#0891b2" },
  { sector: "Energy", projects: 1, original: 11300, revised: 13900, avgRisk: 70, color: "#d97706" },
  { sector: "Shipping & Ports", projects: 1, original: 7700, revised: 8867, avgRisk: 64, color: "#7c3aed" }
];

export const ewsAlerts = [
  {
    id: "ALT-901",
    projectId: "INF-003",
    projectName: "Urban Metro Expansion Phase II",
    severity: "Critical",
    timestamp: "10 mins ago",
    category: "Schedule & Cost Risk Trigger",
    title: "TBM Penetration Velocity Dropped by 62% - Projected 11 Month Slippage",
    description: "Geotechnical anomaly detected at Chainage 18+400 (Hard Charnockite Rock layer). Predicted additional cost impact: ₹2,600 Cr unless supplementary slurry TBM is deployed.",
    status: "Unresolved",
    assignedMinistry: "Ministry of Housing & Urban Affairs",
    actionRequired: "Convene Technical Appraisal Committee with CMRL & Contractor Consortium."
  },
  {
    id: "ALT-902",
    projectId: "INF-001",
    projectName: "National Highway Development Corridor NH-44",
    severity: "High",
    timestamp: "2 hours ago",
    category: "Cost Escalation Forecast",
    title: "WPI Steel/Cement Index Trigger Exceeds Escalation Threshold",
    description: "Wholesale Price Index adjustment clause triggered in Package 3 & 4. Projected +19.4% budget overrun risk.",
    status: "In Review",
    assignedMinistry: "Ministry of Road Transport & Highways",
    actionRequired: "Review Revised Cost Estimates (RCE) with Expenditure Finance Committee (EFC)."
  },
  {
    id: "ALT-903",
    projectId: "INF-005",
    projectName: "Renewable Energy Ultra Mega Green Transmission Corridor",
    severity: "High",
    timestamp: "5 hours ago",
    category: "Regulatory / Environmental",
    title: "Supreme Court GIB Underground Cabling Compliance Mandate",
    description: "128 km stretch in Thar eco-zone requires bird diverters & underground insulated cabling. Potential milestone delay of 7 months.",
    status: "In Review",
    assignedMinistry: "Ministry of Power",
    actionRequired: "Expedite power equipment import licenses and revised tender schedule."
  },
  {
    id: "ALT-904",
    projectId: "INF-006",
    projectName: "Vadodara-Mumbai Expressway",
    severity: "Medium",
    timestamp: "1 day ago",
    category: "Milestone Warning",
    title: "Railway Traffic Block Approval Pending for Western Line ROB",
    description: "Girder launching sequence requires 72-hour traffic block. Approaching critical path dependency window.",
    status: "Escalated",
    assignedMinistry: "Ministry of Road Transport & Highways",
    actionRequired: "Joint inter-ministerial coordination meeting with Railway Board."
  }
];

export const aiModelMetrics = {
  modelName: "InfraRisk-GradientBoost-XGB Ensemble v2.8",
  trainedOnRecords: "1,942 Central Sector Projects (MoSPI OCMS 2014-2024)",
  accuracyAUC: "94.6%",
  meanAbsolutePercentageError: "4.8%",
  lastSyncTime: "Today at 05:30 AM (Auto-Synced with MoSPI OCMS Portal)",
  latencyMs: 24,
  anomalySensitivity: "High (0.85 Sigma Threshold)"
};