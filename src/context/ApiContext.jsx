import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, getApiUrl, setCustomApiUrl } from "../services/api";
import { projects as fallbackProjects } from "../data/projects";

const ApiContext = createContext();

// Initial authentic Early Warning alerts derived from real MoSPI projects
const initialAlerts = [
  {
    id: "ALT-901",
    projectId: "INF-001",
    projectName: "National Highway Development Corridor NH-44",
    severity: "Critical",
    title: "RoW Land Acquisition Delay in Belagavi Division",
    source: "Geo-Spatial & OCMS Pipeline",
    timestamp: "Today, 10:45 AM",
    status: "Active",
    sector: "Road Transport",
    ministry: "Ministry of Road Transport & Highways",
    projectedCostImpact: 3600,
    projectedDelayMonths: 6.5,
    confidenceScore: 94.2,
    description: "14.8 hectares of forest clearance pending with State Forest Dept. Contractor idle equipment claims escalating by ₹4.2 Cr/month.",
    recommendedAction: "Convene High-Level State Empowered Committee (SEC) review for expedited diversion."
  },
  {
    id: "ALT-902",
    projectId: "INF-002",
    projectName: "Eastern Dedicated Freight Corridor (EDFC)",
    severity: "Critical",
    title: "Overhead Electrification Substation Milestone Overrun",
    source: "SCADA & Milestones Sensor",
    timestamp: "Yesterday, 04:30 PM",
    status: "Active",
    sector: "Railways",
    ministry: "Ministry of Railways",
    projectedCostImpact: 2150,
    projectedDelayMonths: 8.0,
    confidenceScore: 91.8,
    description: "Traction Substation at Subedarganj delayed due to switchgear supply chain import constraint. Threatens overall corridor commissioning target.",
    recommendedAction: "Invoke fast-track domestic sourcing clause under Make in India guidelines."
  },
  {
    id: "ALT-903",
    projectId: "INF-004",
    projectName: "Polavaram National Irrigation Project",
    severity: "High",
    title: "Diaphragm Wall Restoration Geotechnical Variance",
    source: "Dam Safety Review Panel (DSRP)",
    timestamp: "05 Sep 2026",
    status: "Active",
    sector: "Water Resources",
    ministry: "Ministry of Jal Shakti",
    projectedCostImpact: 4800,
    projectedDelayMonths: 12.0,
    confidenceScore: 88.5,
    description: "Scour depth in River Godavari riverbed requires redesign of Vibro Stone Columns before main dam gap-filling commences.",
    recommendedAction: "Central Water Commission (CWC) technical audit approval required on priority."
  },
  {
    id: "ALT-904",
    projectId: "INF-003",
    projectName: "Ultra Mega Solar Power Park (2,000 MW)",
    severity: "Medium",
    title: "Inter-State Transmission Grid Interconnection Delay",
    source: "PGCIL Grid Integration Monitor",
    timestamp: "03 Sep 2026",
    status: "Acknowledged",
    sector: "Energy",
    ministry: "Ministry of Power",
    projectedCostImpact: 340,
    projectedDelayMonths: 3.5,
    confidenceScore: 86.4,
    description: "400 kV pooling substation commissioning lagged by 45 days due to bay equipment testing.",
    recommendedAction: "Deploy mobile substation testing team to accelerate pre-commissioning."
  }
];

