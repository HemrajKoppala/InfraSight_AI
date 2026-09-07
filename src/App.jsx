import React, { useState } from "react";
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
import ApiSettingsModal from "./components/ApiSettingsModal";
import Toast from "./components/Toast";
import { useApi } from "./context/ApiContext";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const { toast, hideToast } = useApi();

  // Citizen Public Portal Landing Page
  if (!showDashboard) {
    return (
      <LandingPage
        onEnter={() => setShowDashboard(true)}
      />
    );
  }

  // Central Government Operations Workspace
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* National Tricolor Accent Bar */}
      <div className="gov-tricolor-bar fixed top-0 left-0 z-50"></div>

      {/* Global Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Operations Frame */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Sticky Government Application Header */}
        <Header
          currentPage={currentPage}
          onReturnToLanding={() => setShowDashboard(false)}
          onSelectPage={setCurrentPage}
        />

        {/* Primary Page Router */}
        <main className="flex-1 pb-12">
          {currentPage === "dashboard" && (
            <Dashboard setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "projects" && (
            <Projects setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "analytics" && (
            <Analytics setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "ai" && (
            <RiskAnalysis setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "alerts" && (
            <Alerts setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "reports" && (
            <Reports setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "details" && (
            <ProjectDetails setCurrentPage={setCurrentPage} />
          )}
        </main>

        {/* Official MoSPI Operations Footer */}
        <footer className="py-4 px-6 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">MoSPI OCMS</span>
            <span className="text-slate-300">|</span>
            <span>Ministry of Statistics and Programme Implementation</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Cabinet Secretariat Monitoring Framework</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-600">v2.8.4-GOV-PROD</span>
          </div>
        </footer>
      </div>

      {/* Global Modals & Notifications */}
      <ApiSettingsModal />
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