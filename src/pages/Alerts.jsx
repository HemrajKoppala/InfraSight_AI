import React from "react";
import {
  TriangleAlert,
  ShieldAlert,
  CheckCircle2,
  BellOff,
  FolderKanban,
  Server
} from "lucide-react";
import { useApi } from "../context/ApiContext";

function Alerts({ setCurrentPage }) {
  const { alerts, loadingAlerts } = useApi();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Early Warning Radar
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Cabinet Secretary Monitoring
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <TriangleAlert size={22} className="text-blue-600" />
            Infrastructure Alerts & Warnings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time critical risk triggers and inter-ministerial escalations
          </p>
        </div>
      </div>

      {/* Main Authentic State Display */}
      <div className="gov-card p-12 text-center space-y-4 max-w-2xl mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center mx-auto">
          <BellOff size={28} />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900">
            Alerts are currently unavailable.
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            The early warning detection engine is managed by the backend intelligence service. No synthetic or client-side rule alerts are generated in order to preserve official reporting standards.
          </p>
        </div>

        <div className="pt-3">
          <button
            onClick={() => setCurrentPage("projects")}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
          >
            Review Active Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
