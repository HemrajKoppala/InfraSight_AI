import React from "react";
import { LayoutDashboard, ArrowLeft, Search, Network } from "lucide-react";

/**
 * Minimal Enterprise 404 Not Found Page
 * Designed for government & infrastructure intelligence platform.
 * Features disconnected node diagram: 4 ─── [●] ─── 4
 */
export default function NotFoundPage({ onNavigateDashboard, onNavigatePrevious }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center">
        {/* Minimal Disconnected Infrastructure Node Visualization: 4 ─── [●] ─── 4 */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 select-none font-mono">
          <span className="text-5xl sm:text-6xl font-black text-slate-800 tracking-tight">
            4
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
            <span className="w-6 sm:w-8 h-0.5 bg-slate-200 block"></span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
              <Network size={16} />
            </div>
            <span className="w-6 sm:w-8 h-0.5 bg-slate-200 block"></span>
          </div>

          <span className="text-5xl sm:text-6xl font-black text-slate-800 tracking-tight">
            4
          </span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-mono font-bold mb-3">
          <span>STATUS: 404_ROUTE_UNRESOLVED</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found
        </h1>

        {/* Supporting Context */}
        <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto mb-8">
          The requested infrastructure intelligence route does not exist or has been relocated within the central registry.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onNavigateDashboard}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
          >
            <LayoutDashboard size={15} />
            <span>Back to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onNavigatePrevious || onNavigateDashboard}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowLeft size={15} />
            <span>Return to Previous</span>
          </button>
        </div>
      </div>
    </div>
  );
}
