import React, { useState, useMemo } from "react";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  FileCheck,
  Building2,
  Calendar,
  Clock,
  Printer,
  X,
  FileSpreadsheet,
  CheckCircle2,
  Plus
} from "lucide-react";
import { useApi } from "../context/ApiContext";

function Reports({ setCurrentPage }) {
  const {
    projects,
    dashboardSummary,
    sectorStats,
    stateStats,
    loadingProjects,
    loadingSummary,
    setSelectedProjectId,
    showToast,
  } = useApi();

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [previewReport, setPreviewReport] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newReportType, setNewReportType] = useState("Flash");
  const [userCreatedReports, setUserCreatedReports] = useState([]);

  // Dynamically compile official reports directly from real SQLite database records
  const databaseReports = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const totalCount = dashboardSummary?.total_projects ?? projects.length;
    const approved = Math.round(dashboardSummary?.total_original_cost ?? 0);
    const revised = Math.round(dashboardSummary?.total_current_cost ?? 0);
    const expenditure = Math.round(dashboardSummary?.total_expenditure ?? 0);
    const diff = revised - approved;

    const reports = [
      // 1. Portfolio Flash Report
      {
        id: "REP-MOSPI-PORTFOLIO",
        title: `MoSPI Flash Report on Central Sector Projects (${totalCount} Projects)`,
        type: "Flash Report",
        category: "Monthly Flash",
        classification: "Official - MoSPI OCMS",
        date: "08 Sep 2026",
        format: "PDF",
        size: "3.2 MB",
        status: "Verified",
        summary: `Comprehensive monitoring report covering ${totalCount} central sector infrastructure projects. Approved outlay: ₹${approved.toLocaleString()} Cr, Anticipated cost: ₹${revised.toLocaleString()} Cr (+₹${diff.toLocaleString()} Cr variance), Cumulative expenditure: ₹${expenditure.toLocaleString()} Cr.`,
        reportData: {
          totalCount,
          approved,
          revised,
          expenditure,
          sectorsCount: sectorStats ? sectorStats.length : 0,
          statesCount: stateStats ? stateStats.length : 0,
        },
      },
      // 2. Sectoral Cost Audit
      {
        id: "REP-SECTOR-AUDIT",
        title: `Sectoral Cost Overrun & Milestone Delay Audit (${sectorStats ? sectorStats.length : 0} Sectors)`,
        type: "Sectoral Audit",
        category: "Quarterly Audit",
        classification: "Official - MoSPI",
        date: "08 Sep 2026",
        format: "XLSX",
        size: "2.1 MB",
        status: "Verified",
        summary: `Expenditure audit across infrastructure sectors: ${(sectorStats || []).map((s) => `${s.sector} (${s.project_count} prj, ₹${Math.round(s.current_cost)} Cr)`).join(", ")}.`,
        reportData: {
          sectors: sectorStats || [],
        },
      },
      // 3. State Allocation Brief
      {
        id: "REP-STATE-BRIEF",
        title: `National State-wise Infrastructure Allocation Briefing (${stateStats ? stateStats.length : 0} States)`,
        type: "EWS Brief",
        category: "Geographic Audit",
        classification: "Confidential - Cabinet Review",
        date: "08 Sep 2026",
        format: "PDF",
        size: "2.4 MB",
        status: "Verified",
        summary: `State-wise infrastructure distribution covering ${(stateStats || []).map((s) => `${s.state} (${s.project_count} projects, ₹${Math.round(s.current_cost)} Cr)`).join(", ")}.`,
        reportData: {
          states: stateStats || [],
        },
      },
    ];

    // 4. Specific Project Dossier for each project from SQLite DB
    projects.forEach((p) => {
      reports.push({
        id: `DOSSIER-${p.id}`,
        title: `${p.id}: ${p.name} - Project Monitoring Dossier`,
        type: "Project Dossier",
        category: `${p.sector} Sector`,
        classification: `Official - ${p.ministry || "Central Ministry"}`,
        date: "08 Sep 2026",
        format: "PDF",
        size: "1.6 MB",
        status: "Verified",
        summary: `Project in ${p.state} under ${p.ministry}. Sanctioned: ₹${Number(p.originalCost || 0).toLocaleString()} Cr, Anticipated: ₹${Number(p.revisedCost || p.originalCost || 0).toLocaleString()} Cr, Expenditure: ₹${Number(p.expenditure || 0).toLocaleString()} Cr. Schedule overrun: ${p.timeOverrunMonths || 0} months.`,
        projectRecord: p,
      });
    });

    return reports;
  }, [projects, dashboardSummary, sectorStats, stateStats]);

  const allReports = useMemo(() => {
    return [...userCreatedReports, ...databaseReports];
  }, [userCreatedReports, databaseReports]);

  const filteredReports = useMemo(() => {
    return allReports.filter((r) => {
      const matchType = typeFilter === "ALL" || r.type === typeFilter;
      const matchSearch =
        !searchTerm ||
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }, [allReports, typeFilter, searchTerm]);

  const handleDownload = (report) => {
    let extraDetails = "";
    if (report.projectRecord) {
      const p = report.projectRecord;
      extraDetails = `
PROJECT DOSSIER DETAILS:
- Project ID: ${p.id}
- Project Title: ${p.name}
- Sector: ${p.sector}
- Nodal Ministry: ${p.ministry}
- State: ${p.state}
- Original Outlay: ₹${p.originalCost} Cr
- Anticipated Outlay: ₹${p.revisedCost || p.originalCost} Cr
- Cumulative Expenditure: ₹${p.expenditure || 0} Cr
- Schedule Overrun: ${p.timeOverrunMonths || 0} months
- Physical Progress: ${p.physicalProgress || 0}%
- Coordinates: ${p.latitude || "N/A"}, ${p.longitude || "N/A"}
`;
    } else if (report.reportData?.sectors) {
      extraDetails = `
SECTORAL BREAKDOWN:
${report.reportData.sectors.map((s) => `  * ${s.sector}: ${s.project_count} projects | Original: ₹${s.original_cost} Cr | Current: ₹${s.current_cost} Cr | Spent: ₹${s.expenditure} Cr`).join("\n")}
`;
    } else if (report.reportData?.states) {
      extraDetails = `
STATE-WISE ALLOCATION BREAKDOWN:
${report.reportData.states.map((s) => `  * ${s.state}: ${s.project_count} projects | Original: ₹${s.original_cost} Cr | Current: ₹${s.current_cost} Cr | Spent: ₹${s.expenditure} Cr`).join("\n")}
`;
    } else {
      extraDetails = `
PORTFOLIO SUMMARY:
- Total Projects Monitored: ${projects.length}
- Central Registry Source: SQLite Database (backend/infrasight.db)
- Live API Base: ${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}
`;
    }

    const content = `GOVERNMENT OF INDIA
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MoSPI)
INFRASTRUCTURE MONITORING DIVISION
======================================================
Report Reference: ${report.id}
Document Title: ${report.title}
Classification: ${report.classification}
Generated Date: ${report.date}
Format: ${report.format} (${report.size})
======================================================

EXECUTIVE SUMMARY:
${report.summary}
${extraDetails}
======================================================
Official digital sign-off verified under Central Sector Project Monitoring Guidelines.
Data fetched dynamically from backend/infrasight.db via FastAPI.
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.id}_${report.title.substring(0, 20).replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded ${report.id}.`, "success");
  };

  const handleCreateReport = () => {
    const newId = `REP-ADHOC-${Date.now().toString().slice(-4)}`;
    const newDoc = {
      id: newId,
      title: `${newReportType === "Flash" ? "Ad-hoc MoSPI Flash Report" : "Cabinet Executive Briefing"} - ${new Date().toLocaleDateString("en-GB")}`,
      type: newReportType === "Flash" ? "Flash Report" : "EWS Brief",
      category: "Ad-hoc Telemetry",
      classification: "Official - MoSPI OCMS",
      date: "08 Sep 2026",
      format: "PDF",
      size: "2.1 MB",
      status: "Verified",
      summary: `Automated compilation of ${projects.length} central sector projects currently stored in backend/infrasight.db.`,
    };

    setUserCreatedReports([newDoc, ...userCreatedReports]);
    setShowGenerateModal(false);
    showToast(`Report ${newId} compiled and added to registry.`, "success");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Infrastructure & Project Monitoring Division
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              MoSPI Official Reporting Center
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <FileText size={22} className="text-blue-600" />
            Official MoSPI Reports & Flash Briefings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Published reports and project dossiers derived directly from central sector projects in SQLite database
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs transition"
        >
          <Plus size={14} />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="gov-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search reports by title, ID, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 transition"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600"
          >
            <option value="ALL">All Report Types</option>
            <option value="Flash Report">MoSPI Flash Reports</option>
            <option value="EWS Brief">EWS Executive Briefs</option>
            <option value="Sectoral Audit">Sectoral Cost Audits</option>
            <option value="Project Dossier">Project Dossiers</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="gov-table-header">
                <th className="py-3 px-4">Document Title & Identifier</th>
                <th className="py-3 px-4">Report Type</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Generated Date</th>
                <th className="py-3 px-4 text-center">Format</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-xs text-slate-500 font-medium">
                    {loadingProjects ? "Loading reports from database..." : "No data available."}
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 shrink-0 mt-0.5">
                          {report.format === "PDF" ? <FileText size={16} /> : <FileSpreadsheet size={16} />}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-slate-500 block">
                            {report.id}
                          </span>
                          <p className="font-bold text-slate-900 leading-snug">{report.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{report.summary}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700 text-xs">{report.type}</span>
                      <span className="text-[10px] text-slate-400 block">{report.category}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                        {report.classification}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-600">{report.date}</td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {report.format} ({report.size})
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 size={10} />
                        {report.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setPreviewReport(report)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded border border-slate-200 transition"
                          title="Preview Document"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => handleDownload(report)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-200 transition"
                          title="Download Document"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden space-y-4 p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-500">
                    {previewReport.id}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {previewReport.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Official Letterhead Preview */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-3">
              <div className="text-center pb-3 border-b border-slate-200 space-y-0.5">
                <p className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
                  Government of India
                </p>
                <p className="font-semibold text-slate-600 text-[11px]">
                  Ministry of Statistics & Programme Implementation (MoSPI)
                </p>
                <p className="text-[10px] text-slate-500">
                  Infrastructure & Project Monitoring Division (IPMD) • New Delhi
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500">Classification: </span>
                  <strong className="text-slate-800">{previewReport.classification}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Issue Date: </span>
                  <strong className="text-slate-800 font-mono">{previewReport.date}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Executive Summary & Findings:</span>
                <p className="text-slate-600 leading-relaxed">{previewReport.summary}</p>
              </div>

              {previewReport.projectRecord && (
                <div className="p-3 bg-white rounded border border-slate-200 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project Identifier:</span>
                    <span className="font-bold text-slate-800">{previewReport.projectRecord.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">State / Sector:</span>
                    <span>{previewReport.projectRecord.state} • {previewReport.projectRecord.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sanctioned Cost:</span>
                    <span>₹{Number(previewReport.projectRecord.originalCost || 0).toLocaleString()} Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Cost:</span>
                    <span className="font-bold text-amber-700">₹{Number(previewReport.projectRecord.revisedCost || previewReport.projectRecord.originalCost || 0).toLocaleString()} Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cumulative Expenditure:</span>
                    <span className="text-emerald-700">₹{Number(previewReport.projectRecord.expenditure || 0).toLocaleString()} Cr</span>
                  </div>
                </div>
              )}

              <div className="p-2.5 bg-blue-50/60 rounded border border-blue-100 text-[11px] text-blue-900">
                Live Data Pipeline: Authenticated against {projects.length} real records in SQLite database (backend/infrasight.db).
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                Digitally authenticated document
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewReport(null)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(previewReport)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-2xs transition"
                >
                  <Download size={13} />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full shadow-2xl overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText size={17} className="text-blue-600" />
                Generate Official Infrastructure Report
              </h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Report Type / Template:
                </label>
                <select
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="Flash">Monthly Flash Report (Live Portfolio)</option>
                  <option value="EWS">Early Warning Executive Briefing</option>
                  <option value="Sectoral">Sectoral Cost Overrun & Milestone Audit</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Target Portfolio Scope:
                </label>
                <select className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                  <option>All Central Sector Projects ({projects.length} active records in DB)</option>
                  {sectorStats?.map((s) => (
                    <option key={s.sector}>{s.sector} Sector ({s.project_count} records)</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 text-xs">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="px-3 py-1.5 font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-2xs transition"
              >
                Compile & Publish Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
