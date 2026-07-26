import { beforeEach, describe, expect, it } from "vitest";
import {
  clearAuth,
  formatDate,
  getReadingStatus,
  getRole,
  getToken,
  getUsername,
} from "../src/api.js";

describe("authentication storage helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads the saved authentication values", () => {
    localStorage.setItem("flexsight_token", "test-token");
    localStorage.setItem("flexsight_role", "ADMIN");
    localStorage.setItem("flexsight_username", "test-user");

    expect(getToken()).toBe("test-token");
    expect(getRole()).toBe("ADMIN");
    expect(getUsername()).toBe("test-user");
  });

  it("clears all saved authentication values", () => {
    localStorage.setItem("flexsight_token", "test-token");
    localStorage.setItem("flexsight_role", "ADMIN");
    localStorage.setItem("flexsight_username", "test-user");

    clearAuth();

    expect(getToken()).toBeNull();
    expect(getRole()).toBeNull();
    expect(getUsername()).toBeNull();
  });
});

describe("temperature reading status", () => {
  it.each([
    [20, 30, 40, "NORMAL"],
    [30, 30, 40, "WARNING"],
    [39.9, 30, 40, "WARNING"],
    [40, 30, 40, "CRITICAL"],
    [50, 30, 40, "CRITICAL"],
  ])(
    "classifies %s°C using warning %s and critical %s thresholds",
    (temperature, warning, critical, expected) => {
      expect(getReadingStatus(temperature, warning, critical)).toBe(expected);
    },
  );

  it("returns UNKNOWN for invalid values or missing thresholds", () => {
    expect(getReadingStatus("invalid", 30, 40)).toBe("UNKNOWN");
    expect(getReadingStatus(20)).toBe("UNKNOWN");
    expect(getReadingStatus(20, "invalid", 40)).toBe("UNKNOWN");
    expect(getReadingStatus(20, 30, null)).toBe("UNKNOWN");
  });
});

describe("date formatting", () => {
  it("handles empty and invalid date values", () => {
    expect(formatDate()).toBe("—");
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});
