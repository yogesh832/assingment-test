"use client";
import React, { useState, useEffect, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import { ChevronDown, Search, Settings, MoreVertical, Download, X } from "lucide-react";

/* ── Sidebar data ── */
const sidebarRoutes: Record<string, string> = {
  "Company data": ROUTES.DASHBOARD.COMPANY_DETAILS,
  "Metrics hub": ROUTES.DASHBOARD.METRICS_HUB,
};
const mainMenuItems = [
  { icon: "/dasboard/dashboard.png", label: "Dashboard" },
  { icon: "/dasboard/upload.png", label: "Upload" },
  { icon: "/dasboard/mattrix.png", label: "Metrics hub", active: true },
  { icon: "/dasboard/company.png", label: "Company data" },
  { icon: "/dasboard/request.png", label: "Request" },
  { icon: "/dasboard/file-export-alt.png", label: "Exports" },
  { icon: "/dasboard/audit.png", label: "Audit Log" },
  { icon: "/dasboard/billing.png", label: "Billing" },
];
const adminMenuItems = [
  { icon: "/dasboard/stakeholder.png", label: "Stakeholder" },
  { icon: "/dasboard/schedular.png", label: "Scheduled Exports" },
];

/* ── Tabs ── */
const tabs = ["Company Metrics", "Metrics Dictionary"];

/* ── Data ── */
const quarterList = [
  { label: "2025 – Q4", count: "31/31" },
  { label: "2025 – Q3", count: "31/31" },
  { label: "2025 – Q2", count: "31/31" },
  { label: "2025 – Q1", count: "31/31" },
];

const metricsData = Array.from({ length: 7 }, () => ({
  metric: "Pay Equity Ratio",
  value: "0.5056 %",
  period: "2025-Q4",
  updatedAt: "14/11/2025",
}));

export default function MetricsRedirection() {
  const router = useRouter();
  const [selectedQuarter, setSelectedQuarter] = useState(0);
  const [dropdownRow, setDropdownRow] = useState<number | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = () => setDropdownRow(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const S = {
    root: { display: "flex", height: "100vh", backgroundColor: "#F4F7F9", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "100%" } as CSSProperties,
    mainCol: { flex: 1, marginLeft: 220, display: "flex", flexDirection: "column", overflow: "auto" } as CSSProperties,

    // Sidebar
    aside: { width: 220, backgroundColor: "#fff", position: "fixed", left: 0, top: 0, height: "100vh", display: "flex", flexDirection: "column", zIndex: 50, borderRight: "1px solid #E8EDF0", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    logoWrap: { display: "flex", alignItems: "center", gap: 10, padding: "20px 20px 18px" } as CSSProperties,
    logoCircle: { width: 34, height: 34, borderRadius: "50%", overflow: "hidden", flexShrink: 0 } as CSSProperties,
    logoText: { color: "#1B3A4B", fontSize: 14, fontWeight: 700, letterSpacing: "0.2px" } as CSSProperties,
    menuSection: { padding: "0 14px", marginTop: 10 } as CSSProperties,
    menuLabel: { fontSize: 10, color: "#8CA3AE", letterSpacing: "0.5px", fontWeight: 600, padding: "0 8px", marginBottom: 10, display: "block", lineHeight: "21px" } as CSSProperties,
    menuBtn: (active: boolean | undefined): CSSProperties => ({ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? "linear-gradient(to right, #D8F0ED 0%, #E6F7F5 50%, #FFFFFF 75%)" : "transparent", color: active ? "#1B3A4B" : "#5A6B7A", fontSize: 12, fontWeight: active ? 500 : 400, textAlign: "left", width: "100%", marginBottom: 2, position: "relative", lineHeight: "21px", verticalAlign: "middle" }),
    menuBtnBar: { position: "absolute", left: 0, top: 5, bottom: 5, width: 4, borderRadius: 4, backgroundColor: "#2EC4B6" } as CSSProperties,

    // Header
    header: { height: 56, backgroundColor: "#fff", borderBottom: "1px solid #E8EDF0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 } as CSSProperties,
    headerLeft: { display: "flex", alignItems: "center", gap: 12 } as CSSProperties,
    headerToggle: { width: 22, height: 22, cursor: "pointer", position: "absolute", left: 209, top: 17, zIndex: 60, borderRadius: "50%", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" } as CSSProperties,
    headerTitle: { fontSize: 15, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    searchWrap: { display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", backgroundColor: "#F4F7F9", borderRadius: 8, border: "1px solid #E8EDF0", width: 280 } as CSSProperties,
    searchInput: { border: "none", outline: "none", backgroundColor: "transparent", fontSize: 12.5, color: "#1B3A4B", flex: 1, fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    headerRight: { display: "flex", alignItems: "center", gap: 12 } as CSSProperties,
    gearBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: "#F4F7F9", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" } as CSSProperties,
    avatar: { width: 36, height: 36, borderRadius: "50%", objectFit: "cover" } as CSSProperties,
    userName: { fontSize: 13, fontWeight: 500, color: "#1B3A4B", lineHeight: 1.3 } as CSSProperties,
    userRole: { fontSize: 11, color: "#8CA3AE", lineHeight: 1.3 } as CSSProperties,

    // Tabs
    tabsBar: { backgroundColor: "#fff", borderBottom: "1px solid #E8EDF0", padding: "0 24px", display: "flex", alignItems: "center", flexShrink: 0 } as CSSProperties,
    tabBtn: (active: boolean): CSSProperties => ({ padding: "13px 14px 11px", fontSize: 13, fontWeight: active ? 500 : 400, color: active ? "#1B3A4B" : "#8CA3AE", background: "none", border: "none", borderBottom: `2px solid ${active ? "#2EC4B6" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap" }),

    // Filter cards
    filterRow: { display: "flex", gap: 12, padding: "14px 16px 0" } as CSSProperties,
    filterCard: { display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", flex: 1, cursor: "pointer", justifyContent: "space-between" } as CSSProperties,
    filterIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } as CSSProperties,
    filterLabel: { fontSize: 11, color: "#8CA3AE", lineHeight: 1.3 } as CSSProperties,
    filterValue: { fontSize: 13, fontWeight: 500, color: "#1B3A4B", lineHeight: 1.4 } as CSSProperties,

    // Content area
    contentRow: { display: "flex", gap: 10, padding: "12px 16px", flex: 1, alignItems: "flex-start" } as CSSProperties,

    // Left panel
    leftPanel: { width: 210, backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", flexShrink: 0, alignSelf: "flex-start" } as CSSProperties,
    leftTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B", padding: "12px 14px 8px" } as CSSProperties,
    qItem: (active: boolean): CSSProperties => ({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", cursor: "pointer", backgroundColor: active ? "#2EC4B6" : "transparent", color: active ? "#fff" : "#1B3A4B", borderRadius: active ? 7 : 0, margin: active ? "2px 6px" : "0", transition: "background-color 0.15s ease" }),
    qLabel: { fontSize: 12 } as CSSProperties,
    qCount: (active: boolean): CSSProperties => ({ fontSize: 10.5, color: active ? "rgba(255,255,255,0.85)" : "#8CA3AE", fontWeight: 500 }),

    // Right panel
    rightPanel: { flex: 1, backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", display: "flex", flexDirection: "column" } as CSSProperties,
    rightHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 10px" } as CSSProperties,
    rightTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    exportBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", fontSize: 12, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer" } as CSSProperties,

    // Table
    th: { textAlign: "left" as const, padding: "9px 16px", fontSize: 12, fontWeight: 500, color: "#8CA3AE" },
    td: { padding: "9px 16px", fontSize: 12.5, color: "#1B3A4B" } as CSSProperties,
    tdMuted: { padding: "9px 16px", fontSize: 12.5, color: "#8CA3AE" } as CSSProperties,
    actionBtn: { background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 4 } as CSSProperties,

    // Dropdown
    dropdown: { position: "absolute", right: 20, top: "100%", marginTop: 4, backgroundColor: "#fff", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", zIndex: 200, minWidth: 130, overflow: "hidden" } as CSSProperties,
    dropItem: { display: "block", width: "100%", padding: "10px 18px", fontSize: 13, color: "#1B3A4B", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,

    // Modal overlay
    overlay: { position: "fixed", inset: 0, backgroundColor: "#4D4A5433", backdropFilter: "blur(14px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" } as CSSProperties,
    closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 2 } as CSSProperties,
  };

  return (
    <div style={S.root}>
      <style>{`
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes overlayFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={S.aside}>
        <div style={S.logoWrap}>
          <div style={S.logoCircle}><Image src="/dasboard/fi_6102666.png" alt="Logo" width={34} height={34} /></div>
          <span style={S.logoText}>DataOnDeck</span>
        </div>
        <div style={{ ...S.menuSection, marginTop: 14 }}>
          <span style={S.menuLabel}>Main Menu</span>
          {mainMenuItems.map(({ icon, label, active }) => (
            <button key={label} style={S.menuBtn(active)} onClick={() => { const route = sidebarRoutes[label]; if (route) router.push(route); }}>
              {active && <span style={S.menuBtnBar} />}
              <Image src={icon} alt={label} width={17} height={17} /><span>{label}</span>
            </button>
          ))}
        </div>
        <div style={{ ...S.menuSection, marginTop: 24 }}>
          <span style={S.menuLabel}>Administration</span>
          {adminMenuItems.map(({ icon, label }) => (
            <button key={label} style={S.menuBtn(false)} onClick={() => { const route = sidebarRoutes[label]; if (route) router.push(route); }}>
              <Image src={icon} alt={label} width={17} height={17} /><span>{label}</span>
            </button>
          ))}
        </div>
      </aside>

      <Image src="/dasboard/Sidebar Toggle.png" alt="Toggle sidebar" width={28} height={28} style={S.headerToggle} />

      {/* ── MAIN COLUMN ── */}
      <div style={S.mainCol}>
        {/* HEADER */}
        <header style={S.header}>
          <div style={S.headerLeft}>
            <span style={S.headerTitle}>Metrics hub</span>
            <div style={S.searchWrap}>
              <Search size={14} color="#8CA3AE" />
              <input style={S.searchInput} placeholder="Search metrics, companies...." />
            </div>
          </div>
          <div style={S.headerRight}>
            <button style={S.gearBtn}><Settings size={15} color="#5A7A8A" /></button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Image src="/dasboard/95bca3ecaf6d28d115834f85b6163b6e58e91c7c.png" alt="Avatar" width={36} height={36} style={S.avatar} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={S.userName}>Moni Roy</span>
                <span style={S.userRole}>Admin</span>
              </div>
              <ChevronDown size={13} color="#8CA3AE" />
            </div>
          </div>
        </header>

        {/* TABS */}
        <div style={S.tabsBar}>
          {tabs.map(tab => (
            <button key={tab} style={S.tabBtn(tab === "Company Metrics")} onClick={() => router.push(ROUTES.DASHBOARD.METRICS_HUB)}>{tab}</button>
          ))}
        </div>

        {/* CONTENT: Left list + Right table */}
        <div style={S.contentRow}>
          {/* Left Panel */}
          <div style={S.leftPanel}>
            <div style={{ padding: "10px 14px 6px", fontSize: 11, color: "#8CA3AE", lineHeight: 1.5 }}>Final, approved metrics for the selected reporting period</div>
            <div style={{ padding: "2px 0 6px" }}>
              {quarterList.map((q, i) => (
                <div key={i} style={S.qItem(selectedQuarter === i)} onClick={() => setSelectedQuarter(i)}>
                  <span style={S.qLabel}>{q.label}</span>
                  <span style={S.qCount(selectedQuarter === i)}>{q.count} metrics</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div style={S.rightPanel}>
            <div style={S.rightHeader}>
              <span style={S.rightTitle}>2025-Q4 Metrics</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", fontSize: 12, fontWeight: 500, color: "#5A6B7A", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 7, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}>All Status <ChevronDown size={12} /></button>
                <button style={S.exportBtn}><span>Export</span><Download size={13} /></button>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8EDF0", backgroundColor: "#EEF6F7" }}>
                  <th style={{ ...S.th, width: "22%" }}>Metric</th>
                  <th style={{ ...S.th, width: "16%" }}>Value</th>
                  <th style={{ ...S.th, width: "18%" }}>Period</th>
                  <th style={{ ...S.th, width: "22%" }}>Updated At</th>
                  <th style={{ ...S.th, width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {metricsData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < metricsData.length - 1 ? "1px solid #F0F3F5" : "none", backgroundColor: idx % 2 === 0 ? "#F7FBFB" : "#fff" }}>
                    <td style={S.td}>{row.metric}</td>
                    <td style={S.tdMuted}>{row.value}</td>
                    <td style={S.tdMuted}>{row.period}</td>
                    <td style={S.tdMuted}>{row.updatedAt}</td>
                    <td style={{ ...S.td, position: "relative" }}>
                      <button style={S.actionBtn} onClick={(e) => { e.stopPropagation(); setDropdownRow(dropdownRow === idx ? null : idx); }}><MoreVertical size={15} /></button>
                      {dropdownRow === idx && (
                        <div style={S.dropdown}>
                          <button style={S.dropItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => setDropdownRow(null)}>Edit</button>
                          <button style={S.dropItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => { setDropdownRow(null); router.push(ROUTES.DASHBOARD.METRICS_HUB); }}>Redirection</button>
                          <button style={S.dropItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => { setDropdownRow(null); setDeleteConfirmName(row.metric); }}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmName !== null && (
        <div style={{ ...S.overlay, animation: "overlayFadeIn 0.2s ease" }} onClick={() => setDeleteConfirmName(null)}>
          <div style={{ backgroundColor: "#fff", borderRadius: 14, width: 460, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", padding: 0, animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 24px 0" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#FEE9E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E25C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
              </div>
              <button style={S.closeBtn} onClick={() => setDeleteConfirmName(null)}><X size={18} /></button>
            </div>
            <div style={{ padding: "16px 24px 20px" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1B3A4B", marginBottom: 6 }}>Delete Metric Definition?</div>
              <div style={{ fontSize: 12.5, color: "#8CA3AE", lineHeight: 1.5 }}>Are you sure you want to delete &ldquo;{deleteConfirmName}&rdquo;? This action cannot be undone.</div>
            </div>
            <div style={{ display: "flex", gap: 12, padding: "0 24px 22px" }}>
              <button style={{ flex: 1, padding: "10px 0", fontSize: 13, fontWeight: 500, color: "#5A6B7A", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }} onClick={() => setDeleteConfirmName(null)}>Cancel</button>
              <button style={{ flex: 1, padding: "10px 0", fontSize: 13, fontWeight: 500, color: "#fff", backgroundColor: "#E25C5C", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }} onClick={() => setDeleteConfirmName(null)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
