import React, { useState } from "react";
import {
  Building2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  RefreshCw,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  Activity,
  ArrowRight,
  Info,
  MapPin,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Star,
  SlidersHorizontal,
  FileText,
  Phone,
} from "lucide-react";
import IndiaMap from "../components/IndiaMap";
import paimanaHeroImg from "../assets/paimana-hero.jpg";
import paimanaMobileImg from "../assets/paimana-mobile.jpg";

// Real PAIMANA Ministry Showcase Dataset (Matches https://paimana-proj.mospi.gov.in/ screenshot)
const MINISTRY_SHOWCASE = [
  {
    code: "MoD",
    name: "Ministry of Defence",
    projectCount: 8,
    originalCost: 16450.0,
    revisedCost: 18200.0,
    expenditure: 12400.0,
    completedMonth: 0,
    newlyAdded: 0,
  },
  {
    code: "DPIIT",
    name: "Department for Promotion of Industry & Internal Trade",
    projectCount: 12,
    originalCost: 21243.02,
    revisedCost: 21243.02,
    expenditure: 2323.94,
    completedMonth: 0,
    newlyAdded: 0,
  },
  {
    code: "MoHFW",
    name: "Ministry of Health & Family Welfare",
    projectCount: 24,
    originalCost: 34100.5,
    revisedCost: 36400.0,
    expenditure: 21800.0,
    completedMonth: 1,
    newlyAdded: 0,
  },
  {
    code: "DWR, RD & GR",
    name: "Department of Water Resources, River Development & Ganga Rejuvenation",
    projectCount: 42,
    originalCost: 98450.0,
    revisedCost: 114200.0,
    expenditure: 41800.0,
    completedMonth: 0,
    newlyAdded: 1,
  },
  {
    code: "MoHUA",
    name: "Ministry of Housing & Urban Affairs",
    projectCount: 88,
    originalCost: 84500.0,
    revisedCost: 98200.0,
    expenditure: 32400.0,
    completedMonth: 2,
    newlyAdded: 1,
  },
  {
    code: "MoRTH",
    name: "Ministry of Road Transport & Highways",
    projectCount: 684,
    originalCost: 812400.0,
    revisedCost: 894500.0,
    expenditure: 442100.0,
    completedMonth: 4,
    newlyAdded: 8,
  },
  {
    code: "MoR",
    name: "Ministry of Railways",
    projectCount: 324,
    originalCost: 742100.0,
    revisedCost: 986400.0,
    expenditure: 462300.0,
    completedMonth: 1,
    newlyAdded: 2,
  },
  {
    code: "MoP",
    name: "Ministry of Power",
    projectCount: 268,
    originalCost: 412800.0,
    revisedCost: 448200.0,
    expenditure: 241900.0,
    completedMonth: 0,
    newlyAdded: 2,
  },
];

// Sector Wise Data
const SECTOR_SHOWCASE = [
  {
    code: "ROADS",
    name: "Road Transport & Highways",
    projectCount: 684,
    originalCost: 812400.0,
    revisedCost: 894500.0,
    expenditure: 442100.0,
    completedMonth: 4,
    newlyAdded: 8,
  },
  {
    code: "RAILWAYS",
    name: "Railways",
    projectCount: 324,
    originalCost: 742100.0,
    revisedCost: 986400.0,
    expenditure: 462300.0,
    completedMonth: 1,
    newlyAdded: 2,
  },
  {
    code: "POWER",
    name: "Power & Transmission",
    projectCount: 268,
    originalCost: 412800.0,
    revisedCost: 448200.0,
    expenditure: 241900.0,
    completedMonth: 0,
    newlyAdded: 2,
  },
  {
    code: "PETROLEUM",
    name: "Petroleum & Natural Gas",
    projectCount: 184,
    originalCost: 362400.0,
    revisedCost: 389100.0,
    expenditure: 194800.0,
    completedMonth: 0,
    newlyAdded: 0,
  },
  {
    code: "COAL",
    name: "Coal & Mines",
    projectCount: 122,
    originalCost: 124800.0,
    revisedCost: 141200.0,
    expenditure: 68200.0,
    completedMonth: 0,
    newlyAdded: 0,
  },
  {
    code: "WATER",
    name: "Water Resources",
    projectCount: 94,
    originalCost: 112500.0,
    revisedCost: 139800.0,
    expenditure: 42100.0,
    completedMonth: 0,
    newlyAdded: 1,
  },
];

