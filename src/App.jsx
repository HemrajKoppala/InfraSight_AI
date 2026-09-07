import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

function App() {

  const [showDashboard, setShowDashboard] = useState(false);

  const [currentPage, setCurrentPage] = useState("dashboard");

  // Landing page
  if (!showDashboard) {
    return (
      <LandingPage
        onEnter={() => setShowDashboard(true)}
      />
    );
  }


  // Application dashboard

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="ml-64">

        <Header />

        <main>

          {currentPage === "dashboard" && (
            <Dashboard
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage !== "dashboard" && (

            <div className="p-8">

              <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">

                <h2 className="text-2xl font-bold text-gray-800">

                  {currentPage === "projects" && "Projects"}

                  {currentPage === "analytics" && "Analytics"}

                  {currentPage === "ai" && "AI Intelligence"}

                  {currentPage === "alerts" && "Early Warnings"}

                  {currentPage === "reports" && "Reports"}

                </h2>

                <p className="text-gray-500 mt-2">
                  This module will be implemented next.
                </p>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default App;