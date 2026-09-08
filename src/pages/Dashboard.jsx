import React, { useMemo } from "react";
import {
  FolderKanban,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Building2,
  ExternalLink,
  Clock,
  Info
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import { useApi } from "../context/ApiContext";
import IndiaMap from "../components/IndiaMap";
import FlowButton from "../components/FlowButton";

export default function Dashboard({ setCurrentPage }) {
  const {
    projects,
    dashboardSummary,
    sectorStats,
    stateStats,
    setSelectedProjectId,
    loadingProjects,
    loadingSummary,
    errorSummary,
    errorProjects,
  } = useApi();

  // Top Section: 6 Key Metrics derived from live backend summary
  const metrics = useMemo(() => {
    const totalCount = dashboardSummary
      ? dashboardSummary.total_projects
      : projects.length;
    const approved = dashboardSummary
      ? dashboardSummary.total_original_cost
      : projects.reduce((acc, p) => acc + (Number(p.originalCost) || 0), 0);
    const revised = dashboardSummary
      ? dashboardSummary.total_current_cost
      : projects.reduce((acc, p) => acc + (Number(p.revisedCost || p.originalCost) || 0), 0);
    const expenditure = dashboardSummary
      ? dashboardSummary.total_expenditure
      : projects.reduce((acc, p) => acc + (Number(p.expenditure) || 0), 0);

    return {
      totalCount,
      approvedCost: Math.round(approved),
      revisedCost: Math.round(revised),
      expenditure: Math.round(expenditure),
      highRisk: null, // Authentic: backend does not have risk scores yet
      criticalRisk: null, // Authentic: backend does not have risk scores yet
    };
  }, [dashboardSummary, projects]);

  // 1. Projects Requiring Attention (Ranked by time delay and cost escalation from real SQLite records)
  const attentionProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const delayDiff = (b.timeOverrunMonths || 0) - (a.timeOverrunMonths || 0);
        if (delayDiff !== 0) return delayDiff;
        return (b.costOverrunPercent || 0) - (a.costOverrunPercent || 0);
      })
      .slice(0, 6);
  }, [projects]);

  // 2. Portfolio Trend Chart Data (Real aggregated sector summary from /api/dashboard/sector-summary)
  const sectorTrends = useMemo(() => {
    if (sectorStats && sectorStats.length > 0) {
      return sectorStats.map((item) => ({
        sector: item.sector,
        approved: Math.round(item.original_cost),
        revised: Math.round(item.current_cost),
        expenditure: Math.round(item.expenditure),
      }));
    }
    return [];
  }, [sectorStats]);

  // 3. State summary lookup for IndiaMap
  const stateDataMap = useMemo(() => {
    if (!stateStats || stateStats.length === 0) return null;
    const map = {};
    stateStats.forEach((item) => {
      map[item.state.toLowerCase()] = {
        name: item.state,
        totalProjects: item.project_count,
        costOriginal: item.original_cost,
        costRevised: item.current_cost,
        expenditure: item.expenditure,
      };
    });
    return map;
  }, [stateStats]);

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    if (setCurrentPage) {
      setCurrentPage("details");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1440px] mx-auto bg-slate-50 min-h-screen text-slate-800">
      {/* Backend Offline / Error Banner */}
      {errorSummary && projects.length === 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle size={16} className="text-rose-600" />
          <span>Unable to load data from the backend.</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOP SECTION: 6 COMPACT KPI METRIC CARDS                               */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* 1. Total Projects */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-blue-600 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
              Total Projects
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
              {loadingSummary ? "..." : metrics.totalCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Central Registry Active</div>
          </div>
        </div>

        {/* 2. Approved Cost */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
              Approved Cost
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
              {loadingSummary ? "..." : `₹${metrics.approvedCost.toLocaleString()} Cr`}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Sanctioned Outlay</div>
          </div>
        </div>

        {/* 3. Revised Cost */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-amber-500 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
              Revised Cost
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-display text-amber-800 tracking-tight">
              {loadingSummary ? "..." : `₹${metrics.revisedCost.toLocaleString()} Cr`}
            </div>
            <div className="text-[11px] text-amber-700/90 font-medium mt-0.5">
              +₹{(metrics.revisedCost - metrics.approvedCost).toLocaleString()} Cr Escalation
            </div>
          </div>
        </div>

        {/* 4. Cumulative Expenditure */}
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
              {loadingSummary ? "..." : `₹${metrics.expenditure.toLocaleString()} Cr`}
            </div>
            <div className="text-[11px] text-emerald-700/90 font-medium mt-0.5">
              {metrics.revisedCost > 0
                ? `${Math.round((metrics.expenditure / metrics.revisedCost) * 100)}% Utilized`
                : "0% Utilized"}
            </div>
          </div>
        </div>

        {/* 5. High Risk */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-amber-500 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
              High Risk
            </span>
            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base font-bold font-display text-slate-500 tracking-tight">
              Data unavailable
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Awaiting ML Model</div>
          </div>
        </div>

        {/* 6. Critical Risk */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-red-500 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-sans">
              Critical Risk
            </span>
            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-200">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base font-bold font-display text-slate-500 tracking-tight">
              Data unavailable
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Awaiting ML Model</div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ROW 1: PROJECTS REQUIRING ATTENTION & RISK OVERVIEW                   */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. Projects Requiring Attention (Compact Table) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                  Projects Requiring Attention
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Central sector projects from SQLite database ranked by elapsed delay and cost variance
                </p>
              </div>
              <FlowButton
                size="xs"
                variant="secondary"
                onClick={() => setCurrentPage("projects")}
                icon={ChevronRight}
              >
                All Projects
              </FlowButton>
            </div>

            {/* Table */}
            {attentionProjects.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                {loadingProjects ? "Loading projects..." : "No data available."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      <th className="py-2 px-2.5">Project</th>
                      <th className="py-2 px-2.5">Sector</th>
                      <th className="py-2 px-2.5">State</th>
                      <th className="py-2 px-2.5 text-center">Delay</th>
                      <th className="py-2 px-2.5 text-center">Cost Overrun</th>
                      <th className="py-2 px-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attentionProjects.map((p, idx) => {
                      const hasDelay = (p.timeOverrunMonths || 0) > 0;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => handleSelectProject(p.id)}
                          className="hover:bg-slate-50 transition cursor-pointer group"
                        >
                          {/* Project */}
                          <td className="py-2.5 px-2.5 min-w-[200px]">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 transition flex items-center gap-1.5">
                              <span className="font-mono text-[10px] px-1 py-0.2 bg-slate-100 border border-slate-200 rounded-xs text-slate-700">
                                {p.id}
                              </span>
                              <span className="truncate max-w-[220px]">{p.name}</span>
                            </div>
                          </td>

                          {/* Sector */}
                          <td className="py-2.5 px-2.5 text-slate-600 truncate max-w-[150px]">
                            {p.sector || "Unspecified"}
                          </td>

                          {/* State */}
                          <td className="py-2.5 px-2.5 text-slate-600 whitespace-nowrap">
                            {p.state || "National"}
                          </td>

                          {/* Delay */}
                          <td className="py-2.5 px-2.5 text-center font-mono">
                            {hasDelay ? (
                              <span className="text-amber-700 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[11px]">
                                {p.timeOverrunMonths} mos
                              </span>
                            ) : (
                              <span className="text-emerald-700 font-medium text-[11px]">On Schedule</span>
                            )}
                          </td>

                          {/* Cost Overrun */}
                          <td className="py-2.5 px-2.5 text-center font-mono text-[11px]">
                            {p.costOverrunPercent > 0 ? (
                              <span className="text-red-700 font-semibold">+{p.costOverrunPercent}%</span>
                            ) : (
                              <span className="text-slate-600">0%</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                            <span
                              className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                hasDelay
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 text-right">
            <span className="text-[11px] text-slate-400">Click any row to open Project Details dossier</span>
          </div>
        </div>

        {/* 2. Risk Overview (Pending ML Backend) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                Risk Overview
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                AI predictive risk scoring status for active portfolio
              </p>
            </div>

            {/* Authentic State Notice */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center space-y-2.5 my-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto">
                <Info size={20} />
              </div>
              <div className="text-xs font-bold text-slate-800">
                Risk intelligence unavailable
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                Predictive risk models are being trained by the ML engineering team. Risk tiers and SHAP driver features will populate automatically once the ML endpoints are active.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <FlowButton
              size="xs"
              variant="secondary"
              onClick={() => setCurrentPage("ai")}
              icon={ArrowUpRight}
              className="w-full"
            >
              Inspect ML Pipeline Status
            </FlowButton>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ROW 2: PORTFOLIO TREND & INDIA GEOGRAPHIC MAP                         */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 3. Portfolio Trend (Real backend data from /api/dashboard/sector-summary) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                Portfolio Trend
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Comparison of approved vs current outlay and cumulative expenditure by sector (₹ Cr)
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              {sectorTrends.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  {loadingSummary ? "Loading sector statistics..." : "No data available."}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorTrends} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="sector" tick={{ fontSize: 10, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#475569" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      formatter={(val) => [`₹${Number(val).toLocaleString()} Cr`]}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#cbd5e1",
                        fontSize: "11px",
                        borderRadius: "6px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "6px" }} />
                    <Bar dataKey="approved" name="Approved" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="revised" name="Current" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="expenditure" name="Expenditure" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Source: FastAPI Sector Summary API</span>
            <FlowButton
              size="xs"
              variant="secondary"
              onClick={() => setCurrentPage("analytics")}
              icon={ChevronRight}
            >
              Detailed Analytics
            </FlowButton>
          </div>
        </div>

        {/* 4. India Map (Geographic Project Distribution from /api/dashboard/state-summary) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                  India Geographic Distribution
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  State-wise central sector project volume and expenditure from SQLite database
                </p>
              </div>
              <FlowButton
                size="xs"
                variant="secondary"
                onClick={() => setCurrentPage("map")}
                icon={ChevronRight}
              >
                Full GIS Map
              </FlowButton>
            </div>

            {/* Choropleth Map with live state data */}
            <div className="rounded-lg overflow-hidden">
              <IndiaMap
                dataMap={stateDataMap}
                showDetailPanel={true}
                monthYear="Current Active Portfolio"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>State summary loaded from /api/dashboard/state-summary</span>
            <span className="font-mono text-[10px] text-slate-400">MoSPI OCMS</span>
          </div>
        </div>
      </div>
    </div>
  );
}