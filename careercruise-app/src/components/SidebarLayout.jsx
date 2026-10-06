// src/components/SidebarLayout.jsx
import { Link, Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "240px", borderRight: "1px solid #e5e7eb", padding: "1rem" }}>
        <h3>Finxl Placement Platform</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.5rem" }}>
          <Link to="/overview">Overview</Link>
          <Link to="/student-list">Student List</Link>
          <Link to="/live-mocks">Live Mocks</Link>
          <Link to="/student-profile">Student Profile</Link>
          <Link to="/learning-modules">Learning Modules</Link>
          <Link to="/job-portal">Job Portal</Link>
          <Link to="/progress-reports">Progress Reports</Link>
          <Link to="/resume-builder">Resume Builder</Link>
          <Link to="/jd-prep">JD Q&A Generator</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "1.5rem" }}>
        <Outlet />
      </div>
    </div>
  );
}