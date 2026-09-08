import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  client,
  getBaseUrl,
  setCustomApiUrl,
  getProjects,
  getDashboardSummary,
  getSectorSummary,
  getStateSummary,
  transformProjects,
  transformDashboardSummary,
  transformSectorSummary,
  transformStateSummary,
} from "../api";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [apiUrl, setApiUrlState] = useState(getBaseUrl());
  const [isBackendConnected, setIsBackendConnected] = useState(null); // null = checking, true = online, false = offline
  const [connectionLatency, setConnectionLatency] = useState(null);

  // Live state from backend (No fake/mock data)
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [sectorStats, setSectorStats] = useState([]);
  const [stateStats, setStateStats] = useState([]);

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
      await client.checkHealth();
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      setIsBackendConnected(true);
      setConnectionLatency(latency);
      return { success: true, latency };
    } catch (err) {
      setIsBackendConnected(false);
      setConnectionLatency(null);
      return { success: false, error: err.message };
    }
  }, []);

  // Fetch Projects from backend
  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      const rawData = await getProjects();
      const transformed = transformProjects(rawData);
      setProjects(transformed);

      setSelectedProjectId((prev) => {
        if (prev && transformed.some((p) => p.id === prev)) {
          return prev;
        }
        return transformed[0]?.id || null;
      });
      setIsBackendConnected(true);
    } catch (err) {
      setErrorProjects(err.message || "Failed to load projects from central registry.");
      setIsBackendConnected(false);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Fetch Summary & Sectors from backend
  const fetchSummary = useCallback(async () => {
    setLoadingSummary(true);
    setErrorSummary(null);
    try {
      const [summaryRes, sectorRes, stateRes] = await Promise.allSettled([
        getDashboardSummary(),
        getSectorSummary(),
        getStateSummary(),
      ]);

      if (summaryRes.status === "fulfilled" && summaryRes.value) {
        setDashboardSummary(transformDashboardSummary(summaryRes.value));
      }
      if (sectorRes.status === "fulfilled" && sectorRes.value) {
        setSectorStats(transformSectorSummary(sectorRes.value));
      }
      if (stateRes.status === "fulfilled" && stateRes.value) {
        setStateStats(transformStateSummary(stateRes.value));
      }

      if (
        summaryRes.status === "rejected" &&
        sectorRes.status === "rejected" &&
        stateRes.status === "rejected"
      ) {
        setErrorSummary(summaryRes.reason?.message || "Failed to fetch dashboard summary.");
      }
    } catch (err) {
      setErrorSummary(err.message);
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  // Alerts placeholder (Step 12: Do NOT generate fake alerts in React)
  const fetchAlerts = useCallback(async () => {
    setLoadingAlerts(false);
    setErrorAlerts(null);
    setAlerts([]);
  }, []);

  // Initial load
  useEffect(() => {
    testConnection();
    fetchProjects();
    fetchSummary();
    fetchAlerts();
  }, [testConnection, fetchProjects, fetchSummary, fetchAlerts]);

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
      fetchSummary();
      fetchAlerts();
    });
  };

  const selectedProject = useMemo(() => {
    if (!selectedProjectId || projects.length === 0) return null;
    return projects.find((p) => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  const acknowledgeAlert = useCallback(() => {
    showToast("Alert acknowledgement updated.", "info");
  }, [showToast]);

  const escalateAlert = useCallback(() => {
    showToast("Escalation action recorded.", "info");
  }, [showToast]);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
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
        selectedProject,
        alerts,
        dashboardSummary,
        sectorStats,
        stateStats,
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
          fetchSummary();
          fetchAlerts();
        },
        fetchProjects,
        fetchAlerts,
        fetchSummary,
        acknowledgeAlert,
        escalateAlert,
        clearAllAlerts,
        isSettingsOpen,
        setIsSettingsOpen,
        toast,
        showToast,
        hideToast,
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
