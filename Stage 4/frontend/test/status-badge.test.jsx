import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import StatusBadge from "../src/components/StatusBadge.jsx";

afterEach(() => {
  cleanup();
});

describe("StatusBadge", () => {
  it.each([
    ["NORMAL", "green"],
    ["ONLINE", "green"],
    ["ACTIVE", "green"],
    ["RESOLVED", "green"],
    ["WARNING", "yellow"],
    ["ACKNOWLEDGED", "yellow"],
    ["CRITICAL", "red"],
    ["OPEN", "red"],
    ["OFFLINE", "red"],
  ])("renders %s using the %s badge", (value, color) => {
    render(<StatusBadge value={value} />);

    expect(screen.getByText(value)).toHaveClass(
      "badge",
      "badge-" + color,
    );
  });

  it("converts lowercase values to uppercase", () => {
    render(<StatusBadge value="warning" />);

    expect(screen.getByText("WARNING")).toHaveClass(
      "badge",
      "badge-yellow",
    );
  });

  it.each([
    [true, "ACTIVE", "green"],
    [false, "INACTIVE", "gray"],
    [null, "UNKNOWN", "gray"],
  ])(
    "renders %s as %s",
    (value, expectedText, expectedColor) => {
      render(<StatusBadge value={value} />);

      expect(screen.getByText(expectedText)).toHaveClass(
        "badge",
        "badge-" + expectedColor,
      );
    },
  );
});
