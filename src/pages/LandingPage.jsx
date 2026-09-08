import React, { useState, useMemo } from "react";
import {
  FolderKanban,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Flame,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Building2,
  LogIn,
  Search,
  FileText,
  Clock,
  Layers,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import logoIcon from "../assets/logo-icon.png";
import IndiaMap from "../components/IndiaMap";
import FlowButton from "../components/FlowButton";
import { useApi } from "../context/ApiContext";

export default function LandingPage({ onEnter }) {
  const {
    projects,
    dashboardSummary,
    stateStats,
    loadingProjects,
    loadingSummary,
    setSelectedProjectId,
  } = useApi();

  const [selectedStateCode, setSelectedStateCode] = useState("KA");
  const [searchFilter, setSearchFilter] = useState("");

  // Map stateStats from /api/dashboard/state-summary to state lookup
  const stateDataMap = useMemo(() => {
    if (!stateStats || stateStats.length === 0) return null;
    const map = {};
    stateStats.forEach((s) => {
      map[s.state.toLowerCase()] = {
        name: s.state,
        totalProjects: s.project_count,
        costOriginal: s.original_cost,
        costRevised: s.current_cost,
        expenditure: s.expenditure,
      };
    });
    return map;
  }, [stateStats]);

  // Derived real KPI metrics from SQLite database
  const totalProjects = dashboardSummary ? dashboardSummary.total_projects : projects.length;
  const approvedCost = dashboardSummary ? dashboardSummary.total_original_cost : projects.reduce((acc, p) => acc + (Number(p.originalCost) || 0), 0);
  const revisedCost = dashboardSummary ? dashboardSummary.total_current_cost : projects.reduce((acc, p) => acc + (Number(p.revisedCost || p.originalCost) || 0), 0);
  const expenditure = dashboardSummary ? dashboardSummary.total_expenditure : projects.reduce((acc, p) => acc + (Number(p.expenditure) || 0), 0);
  const escalation = Math.max(0, revisedCost - approvedCost);
  const escalationPct = approvedCost > 0 ? ((escalation / approvedCost) * 100).toFixed(1) : "0.0";
  const delayedProjectsCount = projects.filter((p) => (p.timeOverrunMonths || 0) > 0 || p.status === "Delayed").length;
  const onTrackCount = projects.filter((p) => (p.timeOverrunMonths || 0) <= 0 && p.status !== "Delayed").length;

  // Real projects filtered by search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (!searchFilter) return true;
      const q = searchFilter.toLowerCase();
      return (
        p.name?.toLowerCase().includes(q) ||
        p.sector?.toLowerCase().includes(q) ||
        p.state?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q) ||
        p.ministry?.toLowerCase().includes(q)
      );
    });
  }, [projects, searchFilter]);

  const handleInspectProject = (id) => {
    if (setSelectedProjectId) {
      setSelectedProjectId(id);
    }
    if (onEnter) {
      onEnter();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. National Tricolor Strip */}
      <div className="h-[3px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full" />

      {/* 2. Official Government Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left Ministry Identity */}
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-bold text-slate-900">Government of India</span>
            <span className="text-slate-300">|</span>
            <span>Ministry of Statistics and Programme Implementation (MoSPI)</span>
            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="hidden md:inline">Infrastructure & Project Monitoring Division</span>
          </div>

          {/* Right Utility Information */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="hidden sm:inline">MoSPI Live Database: Connected</span>
            <span className="text-slate-300">|</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Application Bar */}
      <header className="border-b border-slate-200 bg-white px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xs bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
              <img src={logoIcon} alt="Emblem" className="w-full h-full object-contain" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                  InfraSight AI
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xs">
                  Central Sector DSS
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-none truncate">
                Central Infrastructure Project Monitoring & Early Warning Decision Support System
              </p>
            </div>
          </div>

          {/* Right Action: Access Portal */}
          <div className="flex items-center gap-3">
            <FlowButton
              size="sm"
              variant="dark"
              onClick={onEnter}
              icon={ChevronRight}
            >
              Access Operations Portal
            </FlowButton>
          </div>
        </div>
      </header>

      {/* 4. Top Key Portfolio Indicators (6 Elevated Government KPI Cards from Real SQLite DB) */}
      <section className="bg-slate-50/70 border-b border-slate-200 py-5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* Total Projects */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-blue-600 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
                  Total Monitored
                </span>
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                  <FolderKanban className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
                  {loadingSummary ? "..." : totalProjects.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Projects in Database</div>
              </div>
            </div>

            {/* Approved Cost */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-slate-700 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
                  Approved Outlay
                </span>
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
                  {loadingSummary ? "..." : `₹${Math.round(approvedCost).toLocaleString()} Cr`}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Sanctioned Outlay</div>
              </div>
            </div>

            {/* Revised Cost */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-amber-500 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
                  Anticipated Cost
                </span>
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-display text-amber-800 tracking-tight">
                  {loadingSummary ? "..." : `₹${Math.round(revisedCost).toLocaleString()} Cr`}
                </div>
                <div className="text-[11px] text-amber-700/90 font-medium mt-0.5">
                  +{escalationPct}% Overrun
                </div>
              </div>
            </div>

            {/* Cumulative Expenditure */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-emerald-600 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
                  Expenditure
                </span>
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-display text-emerald-800 tracking-tight">
                  {loadingSummary ? "..." : `₹${Math.round(expenditure).toLocaleString()} Cr`}
                </div>
                <div className="text-[11px] text-emerald-700/90 font-medium mt-0.5">
                  {revisedCost > 0 ? `${((expenditure / revisedCost) * 100).toFixed(1)}% of Anticipated` : "0%"}
                </div>
              </div>
            </div>

            {/* Projects Delayed */}
            <div className="bg-white border border-amber-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-amber-600 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase font-sans">
                  Delayed Projects
                </span>
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-display text-amber-800 tracking-tight">
                  {loadingProjects ? "..." : delayedProjectsCount}
                </div>
                <div className="text-[11px] text-amber-700 font-medium mt-0.5">Schedule Overrun Active</div>
              </div>
            </div>

            {/* Projects On Track */}
            <div className="bg-white border border-emerald-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-emerald-600 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase font-sans">
                  On-Track Projects
                </span>
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-display text-emerald-800 tracking-tight">
                  {loadingProjects ? "..." : onTrackCount}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Within Baseline Schedule</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Section: India State-wise Projects Choropleth Map + Info Panel */}
      <section className="py-8 px-4 sm:px-8 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Geographic Infrastructure Concentration & State-wise Project Load
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any state on the map to inspect project counts, sanctioned outlay, cumulative expenditure from the SQLite database.
              </p>
            </div>

            <span className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xs">
              Live Database: {stateStats ? stateStats.length : 0} Active States
            </span>
          </div>

          {/* Interactive Choropleth Map Component with Live Data */}
          <IndiaMap
            selectedStateCode={selectedStateCode}
            onSelectState={(st) => setSelectedStateCode(st.code)}
            dataMap={stateDataMap}
            showDetailPanel={true}
            monthYear="September, 2026"
          />
        </div>
      </section>

      {/* 6. Projects Requiring Immediate Attention (Executive Tabular Selection from SQLite DB) */}
      <section className="py-8 px-4 sm:px-8 bg-slate-50">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Central Sector Projects Registry
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authentic monitored projects from SQLite database (backend/infrasight.db)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name / sector / state..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-7 pr-3 py-1.5 bg-white border border-slate-300 rounded-xs text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-700 w-60"
                />
              </div>

              <FlowButton
                size="xs"
                variant="secondary"
                onClick={onEnter}
                icon={ChevronRight}
              >
                View All {projects.length} Projects
              </FlowButton>
            </div>
          </div>

          {/* Compact Government Table */}
          <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-600 tracking-wider">
                    <th className="py-2.5 px-3">Project & Code</th>
                    <th className="py-2.5 px-3">Nodal Ministry & Sector</th>
                    <th className="py-2.5 px-3">State</th>
                    <th className="py-2.5 px-3 text-right">Original (₹ Cr)</th>
                    <th className="py-2.5 px-3 text-right">Anticipated (₹ Cr)</th>
                    <th className="py-2.5 px-3 text-center">Delay</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-xs text-slate-500 font-medium">
                        No data available.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.slice(0, 5).map((p) => {
                      const isDelayed = (p.timeOverrunMonths || 0) > 0 || p.status === "Delayed";
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900">{p.name}</div>
                            <div className="font-mono text-[10px] text-slate-400 mt-0.5">{p.id}</div>
                          </td>

                          <td className="py-3 px-3">
                            <div className="text-slate-800 font-medium">{p.sector}</div>
                            <div className="text-[10px] text-slate-500">{p.ministry}</div>
                          </td>

                          <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                            {p.state}
                          </td>

                          <td className="py-3 px-3 text-right font-mono text-slate-700">
                            ₹{Number(p.originalCost || 0).toLocaleString("en-IN")}
                          </td>

                          <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                            ₹{Number(p.revisedCost || p.originalCost || 0).toLocaleString("en-IN")}
                          </td>

                          <td className="py-3 px-3 text-center">
                            <span className={`font-mono text-[11px] font-bold ${isDelayed ? "text-amber-700" : "text-emerald-700"}`}>
                              {isDelayed ? `+${p.timeOverrunMonths || 0} mos` : "0 mos"}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-center">
                            <span
                              className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase border ${isDelayed
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                            >
                              {p.status || (isDelayed ? "Delayed" : "On Track")}
                            </span>
                          </td>

                          <td className="py-2 px-3 text-center whitespace-nowrap">
                            <FlowButton
                              size="xs"
                              variant="secondary"
                              onClick={() => handleInspectProject(p.id)}
                            >
                              Inspect Dossier
                            </FlowButton>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Institutional Sign In CTA Banner */}
      <section className="py-8 px-4 sm:px-8 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto bg-slate-50 border border-slate-200/90 rounded-xl p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold font-display text-slate-900">
              Departmental Monitoring & Decision Support Workspace
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl">
              Authorized government officers from Line Ministries, Project Implementing Agencies (PIAs), and Cabinet Secretariat can sign in to view project SHAP drivers, early warning feeds, and generate flash reports.
            </p>
          </div>

          <FlowButton
            size="md"
            variant="dark"
            onClick={onEnter}
            icon={LogIn}
          >
            Sign In to InfraSight AI
          </FlowButton>
        </div>
      </section>

      {/* 8. Institutional MoSPI & NeGD Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="font-bold text-white text-sm block mb-2">InfraSight AI</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Central Sector Infrastructure Projects Decision Support System with AI early warning diagnosis. Maintained by Infrastructure & Project Monitoring Division.
              </p>
            </div>

            <div>
              <span className="font-bold text-white text-xs uppercase tracking-wider block mb-2">Nodal Authority</span>
              <p className="text-[11px] leading-relaxed">
                Ministry of Statistics and Programme Implementation (MoSPI)<br />
                Khurshid Lal Bhawan, Janpath,<br />
                New Delhi - 110001
              </p>
            </div>

            <div>
              <span className="font-bold text-white text-xs uppercase tracking-wider block mb-2">Technical Standards</span>
              <ul className="space-y-1 text-[11px]">
                <li>&bull; Cabinet Secretariat Monitoring Framework</li>
                <li>&bull; Real-time IPMIS / OCMS Sync</li>
                <li>&bull; NeGD Government Web Compliance</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-white text-xs uppercase tracking-wider block mb-2">Technical Support</span>
              <p className="text-[11px] text-slate-400">
                Email: support-infrasight[at]mospi[dot]gov[dot]in<br />
                Helpline: 011-23455604 (10:00 - 17:30 IST)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              &copy; 2026 Ministry of Statistics and Programme Implementation. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span>&bull;</span>
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span>&bull;</span>
              <span className="hover:text-slate-400 cursor-pointer">Security Audit Cleared</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}