// High Value Projects (Matching Cards in PAIMANA screenshot)
const HIGH_VALUE_PROJECTS = [
  {
    sector: "Real Estate",
    icon: "building",
    agency: "National Buildings Construction Corporation [NBCC]",
    name: "Redevelopment of Seven General Pool Residential Colonies (GPRA)",
    originalCost: 32850,
    revisedCost: 32841,
    progress: 47,
    compDate: "31/12/2025",
  },
  {
    sector: "Coal",
    icon: "coal",
    agency: "NCL - CIL",
    name: "JAYANT EXPN. (20 TO 30 MTPA)",
    originalCost: 25560,
    revisedCost: 25560,
    progress: 3,
    compDate: "31/03/2032",
  },
  {
    sector: "Transmission & Distribution",
    icon: "power",
    agency: "Adani Transmission Limited",
    name: "RAJASTHAN PART-I POWER TRANSMISSION",
    originalCost: 25000,
    revisedCost: 25000,
    progress: 10,
    compDate: "20/07/2029",
  },
  {
    sector: "Water Resources",
    icon: "water",
    agency: "Department of Water Resources, River Development...",
    name: "Ken-Betwa Linking Development Project",
    originalCost: 21030,
    revisedCost: 21030,
    progress: 0,
    compDate: "31/03/2029",
  },
];

