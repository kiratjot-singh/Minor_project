import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ListChecks, Activity, History, FileCheck2, Settings, CircleHelp } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/test-builder", icon: ListChecks, label: "Test Builder" },
    { to: "/test-runs", icon: Activity, label: "Test Runs" },
    { to: "/test-history", icon: History, label: "History" },
    { to: "/reports", icon: FileCheck2, label: "Reports" },
    { to: "/settings", icon: Settings, label: "Settings" }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Sparkles size={19}/></div>
        <span>TestForge</span>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <item.icon size={19}/><span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="icon-button"><CircleHelp size={18}/></button>
        <div className="profile">
          <div className="avatar">AS</div>
          <div><strong>Ananya Singh</strong><small>QA Engineer</small></div>
        </div>
      </div>
    </aside>
  );
}
