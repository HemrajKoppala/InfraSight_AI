import React, { useState, useEffect, useMemo } from "react";
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
  Briefcase,
  Info
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
import { useApi } from "../context/ApiContext";
import { getProjectDetails, transformProject } from "../api";

function ProjectDetails({ setCurrentPage }) {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
  } = useApi();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'ai' | 'delays' | 'history' | 'warnings'
  const [detailsData, setDetailsData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const fallbackProject = useMemo(() => {
    return selectedProject || projects[0] || null;
  }, [selectedProject, projects]);

  const activeId = selectedProjectId || fallbackProject?.id;

  // Fetch full details from FastAPI endpoint: GET /api/projects/{id}/details
  useEffect(() => {
    if (!activeId) return;

    let isMounted = true;
    setLoadingDetails(true);
    setDetailsError(null);

    getProjectDetails(activeId)
      .then((res) => {
        if (isMounted && res) {
          setDetailsData({
            project: transformProject(res.project),
            metrics: res.metrics || null,
            history: Array.isArray(res.history) ? res.history : [],
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.info("[ProjectDetails] Live details fetch:", err.message);
          setDetailsError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingDetails(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeId]);

  const project = detailsData?.project || fallbackProject;
  const metrics = detailsData?.metrics || {
    cost_escalation_percent: project?.costOverrunPercent || 0,
    progress_gap: project ? Math.abs((project.financial_progress || 0) - (project.physical_progress || 0)) : 0,
    duration_used_percent: project?.planned_duration_months && project?.elapsed_duration_months
      ? Number(((project.elapsed_duration_months / project.planned_duration_months) * 100).toFixed(1))
      : 0,
  };
  const history = detailsData?.history || [];

  if (!project) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center py-20">
        <h2 className="text-lg font-bold text-slate-800">No Project Selected</h2>
        <p className="text-xs text-slate-500 mt-1">Please select a project from the repository.</p>
        <button
          onClick={() => setCurrentPage("projects")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded"
        >
          Go to Projects
        </button>
      </div>
    );
  }

  const overrunAmount = project.costOverrunAmount || (project.current_cost - project.original_cost);
  const overrunPercent = metrics.cost_escalation_percent ?? project.costOverrunPercent ?? 0;
  const financialExecutionPercent = project.current_cost > 0
    ? (((Number(project.expenditure) || 0) / project.current_cost) * 100).toFixed(1)
    : 0;

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
                {p.id} - {p.name.substring(0, 32)}
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
                {project.state || "National"}
              </span>
            </div>

            <h1 className="text-xl font-bold text-slate-900 mt-1">
              {project.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Nodal Ministry: <strong className="text-slate-700">{project.ministry}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-right pr-3 border-r border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Cost Escalation</span>
              <span className={`inline-block font-mono text-xs font-bold ${overrunPercent > 0 ? "text-rose-600" : "text-emerald-700"}`}>
                {overrunPercent > 0 ? `+${overrunPercent}%` : "0%"}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Schedule Status</span>
              <span
                className={`inline-block text-xs font-bold px-2 py-0.5 rounded border ${
                  (project.total_delay_months || project.timeOverrunMonths || 0) > 0
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {project.status || "On Track"}
              </span>
            </div>
          </div>
        </div>

        {/* Financial KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Approved Outlay</span>
            <span className="text-base font-bold font-mono text-slate-900">
              ₹{(project.original_cost ?? project.originalCost ?? 0).toLocaleString()} Cr
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Current Cost</span>
            <span className="text-base font-bold font-mono text-slate-900">
              ₹{(project.current_cost ?? project.revisedCost ?? 0).toLocaleString()} Cr
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
              {financialExecutionPercent}% of current outlay
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block">Physical Progress</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-bold font-mono text-blue-700">
                {project.physical_progress ?? project.physicalProgress ?? 0}%
              </span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${project.physical_progress ?? project.physicalProgress ?? 0}%` }}
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
          { id: "delays", label: "Delay Breakdown & Timeline" },
          { id: "history", label: "Historical Progression" },
          { id: "ai", label: "AI Risk Diagnosis" },
          { id: "warnings", label: "Early Warnings" }
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
              Official Project Particulars (SQLite Database)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Project Code:</span>
                <span className="font-bold font-mono text-slate-800">{project.project_id || project.id}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Nodal Ministry:</span>
                <span className="font-bold text-slate-800">{project.ministry}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sector Classification:</span>
                <span className="font-bold text-slate-800">{project.sector}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Jurisdiction State:</span>
                <span className="font-bold text-slate-800">{project.state}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Planned Duration:</span>
                <span className="font-bold font-mono text-slate-800">
                  {project.planned_duration_months ? `${project.planned_duration_months} Months` : "Data unavailable"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Elapsed Duration:</span>
                <span className="font-bold font-mono text-slate-800">
                  {project.elapsed_duration_months ? `${project.elapsed_duration_months} Months` : "Data unavailable"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">Computed Metrics:</span>
              <div className="grid grid-cols-3 gap-3 text-center pt-1 font-mono">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Cost Escalation</span>
                  <span className="font-bold text-slate-900">{metrics.cost_escalation_percent}%</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Progress Gap</span>
                  <span className="font-bold text-slate-900">{metrics.progress_gap}%</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-sans">Duration Elapsed</span>
                  <span className="font-bold text-slate-900">{metrics.duration_used_percent}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="gov-card p-5 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Location & Jurisdiction
            </h3>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>State / UT:</span>
                <strong className="text-slate-800">{project.state}</strong>
              </div>
              <div className="flex justify-between">
                <span>Sector:</span>
                <strong className="text-slate-800">{project.sector}</strong>
              </div>
              <div className="flex justify-between">
                <span>Coordinates:</span>
                <span className="text-slate-500">
                  {project.latitude && project.longitude
                    ? `${project.latitude}, ${project.longitude}`
                    : "Location unavailable"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Delay Breakdown & Timeline */}
      {activeTab === "delays" && (
        <div className="gov-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Delay Factor Breakdown (FastAPI Database Model)
              </h3>
              <p className="text-xs text-slate-500">
                Granular delay attributes logged in central SQLite database for project {project.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Milestone Delay</span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                {project.milestone_delay_months || 0} mos
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Milestone schedule lag</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Procurement Delay</span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                {project.procurement_delay_months || 0} mos
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Tender & vendor finalization</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Land Acquisition Delay</span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                {project.land_acquisition_delay_months || 0} mos
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Right-of-way clearance</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Approval Delay</span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                {project.approval_delay_months || 0} mos
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Statutory & forest clearances</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Historical Progression */}
      {activeTab === "history" && (
        <div className="gov-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Project Historical Progression
              </h3>
              <p className="text-xs text-slate-500">
                Monthly historical progression records retrieved from /api/projects/{project.id}/history
              </p>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Clock size={32} className="mx-auto text-slate-300" />
              <h4 className="font-bold text-slate-700 text-sm">Historical data unavailable</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No monthly audit records have been submitted to the history table for this project yet.
              </p>
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={history.map((h) => ({
                    month: `Month ${h.month}`,
                    currentCost: h.current_cost,
                    expenditure: h.expenditure,
                    physicalProgress: h.physical_progress,
                  }))}
                  margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", fontSize: "12px", borderRadius: "8px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <Line type="monotone" dataKey="currentCost" name="Current Cost (₹ Cr)" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenditure" name="Expenditure (₹ Cr)" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="physicalProgress" name="Physical Progress (%)" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: AI Risk Diagnosis */}
      {activeTab === "ai" && (
        <div className="gov-card p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto">
            <Brain size={24} />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Risk intelligence unavailable</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Predictive ML models for project risk diagnosis and SHAP explanation drivers are under active development by the ML team. This view will automatically populate with live risk metrics once the backend ML endpoints are deployed.
          </p>
        </div>
      )}

      {/* Tab 5: Active Early Warnings */}
      {activeTab === "warnings" && (
        <div className="gov-card p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center mx-auto">
            <AlertTriangle size={24} />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Alerts are currently unavailable.</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            The early warning alerts engine is integrated directly with the backend intelligence layer. When active warning triggers are logged for project {project.id}, they will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
