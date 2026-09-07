import React, { useState } from "react";
import {
  ShieldAlert,
  User,
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileCheck2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import FlowButton from "../../components/FlowButton";

export function RegisterPage({ onNavigateLogin, onRegistrationSuccess }) {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all required registration fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters in length.");
      return;
    }

    if (!agreed) {
      setErrorMessage("You must acknowledge the MoSPI OCMS Data Governance Protocol.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = register({ name, email, department, password });
      setIsLoading(false);

      if (res.success) {
        onRegistrationSuccess(res.user);
      } else {
        setErrorMessage(res.error);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Tricolor Strip */}
      <div className="h-[3px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 w-full" />

      {/* Register Frame */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                <FileCheck2 size={14} />
                <span>MoSPI Access Request Clearance</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Request Departmental Access
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                All account requests require security clearance by the Main Administrator before access is activated.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateLogin}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft size={15} />
              <span>Back to Sign In</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-xs text-rose-700 animate-in fade-in duration-200">
              <AlertCircle size={16} className="shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Venkat Raman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                  />
                </div>
              </div>

              {/* Official Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Official Email ID *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. venkat.s@morth.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Department / Ministry */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nodal Ministry / Department / Organization *
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ministry of Road Transport & Highways (NHAI Division)"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Protocol Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span>
                  I understand that registering an account submits a formal clearance request to the Main Administrator. I acknowledge compliance with the <strong>MoSPI OCMS Data Confidentiality Guidelines</strong>.
                </span>
              </label>
            </div>

            {/* Submit FlowButton with generous sizing */}
            <div className="pt-3">
              <FlowButton
                type="submit"
                variant="solid"
                size="lg"
                disabled={isLoading}
                className="w-full shadow-md justify-center"
              >
                {isLoading ? "Submitting Security Clearance..." : "Submit Access Request"}
              </FlowButton>
            </div>
          </form>

          {/* Notice */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Already have authorized access?</span>
            <button
              type="button"
              onClick={onNavigateLogin}
              className="font-bold text-blue-700 hover:underline cursor-pointer"
            >
              Sign In with existing account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 text-center">
        Government of India • Ministry of Statistics and Programme Implementation (MoSPI)
      </footer>
    </div>
  );
}

export default RegisterPage;
