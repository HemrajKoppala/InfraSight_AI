import React, { useState, useMemo } from "react";
import {
  TriangleAlert,
  ShieldAlert,
  Search,
  CheckCircle2,
  Send,
  ExternalLink,
  Clock,
  Filter,
  ArrowUpRight,
  X,
  AlertOctagon,
  Building2,
  RefreshCw
} from "lucide-react";
import { useApi } from "../context/ApiContext";
import EmptyState from "../components/EmptyState";

function Alerts({ setCurrentPage }) {
  const {
    alerts,
    loadingAlerts,
    refreshAll,
    acknowledgeAlert,
    escalateAlert,
    setSelectedProjectId,
    showToast
  } = useApi();

  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Escalation Modal State
  const [escalateModalAlert, setEscalateModalAlert] = useState(null);
  const [escalationNotes, setEscalationNotes] = useState("");

  // Counts
  const counts = useMemo(() => {
    let critical = 0;
    let high = 0;
    let medium = 0;
    let acknowledged = 0;
    let escalated = 0;

    alerts.forEach((a) => {
      if (a.severity === "Critical") critical += 1;
      if (a.severity === "High") high += 1;
      if (a.severity === "Medium") medium += 1;
      if (a.status === "Acknowledged") acknowledged += 1;
      if (a.status === "Escalated") escalated += 1;
    });

    return {
      total: alerts.length,
      critical,
      high,
      medium,
      acknowledged,
      escalated
    };
  }, [alerts]);

  // Filtered Alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchSeverity = severityFilter === "ALL" || a.severity === severityFilter;
      const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
      const matchSearch =
        !searchTerm ||
        a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.projectId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchSeverity && matchStatus && matchSearch;
    });
  }, [alerts, severityFilter, statusFilter, searchTerm]);

  const handleOpenEscalateModal = (alert) => {
    setEscalateModalAlert(alert);
    setEscationNotes(
      `Escalated to Secretary, ${alert.ministry || "Nodal Ministry"}. Immediate inter-departmental intervention requested under Cabinet Secretariat guidelines.`
    );
  };

  const handleConfirmEscalate = () => {
    if (escalateModalAlert) {
      escalateAlert(escalateModalAlert.id, escalationNotes);
      setEscalateModalAlert(null);
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    if (setCurrentPage) setCurrentPage("details");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Cabinet Committee on Infrastructure (CCI)
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Live Early Warning Console
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <TriangleAlert size={22} className="text-rose-600" />
            Early Warning System (EWS) Console
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated detection and triage of critical delays, statutory clearance lags, and cost escalation triggers
          </p>
        </div>

        {/* Live Feed Badge & Refresh */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>EWS Stream Active</span>
          </div>

          <button
            onClick={refreshAll}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            title="Refresh Warnings"
          >
            <RefreshCw size={14} className={loadingAlerts ? "animate-spin text-blue-600" : ""} />
          </button>
        </div>
      </div>

      {/* KPI Triage Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div
          onClick={() => setSeverityFilter("ALL")}
          className={`gov-card p-3 cursor-pointer transition ${
            severityFilter === "ALL" ? "ring-2 ring-blue-600" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-500">Total Warnings</span>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">{counts.total}</p>
          <span className="text-[10px] text-slate-400">All registered alerts</span>
        </div>

        <div
          onClick={() => setSeverityFilter("Critical")}
          className={`gov-card p-3 cursor-pointer transition border-l-4 border-l-rose-500 ${
            severityFilter === "Critical" ? "ring-2 ring-rose-500" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-rose-700">Critical Alerts</span>
          <p className="text-xl font-bold font-mono text-rose-700 mt-0.5">{counts.critical}</p>
          <span className="text-[10px] text-rose-600 font-semibold">Immediate Action</span>
        </div>

        <div
          onClick={() => setSeverityFilter("High")}
          className={`gov-card p-3 cursor-pointer transition border-l-4 border-l-amber-500 ${
            severityFilter === "High" ? "ring-2 ring-amber-500" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-amber-700">High Severity</span>
          <p className="text-xl font-bold font-mono text-amber-700 mt-0.5">{counts.high}</p>
          <span className="text-[10px] text-slate-400">Escalation Pending</span>
        </div>

        <div
          onClick={() => setSeverityFilter("Medium")}
          className={`gov-card p-3 cursor-pointer transition border-l-4 border-l-yellow-500 ${
            severityFilter === "Medium" ? "ring-2 ring-yellow-500" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-yellow-700">Moderate Severity</span>
          <p className="text-xl font-bold font-mono text-slate-800 mt-0.5">{counts.medium}</p>
          <span className="text-[10px] text-slate-400">Monitoring Required</span>
        </div>

        <div
          onClick={() => setStatusFilter("Escalated")}
          className={`gov-card p-3 cursor-pointer transition border-l-4 border-l-blue-500 ${
            statusFilter === "Escalated" ? "ring-2 ring-blue-500" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-blue-700">Escalated</span>
          <p className="text-xl font-bold font-mono text-blue-700 mt-0.5">{counts.escalated}</p>
          <span className="text-[10px] text-slate-400">To Ministry Desk</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="gov-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search warnings by title, project name, ID, or root cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 transition"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600"
          >
            <option value="ALL">All Statuses (Active, Ack, Escalated)</option>
            <option value="Active">Active Only</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Escalated">Escalated to Ministry</option>
          </select>
        </div>
      </div>

      {/* Alert List */}
      {filteredAlerts.length === 0 ? (
        <div className="gov-card p-12 text-center space-y-3">
          <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
          <h3 className="font-bold text-slate-800 text-sm">No Matching Warnings</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All early warnings matching this query have been addressed or no alerts exist under this severity tier.
          </p>
          <button
            onClick={() => {
              setSeverityFilter("ALL");
              setStatusFilter("ALL");
              setSearchTerm("");
            }}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const isCritical = alert.severity === "Critical";
            const isEscalated = alert.status === "Escalated";
            const isAck = alert.status === "Acknowledged";

            return (
              <div
                key={alert.id}
                className={`gov-card p-5 space-y-4 transition hover:border-slate-300 ${
                  isCritical ? "border-l-4 border-l-rose-600" : "border-l-4 border-l-amber-500"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        isCritical
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : alert.severity === "High"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {alert.severity} Severity
                    </span>

                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {alert.id}
                    </span>

                    <span className="text-slate-300">|</span>

                    <button
                      onClick={() => handleSelectProject(alert.projectId)}
                      className="text-xs font-bold text-slate-900 hover:text-blue-600 transition flex items-center gap-1"
                    >
                      <span>{alert.projectId}</span>
                      <span className="text-slate-400 font-normal truncate max-w-[200px]">
                        ({alert.projectName})
                      </span>
                      <ArrowUpRight size={12} className="text-slate-400" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${
                        isEscalated
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : isAck
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                      }`}
                    >
                      {alert.status}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Clock size={11} />
                      {alert.timestamp}
                    </span>
                  </div>
                </div>

                {/* Warning Title & Description */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {alert.description}
                  </p>
                </div>

                {/* Impact Analysis & Source Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Detection Trigger</span>
                    <span className="font-semibold text-slate-800">{alert.source || "Satellite / Geo-tagging"}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Projected Cost Escalation</span>
                    <span className="font-bold font-mono text-rose-600">
                      +₹{(alert.projectedCostImpact || 0).toLocaleString()} Cr
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Projected Schedule Slippage</span>
                    <span className="font-bold font-mono text-amber-600">
                      +{alert.projectedDelayMonths || 6} Months
                    </span>
                  </div>
                </div>

                {/* Recommended Action / Escalation Note if present */}
                {alert.recommendedAction && (
                  <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Recommended Inter-Ministerial Action:</strong> {alert.recommendedAction}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="text-[11px] text-slate-500">
                    <span>Nodal Ministry: </span>
                    <strong className="text-slate-700">{alert.ministry}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {alert.status === "Active" && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-300 shadow-2xs transition"
                      >
                        Acknowledge
                      </button>
                    )}

                    {alert.status !== "Escalated" && (
                      <button
                        onClick={() => handleOpenEscalateModal(alert)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-2xs transition"
                      >
                        <Send size={12} />
                        <span>Escalate to Ministry</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleSelectProject(alert.projectId)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition"
                    >
                      <span>View Project</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Escalation Modal */}
      {escalateModalAlert && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertOctagon size={20} />
                <h3 className="font-bold text-sm text-slate-900">
                  Escalate Early Warning to Ministry Desk
                </h3>
              </div>
              <button
                onClick={() => setEscalateModalAlert(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p className="text-slate-600">
                You are about to issue an official Escalation Dispatch for warning <strong>{escalateModalAlert.id}</strong> on project:
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-800">
                {escalateModalAlert.projectId} - {escalateModalAlert.projectName}
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Target: {escalateModalAlert.ministry}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="font-semibold text-slate-700 block">
                  Official Nodal Officer Remarks / Directive:
                </label>
                <textarea
                  rows={3}
                  value={escalationNotes}
                  onChange={(e) => setEscalationNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition"
                  placeholder="Enter remarks for inter-ministerial review..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 text-xs">
              <button
                onClick={() => setEscalateModalAlert(null)}
                className="px-3 py-1.5 font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEscalate}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-2xs transition"
              >
                <Send size={13} />
                <span>Confirm & Dispatch Escalation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;
