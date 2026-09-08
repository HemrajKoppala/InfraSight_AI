import React, { useState } from "react";
import {
  Database,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Server,
  ShieldCheck,
  Layers,
  FileCheck,
  Activity,
  HardDrive,
  Download,
} from "lucide-react";
import { REPORT_METADATA } from "../data/paimanaData";
import { useApi } from "../context/ApiContext";

export default function DataStatus() {
  const { showToast } = useApi();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState([
    {
      id: "JOB-2026-07-31",
      timestamp: "31-Jul-2026 23:59:12 IST",
      type: "Monthly Scheduled Full Batch",
      source: "MoSPI IPMIS Central Database (SOAP/REST)",
      recordsIngested: 1824,
      validationErrors: 0,
      mlFeaturesGenerated: 36480,
      duration: "4m 18s",
      status: "Success",
    },
    {
      id: "JOB-2026-07-15",
      timestamp: "15-Jul-2026 18:00:04 IST",
      type: "Mid-Month Milestone Delta Sync",
      source: "MoRTH & MoR Project Implementation Units",
      recordsIngested: 412,
      validationErrors: 0,
      mlFeaturesGenerated: 8240,
      duration: "1m 12s",
      status: "Success",
    },
    {
      id: "JOB-2026-06-30",
      timestamp: "30-Jun-2026 23:58:45 IST",
      type: "Monthly Scheduled Full Batch",
      source: "MoSPI IPMIS Central Database",
      recordsIngested: 1810,
      validationErrors: 0,
      mlFeaturesGenerated: 36200,
      duration: "4m 05s",
      status: "Success",
    },
  ]);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const newJob = {
        id: `JOB-${new Date().toISOString().slice(0, 10)}-MANUAL`,
        timestamp: new Date().toLocaleString("en-IN") + " IST",
        type: "On-Demand Officer Re-Validation Sync",
        source: "MoSPI Central Sector IPMIS 2.0",
        recordsIngested: 1824,
        validationErrors: 0,
        mlFeaturesGenerated: 36480,
        duration: "0m 45s",
        status: "Success",
      };
      setSyncLogs((prev) => [newJob, ...prev]);
      if (showToast) {
        showToast("IPMIS Ingestion Completed: All 1,824 projects synchronized cleanly.", "success");
      }
    }, 2000);
  };

  const ministryCoverage = [
    { ministry: "Ministry of Road Transport & Highways (MoRTH)", projects: 684, coverage: 100, status: "Active" },
    { ministry: "Ministry of Railways (MoR)", projects: 324, coverage: 100, status: "Active" },
    { ministry: "Ministry of Power (MoP)", projects: 268, coverage: 100, status: "Active" },
    { ministry: "Ministry of Petroleum & Natural Gas (MoPNG)", projects: 184, coverage: 100, status: "Active" },
    { ministry: "Ministry of Coal (MoCoal)", projects: 122, coverage: 100, status: "Active" },
    { ministry: "Ministry of Jal Shakti (DWR, RD & GR)", projects: 94, coverage: 98.2, status: "Active" },
    { ministry: "Ministry of Housing & Urban Affairs (MoHUA)", projects: 88, coverage: 98.8, status: "Active" },
    { ministry: "Ministry of Civil Aviation & Ports", projects: 60, coverage: 100, status: "Active" },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Header */}
      <div className="bg-white border border-slate-300 rounded-xs p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
            <span>MoSPI Central Sector</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">System Diagnostics</span>
          </div>
          <h2 className="text-base font-extrabold text-[#0b2240] flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-900" />
            <span>IPMIS Data Ingestion Pipeline & Data Quality Health</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-3 py-1.5 bg-[#0b2240] hover:bg-blue-950 disabled:bg-slate-400 text-white text-xs font-bold rounded-xs shadow-2xs flex items-center gap-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Synchronizing IPMIS..." : "Trigger Manual Ingestion"}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Status KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-slate-300 rounded-xs p-3 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Data Source & Protocol
          </div>
          <div className="text-sm font-bold text-slate-900">MoSPI IPMIS 2.0</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Direct Gateway Secure Link</span>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-xs p-3 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Active Central Projects
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">1,824</div>
          <div className="text-[10px] text-slate-500 mt-1">Costing ≥ ₹150 Cr</div>
        </div>

        <div className="bg-white border border-slate-300 rounded-xs p-3 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Schema Validation Rate
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700">99.8%</div>
          <div className="text-[10px] text-slate-500 mt-1">48 Automated Integrity Rules</div>
        </div>

        <div className="bg-white border border-slate-300 rounded-xs p-3 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Last Pipeline Cycle
          </div>
          <div className="text-sm font-bold font-mono text-slate-900">31-Jul-2026 23:59</div>
          <div className="text-[10px] text-slate-500 mt-1">Next: 05-Aug-2026 (Batch)</div>
        </div>
      </div>

      {/* Ministry Ingestion Coverage Table */}
      <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs">
        <div className="border-b border-slate-200 pb-2 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Server className="w-4 h-4 text-blue-900" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Line Ministries Ingestion & Synchronization Coverage
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Mandatory monthly physical & financial submission status
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-300 rounded-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#0b2240] text-white text-[11px] font-semibold">
              <tr>
                <th className="p-2 border-r border-slate-700">Line Ministry / Department</th>
                <th className="p-2 border-r border-slate-700 text-center w-36">
                  Monitored Projects
                </th>
                <th className="p-2 border-r border-slate-700 text-center w-48">
                  Reporting Completeness
                </th>
                <th className="p-2 text-center w-32">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ministryCoverage.map((m, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                  <td className="p-2 font-bold text-slate-900 border-r border-slate-200">
                    {m.ministry}
                  </td>
                  <td className="p-2 text-center font-mono border-r border-slate-200">
                    {m.projects}
                  </td>
                  <td className="p-2 text-center border-r border-slate-200">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 bg-slate-200 h-2 rounded-xs overflow-hidden">
                        <div
                          style={{ width: `${m.coverage}%` }}
                          className="bg-emerald-600 h-full"
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">
                        {m.coverage}%
                      </span>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold rounded-xs uppercase">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log of ETL Batch Jobs */}
      <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs">
        <div className="border-b border-slate-200 pb-2 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-900" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              ETL Ingestion & Machine Learning Pipeline Job History
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Automated Audit Trail</span>
        </div>

        <div className="overflow-x-auto border border-slate-300 rounded-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#0b2240] text-white text-[11px] font-semibold">
              <tr>
                <th className="p-2 border-r border-slate-700 w-36">Job Execution ID</th>
                <th className="p-2 border-r border-slate-700 w-44">Timestamp</th>
                <th className="p-2 border-r border-slate-700">Sync Type & Description</th>
                <th className="p-2 border-r border-slate-700 text-center w-28">Projects</th>
                <th className="p-2 border-r border-slate-700 text-center w-36">
                  ML Features Generated
                </th>
                <th className="p-2 border-r border-slate-700 text-center w-24">Duration</th>
                <th className="p-2 text-center w-24">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {syncLogs.map((job) => (
                <tr key={job.id} className="odd:bg-white even:bg-slate-50/70">
                  <td className="p-2 font-mono font-bold text-blue-900 border-r border-slate-200">
                    {job.id}
                  </td>
                  <td className="p-2 font-mono text-slate-600 text-[11px] border-r border-slate-200">
                    {job.timestamp}
                  </td>
                  <td className="p-2 border-r border-slate-200">
                    <div className="font-bold text-slate-900">{job.type}</div>
                    <div className="text-[10px] text-slate-500">{job.source}</div>
                  </td>
                  <td className="p-2 text-center font-mono border-r border-slate-200">
                    {job.recordsIngested}
                  </td>
                  <td className="p-2 text-center font-mono border-r border-slate-200">
                    {job.mlFeaturesGenerated.toLocaleString("en-IN")}
                  </td>
                  <td className="p-2 text-center font-mono text-slate-600 border-r border-slate-200">
                    {job.duration}
                  </td>
                  <td className="p-2 text-center">
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-xs">
                      {job.status}
                    </span>
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
