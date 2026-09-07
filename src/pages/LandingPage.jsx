import React, { useState } from "react";
import {
  ArrowRight,
  Brain,
  ChartNoAxesCombined,
  CircleAlert,
  ShieldCheck,
  TrendingUp,
  Clock3,
  IndianRupee,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Cpu,
  Radio,
  FileCheck2,
  Building2,
  Lock
} from "lucide-react";
import FlowButton from "../components/FlowButton";
import Interactive3DCard from "../components/Interactive3DCard";
import { motion, AnimatePresence } from "framer-motion";

// Authentic MoSPI project scenarios for the 3D interactive simulator
const DEMO_PROJECTS = [
  {
    id: "INF-001",
    name: "National Highway Corridor NH-44",
    sector: "Road Transport & Highways",
    ministry: "MoRTH",
    budget: "₹14,200 Cr",
    riskScore: 92,
    riskLevel: "Critical Risk",
    delayMonths: 6.5,
    costImpact: "₹3,600 Cr",
    delayRisk: 91,
    costRisk: 89,
    confidence: "94.2%",
    primaryFactor: "14.8 ha Forest Clearance Delay in Belagavi Division",
    factors: ["Land Acquisition (RoW)", "Contractor Idle Claims", "Environmental Clearance"]
  },
  {
    id: "INF-002",
    name: "Eastern Dedicated Freight Corridor (EDFC)",
    sector: "Railways Infrastructure",
    ministry: "Ministry of Railways",
    budget: "₹81,459 Cr",
    riskScore: 88,
    riskLevel: "Critical Risk",
    delayMonths: 8.0,
    costImpact: "₹2,150 Cr",
    delayRisk: 86,
    costRisk: 84,
    confidence: "91.8%",
    primaryFactor: "Overhead Electrification Substation Milestone Lag",
    factors: ["Import Switchgear Supply Chain", "Signaling Integration", "State SEC Review"]
  },
  {
    id: "INF-004",
    name: "Polavaram National Irrigation Dam",
    sector: "Water Resources & Dams",
    ministry: "Ministry of Jal Shakti",
    budget: "₹55,548 Cr",
    riskScore: 85,
    riskLevel: "High Risk",
    delayMonths: 12.0,
    costImpact: "₹4,800 Cr",
    delayRisk: 88,
    costRisk: 82,
    confidence: "88.5%",
    primaryFactor: "River Godavari Scour Depth Geotechnical Variance",
    factors: ["Vibro Stone Column Redesign", "CWC Technical Audit", "Spillway Milestone Lag"]
  },
  {
    id: "INF-003",
    name: "Ultra Mega Solar Park (2,000 MW)",
    sector: "Renewable Energy & Power",
    ministry: "Ministry of Power",
    budget: "₹19,800 Cr",
    riskScore: 42,
    riskLevel: "Moderate Risk",
    delayMonths: 3.5,
    costImpact: "₹340 Cr",
    delayRisk: 46,
    costRisk: 38,
    confidence: "86.4%",
    primaryFactor: "400 kV Pooling Substation Testing Alignment",
    factors: ["Grid Interconnection Lag", "Bay Equipment Commissioning", "Inverter Testing"]
  }
];

