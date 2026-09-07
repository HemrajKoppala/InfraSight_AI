import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  KeyRound
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import FlowButton from "../../components/FlowButton";

export function LoginPage({ onNavigateRegister, onShowPending, onShowRejected, onReturnLanding }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Quick fill helper for demo credentials
  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both your official email and password.");
      return;
    }

    setIsLoading(true);

    // Simulate brief secure verification delay
    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);

      if (!result.success) {
        if (result.status === "pending") {
          onShowPending(result.user);
        } else if (result.status === "rejected") {
          onShowRejected(result.user);
        } else {
          setErrorMessage(result.error);
        }
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Tricolor Government Stripe */}
      <div className="h-[3px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 w-full" />

      {/* Main Login Workspace */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden grid lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Brand & Security Verification (Light Navy/Blue Surface) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background cyber ambient lines */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Official Logo Banner */}
              <div className="inline-flex items-center gap-3 bg-white p-2 rounded-xl shadow-md border border-white/20">
                <img
                  src="/logo-icon.png"
                  alt="InfraSight AI"
                  className="h-9 w-auto object-contain"
                />
                <div className="pr-3 text-left">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight font-display">
                      InfraSight
                    </span>
                    <span className="font-extrabold text-cyan-600 text-sm font-display">
                      AI
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">
                    Central Operations
                  </span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  National Infrastructure Monitoring Framework
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                  Predictive cost-escalation and schedule slippage analytics for central sector mega-projects costing ₹150 Cr and above.
                </p>
              </div>

              {/* Security Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
                  <span>MoSPI OCMS Data Standard v2.8.4</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <Building2 size={16} className="text-blue-400 shrink-0" />
                  <span>Cabinet Secretariat Monitoring Compliance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <KeyRound size={16} className="text-emerald-400 shrink-0" />
                  <span>Role-Based Multi-Tier Clearance Protocol</span>
                </div>
              </div>
            </div>

            {/* Bottom Prototype Notice */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Prototype Security Node</span>
              <span className="font-mono text-cyan-300">DEMO-AUTH-STUB</span>
            </div>
          </div>

          {/* Right Column: Sign In Form & Demo Credentials (Clean Light Surface) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Authorized Sign In
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your authorized credentials to access the operations workspace.
                  </p>
                </div>

                {onReturnLanding && (
                  <button
                    onClick={onReturnLanding}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline transition cursor-pointer"
                  >
                    Public Portal
                  </button>
                )}
              </div>

              {/* Demo Credentials Quick-Fill Cards */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-blue-600" />
                    Quick Demo Credentials (Click to fill)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                    1-Click Auto Fill
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  {/* Admin Auto-fill Button */}
                  <button
                    type="button"
                    onClick={() => fillDemo("admin@infrasight.ai", "Admin@123")}
                    className="p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-left transition cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                        Main Administrator
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                        Admin
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      admin@infrasight.ai
                    </span>
                  </button>

                  {/* User Auto-fill Button */}
                  <button
                    type="button"
                    onClick={() => fillDemo("user@infrasight.ai", "User@123")}
                    className="p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-left transition cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                        Nodal Officer
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-semibold">
                        User
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      user@infrasight.ai
                    </span>
                  </button>
                </div>
              </div>

              {/* Error Message Banner */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-xs text-rose-700 animate-in fade-in duration-200">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Official Email ID
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-3 text-slate-400 pointer-events-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="e.g. officer@infrasight.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Access Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-3 text-slate-400 pointer-events-none"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your security password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Sign In Submit Button using FlowButton with generous sizing */}
                <div className="pt-2">
                  <FlowButton
                    type="submit"
                    variant="solid"
                    size="lg"
                    disabled={isLoading}
                    className="w-full shadow-md justify-center"
                  >
                    {isLoading ? "Verifying Credentials..." : "Sign In to Operations"}
                  </FlowButton>
                </div>
              </form>
            </div>

            {/* Bottom Register Switch */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                <span>New departmental officer? </span>
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition cursor-pointer"
                >
                  Request Official Clearance
                </button>
              </div>

              <span className="font-mono text-[10px] text-slate-400">
                MoSPI OCMS Secure Node
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Official MoSPI Operations Footer */}
      <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">InfraSight AI</span>
          <span className="text-slate-300">|</span>
          <span>Ministry of Statistics and Programme Implementation (MoSPI)</span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          Strictly for authorized government project monitoring use
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
