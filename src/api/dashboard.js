import { client } from "./client";

/**
 * Dashboard API Service
 * Interacts with FastAPI /api/dashboard endpoints.
 */

export const getDashboardSummary = async () => {
  return await client.get("/api/dashboard/summary");
};

export const getSectorSummary = async () => {
  return await client.get("/api/dashboard/sector-summary");
};

export const getStateSummary = async () => {
  return await client.get("/api/dashboard/state-summary");
};
