/**
 * Central API Client for InfraSight AI
 * Strictly communicates with FastAPI backend via HTTP.
 * Single source of truth for Base URL, headers, authentication, and error normalization.
 */

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const savedUrl = localStorage.getItem("infrasight_api_url");
    if (savedUrl) return savedUrl.trim().replace(/\/+$/, "");
  }
  const envUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
  return envUrl.trim().replace(/\/+$/, "");
};

export const setCustomApiUrl = (url) => {
  if (typeof window !== "undefined") {
    if (url) {
      localStorage.setItem("infrasight_api_url", url.trim().replace(/\/+$/, ""));
    } else {
      localStorage.removeItem("infrasight_api_url");
    }
  }
};

/**
 * Normalizes endpoint path to prevent duplicate /api prefixes
 */
const buildFullUrl = (endpoint) => {
  const baseUrl = getBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // If baseUrl already ends with /api and endpoint starts with /api, avoid duplication
  if (baseUrl.endsWith("/api") && cleanEndpoint.startsWith("/api/")) {
    return `${baseUrl}${cleanEndpoint.slice(4)}`;
  }
  return `${baseUrl}${cleanEndpoint}`;
};

/**
 * Robust JSON request executor with timeout, authorization header, and standardized error handling.
 */
export const request = async (endpoint, options = {}) => {
  const url = buildFullUrl(endpoint);
  const timeoutMs = options.timeout || 10000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Attach JWT token if present
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("infrasight_token") ||
      localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (typeof errorData.detail === "string") {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((d) => d.msg || JSON.stringify(d)).join("; ");
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Response body was not JSON
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      const timeoutError = new Error(`Request timed out after ${timeoutMs}ms.`);
      timeoutError.status = 408;
      throw timeoutError;
    }

    if (!error.status) {
      const networkError = new Error(
        `Unable to reach InfraSight AI backend at ${url}. Please ensure FastAPI is running.`
      );
      networkError.status = 0;
      throw networkError;
    }

    throw error;
  }
};

export const client = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: "DELETE" }),
  checkHealth: async () => {
    try {
      return await client.get("/health");
    } catch {
      return await client.get("/api/health");
    }
  },
};
