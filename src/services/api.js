/**
 * InfraSight AI - Legacy Service Adapter
 * Delegates to centralized src/api/ client for strict backend contract compliance.
 */
import {
  client,
  getBaseUrl,
  setCustomApiUrl,
  getProjects,
  getProjectById,
  getProjectDetails,
  getProjectHistory,
  getDashboardSummary,
  getSectorSummary,
  getStateSummary,
} from "../api";

export { getBaseUrl, setCustomApiUrl };
export const getApiUrl = () => getBaseUrl();

export const api = {
  checkHealth: () => client.checkHealth(),
  getProjects: () => getProjects(),
  getProjectById: (id) => getProjectById(id),
  getProjectDetails: (id) => getProjectDetails(id),
  getProjectHistory: (id) => getProjectHistory(id),
  getDashboardSummary: () => getDashboardSummary(),
  getSectorStats: () => getSectorSummary(),
  getStateStats: () => getStateSummary(),
};
