import React, { useState } from "react";
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, Globe, HelpCircle } from "lucide-react";
import { useApi } from "../context/ApiContext";

function ApiSettingsModal() {
  const { apiUrl, updateApiEndpoint, isSettingsOpen, setIsSettingsOpen, testConnection } = useApi();
  const [inputUrl, setInputUrl] = useState(apiUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isSettingsOpen) return null;

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await testConnection(inputUrl);
    setTestResult(res);
    setTesting(false);
  };

  const handleSave = () => {
    updateApiEndpoint(inputUrl);
    setIsSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Server size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Backend API Configuration</h3>
              <p className="text-xs text-slate-500">
                Connect InfraSight AI frontend directly to your live API server
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              API Base URL
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Globe size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder="e.g. http://localhost:8000/api"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleTest}
                disabled={testing}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition flex items-center gap-2 disabled:opacity-50"
              >
                {testing ? <RefreshCw size={15} className="animate-spin" /> : "Test Ping"}
              </button>
            </div>
          </div>

          {/* Test Status Feedback */}
          {testResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                testResult.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {testResult.success ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Successfully connected to backend API!</p>
                    <p className="opacity-80">Response latency: {testResult.latency}ms</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Connection failed</p>
                    <p className="opacity-80">{testResult.error || "Unable to reach endpoint. Ensure your backend server is running."}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Quick Presets */}
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">Quick Endpoint Presets:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "FastAPI / Python (8000)", url: "http://localhost:8000/api" },
                { label: "Express / Node (5000)", url: "http://localhost:5000/api" },
                { label: "Flask (5001)", url: "http://localhost:5001/api" },
                { label: "Relative (/api)", url: "/api" }
              ].map((preset) => (
                <button
                  key={preset.url}
                  onClick={() => {
                    setInputUrl(preset.url);
                    setTestResult(null);
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-lg text-xs font-medium transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex gap-2.5 text-xs text-amber-900">
            <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p>
              Zero mock data is embedded. All project statistics, ML risk predictions, and early warnings will be loaded strictly from this live backend endpoint.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition"
          >
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApiSettingsModal;
