import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toast({ message, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />,
    error: <AlertCircle size={18} className="text-rose-600 shrink-0" />,
    info: <Info size={18} className="text-blue-600 shrink-0" />
  };

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    error: "bg-rose-50 border-rose-200 text-rose-900",
    info: "bg-blue-50 border-blue-200 text-blue-900"
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white border rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md">
      <div className={`p-1 rounded-lg border ${styles[type]}`}>
        {icons[type]}
      </div>
      <p className="text-xs font-semibold text-slate-800 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;
