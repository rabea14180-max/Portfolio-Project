export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5001";

export function getToken() {
  return localStorage.getItem("flexsight_token");
}

export function getRole() {
  return localStorage.getItem("flexsight_role");
}

export function getUsername() {
  return localStorage.getItem("flexsight_username");
}

export function setUsername(username) {
  localStorage.setItem("flexsight_username", username);
}

export function clearAuth() {
  localStorage.removeItem("flexsight_token");
  localStorage.removeItem("flexsight_role");
  localStorage.removeItem("flexsight_username");
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
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
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

const USERNAME_PATTERN = /^[A-Za-z0-9_.-]{5,100}$/;

// Flags a run of 4+ repeated characters, whether that's one character
// repeated (e.g. "aaaa"), a 2-character block repeated (e.g. "abab"), or a
// 3-character block repeated (e.g. "abcabc") - mirrors the repeated/
// sequential digit rule used for passwords.
function hasRepeatedCharPattern(value) {
  for (let i = 0; i + 4 <= value.length; i += 1) {
    if (new Set(value.slice(i, i + 4)).size === 1) return true;
    if (value.slice(i, i + 2) === value.slice(i + 2, i + 4)) return true;
  }
  for (let i = 0; i + 6 <= value.length; i += 1) {
    if (value.slice(i, i + 3) === value.slice(i + 3, i + 6)) return true;
  }
  return false;
}

// Mirrors the backend's username rules (models.py username column is
// varchar(100); routes.py get_username_error enforces the same charset,
// length, and no-repeated-pattern rules). Returns "" when valid, otherwise
// a user-facing error message.
export function validateUsername(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return "Username is required";
  if (trimmed.length <= 4) return "Username must be more than 4 characters";
  if (trimmed.length > 100) return "Username must be 100 characters or fewer";
  if (!USERNAME_PATTERN.test(trimmed)) {
    return "Username can only contain letters, numbers, underscores, dots, and hyphens";
  }
  if (hasRepeatedCharPattern(trimmed)) {
    return "Username cannot contain a repeated character or pattern (e.g. aaaa or abab)";
  }
  return "";
}

const PASSWORD_PATTERN = /^[A-Za-z0-9]{8,}$/;
const ASCENDING_DIGITS = "0123456789";
const DESCENDING_DIGITS = "9876543210";

// Mirrors the backend's password policy (routes.py get_password_error):
// at least 8 characters, letters/digits only, and no 4+ run of repeated or
// sequential digits (e.g. "1111" or "1234"). Returns "" when valid,
// otherwise a user-facing error message.
export function validatePassword(value, { runLength = 4 } = {}) {
  if (!value) return "Password is required";
  if (!PASSWORD_PATTERN.test(value)) {
    return "Password must be at least 8 characters and contain only letters and numbers";
  }

  const digitRuns = value.match(/\d+/g) || [];
  for (const run of digitRuns) {
    for (let i = 0; i + runLength <= run.length; i += 1) {
      const window = run.slice(i, i + runLength);
      const isRepeated = new Set(window).size === 1;
      const isSequential =
        ASCENDING_DIGITS.includes(window) || DESCENDING_DIGITS.includes(window);
      if (isRepeated || isSequential) {
        return "Password cannot contain repeated or sequential numbers (e.g. 1111 or 1234)";
      }
    }
  }

  return "";
}

// Per-device Warning/Critical thresholds now live in the backend
// (threshold_configs, linked per-device via device_thresholds), and
// GET /dashboard/readings already returns a calculated `status` for every
// reading using that device's own threshold. This helper no longer assumes
// any default values - it only calculates a status when the caller passes
// explicit threshold arguments; otherwise callers should just use
// reading.status directly.
export function getReadingStatus(temperature, warningThreshold, criticalThreshold) {
  const temp = Number(temperature);
  if (Number.isNaN(temp)) return "UNKNOWN";

  if (warningThreshold === undefined || warningThreshold === null ||
      criticalThreshold === undefined || criticalThreshold === null) {
    return "UNKNOWN";
  }

  const warning = Number(warningThreshold);
  const critical = Number(criticalThreshold);
  if (Number.isNaN(warning) || Number.isNaN(critical)) return "UNKNOWN";

  if (temp >= critical) return "CRITICAL";
  if (temp >= warning) return "WARNING";
  return "NORMAL";
}
