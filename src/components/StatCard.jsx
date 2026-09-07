import React from "react";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  type = "normal",
  trend,
  trendType = "neutral"
}) {
  const colorConfigs = {
    normal: {
      border: "border-slate-200/80 hover:border-blue-400",
      iconBg: "bg-blue-50 text-blue-600 ring-4 ring-blue-50/50",
      accent: "from-blue-600/10 to-transparent",
      valueColor: "text-slate-900"
    },
    warning: {
      border: "border-amber-200/80 hover:border-amber-400",
      iconBg: "bg-amber-50 text-amber-600 ring-4 ring-amber-50/50",
      accent: "from-amber-600/10 to-transparent",
      valueColor: "text-amber-950"
    },
    danger: {
      border: "border-rose-200/80 hover:border-rose-400",
      iconBg: "bg-rose-50 text-rose-600 ring-4 ring-rose-50/50",
      accent: "from-rose-600/10 to-transparent",
      valueColor: "text-rose-950"
    },
    success: {
      border: "border-emerald-200/80 hover:border-emerald-400",
      iconBg: "bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/50",
      accent: "from-emerald-600/10 to-transparent",
      valueColor: "text-emerald-950"
    },
    purple: {
      border: "border-purple-200/80 hover:border-purple-400",
      iconBg: "bg-purple-50 text-purple-600 ring-4 ring-purple-50/50",
      accent: "from-purple-600/10 to-transparent",
      valueColor: "text-purple-950"
    }
  };

  const config = colorConfigs[type] || colorConfigs.normal;

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl border ${config.border} p-5 shadow-sm hover:shadow-md transition-all duration-300 group`}
    >
      {/* Top subtle gradient highlight */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${config.accent} group-hover:h-1.5 transition-all duration-300`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h3
            className={`text-2xl font-bold tracking-tight font-display mt-2 ${config.valueColor}`}
          >
            {value}
          </h3>

          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${
                  trendType === "danger"
                    ? "bg-rose-50 text-rose-700"
                    : trendType === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {trend}
              </span>
            )}
            <p className="text-xs text-slate-500 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className={`p-3 rounded-xl ${config.iconBg} transition-transform duration-300 group-hover:scale-110 shrink-0`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;