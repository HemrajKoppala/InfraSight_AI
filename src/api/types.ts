/**
 * TypeScript Interfaces for InfraSight AI Backend APIs
 * Models strictly match FastAPI Pydantic schemas from backend/app/schemas/
 * and live OpenAPI specification at http://127.0.0.1:8000/openapi.json
 */

export interface Project {
  project_id: string;
  project_name: string;
  sector: string;
  ministry: string;
  state: string;
  original_cost: number;
  current_cost: number;
  expenditure: number;
  physical_progress: number;
  financial_progress: number;
  planned_duration_months: number;
  elapsed_duration_months: number;
  milestone_delay_months: number;
  procurement_delay_months: number;
  land_acquisition_delay_months: number;
  approval_delay_months: number;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ProjectHistory {
  project_id: string;
  month: number;
  current_cost: number;
  expenditure: number;
  physical_progress: number;
  financial_progress: number;
  milestone_delay_months: number;
  procurement_delay_months: number;
}

export interface ProjectMetrics {
  cost_escalation_percent: number;
  progress_gap: number;
  duration_used_percent: number;
}

export interface ProjectDetails {
  project: Project;
  metrics: ProjectMetrics;
  history: ProjectHistory[];
}

export interface DashboardSummary {
  total_projects: number;
  total_original_cost: number;
  total_current_cost: number;
  total_expenditure: number;
}

export interface SectorSummaryItem {
  sector: string;
  project_count: number;
  original_cost: number;
  current_cost: number;
  expenditure: number;
}

export interface StateSummaryItem {
  state: string;
  project_count: number;
  original_cost: number;
  current_cost: number;
  expenditure: number;
}

export interface HealthResponse {
  status: string;
}

/**
 * Normalized UI Project Model with backward-compatible aliases
 */
export interface UIProject extends Project {
  id: string;
  name: string;
  originalCost: number;
  revisedCost: number;
  currentCost: number;
  physicalProgress: number;
  financialProgress: number;
  total_delay_months: number;
  timeOverrunMonths: number;
  costOverrunAmount: number;
  costOverrunPercent: number;
  status: "Delayed" | "On Track";
}
