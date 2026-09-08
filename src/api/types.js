/**
 * API Type Definitions matching FastAPI Pydantic Models & OpenAPI Schemas
 * Source of Truth: http://127.0.0.1:8000/openapi.json
 */

/**
 * @typedef {Object} Project
 * @property {string} project_id - Unique alphanumeric ID (e.g., "INF-001")
 * @property {string} project_name - Official title of the infrastructure project
 * @property {string} sector - Sector name (e.g., "Transport", "Railways", "Water Resources")
 * @property {string} ministry - Nodal Central Ministry
 * @property {string} state - Primary geographic state of project execution
 * @property {number} original_cost - Sanctioned outlay in ₹ Crores (>= 0)
 * @property {number} current_cost - Current revised cost in ₹ Crores (>= 0)
 * @property {number} expenditure - Cumulative financial expenditure in ₹ Crores (>= 0)
 * @property {number} physical_progress - Completed physical work percentage (0-100)
 * @property {number} financial_progress - Cumulative funds utilization percentage (0-100)
 * @property {number} planned_duration_months - Planned overall duration in months
 * @property {number} elapsed_duration_months - Elapsed duration since sanction in months
 * @property {number} milestone_delay_months - Delay attributed to key milestones
 * @property {number} procurement_delay_months - Delay attributed to procurement / tender processes
 * @property {number} land_acquisition_delay_months - Delay attributed to land acquisition / RoW clearances
 * @property {number} approval_delay_months - Delay attributed to statutory approvals / forest clearances
 */

/**
 * @typedef {Object} ProjectHistory
 * @property {string} project_id - Reference to project
 * @property {number} month - Observation month index (>= 1)
 * @property {number} current_cost - Cost at that month in ₹ Cr
 * @property {number} expenditure - Cumulative expenditure at that month in ₹ Cr
 * @property {number} physical_progress - Physical progress percentage (0-100)
 * @property {number} financial_progress - Financial progress percentage (0-100)
 * @property {number} milestone_delay_months - Milestone delay in months (>= 0)
 * @property {number} procurement_delay_months - Procurement delay in months (>= 0)
 */

/**
 * @typedef {Object} ProjectMetrics
 * @property {number} cost_escalation_percent - Cost escalation percentage relative to original
 * @property {number} progress_gap - Difference between financial and physical progress
 * @property {number} duration_used_percent - Percentage of planned duration elapsed
 */

/**
 * @typedef {Object} ProjectDetails
 * @property {Project} project - The project record
 * @property {ProjectMetrics} metrics - Computed key performance metrics
 * @property {ProjectHistory[]} history - Monthly historical audit progression
 */

/**
 * @typedef {Object} DashboardSummary
 * @property {number} total_projects - Total number of active projects in database
 * @property {number} total_original_cost - Sum of all original approved costs (₹ Cr)
 * @property {number} total_current_cost - Sum of all current revised costs (₹ Cr)
 * @property {number} total_expenditure - Sum of all cumulative expenditures (₹ Cr)
 */

/**
 * @typedef {Object} SectorSummaryItem
 * @property {string} sector - Sector name
 * @property {number} project_count - Number of projects in this sector
 * @property {number} original_cost - Total original cost for sector (₹ Cr)
 * @property {number} current_cost - Total current cost for sector (₹ Cr)
 * @property {number} expenditure - Total cumulative expenditure for sector (₹ Cr)
 */

/**
 * @typedef {Object} StateSummaryItem
 * @property {string} state - State name
 * @property {number} project_count - Number of projects in this state
 * @property {number} original_cost - Total original cost for state (₹ Cr)
 * @property {number} current_cost - Total current cost for state (₹ Cr)
 * @property {number} expenditure - Total cumulative expenditure for state (₹ Cr)
 */
