import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Alerts from "./pages/Alerts";
import Readings from "./pages/Readings";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/users/new"
        element={
          <ProtectedRoute roles={["OWNER", "ADMIN"]}>
            <Layout title="Add User">
              <AddUser />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout title="Dashboard">
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/devices"
        element={
          <ProtectedRoute roles={["OWNER", "ADMIN"]}>
            <Layout title="Devices">
              <Devices />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <Layout title="Alerts">
              <Alerts />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/readings"
        element={
          <ProtectedRoute roles={["OWNER", "ADMIN", "INSPECTOR"]}>
            <Layout title="Readings">
              <Readings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute roles={["OWNER", "ADMIN"]}>
            <Layout title="Users">
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute roles={["OWNER", "ADMIN", "INSPECTOR"]}>
            <Layout title="Settings">
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
