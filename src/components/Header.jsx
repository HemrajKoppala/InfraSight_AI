import React, { useState } from "react";
import {
  Search,
  Bell,
  ExternalLink,
  ShieldCheck,
  TriangleAlert,
  X,
  ArrowUpRight,
  ChevronRight,
  Calendar,
  Clock
} from "lucide-react";
import ApiStatusBadge from "./ApiStatusBadge";
import { useApi } from "../context/ApiContext";

function Header({
  currentPage,
  onReturnToLanding,
  onSelectPage,
  searchQuery = "",
  setSearchQuery = () => {}
}) {
  const { alerts, projects, selectedProject, setSelectedProjectId } = useApi();
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
        return "AI Risk Intelligence & Monte Carlo Engine";
      case "alerts":
        return "Early Warning System (EWS) Console";
      case "reports":
        return "Official MoSPI Reporting & Flash Briefings";
      case "details":
        return selectedProject
          ? `Project Dossier: ${selectedProject.id}`
          : "Project Details";
      default:
        return "Operations Control";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Ministry Identity & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div>
          {/* Breadcrumb path */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="uppercase tracking-wider text-slate-600 font-bold">MoSPI</span>
            <ChevronRight size={11} className="text-slate-400" />
            <span className="text-slate-500">Central Operations</span>
            <ChevronRight size={11} className="text-slate-400" />
            <span className="text-blue-700 font-bold">{getPageTitle()}</span>
          </div>

          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <span>{getPageTitle()}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded font-mono">
              OCMS-GOV
            </span>
          </h2>
        </div>
      </div>

      {/* Right: Search, Date/Time, Live Status, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Global Search Box */}
        <div className="relative hidden lg:block">
          <Search
            size={14}
            className="absolute left-3 top-2.5 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search projects, IDs, ministries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-8 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Real-time Backend Connection Status Badge */}
        <ApiStatusBadge />

        <div className="h-4 w-px bg-slate-200" />

        {/* Date & Location Stamp */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
          <Calendar size={12} className="text-slate-400" />
          <span>07 Sep 2026</span>
          <span className="text-slate-300">|</span>
          <span>New Delhi (IST)</span>
        </div>

        {/* Early Warning Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            title="Early Warning Notifications"
            aria-label="Early Warning Notifications"
          >
            <Bell size={16} />
            {unresolvedAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                {unresolvedAlerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TriangleAlert size={15} className="text-rose-600" />
                  <h4 className="font-bold text-xs text-slate-800">
                    Active Early Warnings ({unresolvedAlerts.length})
                  </h4>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                {unresolvedAlerts.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No active critical warnings reported by AI engine.
                  </div>
                ) : (
                  unresolvedAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setShowNotifications(false);
                        setSelectedProjectId(alert.projectId);
                        if (onSelectPage) onSelectPage("details");
                      }}
                      className="p-3.5 hover:bg-slate-50 transition cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          {alert.severity}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">{alert.timestamp}</span>
                      </div>
                      <p className="font-bold text-slate-800 group-hover:text-blue-600 transition leading-snug">
                        {alert.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {alert.description}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    if (onSelectPage) onSelectPage("alerts");
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 mx-auto"
                >
                  <span>Open Early Warnings Console</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Return to Public Portal Button */}
        {onReturnToLanding && (
          <button
            onClick={onReturnToLanding}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-lg transition"
            title="Switch to Citizen Public Portal"
          >
            <span>Public Portal</span>
            <ExternalLink size={12} />
          </button>
        )}

        {/* Nodal Officer Profile Area */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            ND
          </div>
          <div className="hidden md:block text-left leading-tight">
            <p className="text-xs font-bold text-slate-800">
              Nodal Officer
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              MoSPI Desk
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;