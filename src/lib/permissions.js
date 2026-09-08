/**
 * Granular application permissions for InfraSight AI
 */
export const PERMISSIONS = {
  // Central Dashboard
  DASHBOARD_VIEW: "dashboard.view",

  // Projects Repository
  PROJECTS_VIEW: "projects.view",
  PROJECTS_CREATE: "projects.create",
  PROJECTS_EDIT: "projects.edit",
  PROJECTS_EXPORT: "projects.export",

  // Portfolio Analytics
  ANALYTICS_VIEW: "analytics.view",
  ANALYTICS_EXPORT: "analytics.export",

  // AI Decision Engine & Risk Monte Carlo
  AI_VIEW: "ai.view",
  AI_SIMULATE: "ai.simulate",

  // Early Warning System (EWS Alerts)
  ALERTS_VIEW: "alerts.view",
  ALERTS_ACKNOWLEDGE: "alerts.acknowledge",

  // Geographic Intelligence Map
  MAP_VIEW: "map.view",

  // Data Pipeline Ingestion Status
  DATASTATUS_VIEW: "datastatus.view",

  // Machine Learning Model Performance
  MODELS_VIEW: "models.view",

  // Official MoSPI Reports
  REPORTS_VIEW: "reports.view",
  REPORTS_GENERATE: "reports.generate",
  REPORTS_EXPORT: "reports.export",

  // User Access Control & Administration
  USERS_VIEW: "users.view",
  USERS_APPROVE: "users.approve",
  USERS_REJECT: "users.reject",
  USERS_REVOKE: "users.revoke",
};

/**
 * Role to Permissions Mapping
 * Supported roles:
 * - admin (Super Admin / Main Administrator)
 * - manager (Departmental Director / Project Manager)
 * - analyst (Risk & Financial Intelligence Analyst)
 * - user (Operational Nodal Officer / Viewer)
 */
export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.PROJECTS_CREATE,
    PERMISSIONS.PROJECTS_EDIT,
    PERMISSIONS.PROJECTS_EXPORT,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.AI_VIEW,
    PERMISSIONS.AI_SIMULATE,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.ALERTS_ACKNOWLEDGE,
    PERMISSIONS.MAP_VIEW,
    PERMISSIONS.DATASTATUS_VIEW,
    PERMISSIONS.MODELS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_GENERATE,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_APPROVE,
    PERMISSIONS.USERS_REJECT,
    PERMISSIONS.USERS_REVOKE,
  ],
  manager: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.PROJECTS_EXPORT,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.AI_VIEW,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.ALERTS_ACKNOWLEDGE,
    PERMISSIONS.MAP_VIEW,
    PERMISSIONS.DATASTATUS_VIEW,
    PERMISSIONS.MODELS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_GENERATE,
    PERMISSIONS.REPORTS_EXPORT,
  ],
  analyst: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.AI_VIEW,
    PERMISSIONS.ALERTS_VIEW,
    PERMISSIONS.MAP_VIEW,
    PERMISSIONS.DATASTATUS_VIEW,
    PERMISSIONS.MODELS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
  ],
  user: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.MAP_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
};

// Role alias mapping for seamless compatibility
ROLE_PERMISSIONS["ministry user"] = ROLE_PERMISSIONS.manager;
ROLE_PERMISSIONS["ministry"] = ROLE_PERMISSIONS.manager;
ROLE_PERMISSIONS["public viewer"] = ROLE_PERMISSIONS.user;
ROLE_PERMISSIONS["public"] = ROLE_PERMISSIONS.user;
ROLE_PERMISSIONS["viewer"] = ROLE_PERMISSIONS.user;
ROLE_PERMISSIONS["super admin"] = ROLE_PERMISSIONS.admin;

/**
 * Page route to permission mapping for route protection
 */
export const PAGE_PERMISSIONS = {
  dashboard: PERMISSIONS.DASHBOARD_VIEW,
  projects: PERMISSIONS.PROJECTS_VIEW,
  details: PERMISSIONS.PROJECTS_VIEW,
  analytics: PERMISSIONS.ANALYTICS_VIEW,
  ai: PERMISSIONS.AI_VIEW,
  alerts: PERMISSIONS.ALERTS_VIEW,
  map: PERMISSIONS.MAP_VIEW,
  datastatus: PERMISSIONS.DATASTATUS_VIEW,
  models: PERMISSIONS.MODELS_VIEW,
  reports: PERMISSIONS.REPORTS_VIEW,
  users: PERMISSIONS.USERS_VIEW,
};

/**
 * Check whether a given role possesses a specific permission
 * @param {string} role - The user's role (admin, manager, analyst, user, ministry user, public viewer)
 * @param {string} permission - The permission key to verify
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  if (!role || !permission) return false;
  const userRole = role.toLowerCase().trim();
  const allowed = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.user || [];
  return allowed.includes(permission);
}

/**
 * Reusable Component-level Permission Guard
 * Renders children only if user's role satisfies the required permission.
 * Completely hides unauthorized actions (no disabled button leakage).
 *
 * @example
 * <Can permission="users.approve" role={role}>
 *   <ApproveButton />
 * </Can>
 */
export function Can({ permission, role, children, fallback = null }) {
  if (!hasPermission(role, permission)) {
    return fallback;
  }
  return children;
}