function LandingPage({ onEnter }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProj = DEMO_PROJECTS[activeProjectIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden">
      {/* Background Subtle Gradient Grid (Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-blue-100/60 via-cyan-50/40 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Tricolor National Government Accent Strip */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 z-50 shadow-xs" />

      {/* ================= STICKY LIGHT GLASS HEADER ================= */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-slate-200 transition-all duration-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* Official Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="bg-white rounded-xl p-1.5 shadow-xs border border-slate-200 flex items-center justify-center">
              <img
                src="/logo-icon.png"
                alt="InfraSight AI"
                className="h-9 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 font-display">
                  InfraSight
                </span>
                <span className="font-extrabold text-lg text-blue-700 font-display">
                  AI
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded border border-blue-200">
                  MoSPI
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Infrastructure Project Intelligence
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-600">
            <a href="#simulator" className="px-4 py-2 rounded-full hover:text-blue-700 hover:bg-white transition">
              3D Simulator
            </a>
            <a href="#pillars" className="px-4 py-2 rounded-full hover:text-blue-700 hover:bg-white transition">
              Core Capabilities
            </a>
            <a href="#pipeline" className="px-4 py-2 rounded-full hover:text-blue-700 hover:bg-white transition">
              Architecture
            </a>
            <a href="#metrics" className="px-4 py-2 rounded-full hover:text-blue-700 hover:bg-white transition">
              National Metrics
            </a>
          </nav>

          {/* Enter Dashboard Action */}
          <div className="flex items-center gap-3">
            <FlowButton
              onClick={onEnter}
              variant="solid"
              size="md"
              className="shadow-md shadow-blue-600/20 text-xs sm:text-sm font-semibold"
            >
              Sign In to Operations
            </FlowButton>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION (LIGHT MODE 3D INTERACTIVE) ================= */}
      <section className="relative z-10 pt-12 pb-20 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800 shadow-2xs">
                <Activity size={15} className="text-blue-600" />
                <span>MoSPI Central Sector Project Intelligence</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Predict project risks{" "}
                <span className="text-blue-700 underline decoration-blue-200 decoration-wavy underline-offset-8">
                  before escalations occur.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                InfraSight AI adds predictive neural forecasting to national infrastructure monitoring — alerting Cabinet leadership and line ministries to potential cost overruns and schedule delays before they become critical.
              </p>

              {/* Flow Action Buttons with Roomy Padding */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <FlowButton
                  onClick={onEnter}
                  variant="solid"
                  size="lg"
                  className="shadow-lg shadow-blue-600/25"
                >
                  Explore Dashboard
                </FlowButton>

                <a
                  href="#simulator"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-300 transition duration-200 shadow-2xs cursor-pointer"
                >
                  <Activity size={16} className="text-blue-600" />
                  <span>Test 3D Simulator</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  <span>MoSPI OCMS Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database size={17} className="text-blue-600" />
                  <span>PM GatiShakti GIS Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 size={17} className="text-cyan-600" />
                  <span>Cabinet Flash Compliance</span>
                </div>
              </div>
            </div>

            {/* Hero Right: 3D Interactive Telemetry Card (Light Mode) */}
            <div className="lg:col-span-6" id="simulator">
              {/* Tab Selector */}
              <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs text-slate-500 font-semibold whitespace-nowrap pl-1">
                  Sample Asset:
                </span>
                {DEMO_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap ${
                      activeProjectIndex === idx
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {proj.name.split(" ")[0]} ({proj.id})
                  </button>
                ))}
              </div>

              {/* 3D Card (Light Theme) */}
              <Interactive3DCard
                maxTilt={8}
                className="bg-white border border-slate-200 shadow-xl rounded-2xl"
                glowColor="rgba(37, 99, 235, 0.15)"
              >
                {/* 3D Card Header */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-2xs">
                      <Brain size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          AI Risk Intelligence
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                          {activeProj.confidence} ML
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        MoSPI Early Warning Matrix • {activeProj.id}
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* 3D Card Content */}
                <div className="p-6 space-y-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProj.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Title & Cost */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                            {activeProj.ministry} • {activeProj.sector}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                            {activeProj.name}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-500 uppercase font-mono block">
                            Sanctioned Cost
                          </span>
                          <span className="text-base font-bold font-mono text-blue-700">
                            {activeProj.budget}
                          </span>
                        </div>
                      </div>

                      {/* Alert Box */}
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <CircleAlert size={22} className="text-red-600 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-red-800 block">
                              {activeProj.riskLevel} Flagged
                            </span>
                            <span className="text-[11px] text-slate-600 truncate max-w-[280px] block">
                              {activeProj.primaryFactor}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-extrabold font-mono text-red-700">
                            {activeProj.riskScore}%
                          </span>
                          <span className="text-[9px] block text-slate-500 uppercase font-mono">
                            Risk Index
                          </span>
                        </div>
                      </div>

                      {/* Dual Metric Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span className="flex items-center gap-1.5 font-bold">
                              <IndianRupee size={14} className="text-amber-600" />
                              Cost Escalation
                            </span>
                            <span className="font-mono text-amber-700 font-bold">{activeProj.costRisk}%</span>
                          </div>
                          <p className="text-xl font-extrabold text-slate-900 font-mono mt-1.5">
                            {activeProj.costImpact}
                          </p>
                          <span className="text-[10px] text-slate-500 mt-0.5 block">
                            Above sanctioned budget
                          </span>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span className="flex items-center gap-1.5 font-bold">
                              <Clock3 size={14} className="text-rose-600" />
                              Schedule Overrun
                            </span>
                            <span className="font-mono text-rose-700 font-bold">{activeProj.delayRisk}%</span>
                          </div>
                          <p className="text-xl font-extrabold text-slate-900 font-mono mt-1.5">
                            +{activeProj.delayMonths} Mo
                          </p>
                          <span className="text-[10px] text-slate-500 mt-0.5 block">
                            Lag beyond original COD
                          </span>
                        </div>
                      </div>

                      {/* Factors */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">
                          Top Attributed Root Drivers
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProj.factors.map((f, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Card Bottom Link */}
                  <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      Simulated MoSPI OCMS Pipeline
                    </span>
                    <button
                      onClick={onEnter}
                      className="text-blue-700 hover:text-blue-800 font-bold inline-flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Open in Operations</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </Interactive3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NATIONAL METRICS BANNER ================= */}
      <section id="metrics" className="relative z-10 border-y border-slate-200 bg-white py-10 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900">
                1,900+
              </span>
              <p className="text-xs uppercase tracking-wider font-bold text-blue-700 mt-1">
                Mega Projects Monitored
              </p>
              <p className="text-[11px] text-slate-500">
                Costing ₹150 Cr & above
              </p>
            </div>

            <div className="md:border-l md:border-slate-200 md:pl-8">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-600">
                ₹2.4 Lakh Cr
              </span>
              <p className="text-xs uppercase tracking-wider font-bold text-amber-700 mt-1">
                Cost Variance Tracked
              </p>
              <p className="text-[11px] text-slate-500">
                Historical cumulative escalation
              </p>
            </div>

            <div className="md:border-l md:border-slate-200 md:pl-8">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600">
                94.2%
              </span>
              <p className="text-xs uppercase tracking-wider font-bold text-emerald-700 mt-1">
                Prediction Accuracy
              </p>
              <p className="text-[11px] text-slate-500">
                Validated on 10-year MoSPI dataset
              </p>
            </div>

            <div className="md:border-l md:border-slate-200 md:pl-8">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-700">
                48h
              </span>
              <p className="text-xs uppercase tracking-wider font-bold text-blue-800 mt-1">
                Advance Alert Trigger
              </p>
              <p className="text-[11px] text-slate-500">
                Prior to official report lock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4 PILLARS OF GOVERNANCE ================= */}
      <section id="pillars" className="relative z-10 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
              Government Infrastructure Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four Pillars of Proactive Governance
            </h2>
            <p className="text-sm text-slate-600">
              Transforming retrospective infrastructure reporting into forward-looking predictive governance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mb-4 shadow-2xs">
                  <CircleAlert size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Early Warning Matrix
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scans geo-spatial GIS data, milestone variance, and contractor liquidity to generate automated severity alerts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-blue-700 font-bold flex items-center justify-between">
                <span>Real-Time Alerts</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center mb-4 shadow-2xs">
                  <TrendingUp size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Monte Carlo Cost Engine
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Performs 10,000 probabilistic iterations per project to forecast 90% confidence overrun boundaries.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-cyan-700 font-bold flex items-center justify-between">
                <span>P90 Confidence Intervals</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center mb-4 shadow-2xs">
                  <Building2 size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Inter-Ministry Gateway
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Synchronizes nodal officers across MoRTH, Railways, Power, Coal, and State SEC committees.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-purple-700 font-bold flex items-center justify-between">
                <span>Nodal Officer Coordination</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-4 shadow-2xs">
                  <FileCheck2 size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Cabinet Flash Briefings
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compiles official verified monthly dossiers, executive briefings, and audit-ready PDF packs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center justify-between">
                <span>Cryptographic Verification</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION (LIGHT MODE) ================= */}
      <section className="relative z-10 py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1">
                <div className="bg-white rounded-lg p-1 shadow-xs">
                  <img src="/logo-icon.png" alt="InfraSight AI" className="h-6 w-auto object-contain" />
                </div>
                <span className="font-bold text-white text-base">InfraSight AI Operations</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to explore the national infrastructure portfolio?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Sign in to view real-time early warning triggers, project expenditure trends, and generate official MoSPI briefings.
              </p>
            </div>

            <div className="shrink-0">
              <FlowButton
                onClick={onEnter}
                variant="white"
                size="lg"
                className="shadow-xl font-bold text-blue-900"
              >
                Sign In to Operations
              </FlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50 text-slate-500 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-2xs">
                <img src="/logo-icon.png" alt="InfraSight AI" className="h-7 w-auto object-contain" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">InfraSight <span className="text-blue-700">AI</span></span>
                <p className="text-[11px] text-slate-500">Ministry of Statistics and Programme Implementation (MoSPI)</p>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-4">
              <span>© 2026 InfraSight AI • Prototype</span>
              <span>•</span>
              <span>SIH 2026</span>
              <span>•</span>
              <button onClick={onEnter} className="font-bold text-blue-700 hover:underline cursor-pointer">
                Authorized Sign In
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;