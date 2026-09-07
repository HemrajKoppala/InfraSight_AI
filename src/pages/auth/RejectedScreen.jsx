import React from "react";
import { XCircle, ArrowLeft, ShieldX, HelpCircle } from "lucide-react";
import FlowButton from "../../components/FlowButton";

export function RejectedScreen({ user, onBackToLogin }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Tricolor Bar */}
      <div className="h-[3px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 w-full" />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 text-center space-y-6">
          {/* Rejected Icon */}
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <XCircle size={32} />
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 inline-block mb-2">
              Status: Access Denied
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Access Not Approved
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Your account request has not been approved by the Main Administrator.
            </p>
          </div>

          {/* User Request Summary */}
          {user && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 font-medium">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Applicant:</span>
                <span className="text-slate-900 font-bold">{user.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Official Email:</span>
                <span className="font-mono text-slate-800">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Decision Note:</span>
                <span className="text-rose-700 font-semibold truncate max-w-[200px] text-right">
                  {user.rejectedReason || "Clearance criteria unfulfilled."}
                </span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-left text-xs text-slate-600 leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-slate-800">
              <HelpCircle size={15} />
              Need clarification?
            </p>
            <p>
              If you believe this is an error, please contact your ministry's Nodal Officer or the MoSPI Central System Administrator desk.
            </p>
          </div>

          <div className="pt-2">
            <FlowButton
              onClick={onBackToLogin}
              variant="secondary"
              size="lg"
              className="w-full justify-center text-sm font-semibold"
            >
              Back to Login
            </FlowButton>
          </div>
        </div>
      </div>

      <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 text-center">
        Government of India • Ministry of Statistics and Programme Implementation (MoSPI)
      </footer>
    </div>
  );
}

export default RejectedScreen;
