import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Brain,
  TriangleAlert,
  FileText,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  ExternalLink
} from "lucide-react";

function Sidebar({ currentPage, setCurrentPage, collapsed, setCollapsed }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
      badge: "Repo"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null
    },
    {
      id: "ai",
      label: "AI Intelligence",
      icon: Brain,
      badge: "ML"
    },
    {
      id: "alerts",
      label: "Early Warnings",
      icon: TriangleAlert,
      badge: "EWS"
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      badge: "PDF"
    }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-950 text-slate-300 border-r border-slate-800 z-40 transition-all duration-300 flex flex-col justify-between select-none ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Top Government Emblem & Brand Header */}
        <div className="p-4 border-b border-slate-800/90 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* MoSPI Emblem Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md shadow-orange-900/30">
              <Building2 size={20} />
            </div>

            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-bold text-white tracking-tight text-sm font-display truncate">
                    InfraSight <span className="text-blue-400 font-extrabold">AI</span>
                  </h1>
                </div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 truncate">
                  MoSPI Central Operations
                </p>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800 shrink-0"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Navigation Sidebar"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* National Tricolor Subtle Stripe */}
        <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-500 opacity-60"></div>

        {/* Navigation Category */}
        <div className="p-3">
          {!collapsed && (
            <div className="px-3 pt-2 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Central Operations
              </span>
            </div>
          )}

          {/* Menu Items */}
          <nav className="space-y-1 mt-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    <Icon
                      size={17}
                      className={`shrink-0 transition-transform ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                      }`}
                    />

                    {!collapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-900 text-slate-400 border border-slate-800 group-hover:text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Floating Tooltip in Collapsed View */}
                  {collapsed && (
                    <div className="fixed left-20 ml-2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md shadow-xl border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-slate-800 text-blue-400 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        {!collapsed ? (
          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px]">
                <ShieldCheck size={14} className="text-emerald-400" />
                OCMS AI Engine
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-emerald-400 font-mono">LIVE</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              MoSPI Infrastructure Predictive Analytics & Early Warning Matrix v2.8
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="OCMS AI Engine: Operational">
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={17} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;