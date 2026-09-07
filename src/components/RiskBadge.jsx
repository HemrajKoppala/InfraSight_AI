import React from "react";

function RiskBadge({ risk, size = "normal" }) {
  let style = "bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-emerald-500/10";
  let dotColor = "bg-emerald-500";
  let label = "Low Risk";

  if (risk >= 80) {
    style = "bg-rose-50 text-rose-700 border-rose-200/80 shadow-rose-500/10";
    dotColor = "bg-rose-500 animate-pulse";
    label = "Critical";
  } else if (risk >= 65) {
    style = "bg-amber-50 text-amber-800 border-amber-200/80 shadow-amber-500/10";
    dotColor = "bg-amber-500";
    label = "High Risk";
  } else if (risk >= 40) {
    style = "bg-orange-50 text-orange-700 border-orange-200/80 shadow-orange-500/10";
    dotColor = "bg-orange-500";
    label = "Moderate";
  }

  const padding = size === "small" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border shadow-xs tracking-tight ${padding} ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      <span>{label}</span>
      <span className="opacity-70 font-mono font-medium">({risk}%)</span>
    </span>
  );
}

export default RiskBadge;