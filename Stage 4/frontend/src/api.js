export const API_BASE_URL = "http://127.0.0.1:5000";

export function getToken() {
  return localStorage.getItem("flexsight_token");
}

export function getRole() {
  return localStorage.getItem("flexsight_role");
}

export function clearAuth() {
  localStorage.removeItem("flexsight_token");
  localStorage.removeItem("flexsight_role");
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch {
        data = null;
      }
    }

    if (response.status === 401 && token) {
      clearAuth();
      window.location.href = "/login";
      return { ok: false, status: 401, data };
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      data: { message: "Unable to connect to server" },
    };
  }
}

export async function logoutRequest() {
  const token = getToken();
  if (token) {
    await apiRequest("/auth/logout", { method: "POST" });
  }
  clearAuth();
}

export function formatDate(value) {
  if (!value) return "—";
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export function getReadingStatus(temperature) {
  const temp = Number(temperature);
  if (Number.isNaN(temp)) return "UNKNOWN";
  if (temp >= 50) return "CRITICAL";
  if (temp >= 45) return "WARNING";
  return "NORMAL";
}