export default function LandingPage({ onEnter }) {
  // Toggle: "ministry" | "sector"
  const [activeFilterMode, setActiveFilterMode] = useState("ministry");
  const [selectedMinistryIndex, setSelectedMinistryIndex] = useState(1); // Default to DPIIT (index 1)
  const [selectedSectorIndex, setSelectedSectorIndex] = useState(0);

  // Selected State on India Map (Default: Odisha from screenshot)
  const [selectedState, setSelectedState] = useState({
    code: "OD",
    name: "Odisha",
    projectCount: 108,
    originalCost: 305157.53,
    revisedCost: 261313.62,
    expenditure: 183622.73,
    completedMonth: 0,
    newlyAdded: 0,
  });

  const activeMinistry =
    activeFilterMode === "ministry"
      ? MINISTRY_SHOWCASE[selectedMinistryIndex]
      : SECTOR_SHOWCASE[selectedSectorIndex];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-[#0072ce] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP UTILITY BAR (EMAIL, ACCESSIBILITY, STAR)                           */}
      {/* ========================================================================= */}
      <div className="bg-[#f8fafc] border-b border-slate-200 py-1 px-4 sm:px-8 text-slate-500 text-[11px]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-end gap-3.5">
          <button className="hover:text-slate-800 flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span className="hidden sm:inline">Feedback</span>
          </button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-800 font-bold">A-</button>
          <button className="hover:text-slate-800 font-bold">A</button>
          <button className="hover:text-slate-800 font-bold">A+</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-800 flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span className="hidden sm:inline">Bookmark</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN HEADER BAR (MOSPI EMBLEM, BUTTONS, PAIMANA LOGO)                 */}
      {/* ========================================================================= */}
      <header className="bg-white py-3 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Ministry Emblem & Titles */}
          <div className="flex items-center gap-3">
            {/* Government Emblem Symbol */}
            <div className="w-11 h-11 bg-slate-50 border border-slate-300 rounded-xs flex flex-col items-center justify-center p-1 text-center shrink-0">
              <span className="text-[9px] font-bold text-slate-800 uppercase leading-none">
                भारत
              </span>
              <span className="w-4 h-[1px] bg-slate-400 my-0.5" />
              <span className="text-[8px] font-bold text-slate-800 uppercase leading-none">
                INDIA
              </span>
            </div>

            <div className="border-l border-slate-300 pl-3">
              <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Ministry of Statistics and Programme Implementation
              </div>
              <div className="text-[11px] text-slate-600 font-medium">Government of India</div>
            </div>
          </div>

          {/* Center-Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onEnter}
              className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs font-bold rounded-sm shadow-xs uppercase tracking-wider transition"
            >
              ADD PROJECT / UPDATE
            </button>

            <button
              onClick={onEnter}
              className="px-5 py-2 bg-[#071d49] hover:bg-blue-950 text-white text-xs font-bold rounded-sm shadow-xs uppercase tracking-wider transition"
            >
              REPORTS
            </button>
          </div>

          {/* Right: Stylized PAIMANA Logo */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-widest text-[#0072ce] font-serif uppercase">
                PAIMANA
              </div>
              <div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase">
                InfraSight AI Decision Support
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. AZURE / SKY BLUE PRIMARY NAVIGATION SUB-HEADER                         */}
      {/* ========================================================================= */}
      <nav className="bg-[#0072ce] text-white px-4 sm:px-8 shadow-xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs font-semibold">
            <a
              href="#main"
              className="px-4 py-2.5 bg-[#005bb5] text-white font-bold border-b-2 border-white"
            >
              Home
            </a>
            <div className="relative group">
              <button className="px-4 py-2.5 hover:bg-[#005bb5] flex items-center gap-1 transition">
                <span>Publications</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="relative group">
              <button
                onClick={onEnter}
                className="px-4 py-2.5 hover:bg-[#005bb5] flex items-center gap-1 transition"
              >
                <span>Dashboard</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="text-xs font-semibold">
            <button
              onClick={onEnter}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xs transition text-[11px]"
            >
              Officer Portal Login &rarr;
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. HERO SECTION WITH CAROUSEL OVERLAY (AUTHENTIC PAIMANA BANNER)          */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[360px] sm:h-[420px] overflow-hidden bg-slate-900">
        <img
          src={paimanaHeroImg}
          alt="Central Sector Infrastructure Projects"
          className="w-full h-full object-cover opacity-85"
        />

        {/* Carousel Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/30 backdrop-blur-2xs transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/30 backdrop-blur-2xs transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Centered Dark Glass Box with 3D Styled Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-md px-8 sm:px-14 py-6 text-center max-w-2xl pointer-events-auto shadow-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wide uppercase bg-gradient-to-b from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Project Monitoring
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-medium mt-2 tracking-wide">
              Central Sector Infrastructure Projects Costing Rs. 150 crore & above
            </p>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-1.5 mt-5">
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MINISTRY-WISE / SECTOR-WISE SECTION (EXACT PAIMANA LAYOUT)            */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-5">
          {/* Centered Ministry / Sector Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex border border-slate-300 rounded-sm bg-white p-0.5 shadow-2xs text-xs font-bold">
              <button
                onClick={() => setActiveFilterMode("ministry")}
                className={`px-5 py-1.5 rounded-xs transition ${
                  activeFilterMode === "ministry"
                    ? "bg-[#e69500] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Ministry Wise
              </button>
              <button
                onClick={() => setActiveFilterMode("sector")}
                className={`px-5 py-1.5 rounded-xs transition ${
                  activeFilterMode === "sector"
                    ? "bg-[#e69500] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sector Wise
              </button>
            </div>
          </div>

          {/* Two-Column Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Vertical Ministry Selector */}
            <div className="lg:col-span-3 flex flex-col items-center space-y-1.5">
              <button
                onClick={() =>
                  setSelectedMinistryIndex((prev) =>
                    prev > 0 ? prev - 1 : MINISTRY_SHOWCASE.length - 1
                  )
                }
                className="text-slate-400 hover:text-slate-800 p-1"
                aria-label="Previous Ministry"
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              <div className="w-full space-y-1.5">
                {(activeFilterMode === "ministry" ? MINISTRY_SHOWCASE : SECTOR_SHOWCASE)
                  .slice(0, 5)
                  .map((item, idx) => {
                    const isSelected =
                      activeFilterMode === "ministry"
                        ? selectedMinistryIndex === idx
                        : selectedSectorIndex === idx;

                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          if (activeFilterMode === "ministry") {
                            setSelectedMinistryIndex(idx);
                          } else {
                            setSelectedSectorIndex(idx);
                          }
                        }}
                        className={`w-full py-2 px-3 text-xs font-bold rounded-sm border flex items-center justify-between transition ${
                          isSelected
                            ? "bg-[#e69500] text-white border-[#d97706] shadow-xs"
                            : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <span className="truncate">{item.code}</span>
                        {isSelected && <ChevronRight className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
              </div>

              <button
                onClick={() =>
                  setSelectedMinistryIndex((prev) =>
                    prev < MINISTRY_SHOWCASE.length - 1 ? prev + 1 : 0
                  )
                }
                className="text-slate-400 hover:text-slate-800 p-1"
                aria-label="Next Ministry"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Navy Department Title & 6 KPI Metric Cards */}
            <div className="lg:col-span-9 space-y-3">
              {/* Dark Navy Rounded Header Banner */}
              <div className="bg-[#0b1b3d] text-white text-center py-2.5 px-4 rounded-sm shadow-xs">
                <h2 className="text-sm font-bold tracking-wide">
                  {activeMinistry.name}{" "}
                  <span className="text-slate-300 text-xs font-normal">(as of July, 2026)</span>
                </h2>
              </div>

              {/* 6 KPI Cards Grid (3x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* 1. Project Count */}
                <div className="bg-white border border-slate-200 rounded-sm p-3.5 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Project Count (No.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      {activeMinistry.projectCount}
                    </div>
                  </div>
                </div>

                {/* 2. Original Cost */}
                <div className="bg-white border border-slate-200 rounded-sm p-3.5 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Original Cost (in Cr.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      ₹ {activeMinistry.originalCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* 3. Latest Revised Cost */}
                <div className="bg-white border border-slate-200 rounded-sm p-3.5 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Latest Revised Cost (in Cr.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      ₹ {activeMinistry.revisedCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* 4. Expenditure (Cum.) */}
                <div className="bg-white border border-slate-200 rounded-sm p-3.5 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Expenditure(Cum.) (in Cr.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      ₹ {activeMinistry.expenditure.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* 5. Completed During Month */}
                <div className="bg-white border border-slate-200 rounded-sm p-3.5 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Completed During Month (No.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      {activeMinistry.completedMonth}
                    </div>
                  </div>
                </div>

                {/* 6. Newly Added */}
                <div className="bg-white border border-slate-200 rounded-sm p-3.5 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Newly Added (No.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      {activeMinistry.newlyAdded}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STATE-WISE PROJECTS SECTION (MAP + STATE METRICS)                      */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 bg-white relative">
        {/* Subtle Geometric Background Wave */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">
              State-wise Projects{" "}
              <span className="text-slate-500 text-xs font-medium">(as of July, 2026)</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Click any state on the map to inspect project volume & expenditure
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Selected State Banner & 6 KPI Metric Cards */}
            <div className="lg:col-span-6 space-y-3">
              {/* Navy State Header Banner */}
              <div className="bg-[#0b1b3d] text-white text-center py-2 px-4 rounded-sm shadow-xs">
                <h3 className="text-base font-bold tracking-wide">{selectedState.name}</h3>
              </div>

              {/* 6 KPI Cards Grid (2x3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Project Count */}
                <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Project Count (No.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                      {selectedState.projectCount}
                    </div>
                  </div>
                </div>

                {/* 2. Original Cost */}
                <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Original Cost (in Cr.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                      ₹ {selectedState.originalCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* 3. Latest Revised Cost */}
                <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Latest Revised Cost (in Cr.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                      ₹ {selectedState.revisedCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* 4. Expenditure (Cum.) */}
                <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Expenditure(Cum.) (in Cr.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                      ₹ {selectedState.expenditure.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* 5. Completed During Month */}
                <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Completed During month (No.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                      {selectedState.completedMonth || 0}
                    </div>
                  </div>
                </div>

                {/* 6. Newly Added */}
                <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-2xs flex items-center gap-3">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xs text-slate-700 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <span>Newly Added (No.)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                      {selectedState.newlyAdded || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive India Map with Choropleth Heat Map */}
            <div className="lg:col-span-6">
              <IndiaMap
                selectedStateCode={selectedState.code}
                onSelectState={(st) => setSelectedState(st)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HIGH VALUE PROJECTS CAROUSEL (EXACT MATCHING CARDS)                    */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-8 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 text-center">High Value Projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIGH_VALUE_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-300 rounded-sm p-4 shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div>
                  {/* Sector Icon & Label */}
                  <div className="flex flex-col items-center text-center pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 mb-1">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                      {proj.sector}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate max-w-[200px] mt-0.5">
                      {proj.agency}
                    </span>
                  </div>

                  {/* Project Name */}
                  <div className="text-xs font-bold text-slate-900 text-center mt-2 line-clamp-2 min-h-[32px]">
                    {proj.name}
                  </div>
                </div>

                {/* 2x2 Financial & Progress Grid */}
                <div className="border border-slate-200 rounded-xs text-[10px] bg-slate-50/50">
                  <div className="grid grid-cols-2 border-b border-slate-200 p-2">
                    <div className="border-r border-slate-200 pr-2">
                      <span className="text-slate-500 block">Original Cost:</span>
                      <strong className="font-mono text-slate-900">
                        ₹ {proj.originalCost.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="pl-2">
                      <span className="text-slate-500 block">Physical Progress:</span>
                      <strong className="font-mono text-slate-900">{proj.progress}%</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 p-2">
                    <div className="border-r border-slate-200 pr-2">
                      <span className="text-slate-500 block">Latest Revised Cost:</span>
                      <strong className="font-mono text-slate-900">
                        ₹ {proj.revisedCost.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="pl-2">
                      <span className="text-slate-500 block">Latest Revised Comp.:</span>
                      <strong className="font-mono text-slate-900">{proj.compDate}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MOBILE APP "COMING SOON" BANNER                                        */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#ffe7dc] via-[#fedccb] to-[#fed3be] py-8 px-4 sm:px-8 border-b border-orange-200">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Phone Mockups */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={paimanaMobileImg}
              alt="PAIMANA Mobile App"
              className="max-h-[190px] object-contain drop-shadow-md"
            />
          </div>

          {/* Center: Title & Description */}
          <div className="text-center md:text-left space-y-1.5 md:flex-1">
            <h3 className="text-2xl font-extrabold text-orange-950">Coming Soon</h3>
            <p className="text-sm text-orange-900 font-medium">
              Discover your new favorite spaces, Download from Google Play/iOS App.
            </p>
          </div>

          {/* Right: Store Badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="bg-black hover:bg-slate-900 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-xs transition text-left">
              <span className="text-xl font-bold leading-none">&#9654;</span>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-300">GET IT ON</div>
                <div className="text-xs font-bold font-sans">Google Play</div>
              </div>
            </button>

            <button className="bg-black hover:bg-slate-900 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-xs transition text-left">
              <span className="text-xl font-bold leading-none">&#63743;</span>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-300">
                  Download on the
                </div>
                <div className="text-xs font-bold font-sans">App Store</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. OFFICIAL GOVERNMENT FOOTER (MOSPI + NEGD + CONTACT DETAILS)             */}
      {/* ========================================================================= */}
      <footer className="bg-white pt-8 pb-6 px-4 sm:px-8 border-t border-slate-200 text-xs text-slate-600">
        <div className="max-w-[1440px] mx-auto space-y-6">
          {/* Top Row: Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-200">
            {/* Left: Ministry Emblem */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 border border-slate-300 rounded-xs flex flex-col items-center justify-center font-bold text-slate-800 text-[8px] uppercase">
                GOI
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">
                  Ministry of Statistics and Programme Implementation
                </h4>
                <p className="text-[10px] text-slate-500">Government of India</p>
              </div>
            </div>

            {/* Right: NeGD Badge */}
            <div className="border border-slate-300 rounded-sm p-2 text-center bg-slate-50/50">
              <div className="text-[9px] text-slate-500 font-medium">Design and Developed by</div>
              <div className="font-extrabold text-blue-900 text-xs tracking-wider uppercase">
                NeGD &bull; National e-Governance Division
              </div>
            </div>
          </div>

          {/* Middle Row: Get in touch & Contacts */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
              Get in touch
            </h4>
            <p className="text-slate-600">
              Ministry of Statistics and Programme Implementation, Government of India, Khurshid Lal
              Bhawan, Janpath, New Delhi-110001 (India).
            </p>
            <div className="flex flex-wrap items-center gap-5 text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href="tel:01123455604" className="hover:text-blue-900 font-medium">
                  011-23455604
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href="mailto:dir-ipmd@mospi.gov.in" className="hover:text-blue-900 font-medium">
                  dir-ipmd[at]mospi[dot]gov[dot]in
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="pt-3 border-t border-slate-200">
            <div className="text-[11px] font-bold text-slate-700 mb-1.5">Quick Links</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
              <a href="#" className="hover:text-blue-900 hover:underline">
                Home
              </a>
              <span>|</span>
              <a href="#" className="hover:text-blue-900 hover:underline">
                Contact Us
              </a>
              <span>|</span>
              <a href="#" className="hover:text-blue-900 hover:underline">
                FAQs
              </a>
              <span>|</span>
              <a href="#" className="hover:text-blue-900 hover:underline">
                Site Map
              </a>
              <span>|</span>
              <a href="#" className="hover:text-blue-900 hover:underline">
                Hyperlinking Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-blue-900 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Ownership & Copyright Bar */}
          <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-0.5">
            <div>
              Content owned and maintained by:{" "}
              <strong>
                Infrastructure & Project Monitoring Division(IPMD) | Ministry of Statistics and
                Programme Implementation.
              </strong>
            </div>
            <div>Copyright &copy; 2026 Ministry of Statistics and Programme Implementation.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}