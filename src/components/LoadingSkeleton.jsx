import React from "react";

/**
 * Skeleton component matching 21st.dev skeleton-16:
 * Sidebar Nav Skeleton: A loading placeholder for sidebar navigation with logo header,
 * icon+label rows, and a user profile at the bottom.
 */
export function SidebarNavSkeleton({ open = true }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 bg-white animate-pulse">
      {/* Top Header Branding Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0"></div>
          {open && (
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 bg-slate-200 rounded-md w-24"></div>
              <div className="h-2 bg-slate-100 rounded-md w-16"></div>
            </div>
          )}
        </div>

        {/* Nav Rows Skeleton */}
        <div className="space-y-1.5 pt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                i === 0 ? "bg-slate-100" : ""
              }`}
            >
              <div className="w-5 h-5 rounded-lg bg-slate-200 shrink-0"></div>
              {open && (
                <div className="flex items-center justify-between flex-1">
                  <div className="h-3 bg-slate-200 rounded-md w-24"></div>
                  {i % 2 === 0 && (
                    <div className="h-4 w-6 bg-slate-100 rounded-md"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile Skeleton */}
      <div className="p-2 border-t border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-200 shrink-0"></div>
        {open && (
          <div className="space-y-1.5 flex-1">
            <div className="h-3 bg-slate-200 rounded-md w-20"></div>
            <div className="h-2 bg-slate-100 rounded-md w-14"></div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Skeleton component matching 21st.dev v-skeleton-8:
 * Sidebar Dashboard Skeleton: Mirrors a complete dashboard layout with a nav rail,
 * header actions, stat cards, analytics chart, and list rows.
 */
export function SidebarDashboardSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header bar skeleton with logo badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0"></div>
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 rounded-md w-48 sm:w-64"></div>
            <div className="h-3 bg-slate-100 rounded-md w-36 sm:w-80"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-slate-200 rounded-lg w-20"></div>
          <div className="h-8 bg-slate-200 rounded-lg w-28"></div>
        </div>
      </div>

      {/* Stat Cards Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 bg-slate-200 rounded-md w-24"></div>
              <div className="w-8 h-8 rounded-xl bg-slate-100"></div>
            </div>
            <div className="h-7 bg-slate-200 rounded-md w-32"></div>
            <div className="flex items-center gap-2">
              <div className="h-3 bg-slate-100 rounded-md w-16"></div>
              <div className="h-3 bg-slate-100 rounded-md w-24"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & List Rows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (2 cols) */}
        <div className="lg:col-span-2 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 rounded-md w-40"></div>
            <div className="h-4 bg-slate-100 rounded-md w-20"></div>
          </div>
          <div className="h-64 bg-slate-50 rounded-xl flex items-end gap-3 p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-200 rounded-t-lg flex-1"
                style={{ height: `${[40, 75, 55, 90, 65, 80, 50][i]}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Side List Rows (1 col) */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 rounded-md w-32"></div>
            <div className="h-3 bg-slate-100 rounded-md w-12"></div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3.5 bg-slate-200 rounded-md w-28"></div>
                  <div className="h-3.5 w-12 bg-slate-200 rounded-md"></div>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-md w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Table Rows */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded-md w-36"></div>
          <div className="h-8 bg-slate-100 rounded-lg w-48"></div>
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0"></div>
                <div className="space-y-1.5">
                  <div className="h-3 bg-slate-200 rounded-md w-36 sm:w-48"></div>
                  <div className="h-2.5 bg-slate-100 rounded-md w-24"></div>
                </div>
              </div>
              <div className="hidden sm:block h-3 bg-slate-200 rounded-md w-20"></div>
              <div className="h-5 bg-slate-100 rounded-full w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
