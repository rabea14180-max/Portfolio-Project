import React from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "../src/components/ProtectedRoute.jsx";

function renderProtectedRoute(roles) {
  render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route path="/login" element={<p>Login page</p>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute roles={roles}>
              <p>Protected content</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("redirects unauthenticated users to login", () => {
    renderProtectedRoute();

    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(
      screen.queryByText("Protected content"),
    ).not.toBeInTheDocument();
  });

  it("allows an authenticated Inspector to access a route without role restrictions", () => {
    localStorage.setItem("flexsight_token", "test-token");
    localStorage.setItem("flexsight_role", "INSPECTOR");

    renderProtectedRoute();

    expect(
      screen.getByText("Protected content"),
    ).toBeInTheDocument();
  });

  it("allows an Admin to access an authorized route", () => {
    localStorage.setItem("flexsight_token", "test-token");
    localStorage.setItem("flexsight_role", "ADMIN");

    renderProtectedRoute(["OWNER", "ADMIN"]);

    expect(
      screen.getByText("Protected content"),
    ).toBeInTheDocument();
  });

  it("blocks an Inspector from a restricted route", () => {
    localStorage.setItem("flexsight_token", "test-token");
    localStorage.setItem("flexsight_role", "INSPECTOR");

    renderProtectedRoute(["OWNER", "ADMIN"]);

    expect(
      screen.getByText("Unauthorized access."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Protected content"),
    ).not.toBeInTheDocument();
  });
