import React, { useState } from "react";
import {
  Search,
  Bell,
  TriangleAlert,
  X,
  ArrowUpRight,
  Menu,
  LogOut,
  User,
  Shield,
  CheckCircle2
} from "lucide-react";
import { useApi } from "../context/ApiContext";
import { useAuth } from "../context/AuthContext";
import logoIcon from "../assets/logo-icon.png";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "ai", label: "Risk Intelligence" },
  { id: "alerts", label: "Alerts" },
  { id: "map", label: "Map" },
  { id: "datastatus", label: "Data Status" },
];

function Header({
  currentPage,
  onSelectPage,
  onToggleMobileMenu,
  searchQuery = "",
  setSearchQuery = () => {},
}) {
  const { alerts, setSelectedProjectId, clearAllAlerts, acknowledgeAlert } = useApi();
  const { currentUser, role, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const unresolvedAlerts = alerts.filter(
    (a) => a.status !== "Acknowledged" && a.status !== "Resolved"
  );

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "GO";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top Ministry & Platform Identity Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {onToggleMobileMenu && (
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label="Open menu"
              className="md:hidden p-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
            >
              <Menu size={18} />
            </button>
          )}

          {/* Official MoSPI Emblem & Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xs bg-slate-50 border border-slate-200 p-0.5 flex items-center justify-center shrink-0">
              <img src={logoIcon} alt="Emblem" className="w-full h-full object-contain" />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="text-[11px] font-semibold text-slate-500 truncate">
                Government of India &bull; Ministry of Statistics and Programme Implementation &bull; Infrastructure & Project Monitoring Division
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  InfraSight AI
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-blue-700 font-medium">
                  Project Intelligence & Early Warning
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Tools: Search, Alert Bell, User Profile, Logout */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative hidden lg:block">
            <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 pl-7 pr-7 py-1 bg-slate-50 border border-slate-200 rounded-xs text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-700"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-xs border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
              title="Active Early Warning Notifications"
            >
              <Bell size={15} />
              {unresolvedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {unresolvedAlerts.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-300 rounded-xs shadow-lg z-50 overflow-hidden text-xs">
                <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <TriangleAlert size={14} className="text-amber-600" />
                    Early Warnings ({unresolvedAlerts.length})
                  </span>
                  <div className="flex items-center gap-2">
                    {unresolvedAlerts.length > 0 && (
                      <button
                        onClick={clearAllAlerts}
                        className="text-[11px] text-blue-700 hover:underline font-semibold"
                      >
                        Dismiss All
                      </button>
                    )}
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-700">
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {unresolvedAlerts.length === 0 ? (
                    <div className="p-4 text-center text-slate-500">
                      <CheckCircle2 size={20} className="mx-auto text-emerald-600 mb-1" />
                      No critical early warning alerts at this time.
                    </div>
                  ) : (
                    unresolvedAlerts.slice(0, 5).map((a) => (
                      <div key={a.id} className="p-2.5 hover:bg-slate-50 flex items-start justify-between gap-2">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            if (a.projectId) {
                              setSelectedProjectId(a.projectId);
                              if (onSelectPage) onSelectPage("details");
                            } else if (onSelectPage) {
                              onSelectPage("alerts");
                            }
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className={`text-[9px] font-bold px-1 py-0.2 rounded uppercase ${
                                a.severity === "Critical"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {a.severity}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{a.projectId}</span>
                          </div>
                          <p className="font-semibold text-slate-800 line-clamp-1">{a.message}</p>
                        </div>
                        <button
                          onClick={() => acknowledgeAlert(a.id)}
                          className="text-[10px] text-slate-500 hover:text-slate-900 border border-slate-200 rounded px-1.5 py-0.5 shrink-0"
                        >
                          Dismiss
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      if (onSelectPage) onSelectPage("alerts");
                      setShowNotifications(false);
                    }}
                    className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View All Warnings Console</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-xs bg-[#0b2240] text-white flex items-center justify-center text-[11px] font-bold font-mono">
              {userInitials}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.name || "MoSPI Officer"}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-mono">{role || "Officer"}</span>
            </div>
          </div>

          {/* Logout */}
          {logout && (
            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-xs border border-slate-200 transition"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Primary Navigation Row: Dashboard | Projects | Risk Intelligence | Alerts | Map | Data Status */}
      <div className="px-4 sm:px-6 bg-slate-50/90 flex items-center justify-between overflow-x-auto no-scrollbar text-xs">
        <nav className="flex items-center gap-1 sm:gap-2 py-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === "projects" && currentPage === "details");

            return (
              <button
                key={item.id}
                onClick={() => onSelectPage && onSelectPage(item.id)}
                className={`px-3 py-1.5 font-semibold text-xs rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#0b2240] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 font-mono shrink-0">
          <span>Review Cycle: July 2026</span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-semibold">&bull; Central Registry Live</span>
        </div>
      </div>
    </header>
  );
}

export default Header;