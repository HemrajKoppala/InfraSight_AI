/**
 * InfraSight AI - Backend API Client Service
 * Connects to live backend endpoints for MoSPI Project Monitoring & AI Early Warnings.
 */

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const savedUrl = localStorage.getItem("infrasight_api_url");
    if (savedUrl) return savedUrl;
  }
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
};

export const setCustomApiUrl = (url) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("infrasight_api_url", url);
  }
};

export const getApiUrl = () => getBaseUrl();

const fetchJson = async (endpoint, options = {}) => {
  const baseUrl = getBaseUrl().replace(/\/$/, "");
  const url = `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[InfraSight API] Request to ${url} failed:`, error);
    throw error;
  }
};

export const api = {
  // Health & Model Status
  checkHealth: () => fetchJson("/health"),
  getModelMetrics: () => fetchJson("/ai/metrics"),

  // Projects
  getProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/projects${query ? `?${query}` : ""}`);
  },
  getProjectById: (id) => fetchJson(`/projects/${id}`),
  createProject: (data) => fetchJson("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) => fetchJson(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  // Analytics & Aggregations
  getDashboardSummary: () => fetchJson("/analytics/summary"),
  getSectorStats: () => fetchJson("/analytics/sectors"),
  getTimelineForecast: (projectId) => fetchJson(`/analytics/forecast/${projectId}`),

  // Early Warning System & Alerts
  getAlerts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/alerts${query ? `?${query}` : ""}`);
  },
  updateAlertStatus: (alertId, status) =>
    fetchJson(`/alerts/${alertId}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  escalateAlert: (alertId, notes) =>
    fetchJson(`/alerts/${alertId}/escalate`, { method: "POST", body: JSON.stringify({ notes }) }),

  // AI & Risk Predictions
  getRiskAnalysis: (projectId) => fetchJson(`/ai/risk-analysis/${projectId}`),
  runMonteCarloSimulation: (payload) =>
    fetchJson("/ai/simulate", { method: "POST", body: JSON.stringify(payload) }),

  // Reports
  getReports: () => fetchJson("/reports"),
  generateReport: (payload) =>
    fetchJson("/reports/generate", { method: "POST", body: JSON.stringify(payload) })
};
