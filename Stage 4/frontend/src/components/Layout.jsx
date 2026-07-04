import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ title, children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Topbar title={title} />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
