"use client";
import React, { useState, useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import { ChevronDown, ChevronUp, Search, Settings, MoreVertical, Download, X, ClipboardList, Plus, Upload, FileText } from "lucide-react";

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

const tabs = ["Company Metrics", "Metrics Dictionary"];

const quarterList = [
  { label: "2025 – Q4", count: "31/31" },
  { label: "2025 – Q3", count: "31/31" },
  { label: "2025 – Q2", count: "31/31" },
  { label: "2025 – Q1", count: "31/31" },
];

const metricsData = Array.from({ length: 7 }, () => ({
  metric: "Pay Equity Ratio",
  value: "0.5056 %",
  unit: "%",
  period: "2025-Q4",
  updatedAt: "14/11/2025",
}));

const versionHistory = [
  { version: "V1", value: "202882", unit: "$", status: "Submitted", badges: ["admin"], date: "29/10/2025, 16:58:36" },
  { version: "V2", value: "202882", unit: "$", status: "Approved", latest: true, badges: ["Unknown", "Status Changed"], date: "29/10/2025, 16:58:36" },
];

const currentVersion = { version: "V4", value: "202882", unit: "$", status: "Approved", current: true, badges: ["Unknown", "Status Changed"], date: "29/10/2025, 16:58:36" };

const categoryTree = [
  { name: "Financial", items: ["Accounts Payable", "Accounts Receivable", "Accrued Expenses", "Revenue", "Operating Expenses"] },
  { name: "Operational", items: ["Active Engagements", "Active Students", "Employee Count", "Customer Retention"] },
  { name: "Metrics/Ratios", items: ["Pay Equity Ratio", "Gross Margin", "Net Margin"] },
  { name: "Compliance", items: ["Audit Score", "Risk Rating"] },
];

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
  { name: "Advertising Spend", definition: "Total expenditure on advertising campaigns across all channels.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Annual Revenue", definition: "Total revenue generated by the company over a fiscal year.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Asset Turnover", definition: "Ratio of revenue to total assets, indicating efficiency of asset use.", unit: "%", category: "financial", created: "21/10/2025" },
  { name: "Average Order Value", definition: "The average monetary value of each customer order.", unit: "$", category: "Operational", created: "21/10/2025" },
  { name: "Bad Debt Expense", definition: "Estimated uncollectible accounts receivable written off as expense.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Board Diversity", definition: "Percentage of board members from underrepresented groups.", unit: "%", category: "Operational", created: "21/10/2025" },
  { name: "Capital Expenditure", definition: "Funds used by the company to acquire or upgrade physical assets.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Cash Flow from Operations", definition: "Net cash generated from primary business activities.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Customer Acquisition Cost", definition: "Average cost to acquire a new customer including marketing and sales.", unit: "$", category: "Operational", created: "21/10/2025" },
  { name: "Customer Churn Rate", definition: "Percentage of customers who stop using the service in a given period.", unit: "%", category: "Operational", created: "21/10/2025" },
  { name: "Customer Lifetime Value", definition: "Predicted total revenue from a customer over the entire relationship.", unit: "$", category: "Operational", created: "21/10/2025" },
  { name: "Customer Satisfaction", definition: "Score measuring how products and services meet customer expectations.", unit: "Count", category: "Operational", created: "21/10/2025" },
  { name: "Debt-to-Equity Ratio", definition: "Proportion of company financing from debt vs shareholders equity.", unit: "%", category: "financial", created: "21/10/2025" },
  { name: "Depreciation", definition: "Systematic allocation of the cost of a tangible asset over its useful life.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "EBITDA", definition: "Earnings before interest, taxes, depreciation, and amortization.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Employee Count", definition: "Total number of full-time equivalent employees at end of period.", unit: "Count", category: "Operational", created: "21/10/2025" },
  { name: "Employee Turnover Rate", definition: "Percentage of employees who leave the organization during a period.", unit: "%", category: "Operational", created: "21/10/2025" },
  { name: "Gross Margin", definition: "Revenue minus cost of goods sold, expressed as percentage of revenue.", unit: "%", category: "financial", created: "21/10/2025" },
  { name: "Gross Merchandise Value", definition: "Total value of merchandise sold through the platform over a period.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Inventory Turnover", definition: "Number of times inventory is sold and replaced over a period.", unit: "Count", category: "Operational", created: "21/10/2025" },
  { name: "Net Income", definition: "Total profit after all expenses, taxes, and costs have been deducted.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Net Promoter Score", definition: "Metric measuring customer loyalty based on likelihood to recommend.", unit: "Count", category: "Operational", created: "21/10/2025" },
  { name: "Operating Expenses", definition: "Expenses incurred through normal business operations.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Operating Margin", definition: "Percentage of revenue remaining after paying operating expenses.", unit: "%", category: "financial", created: "21/10/2025" },
  { name: "Pay Equity Ratio", definition: "Ratio comparing compensation across different demographic groups.", unit: "%", category: "Operational", created: "21/10/2025" },
  { name: "R&D Expenditure", definition: "Total spending on research and development activities.", unit: "$", category: "financial", created: "21/10/2025" },
  { name: "Return on Assets", definition: "Net income divided by total assets, measuring asset profitability.", unit: "%", category: "financial", created: "21/10/2025" },
  { name: "Return on Equity", definition: "Net income divided by shareholder equity, measuring return to owners.", unit: "%", category: "financial", created: "21/10/2025" },
  { name: "Revenue Growth Rate", definition: "Percentage increase in revenue compared to the previous period.", unit: "%", category: "financial", created: "21/10/2025" },
  ...Array.from({ length: 58 }, (_, i) => ({
    name: `Metric ${i + 1}`,
    definition: "Standardized business metric tracked for quarterly reporting and compliance purposes.",
    unit: i % 3 === 0 ? "$" : i % 3 === 1 ? "%" : "Count",
    category: i % 2 === 0 ? "financial" : "Operational",
    created: "21/10/2025",
  })),
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
  const [addMetricOpen, setAddMetricOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [dictDropdownRow, setDictDropdownRow] = useState<number | null>(null);
  const [dictDropdownPos, setDictDropdownPos] = useState<{ x: number; y: number } | null>(null);
  const [newMetric, setNewMetric] = useState({ name: "", definition: "", unit: "Points", category: "" });
  const [expandedCats, setExpandedCats] = useState<number[]>([0]);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [addMetricsDrop, setAddMetricsDrop] = useState(false);
  const [addMetricsDropPos, setAddMetricsDropPos] = useState<{ x: number; y: number } | null>(null);
  const [backfillPreviewOpen, setBackfillPreviewOpen] = useState(false);
  const [editMetricRow, setEditMetricRow] = useState<number | null>(null);
  const [editDef, setEditDef] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [deleteConfirmName, setDeleteConfirmName] = useState<string | null>(null);
  const [redirectionTooltip, setRedirectionTooltip] = useState<{ x: number; y: number } | null>(null);
  const [companyDropPos, setCompanyDropPos] = useState<{ x: number; y: number } | null>(null);
  const [redirectionOpen, setRedirectionOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [statusDropOpen, setStatusDropOpen] = useState(false);

  // No global close listener — dropdowns close when you click their trigger again or open a modal

  const dictTotalPages = Math.max(1, Math.ceil(dictionaryData.length / dictPerPage));
  const dictPaged = dictionaryData.slice((dictPage - 1) * dictPerPage, dictPage * dictPerPage);
  const getDictPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (dictTotalPages <= 5) {
      for (let i = 1; i <= dictTotalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (dictPage > 3) pages.push("...");
      for (let i = Math.max(2, dictPage - 1); i <= Math.min(dictTotalPages - 1, dictPage + 1); i++) pages.push(i);
      if (dictPage < dictTotalPages - 2) pages.push("...");
      pages.push(dictTotalPages);
    }
    return pages;
  };

  const S = {
    root: { display: "flex", height: "100vh", backgroundColor: "#F4F7F9", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "100%" } as CSSProperties,
    mainCol: { flex: 1, marginLeft: 220, display: "flex", flexDirection: "column", overflow: "auto" } as CSSProperties,
    aside: { width: 220, backgroundColor: "#fff", position: "fixed", left: 0, top: 0, height: "100vh", display: "flex", flexDirection: "column", zIndex: 50, borderRight: "1px solid #E8EDF0", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    logoWrap: { display: "flex", alignItems: "center", gap: 10, padding: "20px 20px 18px" } as CSSProperties,
    logoCircle: { width: 34, height: 34, borderRadius: "50%", overflow: "hidden", flexShrink: 0 } as CSSProperties,
    logoText: { color: "#1B3A4B", fontSize: 14, fontWeight: 700, letterSpacing: "0.2px" } as CSSProperties,
    menuSection: { padding: "0 14px", marginTop: 10 } as CSSProperties,
    menuLabel: { fontSize: 10, color: "#8CA3AE", letterSpacing: "0.5px", fontWeight: 600, padding: "0 8px", marginBottom: 10, display: "block", lineHeight: "21px" } as CSSProperties,
    menuBtn: (active: boolean | undefined): CSSProperties => ({ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? "linear-gradient(to right, #D8F0ED 0%, #E6F7F5 50%, #FFFFFF 75%)" : "transparent", color: active ? "#1B3A4B" : "#5A6B7A", fontSize: 12, fontWeight: active ? 500 : 400, textAlign: "left", width: "100%", marginBottom: 2, position: "relative", lineHeight: "21px", verticalAlign: "middle" }),
    menuBtnBar: { position: "absolute", left: 0, top: 5, bottom: 5, width: 4, borderRadius: 4, backgroundColor: "#2EC4B6" } as CSSProperties,
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
    tabsBar: { backgroundColor: "#fff", borderBottom: "1px solid #E8EDF0", padding: "0 24px", display: "flex", alignItems: "center", flexShrink: 0 } as CSSProperties,
    tabBtn: (active: boolean): CSSProperties => ({ padding: "13px 14px 11px", fontSize: 13, fontWeight: active ? 500 : 400, color: active ? "#1B3A4B" : "#8CA3AE", background: "none", border: "none", borderBottom: `2px solid ${active ? "#2EC4B6" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap" }),
    filterRow: { display: "flex", gap: 12, padding: "12px 16px 0" } as CSSProperties,
    filterCard: { display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", flex: 1, cursor: "pointer" } as CSSProperties,
    filterIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#E6F4F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } as CSSProperties,
    filterLabel: { fontSize: 11, color: "#8CA3AE", lineHeight: 1.3 } as CSSProperties,
    filterValue: { fontSize: 13, fontWeight: 500, color: "#1B3A4B", lineHeight: 1.4 } as CSSProperties,
    contentRow: { display: "flex", gap: 10, padding: "12px 16px", flex: 1, alignItems: "flex-start" } as CSSProperties,
    leftPanel: { width: 230, backgroundColor: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", overflow: "hidden", flexShrink: 0, alignSelf: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" } as CSSProperties,
    leftTitle: { fontSize: 13, fontWeight: 700, color: "#1B3A4B", padding: "16px 16px 10px" } as CSSProperties,
    qItem: (active: boolean): CSSProperties => ({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", cursor: "pointer", backgroundColor: active ? "#2EC4B6" : "transparent", color: active ? "#fff" : "#1B3A4B", borderRadius: active ? 9 : 0, margin: active ? "3px 8px" : "0 0", transition: "background-color 0.15s ease" }),
    qLabel: { fontSize: 12.5, fontWeight: 500 } as CSSProperties,
    qCount: (active: boolean): CSSProperties => ({ fontSize: 11, color: active ? "rgba(255,255,255,0.9)" : "#8CA3AE", fontWeight: 500, whiteSpace: "nowrap" as const }),
    rightPanel: { flex: 1, backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", display: "flex", flexDirection: "column" } as CSSProperties,
    rightHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 10px" } as CSSProperties,
    rightTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    exportBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", fontSize: 12, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer" } as CSSProperties,
    th: { textAlign: "left" as const, padding: "9px 16px", fontSize: 12, fontWeight: 500, color: "#8CA3AE" },
    td: { padding: "9px 16px", fontSize: 12.5, color: "#1B3A4B" } as CSSProperties,
    tdMuted: { padding: "9px 16px", fontSize: 12.5, color: "#8CA3AE" } as CSSProperties,
    actionBtn: { background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 4 } as CSSProperties,
    dropdown: { position: "absolute", right: 20, top: "100%", marginTop: 4, backgroundColor: "#fff", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", zIndex: 200, minWidth: 130, overflow: "hidden" } as CSSProperties,
    dropItem: { display: "block", width: "100%", padding: "10px 18px", fontSize: 13, color: "#1B3A4B", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    overlay: { position: "fixed", inset: 0, backgroundColor: "#4D4A5433", backdropFilter: "blur(14px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" } as CSSProperties,
    modal: { backgroundColor: "#fff", borderRadius: 14, width: 420, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 40px rgba(0,0,0,0.15)", padding: "24px 28px" } as CSSProperties,
    modalHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 } as CSSProperties,
    modalTitle: { fontSize: 16, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    modalSub: { fontSize: 12, color: "#8CA3AE", marginTop: 2 } as CSSProperties,
    closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 2 } as CSSProperties,
    ahCenter: { display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 0 10px", gap: 10 } as CSSProperties,
    ahIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#F4F7F9", display: "flex", alignItems: "center", justifyContent: "center" } as CSSProperties,
    ahTitle: { fontSize: 14, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    ahEmpty: { fontSize: 12, color: "#8CA3AE" } as CSSProperties,
    badge: (bg: string, color: string): CSSProperties => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, backgroundColor: bg, color, marginRight: 6, lineHeight: "18px" }),
    statusDot: (c: string): CSSProperties => ({ display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: c, marginRight: 5, verticalAlign: "middle" }),
    sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 8px", cursor: "pointer" } as CSSProperties,
    sectionTitle: { fontSize: 13, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    vCard: { padding: "12px 0", borderBottom: "1px solid #F0F3F5" } as CSSProperties,
    vLabel: { fontSize: 12, fontWeight: 600, color: "#1B3A4B", marginBottom: 4 } as CSSProperties,
    vValue: { fontSize: 16, fontWeight: 700, color: "#1B3A4B" } as CSSProperties,
    vUnit: { fontSize: 13, fontWeight: 400, color: "#8CA3AE", marginLeft: 4 } as CSSProperties,
    tagPill: { display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, backgroundColor: "#F0F3F5", color: "#5A6B7A", marginRight: 6, lineHeight: "18px" } as CSSProperties,
    dictWrap: { flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column" } as CSSProperties,
    dictCard: { backgroundColor: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", flex: 1, display: "flex", flexDirection: "column" } as CSSProperties,
    missingBadge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", fontSize: 12, fontWeight: 500, color: "#2EC4B6", backgroundColor: "#E6F7F5", border: "1px solid #C4EDE8", borderRadius: 6, cursor: "default" } as CSSProperties,
    missingX: { background: "none", border: "none", cursor: "pointer", color: "#2EC4B6", fontSize: 14, lineHeight: 1, padding: 0, marginLeft: 2 } as CSSProperties,
    dataMaintBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", fontSize: 12, fontWeight: 500, color: "#1B3A4B", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 6, cursor: "pointer" } as CSSProperties,
    dataMaintItem: { display: "block", width: "100%", padding: "10px 18px", fontSize: 12.5, color: "#1B3A4B", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", whiteSpace: "nowrap" } as CSSProperties,
    addMetricsBtn: { display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 18px", fontSize: 12, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer" } as CSSProperties,
    defTooltip: { position: "fixed", zIndex: 9999, backgroundColor: "#fff", color: "#3A4F5C", fontSize: 11.5, padding: "10px 14px", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", width: 240, lineHeight: 1.5, pointerEvents: "none", animation: "tooltipFadeIn 0.18s ease" } as CSSProperties,
    pgRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", borderTop: "1px solid #E8EDF0", marginTop: "auto" } as CSSProperties,
    pgBtn: { display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", fontSize: 12.5, color: "#2EC4B6", border: "1px solid #D6DEE3", borderRadius: 5, backgroundColor: "#fff", cursor: "pointer" } as CSSProperties,
    pgNum: (active: boolean): CSSProperties => ({ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: active ? 500 : 400, color: active ? "#1B3A4B" : "#8CA3AE", backgroundColor: "#fff", border: active ? "1px solid #E0E5E9" : "none", borderRadius: 6, cursor: "pointer", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }),
    pgDots: { fontSize: 12.5, color: "#8CA3AE", padding: "0 4px" } as CSSProperties,
    pgLabel: { fontSize: 12.5, color: "#8CA3AE" } as CSSProperties,
    pgArrow: { width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#2EC4B6", fontSize: 11 } as CSSProperties,
    sidePanel: { position: "fixed", right: 0, top: 0, height: "100vh", width: 380, backgroundColor: "#fff", borderLeft: "1px solid #E8EDF0", boxShadow: "-4px 0 24px rgba(0,0,0,0.08)", zIndex: 400, display: "flex", flexDirection: "column", animation: "slidePanelIn 0.3s cubic-bezier(0.4,0,0.2,1)" } as CSSProperties,
    sidePanelHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid #E8EDF0" } as CSSProperties,
    sidePanelTitle: { fontSize: 15, fontWeight: 600, color: "#1B3A4B" } as CSSProperties,
    sidePanelBody: { flex: 1, overflowY: "auto", padding: "18px 22px" } as CSSProperties,
    sidePanelFooter: { padding: "14px 22px", borderTop: "1px solid #E8EDF0", display: "flex", gap: 10, justifyContent: "flex-end" } as CSSProperties,
    inputLabel: { fontSize: 12, fontWeight: 500, color: "#5A6B7A", marginBottom: 6, display: "block" } as CSSProperties,
    inputField: { width: "100%", padding: "9px 12px", fontSize: 13, color: "#1B3A4B", border: "1px solid #D6DEE3", borderRadius: 7, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: "#fff" } as CSSProperties,
    textareaField: { width: "100%", padding: "9px 12px", fontSize: 13, color: "#1B3A4B", border: "1px solid #D6DEE3", borderRadius: 7, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", minHeight: 80, resize: "vertical", backgroundColor: "#fff" } as CSSProperties,
    catHeader: (open: boolean): CSSProperties => ({ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", cursor: "pointer", fontSize: 13, fontWeight: 500, color: open ? "#1B3A4B" : "#5A6B7A" }),
    catItem: (selected: boolean): CSSProperties => ({ display: "flex", alignItems: "center", gap: 8, padding: "6px 0 6px 22px", cursor: "pointer", fontSize: 12.5, color: selected ? "#2EC4B6" : "#5A6B7A", fontWeight: selected ? 500 : 400, borderRadius: 4 }),
    cancelBtn: { padding: "8px 20px", fontSize: 13, fontWeight: 500, color: "#5A6B7A", backgroundColor: "#F4F7F9", border: "1px solid #D6DEE3", borderRadius: 7, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    saveBtn: { padding: "8px 24px", fontSize: 13, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    importOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(15,23,32,0.82)", backdropFilter: "blur(16px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", animation: "overlayFadeIn 0.2s ease" } as CSSProperties,
    importModal: { backgroundColor: "#1A2332", borderRadius: 14, width: 500, boxShadow: "0 12px 48px rgba(0,0,0,0.4)", overflow: "hidden", animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" } as CSSProperties,
    importHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #2A3A4A" } as CSSProperties,
    importTitle: { fontSize: 15, fontWeight: 600, color: "#fff" } as CSSProperties,
    importBody: { padding: "24px" } as CSSProperties,
    dropZone: (active: boolean): CSSProperties => ({ border: `2px dashed ${active ? "#2EC4B6" : "#3A4F5C"}`, borderRadius: 12, padding: "36px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, backgroundColor: active ? "rgba(46,196,182,0.06)" : "rgba(255,255,255,0.03)", transition: "all 0.2s ease", cursor: "pointer" }),
    dropText: { fontSize: 13, color: "#8CA3AE", textAlign: "center" } as CSSProperties,
    browseBtn: { padding: "7px 22px", fontSize: 12.5, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 7, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    fileTypeText: { fontSize: 11, color: "#5A6B7A", marginTop: 4 } as CSSProperties,
    uploadedFileRow: { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", backgroundColor: "rgba(46,196,182,0.08)", borderRadius: 8, marginTop: 16 } as CSSProperties,
    importFooter: { display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid #2A3A4A" } as CSSProperties,
    importCancelBtn: { padding: "8px 20px", fontSize: 13, fontWeight: 500, color: "#8CA3AE", backgroundColor: "transparent", border: "1px solid #3A4F5C", borderRadius: 7, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" } as CSSProperties,
    importUploadBtn: (hasFile: boolean): CSSProperties => ({ padding: "8px 24px", fontSize: 13, fontWeight: 500, color: "#fff", backgroundColor: hasFile ? "#2EC4B6" : "#3A4F5C", border: "none", borderRadius: 7, cursor: hasFile ? "pointer" : "default", fontFamily: "'IBM Plex Sans', sans-serif", opacity: hasFile ? 1 : 0.5 }),
    // Fixed-position portal dropdown styles
    portalDrop: { position: "fixed", backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 24px rgba(0,0,0,0.14)", border: "1px solid #E8EDF0", zIndex: 9000, minWidth: 150, overflow: "hidden" } as CSSProperties,
    portalDropItem: { display: "flex", alignItems: "center", width: "100%", padding: "10px 18px", fontSize: 12.5, color: "#1B3A4B", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", whiteSpace: "nowrap" } as CSSProperties,
  };

  return (
    <div style={S.root}>
      <style>{`
        @keyframes tooltipFadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalFadeIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        @keyframes overlayFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes expandSlide { from { opacity:0; max-height:0; } to { opacity:1; max-height:120px; } }
        @keyframes slidePanelIn { from { transform:translateX(100%); } to { transform:translateX(0); } }
        .dict-row { transition: background-color 0.18s ease; }
        .dict-row:hover { background-color: #EEF6F7 !important; }
        .expand-row { animation: expandSlide 0.28s cubic-bezier(0.4,0,0.2,1) forwards; }
        .drop-item-hover:hover { background-color: #F4F7F9 !important; }
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
            {activeTab === "Metrics Dictionary" && (
              <>
                {showMissingBadge && (
                  <span style={S.missingBadge}>
                    Missing units 22
                    <button style={S.missingX} onMouseDown={e => e.stopPropagation()} onClick={() => setShowMissingBadge(false)}>×</button>
                  </span>
                )}
                {/* Data Maintenance — position:relative wrapper kept, dropdown rendered as portal */}
                <div style={{ position: "relative" }}>
                  <button
                    data-dropdown="true"
                    style={S.dataMaintBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDataMaintOpen(!dataMaintOpen);
                    }}
                  >
                    Data Maintenance <ChevronDown size={12} />
                  </button>
                  {dataMaintOpen && (
                    <div
                      data-dropdown="true"
                      style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", zIndex: 9000, minWidth: 160, overflow: "hidden" }}
                    >
                      <button className="drop-item-hover" style={S.dataMaintItem} onClick={() => { setDataMaintOpen(false); const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".xls,.xlsx,.csv"; inp.onchange = () => { if (inp.files?.length) setUploadedFile(inp.files[0].name); }; inp.click(); }}>Backfill from excel</button>
                      <button className="drop-item-hover" style={S.dataMaintItem} onClick={() => { setDataMaintOpen(false); setBackfillPreviewOpen(true); }}>Backfill Unit</button>
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
              <button key={tab} style={S.tabBtn(activeTab === tab)} onClick={() => { setActiveTab(tab); setRedirectionOpen(false); }}>{tab}</button>
            ))}
          </div>

          {/* ── ADD METRICS BUTTON — opens modal directly ── */}
          {activeTab === "Metrics Dictionary" && (
            <button
              data-dropdown="true"
              style={{ ...S.addMetricsBtn, margin: "6px 0" }}
              onClick={() => {
                setNewMetric({ name: "", definition: "", unit: "Points", category: "" });
                setAddMetricOpen(true);
              }}
            >
              <Plus size={14} /> Add Metrics
            </button>
          )}
        </div>

        {/* ── COMPANY METRICS TAB ── */}
        {activeTab === "Company Metrics" && (
          <>
            {/* ── REDIRECTION VIEW ── */}
            {redirectionOpen ? (
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Info banner — shown above the panels */}
                <div style={{ backgroundColor: "#fff", border: "1px solid #E8EDF0", borderRadius: 8, padding: "9px 16px", marginBottom: 12, fontSize: 12, color: "#5A6B7A", lineHeight: 1.5, alignSelf: "flex-start", maxWidth: 260, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                  Final, approved metrics for the selected reporting period.
                </div>
                <div style={S.contentRow}>
                {/* Left panel — quarter list */}
                <div style={S.leftPanel}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <button onClick={() => setRedirectionOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", display: "flex", alignItems: "center", color: "#2EC4B6" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <div style={S.leftTitle}>2025-Q4 Metrics</div>
                  </div>
                  <div style={{ padding: "4px 0 12px" }}>
                    {quarterList.map((q, i) => (
                      <div key={i} style={S.qItem(selectedQuarter === i)} onClick={() => setSelectedQuarter(i)}>
                        <span style={S.qLabel}>{q.label}</span>
                        <span style={S.qCount(selectedQuarter === i)}>{q.count} metrics</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right panel — full metrics table */}
                <div style={{ ...S.rightPanel, paddingBottom: 16 }}>
                  <div style={{ ...S.rightHeader, paddingBottom: 12 }}>
                    <span style={S.rightTitle}>2025-Q4 Metrics</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {/* All Status dropdown */}
                      <div style={{ position: "relative" }}>
                        <button
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 12, fontWeight: 500, color: "#1B3A4B", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 7, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}
                          onClick={(e) => { e.stopPropagation(); setStatusDropOpen(!statusDropOpen); }}
                        >
                          {statusFilter} <ChevronDown size={12} color="#8CA3AE" />
                        </button>
                        {statusDropOpen && (
                          <>
                            <div style={{ position: "fixed", inset: 0, zIndex: 8999 }} onClick={() => setStatusDropOpen(false)} />
                            <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #E8EDF0", zIndex: 9000, minWidth: 140, overflow: "hidden" }}>
                              {["All Status", "Approved", "Submitted", "Pending"].map(s => (
                                <button key={s} style={{ display: "block", width: "100%", textAlign: "left" as const, padding: "9px 16px", fontSize: 12.5, color: statusFilter === s ? "#2EC4B6" : "#1B3A4B", backgroundColor: statusFilter === s ? "#F0FAF9" : "transparent", border: "none", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}
                                  onClick={() => { setStatusFilter(s); setStatusDropOpen(false); }}>{s}</button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      {/* Export button */}
                      <button style={S.exportBtn}><span>Export</span><Download size={13} /></button>
                    </div>
                  </div>
                  {/* Table in white card */}
                  <div style={{ borderRadius: 10, border: "1px solid #E8EDF0", overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#F7FBFB" }}>
                          <th style={{ padding: "14px 20px", fontSize: 12.5, fontWeight: 600, color: "#1B3A4B", textAlign: "left" as const, borderBottom: "1.5px solid #E8EDF0", width: "55%" }}>Metric</th>
                          <th style={{ padding: "14px 20px", fontSize: 12.5, fontWeight: 600, color: "#1B3A4B", textAlign: "left" as const, borderBottom: "1.5px solid #E8EDF0", width: "45%" }}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metricsData.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: idx < metricsData.length - 1 ? "1px solid #F0F4F6" : "none", backgroundColor: "#fff" }}>
                            <td style={{ padding: "15px 20px", fontSize: 13, color: "#1B3A4B", fontWeight: 500 }}>{row.metric}</td>
                            <td style={{ padding: "15px 20px", fontSize: 13, color: "#5A6B7A" }}>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                </div>
              </div>
            ) : (
              /* ── NORMAL COMPANY METRICS VIEW ── */
              <>
                <div style={S.filterRow}>
                  <div style={S.filterCard}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={S.filterIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EC4B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      </div>
                      <div><div style={S.filterLabel}>Period Type</div><div style={S.filterValue}>Quarter</div></div>
                    </div>
                    <ChevronDown size={14} color="#8CA3AE" />
                  </div>
                  <div style={S.filterCard}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={S.filterIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EC4B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      </div>
                      <div><div style={S.filterLabel}>Year</div><div style={S.filterValue}>2026</div></div>
                    </div>
                    <ChevronDown size={14} color="#8CA3AE" />
                  </div>
                </div>

                <div style={S.contentRow}>
                  <div style={S.leftPanel}>
                    <div style={S.leftTitle}>2025-Q4 Metrics</div>
                    <div style={{ padding: "4px 0 12px" }}>
                      {quarterList.map((q, i) => (
                        <div key={i} style={S.qItem(selectedQuarter === i)} onClick={() => setSelectedQuarter(i)}>
                          <span style={S.qLabel}>{q.label}</span>
                          <span style={S.qCount(selectedQuarter === i)}>{q.count} metrics</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={S.rightPanel}>
                    <div style={S.rightHeader}>
                      <span style={S.rightTitle}>2025-Q4 Metrics</span>
                      <button style={S.exportBtn}><span>Export</span><Download size={13} /></button>
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
                              <button style={S.actionBtn} onClick={(e) => {
                                e.stopPropagation();
                                if (dropdownRow === idx) { setDropdownRow(null); }
                                else {
                                  const r = e.currentTarget.getBoundingClientRect();
                                  setCompanyDropPos({ x: r.right, y: r.bottom + 4 });
                                  setDropdownRow(idx);
                                }
                              }}><MoreVertical size={15} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
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
                        <tr
                          className="dict-row"
                          style={{ borderBottom: isExpanded ? "none" : (idx < dictPaged.length - 1 ? "1px solid #F0F3F5" : "none"), backgroundColor: isExpanded ? "#EEF6F7" : (idx % 2 === 0 ? "#F7FBFB" : "#fff"), cursor: "pointer" }}
                          onClick={() => setExpandedRow(isExpanded ? null : globalIdx)}
                        >
                          <td style={{ ...S.td, display: "flex", alignItems: "center", gap: 6 }}>
                            <ChevronDown size={16} color="#8CA3AE" style={{ cursor: "pointer", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)" }} />
                            {row.name}
                          </td>
                          <td
                            style={{ ...S.tdMuted, cursor: "default" }}
                            onMouseEnter={(e) => { e.stopPropagation(); setHoveredDefRow(idx); const r = e.currentTarget.getBoundingClientRect(); setTooltipPos({ x: r.left, y: r.bottom + 4 }); }}
                            onMouseLeave={() => setHoveredDefRow(null)}
                          >
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: 340 }}>{row.definition}</span>
                          </td>
                          <td style={S.tdMuted}>{row.unit}</td>
                          <td style={S.tdMuted}>{row.category}</td>
                          <td style={S.tdMuted}>{row.created}</td>
                          <td style={{ ...S.td }}>
                            {/* ── THREE-DOT BUTTON — portal dropdown ── */}
                            <button
                              data-dropdown="true"
                              style={S.actionBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (dictDropdownRow === globalIdx) {
                                  setDictDropdownRow(null);
                                  setDictDropdownPos(null);
                                } else {
                                  const r = e.currentTarget.getBoundingClientRect();
                                  setDictDropdownPos({ x: r.right, y: r.bottom + 4 });
                                  setDictDropdownRow(globalIdx);
                                }
                              }}
                            >
                              <MoreVertical size={15} />
                            </button>
                          </td>
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
                  <button data-dropdown="true" style={S.pgBtn} onClick={(e) => { e.stopPropagation(); setDictPerPageOpen(!dictPerPageOpen); }}>{dictPerPage} <ChevronDown size={12} /></button>
                  {dictPerPageOpen && (
                    <div data-dropdown="true" style={{ position: "absolute", bottom: "calc(100% + 4px)", left: 0, backgroundColor: "#fff", border: "1px solid #E8EDF0", borderRadius: 7, boxShadow: "0 4px 14px rgba(0,0,0,0.09)", overflow: "hidden", zIndex: 300 }}>
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

      {/* ══════════════════════════════════════════
          PORTAL DROPDOWNS — rendered at root level
          so they escape all overflow:hidden parents
      ══════════════════════════════════════════ */}

      {/* Company Metrics three-dot portal dropdown */}
      {dropdownRow !== null && companyDropPos && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 8999 }} onClick={() => { setDropdownRow(null); setCompanyDropPos(null); }} />
          <div style={{ ...S.portalDrop, top: companyDropPos.y, right: typeof window !== "undefined" ? window.innerWidth - companyDropPos.x : 0, zIndex: 9000 }}>
            <button className="drop-item-hover" style={S.portalDropItem} onClick={() => { setDropdownRow(null); setCompanyDropPos(null); setViewDetailRow(dropdownRow); }}>Edit</button>
            <button className="drop-item-hover" style={S.portalDropItem} onClick={() => { setDropdownRow(null); setCompanyDropPos(null); setActiveTab("Company Metrics"); setRedirectionOpen(true); }}>Redirection</button>
            <button className="drop-item-hover" style={{ ...S.portalDropItem, color: "#E25C5C" }} onClick={() => { setDropdownRow(null); setCompanyDropPos(null); setDeleteConfirmName(metricsData[dropdownRow]?.metric ?? ""); }}>Delete</button>
          </div>
        </>
      )}

      {/* Dict row three-dot portal dropdown */}
      {dictDropdownRow !== null && dictDropdownPos && (() => {
        const safeRow = dictionaryData[dictDropdownRow];
        return (
          <>
            {/* Transparent backdrop — clicking outside closes dropdown */}
            <div
              style={{ position: "fixed", inset: 0, zIndex: 8999 }}
              onClick={() => { setDictDropdownRow(null); setDictDropdownPos(null); }}
            />
            {/* Dropdown menu — sits above backdrop */}
            <div
              style={{ ...S.portalDrop, top: dictDropdownPos.y, right: typeof window !== "undefined" ? window.innerWidth - dictDropdownPos.x : 0, zIndex: 9000 }}
            >
              <button
                className="drop-item-hover"
                style={S.portalDropItem}
                onClick={() => {
                  setDictDropdownRow(null); setDictDropdownPos(null);
                  setEditMetricRow(dictDropdownRow);
                  setEditDef(safeRow?.definition ?? "");
                  setEditUnit(safeRow?.unit ?? "");
                }}
              >
                Edit
              </button>
              <button
                className="drop-item-hover"
                style={S.portalDropItem}
                onClick={() => {
                  setDictDropdownRow(null); setDictDropdownPos(null);
                  setActiveTab("Company Metrics");
                  setRedirectionOpen(true);
                }}
              >
                Redirection
              </button>
              <button
                className="drop-item-hover"
                style={{ ...S.portalDropItem, color: "#E25C5C" }}
                onClick={() => { setDictDropdownRow(null); setDictDropdownPos(null); setDeleteConfirmName(safeRow?.name ?? ""); }}
              >
                Delete
              </button>
            </div>
          </>
        );
      })()}

      {/* DEFINITION TOOLTIP */}
      {hoveredDefRow !== null && dictPaged[hoveredDefRow] && (
        <div style={{ ...S.defTooltip, left: tooltipPos.x, top: tooltipPos.y }}>{dictPaged[hoveredDefRow].definition}</div>
      )}

      {/* REDIRECTION POPOVER */}
      {redirectionTooltip && (
        <>
          {/* Backdrop to close on outside click */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 8998 }}
            onClick={() => setRedirectionTooltip(null)}
          />
          {/* Popover */}
          <div
            style={{
              position: "fixed",
              top: redirectionTooltip.y,
              left: redirectionTooltip.x,
              zIndex: 8999,
              backgroundColor: "#fff",
              borderRadius: 10,
              boxShadow: "0 6px 28px rgba(0,0,0,0.13)",
              border: "1px solid #E8EDF0",
              padding: "12px 16px",
              width: 230,
              animation: "tooltipFadeIn 0.18s ease",
            }}
          >
            <div style={{ fontSize: 12.5, color: "#5A6B7A", lineHeight: 1.65 }}>
              Final, approved metrics for the selected reporting period.
            </div>
          </div>
        </>
      )}

      {/* ── EDIT METRIC MODAL ── */}
      {editMetricRow !== null && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(77,74,84,0.2)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", animation: "overlayFadeIn 0.2s ease" }}
          onMouseDown={() => setEditMetricRow(null)}
        >
          <div
            style={{ backgroundColor: "#fff", borderRadius: 12, width: 460, boxShadow: "0 8px 40px rgba(0,0,0,0.14)", overflow: "hidden", animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }}
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 14px", borderBottom: "1px solid #F0F3F5" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1B3A4B" }}>Edit</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 2, display: "flex" }} onClick={() => setEditMetricRow(null)}><X size={17} /></button>
            </div>
            {/* Metric name subtitle */}
            <div style={{ padding: "14px 22px 0" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B3A4B", marginBottom: 14 }}>{dictionaryData[editMetricRow]?.name}</div>
              {/* Definition input (full width) */}
              <div style={{ marginBottom: 14 }}>
                <input
                  style={{ width: "100%", padding: "10px 14px", fontSize: 13, color: "#1B3A4B", border: "1.5px solid #2EC4B6", borderRadius: 8, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: "#fff", boxSizing: "border-box" } as CSSProperties}
                  value={editDef}
                  onChange={e => setEditDef(e.target.value)}
                  placeholder="Definition"
                />
              </div>
              {/* Unit input */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 11.5, fontWeight: 500, color: "#8CA3AE", marginBottom: 6, display: "block" }}>Unit</label>
                <input
                  style={{ width: "100%", padding: "10px 14px", fontSize: 13, color: "#1B3A4B", border: "1.5px solid #2EC4B6", borderRadius: 8, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: "#fff", boxSizing: "border-box" } as CSSProperties}
                  value={editUnit}
                  onChange={e => setEditUnit(e.target.value)}
                  placeholder="Unit"
                />
              </div>
            </div>
            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "0 22px 20px" }}>
              <button style={{ padding: "9px 26px", fontSize: 13, fontWeight: 500, color: "#5A6B7A", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }} onClick={() => setEditMetricRow(null)}>Cancel</button>
              <button style={{ padding: "9px 26px", fontSize: 13, fontWeight: 600, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }} onClick={() => {
                if (editMetricRow !== null) {
                  dictionaryData[editMetricRow] = { ...dictionaryData[editMetricRow], definition: editDef, unit: editUnit };
                }
                setEditMetricRow(null);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ── UNIT BACKFILL PREVIEW MODAL ── */}
      {backfillPreviewOpen && (
        <div style={{ ...S.overlay, animation: "overlayFadeIn 0.2s ease" }} onMouseDown={() => setBackfillPreviewOpen(false)}>
          <div style={{ backgroundColor: "#fff", borderRadius: 14, width: 560, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", padding: 0, animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }} onMouseDown={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid #E8EDF0" }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#1B3A4B" }}>Unit Backfill Preview</span>
              <button style={S.closeBtn} onClick={() => setBackfillPreviewOpen(false)}><X size={18} /></button>
            </div>
            <div style={{ display: "flex", padding: "32px 28px", gap: 0 }}>
              <div style={{ flex: 1, textAlign: "left" as const, paddingLeft: 8 }}><div style={{ fontSize: 13, color: "#8CA3AE", marginBottom: 10 }}>Total Missing</div><div style={{ fontSize: 28, fontWeight: 700, color: "#1B3A4B" }}>22</div></div>
              <div style={{ width: 1, backgroundColor: "#E8EDF0" }} />
              <div style={{ flex: 1, textAlign: "left" as const, paddingLeft: 24 }}><div style={{ fontSize: 13, color: "#8CA3AE", marginBottom: 10 }}>Will Update</div><div style={{ fontSize: 28, fontWeight: 700, color: "#1B3A4B" }}>0</div></div>
              <div style={{ width: 1, backgroundColor: "#E8EDF0" }} />
              <div style={{ flex: 1, textAlign: "left" as const, paddingLeft: 24 }}><div style={{ fontSize: 13, color: "#8CA3AE", marginBottom: 10 }}>Unresolved</div><div style={{ fontSize: 28, fontWeight: 700, color: "#1B3A4B" }}>22</div></div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, padding: "18px 28px", borderTop: "1px solid #E8EDF0" }}>
              <button style={{ padding: "10px 32px", fontSize: 13, fontWeight: 500, color: "#5A6B7A", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }} onClick={() => setBackfillPreviewOpen(false)}>Cancel</button>
              <button style={{ padding: "10px 32px", fontSize: 13, fontWeight: 500, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }} onClick={() => setBackfillPreviewOpen(false)}>Apply 0 Updates</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmName !== null && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(77,74,84,0.2)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", animation: "overlayFadeIn 0.2s ease" }}
          onMouseDown={() => setDeleteConfirmName(null)}
        >
          <div
            style={{ backgroundColor: "#fff", borderRadius: 12, width: 360, boxShadow: "0 8px 40px rgba(0,0,0,0.14)", overflow: "hidden", animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }}
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px" }}>
              {/* Double circular red gradient bg matching screenshot */}
              <div style={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Outer ring */}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "rgba(226,92,92,0.10)" }} />
                {/* Inner circle */}
                <div style={{ position: "relative", width: 38, height: 38, borderRadius: "50%", backgroundColor: "rgba(226,92,92,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src="/dasboard/trash-01.png" alt="Delete" width={20} height={20} style={{ objectFit: "contain" }} />
                </div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 2, display: "flex" }} onClick={() => setDeleteConfirmName(null)}><X size={16} /></button>
            </div>
            {/* Body */}
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1B3A4B", marginBottom: 8 }}>Delete Metric Definition?</div>
              <div style={{ fontSize: 12.5, color: "#8CA3AE", lineHeight: 1.6 }}>
                Are you sure you want to delete <span style={{ color: "#1B3A4B", fontWeight: 500 }}>&ldquo;{deleteConfirmName}&rdquo;</span>?<br />This action cannot be undone.
              </div>
            </div>
            {/* Footer */}
            <div style={{ display: "flex", gap: 10, padding: "0 20px 20px" }}>
              <button
                style={{ flex: 1, padding: "10px 0", fontSize: 13, fontWeight: 500, color: "#5A6B7A", backgroundColor: "#fff", border: "1px solid #D6DEE3", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}
                onClick={() => setDeleteConfirmName(null)}
              >
                Cancel
              </button>
              <button
                style={{ flex: 1, padding: "10px 0", fontSize: 13, fontWeight: 600, color: "#fff", backgroundColor: "#E25C5C", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}
                onClick={() => {
                  const idx = dictionaryData.findIndex(d => d.name === deleteConfirmName);
                  if (idx !== -1) dictionaryData.splice(idx, 1);
                  setDeleteConfirmName(null);
                  setDictPage(1);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD NEW METRICS MODAL ── */}
      {addMetricOpen && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(77,74,84,0.2)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", animation: "overlayFadeIn 0.2s ease" }}
          onMouseDown={() => setAddMetricOpen(false)}
        >
          <div
            style={{ backgroundColor: "#fff", borderRadius: 14, width: 520, boxShadow: "0 8px 48px rgba(0,0,0,0.13)", overflow: "hidden", animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }}
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px", borderBottom: "1px solid #F0F3F5" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1B3A4B", letterSpacing: "-0.1px" }}>Add New Metrics</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#8CA3AE", padding: 2, display: "flex", alignItems: "center" }} onClick={() => setAddMetricOpen(false)}><X size={18} /></button>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 24px 8px" }}>
              {/* Row: Metrics Name + Unit (Optional) */}
              <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                {/* Metrics Name */}
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#1B3A4B", marginBottom: 7, display: "block" }}>Metrics Name</label>
                  <input
                    style={{ width: "100%", padding: "10px 14px", fontSize: 13, color: "#1B3A4B", border: "1.5px solid #E8EDF0", borderRadius: 8, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: "#fff", boxSizing: "border-box", transition: "border-color 0.15s" } as CSSProperties}
                    placeholder="e.g Annual Revenue"
                    value={newMetric.name}
                    onChange={e => setNewMetric(m => ({ ...m, name: e.target.value }))}
                    onFocus={e => (e.currentTarget.style.borderColor = "#2EC4B6")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#E8EDF0")}
                  />
                </div>
                {/* Unit (Optional) */}
                <div style={{ width: 180 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#1B3A4B", marginBottom: 7, display: "block" }}>Unit (Optional)</label>
                  <div style={{ position: "relative" }}>
                    <select
                      style={{ width: "100%", padding: "10px 36px 10px 14px", fontSize: 13, color: "#5A6B7A", border: "1.5px solid #E8EDF0", borderRadius: 8, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", backgroundColor: "#fff", appearance: "none", WebkitAppearance: "none", cursor: "pointer" } as CSSProperties}
                      value={newMetric.unit}
                      onChange={e => setNewMetric(m => ({ ...m, unit: e.target.value }))}
                    >
                      <option value="Points">Points</option>
                      <option value="%">%</option>
                      <option value="$">$</option>
                      <option value="Count">Count</option>
                      <option value="Ratio">Ratio</option>
                    </select>
                    <ChevronDown size={15} color="#5A6B7A" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#1B3A4B", marginBottom: 7, display: "block" }}>Description</label>
                <textarea
                  style={{ width: "100%", padding: "10px 14px", fontSize: 13, color: "#1B3A4B", border: "1.5px solid #E8EDF0", borderRadius: 8, outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", minHeight: 100, resize: "none", backgroundColor: "#fff", boxSizing: "border-box", lineHeight: 1.5, transition: "border-color 0.15s" } as CSSProperties}
                  placeholder="e.g Total revenue...."
                  value={newMetric.definition}
                  onChange={e => setNewMetric(m => ({ ...m, definition: e.target.value }))}
                  onFocus={e => (e.currentTarget.style.borderColor = "#2EC4B6")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E8EDF0")}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 24px 20px" }}>
              <button
                style={{ padding: "10px 32px", fontSize: 13, fontWeight: 600, color: "#fff", backgroundColor: "#2EC4B6", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.1px" }}
                onClick={() => {
                  if (newMetric.name.trim()) {
                    // Save logic: push to dictionaryData or handle via prop/callback
                    dictionaryData.unshift({
                      name: newMetric.name.trim(),
                      definition: newMetric.definition.trim(),
                      unit: newMetric.unit || "Points",
                      category: newMetric.category || "Operational",
                      created: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
                    });
                  }
                  setAddMetricOpen(false);
                  setNewMetric({ name: "", definition: "", unit: "Points", category: "" });
                  setDictPage(1);
                }}
              >
                Add Metric
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CSV IMPORT MODAL ── */}
      {importModalOpen && (
        <div style={S.importOverlay} onMouseDown={() => { setImportModalOpen(false); setUploadedFile(null); setDragOver(false); }}>
          <div style={S.importModal} onMouseDown={e => e.stopPropagation()}>
            <div style={S.importHeader}>
              <span style={S.importTitle}>Import CSV</span>
              <button style={{ ...S.closeBtn, color: "#8CA3AE" }} onClick={() => { setImportModalOpen(false); setUploadedFile(null); }}><X size={18} /></button>
            </div>
            <div style={S.importBody}>
              <div
                style={S.dropZone(dragOver)}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) setUploadedFile(e.dataTransfer.files[0].name); }}
                onClick={() => { const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".csv,.xls,.xlsx"; inp.onchange = () => { if (inp.files?.length) setUploadedFile(inp.files[0].name); }; inp.click(); }}
              >
                <Upload size={32} color={dragOver ? "#2EC4B6" : "#5A6B7A"} />
                <span style={S.dropText}>Drag & drop your files here<br />or click to browse</span>
                <button style={S.browseBtn} onClick={e => e.stopPropagation()}>Browse Files</button>
                <span style={S.fileTypeText}>Supported: CSV, XLS, XLSX</span>
              </div>
              {uploadedFile && (
                <div style={S.uploadedFileRow}>
                  <FileText size={18} color="#2EC4B6" />
                  <span style={{ flex: 1, fontSize: 13, color: "#fff" }}>{uploadedFile}</span>
                  <button style={{ ...S.closeBtn, color: "#8CA3AE" }} onClick={() => setUploadedFile(null)}><X size={14} /></button>
                </div>
              )}
            </div>
            <div style={S.importFooter}>
              <button style={S.importCancelBtn} onClick={() => { setImportModalOpen(false); setUploadedFile(null); }}>Cancel</button>
              <button style={S.importUploadBtn(!!uploadedFile)} onClick={() => { if (uploadedFile) { setImportModalOpen(false); setUploadedFile(null); } }}>Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ACTION HISTORY MODAL ── */}
      {actionHistoryRow !== null && (
        <div style={{ ...S.overlay, animation: "overlayFadeIn 0.2s ease" }} onMouseDown={() => setActionHistoryRow(null)}>
          <div style={{ ...S.modal, animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }} onMouseDown={e => e.stopPropagation()}>
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
          <div style={{ ...S.overlay, animation: "overlayFadeIn 0.2s ease" }} onMouseDown={() => setViewDetailRow(null)}>
            <div style={{ ...S.modal, width: 460, animation: "modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1)" }} onMouseDown={e => e.stopPropagation()}>
              <div style={S.modalHeader}>
                <div>
                  <div style={S.modalTitle}>{m.metric}</div>
                  <div style={S.modalSub}>{m.period}</div>
                </div>
                <button style={S.closeBtn} onClick={() => setViewDetailRow(null)}><X size={18} /></button>
              </div>
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
      {redirectionTooltip && null}
    </div>
  );
}