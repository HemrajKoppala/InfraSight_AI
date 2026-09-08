/**
 * Data Transformer & Adapter Layer
 * Transforms raw FastAPI backend models into UI-compatible structures
 * while strictly preserving authentic fields and avoiding synthetic data.
 */

/**
 * Transforms a raw FastAPI project object into a normalized entity
 * @param {Object} raw - Raw project from FastAPI
 * @returns {Object} Normalized project with raw backend attributes and UI compatibility aliases
 */
export function transformProject(raw) {
  if (!raw) return null;

  const project_id = raw.project_id || raw.id || "";
  const original_cost = Number(raw.original_cost ?? raw.originalCost ?? 0);
  const current_cost = Number(raw.current_cost ?? raw.revisedCost ?? raw.currentCost ?? original_cost);
  const expenditure = Number(raw.expenditure ?? 0);
  const physical_progress = Number(raw.physical_progress ?? raw.physicalProgress ?? 0);
  const financial_progress = Number(raw.financial_progress ?? raw.financialProgress ?? 0);

  const milestone_delay = Number(raw.milestone_delay_months ?? 0);
  const procurement_delay = Number(raw.procurement_delay_months ?? 0);
  const land_delay = Number(raw.land_acquisition_delay_months ?? 0);
  const approval_delay = Number(raw.approval_delay_months ?? 0);
  const total_delay_months = milestone_delay + procurement_delay + land_delay + approval_delay;

  const costOverrunAmount = current_cost - original_cost;
  const costOverrunPercent =
    original_cost > 0 ? Number(((costOverrunAmount / original_cost) * 100).toFixed(1)) : 0;

  return {
    // 1. Raw Backend Fields Preserved Directly
    project_id,
    project_name: raw.project_name || raw.name || "Untitled Project",
    sector: raw.sector || "Unspecified",
    ministry: raw.ministry || "Unspecified",
    state: raw.state || "Unspecified",
    original_cost,
    current_cost,
    expenditure,
    physical_progress,
    financial_progress,
    planned_duration_months: raw.planned_duration_months ?? null,
    elapsed_duration_months: raw.elapsed_duration_months ?? null,
    milestone_delay_months: milestone_delay,
    procurement_delay_months: procurement_delay,
    land_acquisition_delay_months: land_delay,
    approval_delay_months: approval_delay,

    // 2. Computed Authentic Metrics
    total_delay_months,
    costOverrunAmount,
    costOverrunPercent,

    // 3. UI Convenience Aliases (Non-destructive for existing views)
    id: project_id,
    name: raw.project_name || raw.name || "Untitled Project",
    originalCost: original_cost,
    revisedCost: current_cost,
    currentCost: current_cost,
    physicalProgress: physical_progress,
    financialProgress: financial_progress,
    timeOverrunMonths: total_delay_months,
    status: total_delay_months > 0 ? "Delayed" : "On Track",

    // Coordinates (only if backend supplies them; otherwise undefined)
    latitude: raw.latitude ?? null,
    longitude: raw.longitude ?? null,
  };
}

/**
 * Transforms an array of raw projects
 * @param {Array} rawList
 * @returns {Array}
 */
export function transformProjects(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(transformProject).filter(Boolean);
}

/**
 * Normalizes backend dashboard summary
 * @param {Object} raw
 * @returns {Object}
 */
export function transformDashboardSummary(raw) {
  if (!raw) return null;
  return {
    total_projects: Number(raw.total_projects ?? 0),
    total_original_cost: Number(raw.total_original_cost ?? 0),
    total_current_cost: Number(raw.total_current_cost ?? 0),
    total_expenditure: Number(raw.total_expenditure ?? 0),
  };
}

/**
 * Normalizes sector summary items
 * @param {Array} list
 * @returns {Array}
 */
export function transformSectorSummary(list) {
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    sector: item.sector || "Unspecified",
    project_count: Number(item.project_count ?? 0),
    original_cost: Number(item.original_cost ?? 0),
    current_cost: Number(item.current_cost ?? 0),
    expenditure: Number(item.expenditure ?? 0),
    // Aliases for charts
    approved: Number(item.original_cost ?? 0),
    revised: Number(item.current_cost ?? 0),
  }));
}

/**
 * Normalizes state summary items
 * @param {Array} list
 * @returns {Array}
 */
export function transformStateSummary(list) {
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    state: item.state || "Unspecified",
    project_count: Number(item.project_count ?? 0),
    original_cost: Number(item.original_cost ?? 0),
    current_cost: Number(item.current_cost ?? 0),
    expenditure: Number(item.expenditure ?? 0),
  }));
}