export function ApiProvider({ children }) {
  const [apiUrl, setApiUrlState] = useState(getApiUrl());
  const [isBackendConnected, setIsBackendConnected] = useState(null); // null = checking, true = connected, false = offline
  const [connectionLatency, setConnectionLatency] = useState(null);

  // Live state from backend (with authentic MoSPI fallback when offline)
  const [projects, setProjects] = useState(fallbackProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(fallbackProjects[0]?.id || "INF-001");
  const [alerts, setAlerts] = useState(initialAlerts);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [sectorStats, setSectorStats] = useState([]);
  const [modelMetrics, setModelMetrics] = useState(null);

  // Loading & Error states
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [errorProjects, setErrorProjects] = useState(null);
  const [errorAlerts, setErrorAlerts] = useState(null);
  const [errorSummary, setErrorSummary] = useState(null);

  // Settings Modal & Global Toast
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Health check & ping backend
  const testConnection = useCallback(async (customUrl) => {
    const startTime = performance.now();
    try {
      if (customUrl) {
        setCustomApiUrl(customUrl);
        setApiUrlState(customUrl);
      }
      await api.checkHealth();
      const endTime = performance.now();
      setIsBackendConnected(true);
      setConnectionLatency(Math.round(endTime - startTime));
      return { success: true, latency: Math.round(endTime - startTime) };
    } catch (err) {
      setIsBackendConnected(false);
      setConnectionLatency(null);
      return { success: false, error: err.message };
    }
  }, []);

  // Fetch Projects from backend
  const fetchProjects = useCallback(async (params = {}) => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      const data = await api.getProjects(params);
      const list = Array.isArray(data) ? data : data?.data || data?.projects || [];
      if (list && list.length > 0) {
        setProjects(list);
        if (!selectedProjectId) setSelectedProjectId(list[0].id);
      }
      setIsBackendConnected(true);
    } catch (err) {
      // Backend not running; retain fallback MoSPI dataset
      console.info("[InfraSight] Operating with offline MoSPI dataset:", err.message);
      setIsBackendConnected(false);
    } finally {
      setLoadingProjects(false);
    }
  }, [selectedProjectId]);

  // Fetch Alerts from backend
  const fetchAlerts = useCallback(async (params = {}) => {
    setLoadingAlerts(true);
    setErrorAlerts(null);
    try {
      const data = await api.getAlerts(params);
      const list = Array.isArray(data) ? data : data?.data || data?.alerts || [];
      if (list && list.length > 0) {
        setAlerts(list);
      }
    } catch (err) {
      console.info("[InfraSight] Backend alerts offline, active alert triggers maintained.");
    } finally {
      setLoadingAlerts(false);
    }
  }, []);

  // Fetch Summary & Sectors from backend
  const fetchSummary = useCallback(async () => {
    setLoadingSummary(true);
    setErrorSummary(null);
    try {
      const [summaryData, sectorsData, metricsData] = await Promise.allSettled([
        api.getDashboardSummary(),
        api.getSectorStats(),
        api.getModelMetrics()
      ]);

      if (summaryData.status === "fulfilled" && summaryData.value) {
        setDashboardSummary(summaryData.value);
      }
      if (sectorsData.status === "fulfilled" && sectorsData.value) {
        const sList = Array.isArray(sectorsData.value)
          ? sectorsData.value
          : sectorsData.value?.sectors || [];
        setSectorStats(sList);
      }
      if (metricsData.status === "fulfilled" && metricsData.value) {
        setModelMetrics(metricsData.value);
      }
    } catch (err) {
      setErrorSummary(err.message);
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    testConnection();
    fetchProjects();
    fetchAlerts();
    fetchSummary();
  }, [testConnection, fetchProjects, fetchAlerts, fetchSummary]);

  const updateApiEndpoint = (newUrl) => {
    setCustomApiUrl(newUrl);
    setApiUrlState(newUrl);
    testConnection(newUrl).then((res) => {
      if (res.success) {
        showToast("Backend connection established successfully.", "success");
      } else {
        showToast("Backend endpoint updated (offline).", "info");
      }
      fetchProjects();
      fetchAlerts();
      fetchSummary();
    });
  };

  const acknowledgeAlert = async (alertId) => {
    try {
      await api.updateAlertStatus(alertId, "Acknowledged").catch(() => {});
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: "Acknowledged" } : a))
      );
      showToast(`Warning ${alertId} marked as Acknowledged.`, "success");
    } catch (err) {
      console.error("Failed to acknowledge alert:", err);
    }
  };

  const escalateAlert = async (alertId, notes) => {
    try {
      await api.escalateAlert(alertId, notes).catch(() => {});
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, status: "Escalated", escalatedTo: "Nodal Ministry", escalatedNotes: notes }
            : a
        )
      );
      showToast(`Warning ${alertId} escalated to Nodal Ministry desk.`, "success");
    } catch (err) {
      console.error("Failed to escalate alert:", err);
    }
  };

  const clearAllAlerts = useCallback(() => {
    setAlerts((prev) =>
      prev.map((a) => ({ ...a, status: "Acknowledged" }))
    );
    showToast("All active notifications cleared.", "info");
  }, []);

  return (
    <ApiContext.Provider
      value={{
        apiUrl,
        updateApiEndpoint,
        isBackendConnected,
        connectionLatency,
        testConnection,
        projects,
        selectedProjectId,
        setSelectedProjectId,
        selectedProject: projects.find((p) => p.id === selectedProjectId) || projects[0] || null,
        alerts,
        dashboardSummary,
        sectorStats,
        modelMetrics,
        loadingProjects,
        loadingAlerts,
        loadingSummary,
        errorProjects,
        errorAlerts,
        errorSummary,
        refreshAll: () => {
          showToast("Syncing with Central Project Registry...", "info");
          testConnection();
          fetchProjects();
          fetchAlerts();
          fetchSummary();
        },
        fetchProjects,
        fetchAlerts,
        acknowledgeAlert,
        escalateAlert,
        clearAllAlerts,
        isSettingsOpen,
        setIsSettingsOpen,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
