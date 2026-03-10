"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Copy,
  Building2,
  LayoutDashboard,
  Upload,
  BarChart3,
  FileText,
  Download,
  ClipboardList,
  CreditCard,
  Users,
  CalendarClock,
  Clock,
} from "lucide-react";

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Upload, label: "Upload" },
  { icon: BarChart3, label: "Metrics hub" },
  { icon: Building2, label: "Company data", active: true },
  { icon: FileText, label: "Request" },
  { icon: Download, label: "Exports" },
  { icon: ClipboardList, label: "Audit Log" },
  { icon: CreditCard, label: "Billing" },
];

const adminMenuItems = [
  { icon: Users, label: "Stakeholder" },
  { icon: CalendarClock, label: "Scheduled Exports" },
];

const tabs = ["Board", "Shareholders", "Subsidiaries", "Workforce", "Addresses", "Executive Team"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Board");
  const [showTooltip, setShowTooltip] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const boardData = Array.from({ length: 11 }, () => ({
    name: "Pragati Sharma",
    position: "-",
    appointmentDate: "-",
    status: "Active",
  }));

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F7F9", fontFamily: "'Inter', sans-serif" }}
      onClick={() => statusDropdownOpen && setStatusDropdownOpen(false)}
    >
      {/* Sidebar */}
      <aside style={{ width: 200, backgroundColor: "#1B3A4B", position: "fixed", left: 0, top: 0, height: "100vh", display: "flex", flexDirection: "column", zIndex: 50 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "18px 20px 14px" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#2EC4B6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={16} color="white" strokeWidth={2} />
          </div>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "0.3px" }}>DataOnDeck</span>
        </div>

        {/* Main Menu */}
        <div style={{ marginTop: 8, padding: "0 12px" }}>
          <p style={{ fontSize: 10, color: "#7BA3B5", letterSpacing: "0.8px", textTransform: "uppercase", padding: "0 8px", marginBottom: 6 }}>Main Menu</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: item.active ? "rgba(46,196,182,0.15)" : "transparent", color: item.active ? "#2EC4B6" : "#B0C7D1", fontSize: 12.5, fontWeight: item.active ? 500 : 400, textAlign: "left", width: "100%" }}>
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Administration */}
        <div style={{ marginTop: 20, padding: "0 12px" }}>
          <p style={{ fontSize: 10, color: "#7BA3B5", letterSpacing: "0.8px", textTransform: "uppercase", padding: "0 8px", marginBottom: 6 }}>Administration</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: "transparent", color: "#B0C7D1", fontSize: 12.5, fontWeight: 400, textAlign: "left", width: "100%" }}>
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: 200 }}>
        {/* Header */}
        <header style={{ height: 56, backgroundColor: "#fff", borderBottom: "1px solid #E8EDF0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={16} color="#2EC4B6" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1B3A4B" }}>Company Data</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Settings-like icon */}
            <button style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#F4F7F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A7A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            </button>

            {/* User */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #E8927C, #D4735E)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>MR</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: "#1B3A4B", lineHeight: 1.3 }}>Moni Roy</span>
                <span style={{ fontSize: 11, color: "#8CA3AE", lineHeight: 1.3 }}>Admin</span>
              </div>
              <ChevronDown size={13} color="#8CA3AE" />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #E8EDF0", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {tabs.map((tab) => (
                <div key={tab} style={{ position: "relative" }}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    onMouseEnter={() => tab === "Board" && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    style={{ padding: "12px 14px", fontSize: 12.5, fontWeight: activeTab === tab ? 500 : 400, color: activeTab === tab ? "#1B3A4B" : "#8CA3AE", background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab ? "#2EC4B6" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {tab}
                  </button>
                  {tab === "Board" && showTooltip && (
                    <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 100, backgroundColor: "#1B3A4B", color: "#fff", fontSize: 11, padding: "8px 12px", borderRadius: 6, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", lineHeight: 1.5 }}>
                      Current board composition and<br />appointments
                      <div style={{ position: "absolute", top: -4, left: 18, width: 8, height: 8, backgroundColor: "#1B3A4B", transform: "rotate(45deg)" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Status dropdown */}
              <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", fontSize: 12.5, color: "#5A7A8A", border: "1px solid #D6DEE3", borderRadius: 6, backgroundColor: "#fff", cursor: "pointer" }}
                >
                  {selectedStatus}
                  <ChevronDown size={13} />
                </button>
                {statusDropdownOpen && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 4px)", backgroundColor: "#fff", border: "1px solid #E8EDF0", borderRadius: 8, minWidth: 120, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 100 }}>
                    {["Active", "Draft", "Archived"].map((opt) => (
                      <button key={opt} onClick={() => { setSelectedStatus(opt); setStatusDropdownOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 16px", fontSize: 12.5, color: selectedStatus === opt ? "#2EC4B6" : "#5A7A8A", backgroundColor: selectedStatus === opt ? "#F0FAF9" : "transparent", border: "none", cursor: "pointer" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Manually */}
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", fontSize: 12.5, fontWeight: 500, color: "#1B3A4B", backgroundColor: "#E6F4F1", border: "none", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap" }}>
                Add Manually
                <Pencil size={12} />
              </button>

              {/* Copy icon */}
              <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #D6DEE3", borderRadius: 6, backgroundColor: "#fff", cursor: "pointer" }}>
                <Copy size={14} color="#5A7A8A" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8EDF0" }}>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 11.5, fontWeight: 500, color: "#8CA3AE", width: "30%" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 11.5, fontWeight: 500, color: "#8CA3AE", width: "25%" }}>Position</th>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 11.5, fontWeight: 500, color: "#8CA3AE", width: "25%" }}>Appointment Date</th>
                  <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 11.5, fontWeight: 500, color: "#8CA3AE", width: "20%" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {boardData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < boardData.length - 1 ? "1px solid #F0F3F5" : "none" }}>
                    <td style={{ padding: "9px 20px", fontSize: 12.5, color: "#1B3A4B" }}>{row.name}</td>
                    <td style={{ padding: "9px 20px", fontSize: 12.5, color: "#8CA3AE" }}>{row.position}</td>
                    <td style={{ padding: "9px 20px", fontSize: 12.5, color: "#8CA3AE" }}>{row.appointmentDate}</td>
                    <td style={{ padding: "9px 20px" }}>
                      <span style={{ fontSize: 12.5, color: "#22C55E", fontWeight: 500 }}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderTop: "1px solid #E8EDF0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", fontSize: 12.5, color: "#1B3A4B", border: "1px solid #D6DEE3", borderRadius: 5, backgroundColor: "#fff", cursor: "pointer" }}>
                  10 <ChevronDown size={12} />
                </button>
                <span style={{ fontSize: 12.5, color: "#8CA3AE" }}>Show on page</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 12.5, color: "#8CA3AE", marginRight: 4 }}>Page</span>
                <button style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#8CA3AE" }}>
                  <ChevronLeft size={15} />
                </button>
                <button style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600, color: "#1B3A4B", backgroundColor: "#E6F4F1", border: "none", borderRadius: 5, cursor: "pointer" }}>1</button>
                <span style={{ fontSize: 12.5, color: "#8CA3AE", padding: "0 2px" }}>...</span>
                <button style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, color: "#8CA3AE", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>6</button>
                <span style={{ fontSize: 12.5, color: "#8CA3AE", padding: "0 2px" }}>...</span>
                <button style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, color: "#8CA3AE", border: "none", backgroundColor: "transparent", cursor: "pointer" }}>10</button>
                <button style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#8CA3AE" }}>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}