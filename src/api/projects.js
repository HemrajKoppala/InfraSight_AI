import { client } from "./client";

/**
 * Projects API Service
 * Interacts with FastAPI /api/projects endpoints.
 */

export const getProjects = async () => {
  return await client.get("/api/projects/");
};

export const getProjectById = async (projectId) => {
  if (!projectId) throw new Error("projectId is required");
  return await client.get(`/api/projects/${encodeURIComponent(projectId)}`);
};

export const getProjectDetails = async (projectId) => {
  if (!projectId) throw new Error("projectId is required");
  return await client.get(`/api/projects/${encodeURIComponent(projectId)}/details`);
};

export const getProjectHistory = async (projectId) => {
  if (!projectId) throw new Error("projectId is required");
  return await client.get(`/api/projects/${encodeURIComponent(projectId)}/history`);
};
