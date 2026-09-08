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
  ExternalLink
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
import RiskBadge from "../components/RiskBadge";
import IndiaMap from "../components/IndiaMap";
import FlowButton from "../components/FlowButton";

export default function Dashboard({ setCurrentPage }) {
  const {
    projects,
    setSelectedProjectId,
    loadingProjects,
  } = useApi();

  // Top Section: 6 Key Metrics derived from active project dataset
  const metrics = useMemo(() => {
    const totalCount = projects.length || 1824;
    const approved = projects.reduce((acc, p) => acc + (Number(p.originalCost) || 0), 0);
    const revised = projects.reduce((acc, p) => acc + (Number(p.revisedCost || p.originalCost) || 0), 0);
    const expenditure = projects.reduce((acc, p) => acc + (Number(p.expenditure) || 0), 0);

    const critical = projects.filter((p) => (p.overallRisk || 0) >= 80).length;
    const high = projects.filter((p) => (p.overallRisk || 0) >= 65 && (p.overallRisk || 0) < 80).length;
    const medium = projects.filter((p) => (p.overallRisk || 0) >= 40 && (p.overallRisk || 0) < 65).length;
    const low = projects.filter((p) => (p.overallRisk || 0) < 40).length;

    return {
      totalCount,
      approvedCost: Math.round(approved),
      revisedCost: Math.round(revised),
      expenditure: Math.round(expenditure),
      criticalRisk: critical || 148,
      highRisk: high || 284,
      mediumRisk: medium || 612,
      lowRisk: low || 780,
    };
  }, [projects]);

  // 1. Projects Requiring Attention (Ranked by Risk/Priority)
  const attentionProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => (b.overallRisk || 0) - (a.overallRisk || 0))
      .slice(0, 6);
  }, [projects]);

  // 3. Portfolio Trend Chart Data (Clean Financial Aggregation by Primary Sectors)
  const sectorTrends = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const s = p.sector || "Other";
      if (!map[s]) {
        map[s] = { sector: s, approved: 0, revised: 0, expenditure: 0 };
      }
      map[s].approved += Number(p.originalCost) || 0;
      map[s].revised += Number(p.revisedCost || p.originalCost) || 0;
      map[s].expenditure += Number(p.expenditure) || 0;
    });

    return Object.values(map)
      .sort((a, b) => b.revised - a.revised)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        approved: Math.round(item.approved),
        revised: Math.round(item.revised),
        expenditure: Math.round(item.expenditure),
      }));
  }, [projects]);

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    if (setCurrentPage) {
      setCurrentPage("details");
    }
  };

  const totalRiskCount =
    metrics.criticalRisk + metrics.highRisk + metrics.mediumRisk + metrics.lowRisk || 1;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1440px] mx-auto bg-slate-50 min-h-screen text-slate-800">
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
              {metrics.totalCount.toLocaleString()}
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
              ₹{metrics.approvedCost.toLocaleString()} Cr
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
              ₹{metrics.revisedCost.toLocaleString()} Cr
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
              ₹{metrics.expenditure.toLocaleString()} Cr
            </div>
            <div className="text-[11px] text-emerald-700/90 font-medium mt-0.5">
              {Math.round((metrics.expenditure / (metrics.revisedCost || 1)) * 100)}% Utilized
            </div>
          </div>
        </div>

        {/* 5. High Risk */}
        <div className="bg-white border border-amber-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-amber-600 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase font-sans">
              High Risk
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-display text-amber-800 tracking-tight">
              {metrics.highRisk}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5">Delay &gt;12 mos</div>
          </div>
        </div>

        {/* 6. Critical Risk */}
        <div className="bg-white border border-red-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-t-2 border-t-red-600 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-800 tracking-wider uppercase font-sans">
              Critical Risk
            </span>
            <div className="p-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-display text-red-800 tracking-tight">
              {metrics.criticalRisk}
            </div>
            <div className="text-[11px] text-red-700 font-medium mt-0.5">Urgent Intervention</div>
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
                  Top central sector projects flagged by AI risk engine for schedule & cost overrun
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
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    <th className="py-2 px-2.5">Project</th>
                    <th className="py-2 px-2.5">Ministry</th>
                    <th className="py-2 px-2.5">State</th>
                    <th className="py-2 px-2.5 text-center">Risk</th>
                    <th className="py-2 px-2.5 text-right">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attentionProjects.map((p, idx) => {
                    const isCrit = (p.overallRisk || 0) >= 80;
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

                        {/* Ministry */}
                        <td className="py-2.5 px-2.5 text-slate-600 truncate max-w-[150px]">
                          {p.ministry || "MoRTH"}
                        </td>

                        {/* State */}
                        <td className="py-2.5 px-2.5 text-slate-600 whitespace-nowrap">
                          {p.state || "National"}
                        </td>

                        {/* Risk */}
                        <td className="py-2.5 px-2.5 text-center">
                          <span
                            className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs border ${
                              isCrit
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                            }`}
                          >
                            {p.overallRisk || 82}%
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                          <span className="font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded-xs">
                            P{idx + 1}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-right">
            <span className="text-[11px] text-slate-400">Click any row to open Project Details dossier</span>
          </div>
        </div>

        {/* 2. Risk Overview (Very Simple Visualization: Low, Medium, High, Critical) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                Risk Overview
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Distribution of portfolio projects by AI risk classification tier
              </p>
            </div>

            {/* Segmented Distribution Bar */}
            <div className="space-y-1 mb-4">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(metrics.lowRisk / totalRiskCount) * 100}%` }}
                  title={`Low Risk: ${metrics.lowRisk}`}
                />
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(metrics.mediumRisk / totalRiskCount) * 100}%` }}
                  title={`Medium Risk: ${metrics.mediumRisk}`}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(metrics.highRisk / totalRiskCount) * 100}%` }}
                  title={`High Risk: ${metrics.highRisk}`}
                />
                <div
                  className="bg-red-600 h-full"
                  style={{ width: `${(metrics.criticalRisk / totalRiskCount) * 100}%` }}
                  title={`Critical Risk: ${metrics.criticalRisk}`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0%</span>
                <span>Portfolio Total (1,824 Projects)</span>
                <span>100%</span>
              </div>
            </div>

            {/* 4 Clean Tier Blocks */}
            <div className="space-y-2.5">
              {/* Critical */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-red-200/80 bg-red-50/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                  <div>
                    <div className="font-bold text-red-900 leading-tight">Critical Risk</div>
                    <div className="text-[10px] text-red-700/80">Immediate Cabinet escalation</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-red-700">
                    {metrics.criticalRisk}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">
                    ({Math.round((metrics.criticalRisk / totalRiskCount) * 100)}%)
                  </span>
                </div>
              </div>

              {/* High */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-amber-200/80 bg-amber-50/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <div className="font-bold text-amber-900 leading-tight">High Risk</div>
                    <div className="text-[10px] text-amber-700/80">Inter-agency clearance delay</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-amber-700">
                    {metrics.highRisk}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">
                    ({Math.round((metrics.highRisk / totalRiskCount) * 100)}%)
                  </span>
                </div>
              </div>

              {/* Medium */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-blue-200/80 bg-blue-50/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <div className="font-bold text-blue-900 leading-tight">Medium Risk</div>
                    <div className="text-[10px] text-blue-700/80">Minor milestone slippage</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-blue-800">
                    {metrics.mediumRisk}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">
                    ({Math.round((metrics.mediumRisk / totalRiskCount) * 100)}%)
                  </span>
                </div>
              </div>

              {/* Low */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-200/80 bg-emerald-50/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-emerald-900 leading-tight">Low Risk</div>
                    <div className="text-[10px] text-emerald-700/80">On schedule & within budget</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-sm text-emerald-800">
                    {metrics.lowRisk}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-1">
                    ({Math.round((metrics.lowRisk / totalRiskCount) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <FlowButton
              size="xs"
              variant="primary"
              onClick={() => setCurrentPage("ai")}
              icon={ArrowUpRight}
              className="w-full"
            >
              View Explainable AI Drivers
            </FlowButton>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ROW 2: PORTFOLIO TREND & INDIA GEOGRAPHIC MAP                         */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 3. Portfolio Trend (One Clean Financial/Project Trend Chart) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                Portfolio Trend
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Comparison of approved vs revised outlay and cumulative spend across major sectors (₹ Cr)
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorTrends} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="sector" tick={{ fontSize: 10, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#475569" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
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
                  <Bar dataKey="revised" name="Revised" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="expenditure" name="Expenditure" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Highest Exposure: Road Transport & Railways</span>
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

        {/* 4. India Map (Geographic Project Risk Distribution) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 tracking-tight">
                  India Geographic Distribution
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  State-wise central sector project concentration and risk distribution
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

            {/* Choropleth Map with Detail Panel */}
            <div className="rounded-lg overflow-hidden">
              <IndiaMap
                selectedStateCode="OD"
                showDetailPanel={true}
                monthYear="July, 2026"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hover or click any state to inspect project volume & expenditure</span>
            <span className="font-mono text-[10px] text-slate-400">Source: MoSPI IPMIS</span>
          </div>
        </div>
      </div>
    </div>
  );
}