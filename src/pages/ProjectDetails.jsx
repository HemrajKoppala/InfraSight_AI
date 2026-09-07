import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  IndianRupee,
  Layers,
  Brain,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Briefcase
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import RiskBadge from "../components/RiskBadge";
import { useApi } from "../context/ApiContext";

function ProjectDetails({ setCurrentPage }) {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    alerts
  } = useApi();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'ai' | 'milestones' | 'expenditure' | 'warnings'

  const project = useMemo(() => {
    return selectedProject || projects[0] || {};
  }, [selectedProject, projects]);

  // Project-specific alerts
  const projectAlerts = useMemo(() => {
    return alerts.filter((a) => a.projectId === project.id);
  }, [alerts, project.id]);

  // Expenditure timeline data for this project
  const expenditureData = useMemo(() => {
    const orig = Number(project.originalCost) || 10000;
    const rev = Number(project.revisedCost || orig);
    const exp = Number(project.expenditure) || orig * 0.6;

    return [
      { quarter: "Q1 2024", planned: Math.round(orig * 0.15), actual: Math.round(orig * 0.14) },
      { quarter: "Q2 2024", planned: Math.round(orig * 0.32), actual: Math.round(orig * 0.28) },
      { quarter: "Q3 2024", planned: Math.round(orig * 0.5), actual: Math.round(orig * 0.42) },
      { quarter: "Q4 2024", planned: Math.round(orig * 0.68), actual: Math.round(exp * 0.85) },
      { quarter: "Q1 2025", planned: Math.round(orig * 0.85), actual: Math.round(exp) },
      { quarter: "Q2 2025 (Est)", planned: Math.round(orig * 1.0), actual: null, forecast: Math.round(exp + (rev - exp) * 0.4) },
      { quarter: "Q3 2025 (Est)", planned: Math.round(orig * 1.0), actual: null, forecast: Math.round(rev) }
    ];
  }, [project]);

  // Project Milestones
  const milestones = useMemo(() => {
    if (project.milestones && project.milestones.length > 0) {
      return project.milestones;
    }
    return [
      { id: "M1", name: "Detailed Project Report (DPR) Approval & Land Survey", target: "Jan 2024", status: "Completed", delayMonths: 0 },
      { id: "M2", name: "Environmental Clearance & Forest Stage-1 Diversion", target: "May 2024", status: "Completed", delayMonths: 1.5 },
      { id: "M3", name: "Right of Way (RoW) Land Acquisition (80% package)", target: "Nov 2024", status: "Delayed", delayMonths: 5.0 },
      { id: "M4", name: "Substructure Civil Works & Foundation Laying", target: "Apr 2025", status: "Ongoing", delayMonths: 3.5 },
      { id: "M5", name: "Superstructure Erection & Mechanical Integration", target: "Oct 2025", status: "Pending", delayMonths: 6.0 },
      { id: "M6", name: "Final Statutory Testing & Commercial Commissioning", target: "Mar 2026", status: "Pending", delayMonths: 7.5 }
    ];
  }, [project]);

  const overrunAmount = (Number(project.revisedCost) || Number(project.originalCost)) - Number(project.originalCost);
  const overrunPercent = project.originalCost ? ((overrunAmount / project.originalCost) * 100).toFixed(1) : 0;
  const financialExecutionPercent = project.revisedCost ? (((Number(project.expenditure) || 0) / project.revisedCost) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <button
          onClick={() => setCurrentPage("projects")}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects Repository</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500">Switch Project:</span>
          <select
            value={project.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-800"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.name.substring(0, 28)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Official Government Project Header Card */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                {project.id}
              </span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {project.sector}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" />
                {project.state || "National Alignment"}
              </span>
            </div>

            <h1 className="text-xl font-bold text-slate-900 mt-1">
              {project.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Nodal Ministry: <strong className="text-slate-700">{project.ministry}</strong> • Implementing Agency: <strong className="text-slate-700">{project.agency || "NHAI / Central CPWD"}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <RiskBadge risk={project.overallRisk || 0} size="normal" />

            <div className="text-right pl-3 border-l border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Milestone Status</span>
              <span
                className={`inline-block text-xs font-bold px-2 py-0.5 rounded border ${
                  project.status === "Delayed"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {project.status || "Ongoing"}
              </span>
            </div>
          </div>
        </div>

        {/* Financial KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Approved Outlay</span>
            <span className="text-base font-bold font-mono text-slate-900">
              ₹{(project.originalCost || 0).toLocaleString()} Cr
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Revised / Anticipated Cost</span>
            <span className="text-base font-bold font-mono text-slate-900">
              ₹{(project.revisedCost || project.originalCost || 0).toLocaleString()} Cr
            </span>
            {overrunAmount > 0 && (
              <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                +₹{overrunAmount.toLocaleString()} Cr ({overrunPercent}%)
              </span>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Expenditure Disbursed</span>
            <span className="text-base font-bold font-mono text-slate-900">
              ₹{(project.expenditure || 0).toLocaleString()} Cr
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              {financialExecutionPercent}% of revised budget
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Physical Progress</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-bold font-mono text-blue-700">
                {project.physicalProgress || 0}%
              </span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${project.physicalProgress || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
        {[
          { id: "overview", label: "Overview & Contract Details" },
          { id: "ai", label: "AI Risk Diagnosis & Drivers" },
          { id: "milestones", label: "Milestone Implementation Schedule" },
          { id: "expenditure", label: "Quarterly Expenditure Curve" },
          { id: "warnings", label: `Active Early Warnings (${projectAlerts.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Contract Details */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 gov-card p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Contract & Execution Particulars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Prime EPC Contractor:</span>
                <span className="font-bold text-slate-800">{project.contractor || "L&T Infrastructure Ltd."}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sanction Date:</span>
                <span className="font-bold font-mono text-slate-800">{project.sanctionDate || "15 Jan 2023"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Original Target Completion:</span>
                <span className="font-bold font-mono text-slate-800">{project.targetDate || "31 Dec 2025"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Anticipated Completion Date:</span>
                <span className="font-bold font-mono text-rose-600">{project.revisedTargetDate || "30 Sep 2026"}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">Project Scope & Description:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.description ||
                  `Development of 4/6-lane economic corridor including grade-separated interchanges, major bridges, and smart highway sensor infrastructure under the MoSPI central sector framework.`}
              </p>
            </div>
          </div>

          <div className="gov-card p-5 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Location & Jurisdiction
            </h3>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>State / UT:</span>
                <strong className="text-slate-800">{project.state || "Karnataka & Maharashtra"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Implementing Division:</span>
                <strong className="text-slate-800">{project.sector} Division</strong>
              </div>
              <div className="flex justify-between">
                <span>Monitoring Cadre:</span>
                <strong className="text-slate-800">MoSPI Central Sector Desk</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI Risk Diagnosis & Drivers */}
      {activeTab === "ai" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="gov-card p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
              <Brain size={16} className="text-blue-600" />
              Machine Learning Telemetry
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Ensemble Model Classification</span>
                <span className="text-base font-bold text-slate-900">
                  {project.overallRisk >= 75 ? "Severe Delay Risk" : "Moderate Risk"}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Confidence Level: 94.2% (XGBoost)</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-semibold text-slate-700">Projected Milestone Slippage</span>
                <div className="text-lg font-bold font-mono text-rose-600">
                  +{project.aiPredictions?.predictedDelayMonths || (project.status === "Delayed" ? 8 : 3)} Months
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-semibold text-slate-700">Projected Additional Cost Overrun</span>
                <div className="text-lg font-bold font-mono text-amber-600">
                  +₹{project.aiPredictions?.predictedCostOverrun || Math.round(project.originalCost * 0.15)} Cr
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 gov-card p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              SHAP Root-Cause Attribution for {project.id}
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { factor: "Right of Way (RoW) Clearance Backlog", weight: 38, impact: "Delayed by 5.2 months" },
                { factor: "Material Price Escalation Index", weight: 26, impact: "Cost increased by ₹840 Cr" },
                { factor: "Contractor Machinery Mobilization Lag", weight: 18, impact: "Idle equipment claims pending" },
                { factor: "Statutory Environmental NOCs", weight: 12, impact: "Stage-2 forest clearance pending" },
                { factor: "Monsoon Disruption Factor", weight: 6, impact: "Seasonal work stoppage" }
              ].map((f, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{f.factor}</span>
                    <span className="font-mono font-bold text-blue-700 text-[11px]">{f.weight}% Attribution</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${f.weight * 2.3}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{f.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Milestone Implementation Schedule */}
      {activeTab === "milestones" && (
        <div className="gov-card overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              Key Project Implementation Milestones
            </h3>
            <span className="text-xs text-slate-500">
              {milestones.filter((m) => m.status === "Completed").length} of {milestones.length} Milestones Achieved
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="gov-table-header">
                  <th className="py-3 px-4">Milestone Identifier & Scope</th>
                  <th className="py-3 px-4">Target Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Delay (Months)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {milestones.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">
                          {m.id}
                        </span>
                        <span>{m.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{m.target}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                          m.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : m.status === "Delayed"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold">
                      {m.delayMonths > 0 ? (
                        <span className="text-rose-600">+{m.delayMonths} mo</span>
                      ) : (
                        <span className="text-slate-400">0 mo</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Quarterly Expenditure Curve */}
      {activeTab === "expenditure" && (
        <div className="gov-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Quarterly Capital Disbursement & Forecast (₹ Cr)
              </h3>
              <p className="text-xs text-slate-500">
                Planned capital allocation curve against actual recognized bills and AI predictive forecast
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenditureData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `₹${v} Cr`} />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString()} Cr`]}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", fontSize: "12px", borderRadius: "8px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Line type="monotone" dataKey="planned" name="Approved Plan" stroke="#64748b" strokeDasharray="4 4" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" name="Actual Expenditure" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="forecast" name="AI Projected Spend" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 5: Active Early Warnings */}
      {activeTab === "warnings" && (
        <div className="space-y-4">
          {projectAlerts.length === 0 ? (
            <div className="gov-card p-10 text-center space-y-2">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
              <h4 className="font-bold text-slate-800 text-sm">No Active Early Warnings</h4>
              <p className="text-xs text-slate-500">No critical alerts currently flagged for project {project.id}.</p>
            </div>
          ) : (
            projectAlerts.map((a) => (
              <div key={a.id} className="gov-card p-4 border-l-4 border-l-rose-600 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {a.severity}
                  </span>
                  <span className="font-mono text-slate-400">{a.timestamp}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{a.title}</h4>
                <p className="text-slate-600 leading-relaxed">{a.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
