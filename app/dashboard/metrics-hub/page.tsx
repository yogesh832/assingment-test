"use client";
import React, { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import { ChevronDown, ChevronUp, Search, Settings, MoreVertical, Download, X, ClipboardList, Plus } from "lucide-react";

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

/* ── Dummy metrics data ── */
const quarterList = [
  { label: "2025 – Q4", count: 31 },
  { label: "2025 – Q4", count: 31 },
  { label: "2025 – Q4", count: 31 },
  { label: "2025 – Q4", count: 31 },
];

const metricsData = Array.from({ length: 7 }, (_, i) => ({
  metric: i === 0 ? "Gross Merchandise Value (GMV)" : "Pay Equity Ratio",
  value: i === 0 ? "202882" : "0.5056 %",
  unit: i === 0 ? "$" : "%",
  period: "2025-Q4",
  updatedAt: "14/11/2025",
}));

const versionHistory = [
  { version: "V1", value: "202882", unit: "$", status: "Submitted", badges: ["admin"], date: "29/10/2025, 16:58:36" },
  { version: "V2", value: "202882", unit: "$", status: "Approved", latest: true, badges: ["Unknown", "Status Changed"], date: "29/10/2025, 16:58:36" },
];

const currentVersion = { version: "V4", value: "202882", unit: "$", status: "Approved", current: true, badges: ["Unknown", "Status Changed"], date: "29/10/2025, 16:58:36" };

/* ── Dictionary data ── */
const dictionaryData = [
  { name: "Accounts Payable", definition: "Outstanding bills owed to suppliers or vendors for goods/services received.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Accounts Receivable", definition: "Amounts due from customers for goods/services delivered but not yet paid.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Accrued Expenses", definition: "Expenses incurred but not yet paid (e.g., wages, interest).", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Engagements", definition: "Number of currently active client projects or engagements. (Industry: Business Services)", unit: "Count", category: "Operational", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Active Students", definition: "Number of students currently active on the platform during a reporting period......", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Accounts Payable", definition: "Outstanding bills owed to suppliers or vendors for goods/services received.", unit: "$", category: "financial", created: "21/10/2025" },
];

export default function MetricsHub() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Company Metrics");
  const [selectedQuarter, setSelectedQuarter] = useState(0);
  const [dropdownRow, setDropdownRow] = useState<number | null>(null);
  const [actionHistoryRow, setActionHistoryRow] = useState<number | null>(null);
  const [viewDetailRow, setViewDetailRow] = useState<number | null>(null);
  const [versionOpen, setVersionOpen] = useState(true);
  const [currentOpen, setCurrentOpen] = useState(true);
  const [dictPage, setDictPage] = useState(1);
  const [dictPerPage, setDictPerPage] = useState(10);
  const [dictPerPageOpen, setDictPerPageOpen] = useState(false);
  const [hoveredDefRow, setHoveredDefRow] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [dataMaintOpen, setDataMaintOpen] = useState(false);
  const [showMissingBadge, setShowMissingBadge] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const dictTotalPages = Math.max(1, Math.ceil(dictionaryData.length / dictPerPage));
  const dictPaged = dictionaryData.slice((dictPage - 1) * dictPerPage, dictPage * dictPerPage);
  const getDictPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (dictTotalPages <= 5) { for (let i = 1; i <= dictTotalPages; i++) pages.push(i); }
    else { pages.push(1); if (dictPage > 3) pages.push("..."); for (let i = Math.max(2, dictPage - 1); i <= Math.min(dictTotalPages - 1, dictPage + 1); i++) pages.push(i); if (dictPage < dictTotalPages - 2) pages.push("..."); pages.push(dictTotalPages); }
    return pages;
  };

  const S = {
    // Layout
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

    // Filter row
    filterRow: { display: "flex", gap: 12, padding: "12px 16px 0" } as CSSProperties,
    filterCard: { display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", flex: 1, cursor: "pointer" } as CSSProperties,
    filterIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } as CSSProperties,
    filterLabel: { fontSize: 11, color: "#8CA3AE", lineHeight: 1.3 } as CSSProperties,
    filterValue: { fontSize: 13, fontWeight: 500, color: "#1B3A4B", lineHeight: 1.4 } as CSSProperties,

    // Content area
    contentRow: { display: "flex", gap: 12, padding: "12px 16px", flex: 1, alignItems: "stretch" } as CSSProperties,

    // Left panel
    leftPanel: { width: 220, backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", flexShrink: 0, alignSelf: "flex-start" } as CSSProperties,
    leftTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B", padding: "12px 14px 8px" } as CSSProperties,
    qItem: (active: boolean): CSSProperties => ({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", cursor: "pointer", backgroundColor: active ? "#2EC4B6" : "transparent", color: active ? "#fff" : "#1B3A4B", borderRadius: active ? 6 : 0, margin: active ? "0 6px" : 0 }),
    qLabel: { fontSize: 12.5 } as CSSProperties,
    qCount: (active: boolean): CSSProperties => ({ fontSize: 11, color: active ? "#fff" : "#8CA3AE", fontWeight: 500 }),

    // Right panel
    rightPanel: { flex: 1, backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", display: "flex", flexDirection: "column" } as CSSProperties,
    rightHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" } as CSSProperties,
    rightTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    exportBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", fontSize: 12, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer" } as CSSProperties,

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
    modal: { backgroundColor: "#fff", borderRadius: 14, width: 420, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 40px rgba(0,0,0,0.15)", padding: "24px 28px" } as CSSProperties,
    modalHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 } as CSSProperties,
    modalTitle: { fontSize: 16, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    modalSub: { fontSize: 12, color: "#8CA3AE", marginTop: 2 } as CSSProperties,
    closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 2 } as CSSProperties,

    // Action History modal
    ahCenter: { display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 0 10px", gap: 10 } as CSSProperties,
    ahIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#F4F7F9", display: "flex", alignItems: "center", justifyContent: "center" } as CSSProperties,
    ahTitle: { fontSize: 14, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    ahEmpty: { fontSize: 12, color: "#8CA3AE" } as CSSProperties,

    // View Detail modal
    badge: (bg: string, color: string): CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, backgroundColor: bg, color, marginRight: 6, lineHeight: "18px" }),
    statusDot: (c: string): CSSProperties => ({ display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: c, marginRight: 5, verticalAlign: "middle" }),
    sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 8px", cursor: "pointer" } as CSSProperties,
    sectionTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    vCard: { padding: "12px 0", borderBottom: "1px solid #F0F3F5" } as CSSProperties,
    vLabel: { fontSize: 12, fontWeight: 600, color: "#1B3A4B", marginBottom: 4 } as CSSProperties,
    vValue: { fontSize: 16, fontWeight: 700, color: "#1B3A4B" } as CSSProperties,
    vUnit: { fontSize: 13, fontWeight: 400, color: "#8CA3AE", marginLeft: 4 } as CSSProperties,
    tagPill: { display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, backgroundColor: "#F0F3F5", color: "#5A6B7A", marginRight: 6, lineHeight: "18px" } as CSSProperties,

    // Dictionary styles
    dictWrap: { flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column" } as CSSProperties,
    dictCard: { backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", flex: 1, display: "flex", flexDirection: "column" } as CSSProperties,
    dictHeaderRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", gap: 10 } as CSSProperties,
    missingBadge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", fontSize: 12, fontWeight: 500, color: "#2EC4B6", backgroundColor: "#E6F7F5", border: "1px solid #C4EDE8", borderRadius: 6, cursor: "default" } as CSSProperties,
    missingX: { background: "none", border: "none", cursor: "pointer", color: "#2EC4B6", fontSize: 14, lineHeight: 1, padding: 0, marginLeft: 2 } as CSSProperties,
    dataMaintBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", fontSize: 12, fontWeight: 500, color: "#1B3A4B", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 6, cursor: "pointer", position: "relative" } as CSSProperties,
    dataMaintDrop: { position: "absolute", top: "calc(100% + 4px)", right: 0, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", zIndex: 200, minWidth: 160, overflow: "hidden" } as CSSProperties,
    dataMaintItem: { display: "block", width: "100%", padding: "10px 18px", fontSize: 12.5, color: "#1B3A4B", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", whiteSpace: "nowrap" } as CSSProperties,
    addMetricsBtn: { display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 18px", fontSize: 12, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer" } as CSSProperties,
    defTooltip: { position: "fixed", zIndex: 9999, backgroundColor: "#fff", color: "#3A4F5C", fontSize: 11.5, padding: "10px 14px", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", width: 240, lineHeight: 1.5, pointerEvents: "none", animation: "tooltipFadeIn 0.18s ease" } as CSSProperties,
    pgRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", borderTop: "1px solid #E8EDF0", marginTop: "auto" } as CSSProperties,
    pgBtn: { display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", fontSize: 12.5, color: "#2EC4B6", border: "1px solid #D6DEE3", borderRadius: 5, backgroundColor: "#fff", cursor: "pointer" } as CSSProperties,
    pgNum: (active: boolean): CSSProperties => ({ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: active ? 500 : 400, color: active ? "#1B3A4B" : "#8CA3AE", backgroundColor: "#fff", border: active ? "1px solid #E0E5E9" : "none", borderRadius: 6, cursor: "pointer", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }),
    pgDots: { fontSize: 12.5, color: "#8CA3AE", padding: "0 4px" } as CSSProperties,
    pgLabel: { fontSize: 12.5, color: "#8CA3AE" } as CSSProperties,
    pgArrow: { width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#2EC4B6", fontSize: 11 } as CSSProperties,
  };

  return (
    <div style={S.root}>
      {/* ── CSS KEYFRAMES ── */}
      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes expandSlide {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 120px; }
        }
        .dict-row { transition: background-color 0.18s ease; }
        .dict-row:hover { background-color: #EEF6F7 !important; }
        .expand-row { animation: expandSlide 0.28s cubic-bezier(0.4,0,0.2,1) forwards; }
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

      {/* SIDEBAR TOGGLE */}
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
            {activeTab === "Metrics Dictionary" && (
              <>
                {showMissingBadge && (
                  <span style={S.missingBadge}>Missing units 22 <button style={S.missingX} onClick={() => setShowMissingBadge(false)}>×</button></span>
                )}
                <div style={{ position: "relative" }}>
                  <button style={S.dataMaintBtn} onClick={() => setDataMaintOpen(!dataMaintOpen)}>Data Maintenance <ChevronDown size={12} /></button>
                  {dataMaintOpen && (
                    <div style={S.dataMaintDrop}>
                      <button style={S.dataMaintItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => setDataMaintOpen(false)}>Backfill from aso</button>
                      <button style={S.dataMaintItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => setDataMaintOpen(false)}>Backfill Unit</button>
                    </div>
                  )}
                </div>
              </>
            )}
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
        <div style={{ ...S.tabsBar, justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {tabs.map(tab => (
              <button key={tab} style={S.tabBtn(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
          {activeTab === "Metrics Dictionary" && (
            <button style={S.addMetricsBtn}><Plus size={14} /> Add Metrics</button>
          )}
        </div>

        {activeTab === "Company Metrics" && (
          <>
        {/* FILTER ROW */}
        <div style={S.filterRow}>
          <div style={S.filterCard}>
            <div style={S.filterIcon}>
              <Image src="/dasboard/schedular.png" alt="Period" width={20} height={20} />
            </div>
            <div>
              <div style={S.filterLabel}>Period Type</div>
              <div style={S.filterValue}>Quarter</div>
            </div>
            <ChevronDown size={16} color="#8CA3AE" style={{ marginLeft: "auto" }} />
          </div>
          <div style={S.filterCard}>
            <div style={S.filterIcon}>
              <Image src="/dasboard/schedular.png" alt="Year" width={20} height={20} />
            </div>
            <div>
              <div style={S.filterLabel}>Year</div>
              <div style={S.filterValue}>2026</div>
            </div>
            <ChevronDown size={16} color="#8CA3AE" style={{ marginLeft: "auto" }} />
          </div>
        </div>

        {/* CONTENT: Left list + Right table */}
        <div style={S.contentRow}>
          {/* Left Panel */}
          <div style={S.leftPanel}>
            <div style={S.leftTitle}>2025-Q4 Metrics</div>
            {quarterList.map((q, i) => (
              <div key={i} style={S.qItem(selectedQuarter === i)} onClick={() => setSelectedQuarter(i)}>
                <span style={S.qLabel}>{q.label}</span>
                <span style={S.qCount(selectedQuarter === i)}>{q.count} metrics</span>
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div style={S.rightPanel}>
            <div style={S.rightHeader}>
              <span style={S.rightTitle}>2025-Q4 Metrics</span>
              <button style={S.exportBtn}><span>Export</span><Download size={13} /></button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8EDF0", backgroundColor: "#EEF6F7" }}>
                  <th style={{ ...S.th, width: "25%" }}>Metric</th>
                  <th style={{ ...S.th, width: "15%" }}>Value</th>
                  <th style={{ ...S.th, width: "20%" }}>Period</th>
                  <th style={{ ...S.th, width: "25%" }}>Updated At</th>
                  <th style={{ ...S.th, width: "15%" }}>Action</th>
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
                      <button style={S.actionBtn} onClick={() => setDropdownRow(dropdownRow === idx ? null : idx)}><MoreVertical size={15} /></button>
                      {dropdownRow === idx && (
                        <div style={S.dropdown}>
                          <button style={S.dropItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => { setDropdownRow(null); setViewDetailRow(idx); }}>View</button>
                          <button style={S.dropItem} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F4F7F9")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")} onClick={() => { setDropdownRow(null); setActionHistoryRow(idx); }}>Export</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* ── METRICS DICTIONARY TAB ── */}
        {activeTab === "Metrics Dictionary" && (
          <div style={S.dictWrap}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 0 6px", fontSize: 12, color: "#8CA3AE" }}>Metrics Dictionary: {dictionaryData.length} metrics</div>
            <div style={S.dictCard}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #E8EDF0", backgroundColor: "#EEF6F7" }}>
                    <th style={{ ...S.th, width: "14%" }}>Name</th>
                    <th style={{ ...S.th, width: "36%" }}>Definition</th>
                    <th style={{ ...S.th, width: "8%" }}>Unit</th>
                    <th style={{ ...S.th, width: "12%" }}>Category</th>
                    <th style={{ ...S.th, width: "14%" }}>Created</th>
                    <th style={{ ...S.th, width: "10%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dictPaged.map((row, idx) => {
                    const globalIdx = (dictPage - 1) * dictPerPage + idx;
                    const isExpanded = expandedRow === globalIdx;
                    return (
                    <React.Fragment key={idx}>
                    <tr className="dict-row" style={{ borderBottom: isExpanded ? "none" : (idx < dictPaged.length - 1 ? "1px solid #F0F3F5" : "none"), backgroundColor: isExpanded ? "#EEF6F7" : (idx % 2 === 0 ? "#F7FBFB" : "#fff"), cursor: "pointer" }} onClick={() => setExpandedRow(isExpanded ? null : globalIdx)}>
                      <td style={{ ...S.td, display: "flex", alignItems: "center", gap: 6 }}>
                        <ChevronDown size={16} color="#8CA3AE" style={{ cursor: "pointer", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)" }} />
                        {row.name}
                      </td>
                      <td style={{ ...S.tdMuted, cursor: "default" }}
                        onMouseEnter={(e) => { e.stopPropagation(); setHoveredDefRow(idx); const r = e.currentTarget.getBoundingClientRect(); setTooltipPos({ x: r.left, y: r.bottom + 4 }); }}
                        onMouseLeave={() => setHoveredDefRow(null)}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: 340 }}>{row.definition}</span>
                      </td>
                      <td style={S.tdMuted}>{row.unit}</td>
                      <td style={S.tdMuted}>{row.category}</td>
                      <td style={S.tdMuted}>{row.created}</td>
                      <td style={S.td}><button style={S.actionBtn} onClick={(e) => e.stopPropagation()}><MoreVertical size={15} /></button></td>
                    </tr>
                    {isExpanded && (
                      <tr className="expand-row" style={{ backgroundColor: "#F7F9FA", borderBottom: "1px solid #E8EDF0" }}>
                        <td colSpan={6} style={{ padding: "8px 16px 12px 42px", border: "none", fontSize: 12.5, color: "#5A6B7A", lineHeight: 1.7 }}>{row.definition}</td>
                      </tr>
                    )}
                    </React.Fragment>
                    );
                  })}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div style={S.pgRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, position: "relative" }}>
                  <button style={S.pgBtn} onClick={() => setDictPerPageOpen(!dictPerPageOpen)}>{dictPerPage} <ChevronDown size={12} /></button>
                  {dictPerPageOpen && (
                    <div style={{ position: "absolute", bottom: "calc(100% + 4px)", left: 0, backgroundColor: "#fff", border: "1px solid #E8EDF0", borderRadius: 7, boxShadow: "0 4px 14px rgba(0,0,0,0.09)", overflow: "hidden", zIndex: 300 }}>
                      {[5, 10, 20, 50].map(n => (
                        <button key={n} style={{ display: "block", width: "100%", textAlign: "left" as const, padding: "8px 20px", fontSize: 12, color: dictPerPage === n ? "#2EC4B6" : "#5A6B7A", backgroundColor: dictPerPage === n ? "#F0FAF9" : "transparent", border: "none", cursor: "pointer" }}
                          onClick={() => { setDictPerPage(n); setDictPage(1); setDictPerPageOpen(false); }}>{n}</button>
                      ))}
                    </div>
                  )}
                  <span style={S.pgLabel}>Show on page</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ ...S.pgLabel, marginRight: 5 }}>Page</span>
                  <button style={S.pgArrow} disabled={dictPage === 1} onClick={() => setDictPage(p => p - 1)}>◀</button>
                  {getDictPageNumbers().map((p, i) =>
                    typeof p === "string"
                      ? <span key={`d${i}`} style={S.pgDots}>{p}</span>
                      : <button key={p} style={S.pgNum(dictPage === p)} onClick={() => setDictPage(p)}>{p}</button>
                  )}
                  <button style={S.pgArrow} disabled={dictPage === dictTotalPages} onClick={() => setDictPage(p => p + 1)}>▶</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DEFINITION TOOLTIP */}
      {hoveredDefRow !== null && dictPaged[hoveredDefRow] && (
        <div style={{ ...S.defTooltip, left: tooltipPos.x, top: tooltipPos.y }}>{dictPaged[hoveredDefRow].definition}</div>
      )}

      {/* ── ACTION HISTORY MODAL ── */}
      {actionHistoryRow !== null && (
        <div style={{ ...S.overlay, animation: "overlayFadeIn 0.2s ease" }} onClick={() => setActionHistoryRow(null)}>
          <div style={{ ...S.modal, animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }} onClick={e => e.stopPropagation()}>
            <div style={S.modalHeader}>
              <span style={S.modalTitle}>{metricsData[actionHistoryRow].metric}</span>
              <button style={S.closeBtn} onClick={() => setActionHistoryRow(null)}><X size={18} /></button>
            </div>
            <div style={S.ahCenter}>
              <div style={S.ahIcon}><ClipboardList size={22} color="#8CA3AE" /></div>
              <span style={S.ahTitle}>Action History</span>
              <span style={S.ahEmpty}>No action history available</span>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW DETAIL MODAL ── */}
      {viewDetailRow !== null && (() => {
        const m = metricsData[viewDetailRow];
        return (
          <div style={{ ...S.overlay, animation: "overlayFadeIn 0.2s ease" }} onClick={() => setViewDetailRow(null)}>
            <div style={{ ...S.modal, width: 460, animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }} onClick={e => e.stopPropagation()}>
              <div style={S.modalHeader}>
                <div>
                  <div style={S.modalTitle}>{m.metric}</div>
                  <div style={S.modalSub}>{m.period}</div>
                </div>
                <button style={S.closeBtn} onClick={() => setViewDetailRow(null)}><X size={18} /></button>
              </div>

              {/* Current Value */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#8CA3AE", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>Current Value <span style={S.badge("#2EC4B6", "#fff")}>Latest</span></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                  <span style={S.vValue}>{m.value}</span>
                  <span style={S.vUnit}>{m.unit}</span>
                  <span style={{ ...S.statusDot("#2EC4B6"), marginLeft: 10 }} />
                  <span style={{ fontSize: 12, color: "#1B3A4B" }}>Approved</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={S.tagPill}>Unknown</span>
                  <span style={S.tagPill}>01/11/2025, 00:33:11</span>
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #F0F3F5", margin: "8px 0" }} />

              {/* Version History */}
              <div style={S.sectionHeader} onClick={() => setVersionOpen(!versionOpen)}>
                <span style={S.sectionTitle}>Version History ({versionHistory.length} versions)</span>
                {versionOpen ? <ChevronUp size={16} color="#8CA3AE" /> : <ChevronDown size={16} color="#8CA3AE" />}
              </div>
              {versionOpen && versionHistory.map((v, i) => (
                <div key={i} style={S.vCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={S.vLabel}>{v.version}</span>
                    {v.latest && <span style={S.badge("#2EC4B6", "#fff")}>Latest</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1B3A4B" }}>{v.value}</span>
                    <span style={{ fontSize: 12, color: "#8CA3AE" }}>{v.unit}</span>
                    <span style={{ ...S.statusDot(v.status === "Approved" ? "#2EC4B6" : "#F0AD4E"), marginLeft: 10 }} />
                    <span style={{ fontSize: 12, color: "#1B3A4B" }}>{v.status}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {v.badges.map((b, bi) => <span key={bi} style={S.tagPill}>{b}</span>)}
                    <span style={S.tagPill}>{v.date}</span>
                  </div>
                </div>
              ))}

              <hr style={{ border: "none", borderTop: "1px solid #F0F3F5", margin: "8px 0" }} />

              {/* Current */}
              <div style={S.sectionHeader} onClick={() => setCurrentOpen(!currentOpen)}>
                <span style={S.sectionTitle}>Current</span>
                {currentOpen ? <ChevronUp size={16} color="#8CA3AE" /> : <ChevronDown size={16} color="#8CA3AE" />}
              </div>
              {currentOpen && (
                <div style={{ ...S.vCard, borderBottom: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={S.vLabel}>{currentVersion.version}</span>
                    <span style={S.badge("#2EC4B6", "#fff")}>Current</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1B3A4B" }}>{currentVersion.value}</span>
                    <span style={{ fontSize: 12, color: "#8CA3AE" }}>{currentVersion.unit}</span>
                    <span style={{ ...S.statusDot("#2EC4B6"), marginLeft: 10 }} />
                    <span style={{ fontSize: 12, color: "#1B3A4B" }}>{currentVersion.status}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {currentVersion.badges.map((b, bi) => <span key={bi} style={S.tagPill}>{b}</span>)}
                    <span style={S.tagPill}>{currentVersion.date}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
