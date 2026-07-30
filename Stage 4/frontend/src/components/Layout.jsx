import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import OfflineGuard from "./OfflineGuard";

function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="layout-main">
        <Topbar
          title={title}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="layout-content">
          <OfflineGuard>{children}</OfflineGuard>
        </main>
      </div>
    </div>
  );
}

export default Layout;
