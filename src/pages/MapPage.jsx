import React, { useState, useMemo } from "react";
import {
  MapPin,
  Layers,
  Filter,
  AlertTriangle,
  Building2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  IndianRupee,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import IndiaMap from "../components/IndiaMap";
import { STATES_DATA, PROJECTS_REQUIRING_ATTENTION, MINISTRIES, SECTORS } from "../data/paimanaData";
import { useApi } from "../context/ApiContext";

// Real geolocated central sector project records
const GEOLOCATED_PROJECTS = [
  {
    id: "GEO-001",
    code: "NH-44-CORR",
    name: "National Highway Development Corridor NH-44 (Package-IV)",
    sector: "Road Transport",
    ministry: "MoRTH",
    state: "Karnataka",
    stateCode: "KA",
    coords: "15.8497° N, 74.4977° E (Belagavi)",
    cost: 18500,
    revisedCost: 22100,
    progress: 72,
    delayMonths: 18,
    risk: "Critical",
    agency: "NHAI",
    contractor: "Larsen & Toubro Ltd.",
    status: "Delayed",
  },
  {
    id: "GEO-002",
    code: "EDFC-PKG3",
    name: "Eastern Dedicated Freight Corridor (Sonnagar - Dankuni Section)",
    sector: "Railways",
    ministry: "MoR",
    state: "West Bengal",
    stateCode: "WB",
    coords: "22.6757° N, 88.3056° E (Dankuni)",
    cost: 14200,
    revisedCost: 17950,
    progress: 64,
    delayMonths: 21,
    risk: "Critical",
    agency: "DFCCIL",
    contractor: "Tata Projects - Aldesa JV",
    status: "Delayed",
  },
  {
    id: "GEO-003",
    code: "RAJ-PWR-T1",
    name: "Adani Transmission - Rajasthan Part-I 765kV Green Corridor",
    sector: "Power",
    ministry: "MoP",
    state: "Rajasthan",
    stateCode: "RJ",
    coords: "26.9124° N, 75.7873° E (Fatehgarh)",
    cost: 25000,
    revisedCost: 25000,
    progress: 54,
    delayMonths: 24,
    risk: "High",
    agency: "PGCIL / Direct RE",
    contractor: "Adani Transmission Ltd",
    status: "Delayed",
  },
  {
    id: "GEO-004",
    code: "KEN-BETWA-LNK",
    name: "Ken-Betwa River Interlinking National Project",
    sector: "Water Resources",
    ministry: "DWR, RD & GR",
    state: "Madhya Pradesh",
    stateCode: "MP",
    coords: "24.5714° N, 79.9199° E (Daodhan)",
    cost: 44605,
    revisedCost: 48950,
    progress: 18,
    delayMonths: 24,
    risk: "High",
    agency: "NWDA",
    contractor: "Civil Infrastructure Consortium",
    status: "Delayed",
  },
  {
    id: "GEO-005",
    code: "NBCC-GPRA-7",
    name: "Redevelopment of General Pool Residential Colonies (Sarojini Nagar)",
    sector: "Urban Development",
    ministry: "MoHUA",
    state: "Delhi & Other UTs",
    stateCode: "UT",
    coords: "28.5729° N, 77.1989° E (New Delhi)",
    cost: 32850,
    revisedCost: 32841,
    progress: 47,
    delayMonths: 12,
    risk: "Medium",
    agency: "NBCC (India) Ltd",
    contractor: "Shapoorji Pallonji",
    status: "Delayed",
  },
  {
    id: "GEO-006",
    code: "NCL-CIL-JYT",
    name: "Northern Coalfields - Jayant Open Cast Expansion (20 to 30 MTPA)",
    sector: "Coal",
    ministry: "MoCoal",
    state: "Madhya Pradesh",
    stateCode: "MP",
    coords: "24.1200° N, 82.6800° E (Singrauli)",
    cost: 25560,
    revisedCost: 25560,
    progress: 14,
    delayMonths: 24,
    risk: "High",
    agency: "CIL / NCL",
    contractor: "BEML Consortium",
    status: "Delayed",
  },
  {
    id: "GEO-007",
    code: "MAH-HSR-01",
    name: "Mumbai - Ahmedabad High Speed Rail Corridor (Bullet Train)",
    sector: "Railways",
    ministry: "MoR",
    state: "Maharashtra",
    stateCode: "MH",
    coords: "19.0760° N, 72.8777° E (BKC Terminal)",
    cost: 108000,
    revisedCost: 110000,
    progress: 42,
    delayMonths: 36,
    risk: "Critical",
    agency: "NHSRCL",
    contractor: "L&T Heavy Civil / JICA",
    status: "Delayed",
  },
  {
    id: "GEO-008",
    code: "NTPC-BRH-STG2",
    name: "NTPC Barh Super Thermal Power Station Stage-II (1320 MW)",
    sector: "Power",
    ministry: "MoP",
    state: "Bihar",
    stateCode: "BR",
    coords: "25.4800° N, 85.7100° E (Patna)",
    cost: 21400,
    revisedCost: 24800,
    progress: 88,
    delayMonths: 14,
    risk: "Medium",
    agency: "NTPC Ltd",
    contractor: "BHEL",
    status: "Delayed",
  },
];

export default function MapPage({ onNavigateDetails }) {
  const [selectedStateCode, setSelectedStateCode] = useState("OD");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [searchPin, setSearchPin] = useState("");

  const activeState = useMemo(() => {
    return STATES_DATA.find((s) => s.code === selectedStateCode) || STATES_DATA[0];
  }, [selectedStateCode]);

  const stateProjects = useMemo(() => {
    return GEOLOCATED_PROJECTS.filter((p) => {
      if (p.stateCode !== selectedStateCode && selectedStateCode !== "ALL") return false;
      if (sectorFilter !== "ALL" && p.sector !== sectorFilter) return false;
      if (riskFilter !== "ALL" && p.risk !== riskFilter) return false;
      if (searchPin.trim()) {
        const q = searchPin.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.agency.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedStateCode, sectorFilter, riskFilter, searchPin]);

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Breadcrumb & Title Bar */}
      <div className="bg-white border border-slate-300 rounded-xs p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
            <span>MoSPI Central Sector</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Geographic Intelligence</span>
          </div>
          <h2 className="text-base font-extrabold text-[#0b2240] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <span>National Infrastructure GIS & State-wise Project Distribution</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-xs font-semibold">
            July 2026 Cycle | 36 States & UTs Monitored
          </span>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white border border-slate-300 rounded-xs p-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Select State / UT
            </label>
            <select
              value={selectedStateCode}
              onChange={(e) => setSelectedStateCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xs px-2.5 py-1 text-slate-800 font-medium"
            >
              {STATES_DATA.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.projectCount} Projects)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Filter Sector
            </label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xs px-2.5 py-1 text-slate-800"
            >
              <option value="ALL">All Infrastructure Sectors</option>
              {SECTORS.filter((s) => s.id !== "ALL").map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Decision Support Risk Tier
            </label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xs px-2.5 py-1 text-slate-800"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="Critical">Critical Priority</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Search Project / Agency Pin
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search geo projects..."
                value={searchPin}
                onChange={(e) => setSearchPin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xs pl-7 pr-2 py-1 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Map & State Inspector Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive SVG Map */}
        <div className="lg:col-span-8">
          <IndiaMap
            selectedStateCode={selectedStateCode}
            onSelectState={(st) => setSelectedStateCode(st.code)}
          />
        </div>

        {/* Right: Selected State Snapshot & Local Project Feed */}
        <div className="lg:col-span-4 space-y-3">
          {/* State Summary Card */}
          <div className="bg-white border border-slate-300 rounded-xs p-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-900" />
                <h3 className="font-bold text-sm text-slate-900">{activeState.name}</h3>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase border ${
                  activeState.riskLevel === "Critical"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : activeState.riskLevel === "High"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {activeState.riskLevel} Tier
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
                <div className="text-[10px] text-slate-500">Monitored Projects</div>
                <div className="font-mono font-bold text-slate-900 text-sm">
                  {activeState.projectCount}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
                <div className="text-[10px] text-slate-500">Delayed Projects</div>
                <div className="font-mono font-bold text-amber-800 text-sm">
                  {activeState.delayedCount}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
                <div className="text-[10px] text-slate-500">Sanctioned Cost</div>
                <div className="font-mono font-bold text-slate-900 text-xs">
                  ₹ {Math.round(activeState.originalCost).toLocaleString("en-IN")} Cr
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
                <div className="text-[10px] text-slate-500">Expenditure</div>
                <div className="font-mono font-bold text-slate-900 text-xs">
                  ₹ {Math.round(activeState.expenditure).toLocaleString("en-IN")} Cr
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 bg-blue-50/60 border border-blue-200 p-2 rounded-xs">
              <strong>Nodal Oversight:</strong> State Empowered Committee (SEC) & District
              Monitoring Committees coordinate land acquisition and forest clearance in {activeState.name}.
            </div>
          </div>

          {/* Regional Major Projects List */}
          <div className="bg-white border border-slate-300 rounded-xs p-3.5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Key Central Sector Projects in {activeState.name}
              </h4>
              <span className="text-[10px] font-mono text-slate-500">
                {stateProjects.length} Identified
              </span>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {stateProjects.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No filtered geo-tagged projects recorded for {activeState.name}.
                </div>
              ) : (
                stateProjects.map((p) => (
                  <div
                    key={p.id}
                    className="border border-slate-200 rounded-xs p-2.5 hover:border-blue-700 bg-slate-50/50 transition text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="font-mono font-bold text-blue-900 text-[10px]">
                          {p.code}
                        </span>
                        <div className="font-bold text-slate-900 text-xs leading-snug">
                          {p.name}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase border ${
                          p.risk === "Critical"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {p.risk}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500">
                      Agency: {p.agency} | {p.coords}
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-200 text-[10px] font-mono">
                      <div>
                        <span className="text-slate-500 block text-[9px]">Sanction:</span>
                        ₹{p.cost} Cr
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">Progress:</span>
                        {p.progress}%
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">Delay:</span>
                        <span className="text-amber-800 font-bold">+{p.delayMonths}m</span>
                      </div>
                    </div>

                    {onNavigateDetails && (
                      <button
                        onClick={() => onNavigateDetails(p.id)}
                        className="w-full mt-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-semibold rounded-xs flex items-center justify-center gap-1 border border-slate-300"
                      >
                        <span>Open Project Dossier</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
