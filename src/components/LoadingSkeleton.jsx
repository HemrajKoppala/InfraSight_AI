import React from "react";

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="w-full animate-pulse divide-y divide-slate-100">
      <div className="py-3.5 px-5 bg-slate-50 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded-md flex-1"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="py-4 px-5 flex items-center gap-4">
          <div className="h-4 bg-slate-200 rounded-md w-24"></div>
          <div className="h-4 bg-slate-200 rounded-md w-32"></div>
          <div className="h-4 bg-slate-200 rounded-md flex-1"></div>
          <div className="h-4 bg-slate-200 rounded-md w-20"></div>
          <div className="h-4 bg-slate-200 rounded-md w-20"></div>
          <div className="h-6 bg-slate-200 rounded-full w-16"></div>
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3 flex-1">
          <div className="h-3 bg-slate-200 rounded-md w-28"></div>
          <div className="h-7 bg-slate-200 rounded-md w-36"></div>
          <div className="h-3 bg-slate-200 rounded-md w-44"></div>
        </div>
        <div className="w-11 h-11 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = "h-64" }) {
  return (
    <div className={`w-full ${height} bg-slate-50/70 rounded-xl border border-slate-200/60 p-6 flex flex-col justify-between animate-pulse`}>
      <div className="flex justify-between">
        <div className="h-4 bg-slate-200 rounded-md w-40"></div>
        <div className="h-4 bg-slate-200 rounded-md w-20"></div>
      </div>
      <div className="flex items-end gap-4 h-36 pt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-200 rounded-t-md flex-1"
            style={{ height: `${Math.max(20, ((i * 19) % 80) + 20)}%` }}
          ></div>
        ))}
      </div>
      <div className="h-3 bg-slate-200 rounded-md w-full mt-3"></div>
    </div>
  );
}
