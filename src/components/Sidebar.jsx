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
  Users,
  LogOut
} from "lucide-react";
import {
  Sidebar as SidebarContainer,
  SidebarBody,
  SidebarLink,
  useSidebar
} from "./ui/sidebar";
import { useApi } from "../context/ApiContext";
import { useAuth } from "../context/AuthContext";
import { hasPermission, PERMISSIONS } from "../lib/permissions";
import logoIcon from "../assets/logo-icon.png";

export function SidebarContent({
  currentPage,
  setCurrentPage,
}) {
  const { open, setOpen } = useSidebar();
  const { projects, alerts } = useApi();
  const { currentUser, role, logout } = useAuth();

  const unresolvedAlertsCount = alerts.filter(
    (a) => a.status !== "Acknowledged" && a.status !== "Resolved"
  ).length;

  // The 7 official navigation menu items matching user screenshot
  const allNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      permission: PERMISSIONS.DASHBOARD_VIEW,
      badge: null
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FolderKanban className="w-5 h-5" />,
      permission: PERMISSIONS.PROJECTS_VIEW,
      badge: projects?.length ? `${projects.length}` : null
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      permission: PERMISSIONS.ANALYTICS_VIEW,
      badge: null
    },
    {
      id: "ai",
      label: "AI Intelligence",
      icon: <Brain className="w-5 h-5" />,
      permission: PERMISSIONS.AI_VIEW,
      badge: "ML"
    },
    {
      id: "alerts",
      label: "Early Warnings",
      icon: <TriangleAlert className="w-5 h-5" />,
      permission: PERMISSIONS.ALERTS_VIEW,
      badge: unresolvedAlertsCount > 0 ? `${unresolvedAlertsCount}` : null
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText className="w-5 h-5" />,
      permission: PERMISSIONS.REPORTS_VIEW,
      badge: "PDF"
    },
    {
      id: "users",
      label: "User Access Control",
      icon: <Users className="w-5 h-5" />,
      permission: PERMISSIONS.USERS_VIEW,
      badge: "ADMIN"
    },
  ];

  // RBAC filter
  const menuItems = allNavItems.filter((item) =>
    hasPermission(role, item.permission)
  );

  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ND";

  return (
    <div className="flex flex-col justify-between h-full w-full bg-white text-slate-800">
      {/* Top Branding & Navigation */}
      <div className="flex flex-col w-full">
        {/* Header / Branding */}
        <div className="h-16 px-3 border-b border-[#D9E0E7] flex items-center justify-between w-full">
          {open ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 p-1 flex items-center justify-center shadow-2xs shrink-0">
                  <img
                    src={logoIcon}
                    alt="InfraSight AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden animate-in fade-in duration-200">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[#07133D] tracking-tight text-sm font-display truncate">
                      InfraSight <span className="text-[#0B75B8]">AI</span>
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-blue-50 text-[#07133D] rounded border border-blue-200">
                      MoSPI
                    </span>
                  </div>
                  <p className="text-[10px] tracking-tight font-medium text-[#64748B] truncate">
                    Infrastructure Intelligence Platform
                  </p>
                </div>
              </div>

              {/* Desktop Collapse Toggle Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition border border-[#D9E0E7] shrink-0 hidden md:flex cursor-pointer"
                title="Collapse Sidebar"
                aria-label="Collapse Navigation Sidebar"
              >
                <ChevronLeft size={15} />
              </button>
            </div>
          ) : (
            /* Collapsed Brand Icon & Dedicated Expand Button */
            <div className="flex flex-col items-center justify-center w-full py-1 gap-1">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 p-1 flex items-center justify-center shadow-2xs hover:border-blue-500 hover:ring-2 hover:ring-blue-100 transition cursor-pointer"
                title="InfraSight AI - Click to expand"
                aria-label="InfraSight AI"
              >
                <img
                  src={logoIcon}
                  alt="InfraSight AI"
                  className="w-full h-full object-contain"
                />
              </button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-7 h-4 rounded-md bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition border border-slate-200 flex items-center justify-center cursor-pointer shadow-2xs"
                title="Expand Navigation Sidebar"
                aria-label="Expand Sidebar"
              >
                <ChevronRight size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* Subtle Accent Line */}
        <div className="h-[2px] w-full bg-[#0B75B8]/30"></div>

        {/* Category Label (when expanded) */}
        {open && (
          <div className="px-4 pt-3.5 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
              OPERATIONS MENU
            </span>
          </div>
        )}

        {/* Dynamic Navigation Menu Items */}
        <nav className="p-2 space-y-1 w-full" aria-label="Main Navigation">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <SidebarLink
                key={item.id}
                isActive={isActive}
                link={{
                  label: item.label,
                  href: "#",
                  icon: item.icon,
                  badge: item.badge
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
              />
            );
          })}
        </nav>
      </div>

      {/* User Section & Logout at Bottom */}
      <div className="p-2 border-t border-[#D9E0E7] bg-white">
        {open ? (
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F7FA] border border-[#D9E0E7]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#07133D] text-white flex items-center justify-center text-xs font-bold font-mono shrink-0 shadow-2xs">
                {userInitials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#172033] truncate">
                  {currentUser?.name || "MoSPI Officer"}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider truncate">
                    {role || "Viewer"}
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            {logout && (
              <button
                type="button"
                onClick={logout}
                className="p-1.5 text-[#64748B] hover:text-[#C53030] hover:bg-rose-50 rounded-lg transition border border-transparent hover:border-rose-200 cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        ) : (
          /* Collapsed User Avatar */
          <div className="flex flex-col items-center gap-2 py-1">
            <div
              className="w-9 h-9 rounded-lg bg-[#07133D] text-white flex items-center justify-center text-xs font-bold font-mono shadow-2xs"
              title={`${currentUser?.name || "User"} (${role || "User"})`}
            >
              {userInitials}
            </div>

            {logout && (
              <button
                type="button"
                onClick={logout}
                className="p-1.5 text-[#64748B] hover:text-[#C53030] hover:bg-rose-50 rounded-lg transition cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({
  currentPage,
  setCurrentPage,
  collapsed = false,
  setCollapsed = () => {},
  children
}) {
  return (
    <SidebarContainer
      open={!collapsed}
      setOpen={(val) => {
        if (typeof val === "function") {
          setCollapsed((prev) => !val(!prev));
        } else {
          setCollapsed(!val);
        }
      }}
      animate={true}
    >
      <SidebarBody className="justify-between gap-6 border-r border-[#D9E0E7] bg-white">
        <SidebarContent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </SidebarBody>
      {children}
    </SidebarContainer>
  );
}