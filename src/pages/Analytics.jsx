import React, { useState, useMemo } from "react";
import {
  BarChart3,
  Download,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  PieChart as PieIcon,
  IndianRupee,
  Clock,
  ArrowUpRight,
  Filter
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useApi } from "../context/ApiContext";

function Analytics() {
  const { projects, showToast } = useApi();
  const [selectedSector, setSelectedSector] = useState("ALL");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("ALL");

  // Dynamic Sector list
  const sectors = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.sector).filter(Boolean)));
  }, [projects]);

  // Filtered dataset
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSector = selectedSector === "ALL" || p.sector === selectedSector;
      let matchRisk = true;
      if (selectedRiskFilter === "HIGH") matchRisk = (p.overallRisk || 0) >= 70;
      else if (selectedRiskFilter === "MEDIUM") matchRisk = (p.overallRisk || 0) >= 40 && (p.overallRisk || 0) < 70;
      else if (selectedRiskFilter === "LOW") matchRisk = (p.overallRisk || 0) < 40;
      return matchSector && matchRisk;
    });
  }, [projects, selectedSector, selectedRiskFilter]);

  // Aggregate Portfolio Stats
  const metrics = useMemo(() => {
    let approved = 0;
    let revised = 0;
    let spend = 0;
    let totalDelayMonths = 0;
    let highRiskOutlay = 0;

    filteredProjects.forEach((p) => {
      const orig = Number(p.originalCost) || 0;
      const rev = Number(p.revisedCost || p.originalCost) || 0;
      const exp = Number(p.expenditure) || 0;
      approved += orig;
      revised += rev;
      spend += exp;
      if ((p.overallRisk || 0) >= 70) {
        highRiskOutlay += rev;
      }
      // calculate projected delay
      totalDelayMonths += p.aiPredictions?.predictedDelayMonths || (p.status === "Delayed" ? 6 : 2);
    });

    const varianceCr = revised - approved;
    const variancePercent = approved > 0 ? ((varianceCr / approved) * 100).toFixed(1) : 0;
    const avgDelay = filteredProjects.length > 0 ? (totalDelayMonths / filteredProjects.length).toFixed(1) : 0;
    const highRiskConcentration = revised > 0 ? ((highRiskOutlay / revised) * 100).toFixed(1) : 0;

    return {
      approved,
      revised,
      spend,
      varianceCr,
      variancePercent,
      avgDelay,
      highRiskConcentration
    };
  }, [filteredProjects]);

  // Sector Aggregation for Comparison Bar Chart
  const sectorComparisonData = useMemo(() => {
    const map = {};
    filteredProjects.forEach((p) => {
      const s = p.sector || "Other";
      if (!map[s]) {
        map[s] = { sector: s, approved: 0, revised: 0, expenditure: 0, count: 0, avgProgress: 0 };
      }
      map[s].approved += Number(p.originalCost) || 0;
      map[s].revised += Number(p.revisedCost || p.originalCost) || 0;
      map[s].expenditure += Number(p.expenditure) || 0;
      map[s].avgProgress += Number(p.physicalProgress) || 0;
      map[s].count += 1;
    });

    return Object.values(map).map((item) => ({
      ...item,
      varianceCr: item.revised - item.approved,
      variancePct: item.approved > 0 ? (((item.revised - item.approved) / item.approved) * 100).toFixed(1) : 0,
      avgProgress: Math.round(item.avgProgress / item.count)
    }));
  }, [filteredProjects]);

  // Expenditure Timeline Curve Data
  const expenditureCurveData = useMemo(() => {
    return [
      { quarter: "Q1 2024", planned: 12000, actual: 11200, aiForecast: 11200 },
      { quarter: "Q2 2024", planned: 25000, actual: 23100, aiForecast: 23100 },
      { quarter: "Q3 2024", planned: 41000, actual: 36800, aiForecast: 36800 },
      { quarter: "Q4 2024", planned: 59000, actual: 51200, aiForecast: 51200 },
      { quarter: "Q1 2025", planned: 78000, actual: 64900, aiForecast: 64900 },
      { quarter: "Q2 2025", planned: 96000, actual: 78400, aiForecast: 78400 },
      { quarter: "Q3 2025", planned: 115000, actual: null, aiForecast: 92100 },
      { quarter: "Q4 2025", planned: 135000, actual: null, aiForecast: 108400 },
      { quarter: "Q1 2026", planned: 155000, actual: null, aiForecast: 127500 }
    ];
  }, []);

  // Status Breakdown Pie Data
  const statusPieData = useMemo(() => {
    const counts = { Ongoing: 0, Delayed: 0, Critical: 0, Completed: 0 };
    filteredProjects.forEach((p) => {
      if ((p.overallRisk || 0) >= 80) counts.Critical += 1;
      else if (p.status === "Delayed") counts.Delayed += 1;
      else if (p.status === "Completed") counts.Completed += 1;
      else counts.Ongoing += 1;
    });

    return [
      { name: "Ongoing", value: counts.Ongoing, color: "#3b82f6" },
      { name: "Delayed", value: counts.Delayed, color: "#f59e0b" },
      { name: "Critical Risk", value: counts.Critical, color: "#ef4444" },
      { name: "Completed", value: counts.Completed, color: "#10b981" }
    ].filter((item) => item.value > 0);
  }, [filteredProjects]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Project ID,Project Name,Sector,Ministry,Original Cost (Cr),Revised Cost (Cr),Expenditure (Cr),Progress (%),Risk Score,Status\n"];
    const rows = filteredProjects.map((p) =>
      `"${p.id}","${p.name.replace(/"/g, '""')}","${p.sector}","${p.ministry}",${p.originalCost},${p.revisedCost || p.originalCost},${p.expenditure || 0},${p.physicalProgress || 0},${p.overallRisk || 0},"${p.status}"`
    );
    const blob = new Blob([headers.concat(rows.join("\n"))], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `MoSPI_Infrastructure_Analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Analytics data exported as CSV.", "success");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Cabinet Monitoring Division
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Portfolio Variance Intelligence
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <BarChart3 size={22} className="text-blue-600" />
            Infrastructure Portfolio Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quantitative analysis of cost escalations, milestone schedules, and expenditure trajectories across central sector projects
          </p>
        </div>

        {/* Filter Controls & Export */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600 shadow-2xs"
          >
            <option value="ALL">All Sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600 shadow-2xs"
          >
            <option value="ALL">All Risk Brackets</option>
            <option value="HIGH">High Risk (≥70%)</option>
            <option value="MEDIUM">Moderate Risk (40–69%)</option>
            <option value="LOW">Low Risk (&lt;40%)</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-2xs transition"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Analytical KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gov-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500">Net Portfolio Cost Variance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-slate-900">
              ₹{metrics.varianceCr.toLocaleString()} Cr
            </span>
            <span className="text-xs font-bold text-rose-600 font-mono">
              +{metrics.variancePercent}%
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Escalation over approved sanction</p>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500">Avg Milestone Delay</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-slate-900">
              {metrics.avgDelay} Months
            </span>
            <span className="text-xs font-bold text-amber-600 font-mono">
              Schedule Lag
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Across {filteredProjects.length} active projects</p>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500">High-Risk Outlay Concentration</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-rose-700">
              {metrics.highRiskConcentration}%
            </span>
            <span className="text-xs font-bold text-slate-500">
              of Capital
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Tied in projects with &gt;70% risk</p>
        </div>

        <div className="gov-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500">Financial Execution Ratio</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-slate-900">
              {metrics.revised > 0 ? ((metrics.spend / metrics.revised) * 100).toFixed(1) : 0}%
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">
              Disbursed
            </span>
          </div>
          <p className="text-[10px] text-slate-400">₹{metrics.spend.toLocaleString()} Cr expended till date</p>
        </div>
      </div>

      {/* Main Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sector-wise Cost Comparison */}
        <div className="lg:col-span-2 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Sectoral Capital Commitment & Escalation
              </h3>
              <p className="text-xs text-slate-500">
                Approved Original Outlay vs Revised Forecast vs Realized Expenditure (₹ Cr)
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorComparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="sector" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString()} Cr`]}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", fontSize: "12px", borderRadius: "8px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
                <Bar dataKey="approved" name="Approved Outlay" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revised" name="Revised Outlay" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenditure" name="Actual Expenditure" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Implementation Status Breakdown */}
        <div className="gov-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Portfolio Status Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Categorization by operational milestone adherence
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Projects`, name]}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", fontSize: "12px", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
            {statusPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}</span>
                <span className="font-bold font-mono text-slate-800 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenditure Trajectory Curve */}
      <div className="gov-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Cumulative Portfolio Expenditure Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Planned Capital Outlay Curve vs Actual Disbursed vs AI Monte Carlo Predictive Horizon (₹ Cr)
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-mono">
            Quarterly Rolling Forecast
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={expenditureCurveData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `₹${v / 1000}k Cr`} />
              <Tooltip
                formatter={(val) => val !== null ? [`₹${Number(val).toLocaleString()} Cr`] : ["Pending", "Actual"]}
                contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", fontSize: "12px", borderRadius: "8px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Line
                type="monotone"
                dataKey="planned"
                name="Planned Baseline"
                stroke="#64748b"
                strokeDasharray="4 4"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual Expenditure"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="aiForecast"
                name="AI Predictive Trajectory"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sectoral Breakdown Table */}
      <div className="gov-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Sector-Wise Cost Escalation Audit
            </h3>
            <p className="text-xs text-slate-500">
              Detailed accountability report across infrastructure sectors
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="gov-table-header">
                <th className="py-3 px-4">Infrastructure Sector</th>
                <th className="py-3 px-4 text-center">Projects</th>
                <th className="py-3 px-4 text-right">Approved Outlay (₹ Cr)</th>
                <th className="py-3 px-4 text-right">Revised Outlay (₹ Cr)</th>
                <th className="py-3 px-4 text-right">Escalation (₹ Cr)</th>
                <th className="py-3 px-4 text-center">Overrun %</th>
                <th className="py-3 px-4 text-center">Avg Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {sectorComparisonData.map((s) => (
                <tr key={s.sector} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{s.sector}</td>
                  <td className="py-3 px-4 text-center font-mono text-slate-700">{s.count}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700">₹{s.approved.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">₹{s.revised.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono text-rose-600 font-semibold">
                    +{s.varianceCr.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center font-mono">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        Number(s.variancePct) > 15
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      +{s.variancePct}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${s.avgProgress}%` }} />
                      </div>
                      <span className="font-mono text-[10px] font-bold">{s.avgProgress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
