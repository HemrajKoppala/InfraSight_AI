import React from "react";
import { ServerOff, RefreshCw, Settings2, Database, AlertTriangle } from "lucide-react";
import { useApi } from "../context/ApiContext";

function EmptyState({
  title = "No Data Found",
  description = "No records were returned from the backend API.",
  type = "empty",
  onRetry
}) {
  const { setIsSettingsOpen, refreshAll, apiUrl } = useApi();

  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center my-4 max-w-2xl mx-auto shadow-xs">
      <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-transform hover:scale-105 shadow-inner bg-slate-100 text-slate-500">
        {type === "error" ? (
          <ServerOff size={32} className="text-rose-500" />
        ) : type === "warning" ? (
          <AlertTriangle size={32} className="text-amber-500" />
        ) : (
          <Database size={32} className="text-blue-500" />
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      <div className="inline-flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 mb-6">
        <span>Connected Endpoint:</span>
        <span className="font-semibold text-blue-600">{apiUrl}</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onRetry || refreshAll}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <RefreshCw size={15} />
          <span>Retry API Fetch</span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition flex items-center gap-2"
        >
          <Settings2 size={15} />
          <span>Configure API URL</span>
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
