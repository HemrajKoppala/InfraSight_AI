import React, { useState, useEffect, useCallback } from "react";
import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import RiskAnalysis from "./pages/RiskAnalysis";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import ProjectDetails from "./pages/ProjectDetails";
import MapPage from "./pages/MapPage";
import DataStatus from "./pages/DataStatus";
import ModelPerformance from "./pages/ModelPerformance";
import UserManagement from "./pages/admin/UserManagement";
import ForbiddenPage from "./pages/ForbiddenPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PendingScreen from "./pages/auth/PendingScreen";
import RejectedScreen from "./pages/auth/RejectedScreen";
import Toast from "./components/Toast";
import { useApi } from "./context/ApiContext";
import { useAuth } from "./context/AuthContext";
import { hasPermission, PAGE_PERMISSIONS } from "./lib/permissions";

const VALID_PAGES = [
  "dashboard",
  "projects",
  "analytics",
  "ai",
  "alerts",
  "map",
  "datastatus",
  "models",
  "reports",
  "details",
  "users",
  "403",
  "404",
];

const VALID_AUTH_ROUTES = [
  "landing",
  "login",
  "register",
  "pending",
  "rejected",
  "",
];

function parseUrlRoute() {
  if (typeof window === "undefined") return "";

  // 1. Check hash first: e.g. #sd, #/sd, #dashboard
  const rawHash = window.location.hash || "";
  const cleanedHash = rawHash.replace(/^#\/?/, "").trim().toLowerCase();
  if (cleanedHash) {
    return cleanedHash;
  }

  // 2. Check pathname: e.g. /sd, /dashboard
  const rawPath = window.location.pathname || "";
  const cleanedPath = rawPath.replace(/^\/+/, "").replace(/\/+$/, "").trim().toLowerCase();
  if (cleanedPath && cleanedPath !== "index.html") {
    return cleanedPath;
  }

  return "";
}

function App() {
  const { isAuthenticated, currentUser, role, logout } = useAuth();
  const { toast, hideToast } = useApi();

  const initialRoute = parseUrlRoute();

  // Navigation within workspace
  const [currentPage, setCurrentPageState] = useState(() => {
    if (!initialRoute || initialRoute === "landing" || initialRoute === "login") {
      return "dashboard";
    }
    if (VALID_PAGES.includes(initialRoute)) {
      return initialRoute;
    }
    return "404";
  });

  const [collapsed, setCollapsed] = useState(false);

  // Unauthenticated screen state: "login" | "register" | "pending" | "rejected" | "landing" | "404"
  const [authScreen, setAuthScreenState] = useState(() => {
    if (!initialRoute || initialRoute === "landing") return "landing";
    if (["login", "register", "pending", "rejected"].includes(initialRoute)) {
      return initialRoute;
    }
    if (!VALID_PAGES.includes(initialRoute) && !VALID_AUTH_ROUTES.includes(initialRoute)) {
      return "404";
    }
    return "landing";
  });

  const [authTargetUser, setAuthTargetUser] = useState(null);

  const setCurrentPage = useCallback((pageId) => {
    setCurrentPageState(pageId);
    if (typeof window !== "undefined") {
      window.location.hash = `#${pageId}`;
    }
  }, []);

  const setAuthScreen = useCallback((screenId) => {
    setAuthScreenState(screenId);
    if (typeof window !== "undefined") {
      window.location.hash = `#${screenId}`;
    }
  }, []);

  // Listen to browser URL changes (hashchange & popstate)
  useEffect(() => {
    const handleUrlChange = () => {
      const route = parseUrlRoute();

      if (isAuthenticated) {
        if (!route || route === "landing" || route === "login") {
          setCurrentPageState("dashboard");
        } else if (VALID_PAGES.includes(route)) {
          setCurrentPageState(route);
        } else {
          setCurrentPageState("404");
        }
      } else {
        if (!route || route === "landing") {
          setAuthScreenState("landing");
        } else if (["login", "register", "pending", "rejected"].includes(route)) {
          setAuthScreenState(route);
        } else {
          setAuthScreenState("404");
        }
      }
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [isAuthenticated]);

  // =========================================================================
  // UNAUTHENTICATED EXPERIENCE: Access strictly gated behind approved login.
  // Neither Sidebar, Header, nor Protected Modules can be rendered.
  // =========================================================================
  if (!isAuthenticated) {
    // 0. Invalid Route when unauthenticated: 404 Not Found Page
    if (authScreen === "404") {
      return (
        <NotFoundPage
          onNavigateDashboard={() => setAuthScreen("login")}
          onNavigatePrevious={() => setAuthScreen("landing")}
        />
      );
    }

    // 1. Citizen Public Landing Portal
    if (authScreen === "landing") {
      return (
        <LandingPage
          onEnter={() => setAuthScreen("login")}
        />
      );
    }

    // 2. Departmental Registration Page
    if (authScreen === "register") {
      return (
        <RegisterPage
          onNavigateLogin={() => setAuthScreen("login")}
          onRegistrationSuccess={(newUser) => {
            setAuthTargetUser(newUser);
            setAuthScreen("pending");
          }}
        />
      );
    }

    // 3. Pending Administrator Clearance Screen
    if (authScreen === "pending") {
      return (
        <PendingScreen
          user={authTargetUser}
          onBackToLogin={() => setAuthScreen("login")}
        />
      );
    }

    // 4. Access Denied / Rejected Screen
    if (authScreen === "rejected") {
      return (
        <RejectedScreen
          user={authTargetUser}
          onBackToLogin={() => setAuthScreen("login")}
        />
      );
    }

    // 5. Default: Enterprise Light Mode Login Page
    return (
      <LoginPage
        onNavigateRegister={() => setAuthScreen("register")}
        onShowPending={(user) => {
          setAuthTargetUser(user);
          setAuthScreen("pending");
        }}
        onShowRejected={(user) => {
          setAuthTargetUser(user);
          setAuthScreen("rejected");
        }}
        onReturnLanding={() => setAuthScreen("landing")}
      />
    );
  }

  // =========================================================================
  // AUTHENTICATED & APPROVED: Central Operations Workspace (100% Light Mode)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* National Tricolor Accent Bar */}
      <div className="h-[2px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 fixed top-0 left-0 right-0 z-50"></div>

      {/* Global Navigation Sidebar (Light Mode) */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Operations Frame */}
      <div
        className={`flex-1 flex flex-col transition-[margin] duration-250 ease-in-out min-w-0 ${
          collapsed ? "md:ml-16" : "md:ml-[268px]"
        }`}
      >
        {/* Clean Application Header (Clutter removed) */}
        <Header
          currentPage={currentPage}
          onSelectPage={setCurrentPage}
          onToggleMobileMenu={() => setCollapsed(false)}
        />

        {/* Primary Protected Page Router with RBAC Guard (403 Forbidden & 404 Fallback) */}
        <main className="flex-1 pb-12">
          {(() => {
            const requiredPermission = PAGE_PERMISSIONS[currentPage];
            const isAuthorized = requiredPermission
              ? hasPermission(role, requiredPermission)
              : true;

            // Route Protection: unauthorized access renders 403 Forbidden
            if (!isAuthorized) {
              return (
                <ForbiddenPage
                  onBackToDashboard={() => setCurrentPage("dashboard")}
                  onPreviousPage={() => setCurrentPage("dashboard")}
                />
              );
            }

            switch (currentPage) {
              case "dashboard":
                return <Dashboard setCurrentPage={setCurrentPage} />;
              case "projects":
                return <Projects setCurrentPage={setCurrentPage} />;
              case "analytics":
                return <Analytics setCurrentPage={setCurrentPage} />;
              case "ai":
                return <RiskAnalysis setCurrentPage={setCurrentPage} />;
              case "alerts":
                return <Alerts setCurrentPage={setCurrentPage} />;
              case "map":
                return (
                  <MapPage
                    onNavigateDetails={(id) => {
                      setCurrentPage("details");
                    }}
                  />
                );
              case "datastatus":
                return <DataStatus />;
              case "models":
                return <ModelPerformance />;
              case "reports":
                return <Reports setCurrentPage={setCurrentPage} />;
              case "details":
                return <ProjectDetails setCurrentPage={setCurrentPage} />;
              case "users":
                return <UserManagement />;
              case "403":
                return (
                  <ForbiddenPage
                    onBackToDashboard={() => setCurrentPage("dashboard")}
                    onPreviousPage={() => setCurrentPage("dashboard")}
                  />
                );
              case "404":
              default:
                return (
                  <NotFoundPage
                    onNavigateDashboard={() => setCurrentPage("dashboard")}
                    onNavigatePrevious={() => setCurrentPage("dashboard")}
                  />
                );
            }
          })()}
        </main>

        {/* Official MoSPI Operations Footer */}
        <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">InfraSight AI</span>
            <span className="text-slate-300">|</span>
            <span>Ministry of Statistics and Programme Implementation (MoSPI)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Cabinet Secretariat Monitoring Framework</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-600">v2.8.4-GOV-PROD</span>
          </div>
        </footer>
      </div>

      {/* Global Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;