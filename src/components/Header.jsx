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
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";
import { useApi } from "../context/ApiContext";
import { useAuth } from "../context/AuthContext";
import { hasPermission, PERMISSIONS } from "../lib/permissions";
import logoIcon from "../assets/logo-icon.png";

function Header({
  currentPage,
  onSelectPage,
  onToggleMobileMenu,
  searchQuery = "",
  setSearchQuery = () => { }
}) {
  const { alerts, selectedProject, setSelectedProjectId, clearAllAlerts, acknowledgeAlert } = useApi();
  const { currentUser, role, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const unresolvedAlerts = alerts.filter(
    (a) => a.status !== "Acknowledged" && a.status !== "Resolved"
  );

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Central Operations Dashboard";
      case "projects":
        return "Infrastructure Project Repository";
      case "analytics":
        return "Portfolio Analytics & Variance Analysis";
      case "ai":
        return "AI Risk Intelligence & Decision Support";
      case "alerts":
        return "Early Warning System (EWS) Console";
      case "reports":
        return "Official MoSPI Reports & Flash Briefings";
      case "users":
      case "approvals":
        return "User Access Control & Administration";
      case "details":
        return selectedProject
          ? `Project Dossier: ${selectedProject.id}`
          : "Project Details";
      case "403":
        return "Access Restricted (403)";
      case "404":
        return "Page Not Found (404)";
      default:
        return "Operations Control";
    }
  };

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ND";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#D9E0E7] px-4 sm:px-6 shadow-2xs">
      <div className="h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Trigger & Official Brand / Full Page Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {onToggleMobileMenu && (
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label="Open navigation sidebar"
              className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#172033] border border-[#D9E0E7] transition focus:outline-none focus:ring-2 focus:ring-[#0B75B8] cursor-pointer shrink-0"
            >
              <Menu size={18} />
            </button>
          )}

          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Official Logo Badge */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200/90 p-1 shadow-2xs flex items-center justify-center shrink-0">
              <img
                src={logoIcon}
                alt="InfraSight AI"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-tight truncate">
                {getPageTitle()}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-normal hidden sm:block truncate">
                InfraSight AI &bull; Infrastructure Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        {/* Right: Search, Notification Bell, User Badge, Logout */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Global Search Box */}
          <div className="relative hidden md:block">
            <Search
              size={13}
              className="absolute left-3 top-2.5 text-[#64748B] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search project ID, name, sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-60 pl-8 pr-8 py-1.5 bg-[#F5F7FA] border border-[#D9E0E7] rounded-lg text-xs font-medium text-[#172033] placeholder:text-[#64748B] outline-none focus:bg-white focus:border-[#0B75B8] focus:ring-1 focus:ring-[#0B75B8]/20 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-[#64748B] hover:text-[#172033] cursor-pointer"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Early Warning Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[#172033] hover:text-[#07133D] hover:bg-[#F5F7FA] rounded-lg border border-[#D9E0E7] transition cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {unresolvedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-[#C53030] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                  {unresolvedAlerts.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#D9E0E7] rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-3 bg-[#F5F7FA] border-b border-[#D9E0E7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TriangleAlert size={15} className="text-[#EA580C]" />
                    <span className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                      Active Early Warnings ({unresolvedAlerts.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {unresolvedAlerts.length > 0 && (
                      <button
                        onClick={clearAllAlerts}
                        className="text-[11px] text-[#0B75B8] hover:text-[#07133D] font-bold hover:underline cursor-pointer"
                        title="Dismiss all notifications"
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[#64748B] hover:text-[#172033] cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-[#D9E0E7]">
                  {unresolvedAlerts.length === 0 ? (
                    <div className="p-6 text-center text-[#64748B] text-xs">
                      <CheckCircle2 size={24} className="mx-auto text-[#16803C] mb-2" />
                      No critical early warning alerts at this time.
                    </div>
                  ) : (
                    unresolvedAlerts.slice(0, 6).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 hover:bg-slate-50 transition flex items-start justify-between gap-3 text-left"
                      >
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => {
                            if (alert.projectId) {
                              setSelectedProjectId(alert.projectId);
                              if (onSelectPage) onSelectPage("details");
                            } else {
                              if (onSelectPage) onSelectPage("alerts");
                            }
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                alert.severity === "Critical"
                                  ? "bg-rose-100 text-rose-800 border border-rose-200"
                                  : alert.severity === "High"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {alert.severity}
                            </span>
                            <span className="text-[10px] text-[#64748B]">
                              {alert.projectId || "System"}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#172033] line-clamp-1">
                            {alert.message}
                          </p>
                          <p className="text-[10px] text-[#64748B] mt-0.5">
                            {alert.timestamp || "Recent"}
                          </p>
                        </div>

                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-[10px] text-[#64748B] hover:text-[#172033] border border-[#D9E0E7] hover:bg-white rounded px-1.5 py-0.5 shrink-0 cursor-pointer"
                          title="Dismiss notification"
                        >
                          Dismiss
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 bg-[#F5F7FA] border-t border-[#D9E0E7] text-center">
                  <button
                    onClick={() => {
                      if (onSelectPage) onSelectPage("alerts");
                      setShowNotifications(false);
                    }}
                    className="text-xs font-bold text-[#0B75B8] hover:text-[#07133D] inline-flex items-center gap-1 cursor-pointer"
                  >
                    View All Warnings Console <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-[#D9E0E7]">
            <div
              className="w-8 h-8 rounded-lg bg-[#07133D] text-white flex items-center justify-center text-xs font-bold font-mono shadow-2xs shrink-0"
              title={`${currentUser?.name || "User"} (${role || "User"})`}
            >
              {userInitials}
            </div>

            <div className="hidden lg:flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#172033] truncate leading-tight">
                {currentUser?.name || "MoSPI Officer"}
              </span>
              <span className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider truncate">
                {role || "Viewer"}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          {logout && (
            <button
              type="button"
              onClick={logout}
              className="p-2 text-[#64748B] hover:text-[#C53030] hover:bg-rose-50 rounded-lg border border-[#D9E0E7] transition cursor-pointer shrink-0"
              title="Sign Out of Portal"
              aria-label="Sign Out"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;