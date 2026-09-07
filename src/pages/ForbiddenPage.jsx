import React from "react";
import { ShieldAlert, ArrowLeft, LayoutDashboard, Lock } from "lucide-react";

/**
 * Enterprise 403 Forbidden Page
 * Strict compliance with Section 9:
 * - Message: Access Restricted
 * - Supporting text: You do not have permission to access this resource.
 * - Buttons: [ Back to Dashboard ], [ Return to Previous Page ]
 * - Never expose internal permission keys or backend details.
 */
export default function ForbiddenPage({ onBackToDashboard, onPreviousPage }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center">
        {/* Department Security Badge */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-2xs">
          <ShieldAlert size={32} />
        </div>

        {/* Status Code Label */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-mono font-bold mb-3">
          <Lock size={12} className="text-slate-500" />
          <span>STATUS CODE: 403</span>
        </div>

        {/* Required Message */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Access Restricted
        </h1>

        {/* Required Supporting Text */}
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          You do not have permission to access this resource.
        </p>

        {/* Security Advisory note */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left mb-6 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <span>Security Policy</span>
          </p>
          <p className="text-[11px] text-slate-500 leading-normal">
            If you require authorization for this departmental module, contact your designated nodal administrator or MoSPI central desk.
          </p>
        </div>

        {/* Responsive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
          >
            <LayoutDashboard size={15} />
            <span>Back to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onPreviousPage || onBackToDashboard}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
          >
            <ArrowLeft size={15} />
            <span>Return to Previous Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
