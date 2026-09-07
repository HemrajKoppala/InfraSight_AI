import React from "react";
import { Server, Wifi, WifiOff, RefreshCw, Settings2 } from "lucide-react";
import { useApi } from "../context/ApiContext";

function ApiStatusBadge() {
  const { isBackendConnected, connectionLatency, refreshAll, setIsSettingsOpen, apiUrl } = useApi();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsSettingsOpen(true)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
          isBackendConnected === true
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-xs"
            : isBackendConnected === false
            ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 animate-pulse-slow"
            : "bg-slate-100 text-slate-600 border-slate-200"
        }`}
        title={`Backend API: ${apiUrl} (Click to configure)`}
      >
        {isBackendConnected === true ? (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Wifi size={13} className="text-emerald-600" />
            <span>API Online</span>
            {connectionLatency !== null && (
              <span className="opacity-70 font-mono text-[11px]">{connectionLatency}ms</span>
            )}
          </>
        ) : isBackendConnected === false ? (
          <>
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <WifiOff size={13} className="text-rose-600" />
            <span>API Offline</span>
          </>
        ) : (
          <>
            <RefreshCw size={13} className="animate-spin text-slate-500" />
            <span>Connecting...</span>
          </>
        )}
        <Settings2 size={12} className="opacity-60 hover:opacity-100 ml-0.5" />
      </button>

      <button
        onClick={refreshAll}
        title="Refresh data from backend"
        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
      >
        <RefreshCw size={15} />
      </button>
    </div>
  );
}

export default ApiStatusBadge;
