import React from "react";
import { Clock, ShieldAlert, ArrowLeft, Building2, Mail, CheckCircle2 } from "lucide-react";
import FlowButton from "../../components/FlowButton";

export function PendingScreen({ user, onBackToLogin }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Tricolor Bar */}
      <div className="h-[3px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 w-full" />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 text-center space-y-6">
          {/* Animated Clock / Status Icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Clock size={32} className="animate-pulse" />
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 inline-block mb-2">
              Status: Pending Review
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Access Pending Approval
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Your <strong>InfraSight AI</strong> account has been submitted for administrator review.
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
                <span className="text-slate-500">Department:</span>
                <span className="text-slate-900 truncate max-w-[200px] text-right">
                  {user.department || "Government Department"}
                </span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-left text-xs text-blue-900 leading-relaxed space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-blue-800">
              <CheckCircle2 size={15} />
              What happens next?
            </p>
            <p className="text-slate-600">
              The Main Administrator will inspect your official departmental credentials and approve your clearance. Once approved, you can immediately log in with your email and password.
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

export default PendingScreen;
