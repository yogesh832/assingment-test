"use client";
import { useState, Suspense, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import Image from "next/image";
import {
  ChevronDown,
  Pencil, Settings,
} from "lucide-react";

const sidebarRoutes: Record<string, string> = {
  "Company data": ROUTES.DASHBOARD.COMPANY_DETAILS,
  "Metrics hub": ROUTES.DASHBOARD.METRICS_HUB,
};
const mainMenuItems = [
  { icon: "/dasboard/dashboard.png", label: "Dashboard" },
  { icon: "/dasboard/upload.png", label: "Upload" },
  { icon: "/dasboard/mattrix.png", label: "Metrics hub" },
  { icon: "/dasboard/company.png", label: "Company data", active: true },
  { icon: "/dasboard/request.png", label: "Request" },
  { icon: "/dasboard/file-export-alt.png", label: "Exports" },
  { icon: "/dasboard/audit.png", label: "Audit Log" },
  { icon: "/dasboard/billing.png", label: "Billing" },
];

const adminMenuItems = [
  { icon: "/dasboard/stakeholder.png", label: "Stakeholder" },
  { icon: "/dasboard/schedular.png", label: "Scheduled Exports" },
];

const tabs = ["Board", "Shareholders", "Subsidiaries", "Workforce", "Addresses", "Executive Team"];

const tabTooltips: Record<string, string> = {
  Board: "Current board composition and\nappointments",
  Shareholders: "Active shareholders and\nownership structure.",
  Subsidiaries: "Legal entities owned or\ncontrolled by the company.",
  Workforce: "Workforce composition by\nsegment.",
  Addresses: "Registered and operational\ncompany locations",
  "Executive Team": "Current executive leadership and\nkey contacts.",
};

const positionOptions = ["Director", "Chairman", "CEO", "CFO"];
const statusOptions = ["Active", "Inactive"];

export default function CompanyDetailsPage() {
  return <Suspense><CompanyDetailsInner /></Suspense>;
}

function CompanyDetailsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const count = Number(searchParams.get("count") ?? 10);

  const [activeTab, setActiveTab] = useState("Board");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Active");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPosition, setFormPosition] = useState("Director");
  const [formDate, setFormDate] = useState("");
  const [formStatus, setFormStatus] = useState("Active");
  const [posDropOpen, setPosDropOpen] = useState(false);
  const [statusFormDropOpen, setStatusFormDropOpen] = useState(false);
  const [boardData, setBoardData] = useState<{name:string;position:string;appointmentDate:string;status:string}[]>(
    Array.from({ length: count }, () => ({ name: "Pragati Sharma", position: "-", appointmentDate: "-", status: "Active" }))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [perPageDropOpen, setPerPageDropOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(boardData.length / perPage));
  const pagedData = boardData.slice((currentPage - 1) * perPage, currentPage * perPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const openAddModal = () => { setFormName(""); setFormPosition("Director"); setFormDate(""); setFormStatus("Active"); setModalOpen(true); };

  const handleSave = () => {
    if (formName.trim()) {
      setBoardData(prev => [...prev, { name: formName, position: formPosition, appointmentDate: formDate || "-", status: formStatus }]);
    }
    setModalOpen(false);
  };

  const S = {
    // Layout
    root: { display:"flex", minHeight:"100vh", backgroundColor:"#F4F7F9", fontFamily:"'IBM Plex Sans', sans-serif", fontWeight:400, fontSize:14, lineHeight:"100%" } as CSSProperties,
    mainCol: { flex:1, marginLeft:220, display:"flex", flexDirection:"column" } as CSSProperties,

    // Sidebar
    aside: { width:220, backgroundColor:"#fff", position:"fixed", left:0, top:0, height:"100vh", display:"flex", flexDirection:"column", zIndex:50, borderRight:"1px solid #E8EDF0", fontFamily:"'IBM Plex Sans', sans-serif" } as CSSProperties,
    logoWrap: { display:"flex", alignItems:"center", gap:10, padding:"20px 20px 18px" } as CSSProperties,
    logoCircle: { width:34, height:34, borderRadius:"50%", overflow:"hidden", flexShrink:0 } as CSSProperties,
    logoText: { color:"#1B3A4B", fontSize:14, fontWeight:700, letterSpacing:"0.2px" } as CSSProperties,
    menuSection: { padding:"0 14px", marginTop:10 } as CSSProperties,
    menuLabel: { fontSize:10, color:"#8CA3AE", letterSpacing:"0.5px", fontWeight:600, padding:"0 8px", marginBottom:10, display:"block", lineHeight:"21px" } as CSSProperties,
    menuBtn: (active: boolean | undefined): CSSProperties => ({ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, border:"none", cursor:"pointer", background: active ? "linear-gradient(to right, #D8F0ED 0%, #E6F7F5 50%, #FFFFFF 75%)" : "transparent", color: active ? "#1B3A4B" : "#5A6B7A", fontSize:12, fontWeight: active ? 500 : 400, textAlign:"left", width:"100%", marginBottom:2, position:"relative", lineHeight:"21px", verticalAlign:"middle" }),
    menuBtnBar: { position:"absolute", left:0, top:5, bottom:5, width:4, borderRadius:4, backgroundColor:"#2EC4B6" } as CSSProperties,

    // Header
    header: { height:56, backgroundColor:"#fff", borderBottom:"1px solid #E8EDF0", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", flexShrink:0 } as CSSProperties,
    headerLeft: { display:"flex", alignItems:"center", gap:10 } as CSSProperties,
    headerToggle: { width:22, height:22, cursor:"pointer", position:"absolute", left:209, top:17, zIndex:60, borderRadius:"50%", filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.08))" } as CSSProperties,
    headerTitle: { fontSize:15, fontWeight:600, color:"#1B3A4B" } as CSSProperties,
    headerRight: { display:"flex", alignItems:"center", gap:12 } as CSSProperties,
    gearBtn: { width:32, height:32, borderRadius:8, backgroundColor:"#F4F7F9", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" } as CSSProperties,
    avatar: { width:36, height:36, borderRadius:"50%", objectFit:"cover" } as CSSProperties,
    avatarText: { color:"#fff", fontSize:12, fontWeight:700 } as CSSProperties,
    userName: { fontSize:13, fontWeight:500, color:"#1B3A4B", lineHeight:1.3 } as CSSProperties,
    userRole: { fontSize:11, color:"#8CA3AE", lineHeight:1.3 } as CSSProperties,

    // Tabs bar
    tabsBar: { backgroundColor:"#fff", borderBottom:"1px solid #E8EDF0", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 } as CSSProperties,
    tabBtn: (active: boolean): CSSProperties => ({ padding:"13px 14px 11px", fontSize:13, fontWeight: active ? 500 : 400, color: active ? "#1B3A4B" : "#8CA3AE", background:"none", border:"none", borderBottom:`2px solid ${active ? "#2EC4B6" : "transparent"}`, cursor:"pointer", whiteSpace:"nowrap" }),
    tooltip: { position:"absolute", top:"calc(100% + 8px)", left:0, zIndex:200, backgroundColor:"#fff", color:"#3A4F5C", fontSize:12, padding:"12px 16px", borderRadius:8, whiteSpace:"normal", width:180, boxShadow:"0 6px 24px rgba(0,0,0,0.12)", lineHeight:1.6, border:"1px solid #E8EDF0" } as CSSProperties,
    tooltipArrow: { position:"absolute", top:-5, left:18, width:9, height:9, backgroundColor:"#fff", transform:"rotate(45deg)", borderLeft:"1px solid #E8EDF0", borderTop:"1px solid #E8EDF0" } as CSSProperties,

    // Modal
    overlay: { position:"fixed", inset:0, backgroundColor:"#4D4A5433", backdropFilter:"blur(14px)", display:"flex", alignItems:"stretch", justifyContent:"flex-end", zIndex:999 } as CSSProperties,
    modal: { backgroundColor:"#fff", width:420, padding:"24px 28px 20px", boxShadow:"-4px 0 24px rgba(0,0,0,0.12)", position:"relative", overflowY:"auto", height:"100%" } as CSSProperties,
    modalTitle: { fontSize:15, fontWeight:600, color:"#1B3A4B", marginBottom:20 } as CSSProperties,
    modalClose: { position:"absolute", top:16, right:18, background:"none", border:"none", cursor:"pointer", fontSize:18, color:"#8CA3AE", lineHeight:1 } as CSSProperties,
    formLabel: { fontSize:12, fontWeight:500, color:"#5A6B7A", marginBottom:5, display:"block" } as CSSProperties,
    formInput: { width:"100%", padding:"9px 12px", fontSize:12.5, border:"1px solid #D6DEE3", borderRadius:7, outline:"none", color:"#1B3A4B", backgroundColor:"#fff", boxSizing:"border-box" } as CSSProperties,
    formGroup: { marginBottom:16 } as CSSProperties,
    formSelect: { width:"100%", padding:"9px 12px", fontSize:12.5, border:"1px solid #D6DEE3", borderRadius:7, color:"#1B3A4B", backgroundColor:"#fff", cursor:"pointer", position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", boxSizing:"border-box" } as CSSProperties,
    formDropMenu: { position:"absolute", left:0, right:0, top:"calc(100% + 3px)", backgroundColor:"#fff", border:"1px solid #E8EDF0", borderRadius:7, boxShadow:"0 4px 14px rgba(0,0,0,0.09)", overflow:"hidden", zIndex:300 } as CSSProperties,
    formDropItem: (active: boolean): CSSProperties => ({ display:"block", width:"100%", textAlign:"left", padding:"8px 14px", fontSize:12, color: active ? "#2EC4B6" : "#5A6B7A", backgroundColor: active ? "#F0FAF9" : "transparent", border:"none", cursor:"pointer" }),
    modalFooter: { display:"flex", justifyContent:"flex-end", gap:10, marginTop:22 } as CSSProperties,
    cancelBtn: { padding:"8px 20px", fontSize:12.5, fontWeight:500, color:"#5A6B7A", backgroundColor:"#fff", border:"1px solid #D6DEE3", borderRadius:7, cursor:"pointer" } as CSSProperties,
    saveBtn: { padding:"8px 20px", fontSize:12.5, fontWeight:500, color:"#fff", backgroundColor:"#2EC4B6", border:"none", borderRadius:7, cursor:"pointer" } as CSSProperties,

    // Controls
    controlsRow: { display:"flex", alignItems:"center", gap:8 } as CSSProperties,
    dropBtn: { display:"flex", alignItems:"center", gap:4, padding:"6px 12px", fontSize:12.5, color:"#5A7A8A", border:"1px solid #D6DEE3", borderRadius:6, backgroundColor:"#fff", cursor:"pointer" } as CSSProperties,
    dropMenu: { position:"absolute", right:0, top:"calc(100% + 4px)", backgroundColor:"#fff", border:"1px solid #E8EDF0", borderRadius:8, minWidth:120, boxShadow:"0 4px 16px rgba(0,0,0,0.1)", overflow:"hidden", zIndex:200 } as CSSProperties,
    dropItem: (active: boolean): CSSProperties => ({ display:"block", width:"100%", textAlign:"left", padding:"8px 16px", fontSize:12.5, color: active ? "#2EC4B6" : "#5A7A8A", backgroundColor: active ? "#F0FAF9" : "transparent", border:"none", cursor:"pointer" }),
    addBtn: { display:"flex", alignItems:"center", gap:6, padding:"6px 14px", fontSize:12.5, fontWeight:500, color:"#1B3A4B", backgroundColor:"#E6F4F1", border:"none", borderRadius:6, cursor:"pointer", whiteSpace:"nowrap" } as CSSProperties,
    copyBtn: { width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #D6DEE3", borderRadius:6, backgroundColor:"#fff", cursor:"pointer" } as CSSProperties,

    // Table
    tableWrap: { padding:"12px 16px", flex:1 } as CSSProperties,
    tableCard: { backgroundColor:"#fff", borderRadius:10, border:"1px solid #E8EDF0", overflow:"hidden" } as CSSProperties,
    th: { textAlign:"left" as const, padding:"9px 16px", fontSize:12, fontWeight:500, color:"#8CA3AE" },
    td: (dark: boolean): CSSProperties => ({ padding:"9px 16px", fontSize:12.5, color: dark ? "#1B3A4B" : "#8CA3AE" }),
    statusText: { fontSize:13, color:"#22C55E", fontWeight:500 } as CSSProperties,

    // Pagination
    pgRow: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 16px", borderTop:"1px solid #E8EDF0" } as CSSProperties,
    pgBtn: { display:"flex", alignItems:"center", gap:4, padding:"4px 10px", fontSize:12.5, color:"#1B3A4B", border:"1px solid #D6DEE3", borderRadius:5, backgroundColor:"#fff", cursor:"pointer" } as CSSProperties,
    pgNum: (active: boolean): CSSProperties => ({ width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12.5, fontWeight: active ? 500 : 400, color: active ? "#1B3A4B" : "#8CA3AE", backgroundColor:"#fff", border: active ? "1px solid #E0E5E9" : "none", borderRadius:6, cursor:"pointer", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }),
    pgDots: { fontSize:12.5, color:"#8CA3AE", padding:"0 4px" } as CSSProperties,
    pgLabel: { fontSize:12.5, color:"#8CA3AE" } as CSSProperties,
    pgArrow: { width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", border:"none", backgroundColor:"transparent", cursor:"pointer", color:"#2EC4B6", fontSize:11 } as CSSProperties,

    // Empty state
    emptyWrap: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 24px" } as CSSProperties,
    emptyTitle: { fontSize:18, fontWeight:600, color:"#1B3A4B", marginTop:24 } as CSSProperties,
    emptySub: { fontSize:13, color:"#8CA3AE", marginTop:8, textAlign:"center" } as CSSProperties,
    emptyBtn: { display:"inline-flex", alignItems:"center", gap:8, marginTop:24, padding:"10px 24px", fontSize:13, fontWeight:500, color:"#fff", backgroundColor:"#3A4F5C", border:"none", borderRadius:8, cursor:"pointer" } as CSSProperties,
  };

  return (
    <div style={S.root} onClick={() => statusDropdownOpen && setStatusDropdownOpen(false)}>

      {/* ── SIDEBAR ── */}
      <aside style={S.aside}>
        <div style={S.logoWrap}>
          <div style={S.logoCircle}><Image src="/dasboard/fi_6102666.png" alt="Logo" width={34} height={34} /></div>
          <span style={S.logoText}>DataOnDeck</span>
        </div>

        <div style={{ ...S.menuSection, marginTop:14 }}>
          <span style={S.menuLabel}>Main Menu</span>
          {mainMenuItems.map(({ icon, label, active }) => (
            <button key={label} style={S.menuBtn(active)} onClick={() => { const route = sidebarRoutes[label]; if (route) router.push(route); }}>
              {active && <span style={S.menuBtnBar} />}
              <Image src={icon} alt={label} width={17} height={17} /><span>{label}</span>
            </button>
          ))}
        </div>

        <div style={{ ...S.menuSection, marginTop:24 }}>
          <span style={S.menuLabel}>Administration</span>
          {adminMenuItems.map(({ icon, label }) => (
            <button key={label} style={S.menuBtn(false)} onClick={() => { const route = sidebarRoutes[label]; if (route) router.push(route); }}>
              <Image src={icon} alt={label} width={17} height={17} /><span>{label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* SIDEBAR TOGGLE — floats on boundary */}
      <Image src="/dasboard/Sidebar Toggle.png" alt="Toggle sidebar" width={28} height={28} style={S.headerToggle} />

      {/* ── MAIN COLUMN ── */}
      <div style={S.mainCol}>

        {/* HEADER */}
        <header style={S.header}>
          <div style={S.headerLeft}>
            <span style={S.headerTitle}>Company Data</span>
          </div>
          <div style={S.headerRight}>
            <button style={S.gearBtn}>
              <Settings size={15} color="#5A7A8A" />
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Image src="/dasboard/95bca3ecaf6d28d115834f85b6163b6e58e91c7c.png" alt="Avatar" width={36} height={36} style={S.avatar} />
              <div style={{ display:"flex", flexDirection:"column" }}>
                <span style={S.userName}>Moni Roy</span>
                <span style={S.userRole}>Admin</span>
              </div>
              <ChevronDown size={13} color="#8CA3AE" />
            </div>
          </div>
        </header>

        {/* TABS BAR */}
        <div style={S.tabsBar}>
          <div style={{ display:"flex", alignItems:"center" }}>
            {tabs.map((tab) => (
              <div key={tab} style={{ position:"relative" }}>
                <button
                  style={S.tabBtn(activeTab === tab)}
                  onClick={() => setActiveTab(tab)}
                  onMouseEnter={() => setHoveredTab(tab)}
                  onMouseLeave={() => setHoveredTab(null)}
                >{tab}</button>
                {hoveredTab === tab && (
                  <div style={S.tooltip}>
                    {tabTooltips[tab].replace("\n", " ")}
                    <div style={S.tooltipArrow} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={S.controlsRow}>
            {/* Status dropdown */}
            <div style={{ position:"relative" }} onClick={e => e.stopPropagation()}>
              <button style={S.dropBtn} onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
                {selectedStatus}<ChevronDown size={12} />
              </button>
              {statusDropdownOpen && (
                <div style={S.dropMenu}>
                  {["Active","Draft","Archived"].map(opt => (
                    <button key={opt} style={S.dropItem(selectedStatus===opt)}
                      onClick={() => { setSelectedStatus(opt); setStatusDropdownOpen(false); }}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button style={S.addBtn} onClick={openAddModal}>Add Manually <Pencil size={12} /></button>
            <button style={S.copyBtn}><Image src="/dasboard/FileImport.png" alt="Import" width={16} height={16} /></button>
          </div>
        </div>

        {/* TABLE or EMPTY STATE */}
        {boardData.length === 0 ? (
          <div style={S.emptyWrap}>
            <Image src="/dasboard/55024599_9264882 1.png" alt="No data" width={260} height={220} style={{ objectFit:"contain" }} />
            <div style={S.emptyTitle}>No board members added yet</div>
            <div style={S.emptySub}>Add current board members to maintain an accurate company record.</div>
            <button style={S.emptyBtn} onClick={openAddModal}>+ Add Board Member</button>
          </div>
        ) : (
          <div style={S.tableWrap}>
            <div style={S.tableCard}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid #E8EDF0", backgroundColor:"#EEF6F7" }}>
                    <th style={{ ...S.th, width:"28%" }}>Name</th>
                    <th style={{ ...S.th, width:"24%" }}>Position</th>
                    <th style={{ ...S.th, width:"28%" }}>Appointment Date</th>
                    <th style={{ ...S.th, width:"20%" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < pagedData.length-1 ? "1px solid #F0F3F5" : "none", backgroundColor: idx % 2 === 0 ? "#F7FBFB" : "#fff" }}>
                      <td style={S.td(true)}>{row.name}</td>
                      <td style={S.td(false)}>{row.position}</td>
                      <td style={S.td(false)}>{row.appointmentDate}</td>
                      <td style={{ padding:"9px 16px" }}><span style={S.statusText}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div style={S.pgRow}>
                <div style={{ display:"flex", alignItems:"center", gap:7, position:"relative" }}>
                  <button style={S.pgBtn} onClick={() => setPerPageDropOpen(!perPageDropOpen)}>{perPage} <ChevronDown size={12} /></button>
                  {perPageDropOpen && (
                    <div style={{ position:"absolute", bottom:"calc(100% + 4px)", left:0, backgroundColor:"#fff", border:"1px solid #E8EDF0", borderRadius:7, boxShadow:"0 4px 14px rgba(0,0,0,0.09)", overflow:"hidden", zIndex:300 }}>
                      {[5, 10, 20, 50].map(n => (
                        <button key={n} style={{ display:"block", width:"100%", textAlign:"left", padding:"8px 20px", fontSize:12, color: perPage === n ? "#2EC4B6" : "#5A6B7A", backgroundColor: perPage === n ? "#F0FAF9" : "transparent", border:"none", cursor:"pointer" } as CSSProperties}
                          onClick={() => { setPerPage(n); setCurrentPage(1); setPerPageDropOpen(false); }}>{n}</button>
                      ))}
                    </div>
                  )}
                  <span style={S.pgLabel}>Show on page</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:1 }}>
                  <span style={{ ...S.pgLabel, marginRight:5 }}>Page</span>
                  <button style={S.pgArrow} disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>◀</button>
                  {getPageNumbers().map((p, i) =>
                    typeof p === "string"
                      ? <span key={`d${i}`} style={S.pgDots}>{p}</span>
                      : <button key={p} style={S.pgNum(currentPage === p)} onClick={() => setCurrentPage(p)}>{p}</button>
                  )}
                  <button style={S.pgArrow} disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>▶</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MANUAL ENTRY FORM MODAL ── */}
      {modalOpen && (
        <div style={S.overlay} onClick={() => setModalOpen(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <button style={S.modalClose} onClick={() => setModalOpen(false)}>&times;</button>
            <div style={S.modalTitle}>Manual Entry Form</div>

            <div style={S.formGroup}>
              <label style={S.formLabel}>Name</label>
              <input style={S.formInput} placeholder="Baby Sharma" value={formName} onChange={e => setFormName(e.target.value)} />
            </div>

            <div style={S.formGroup}>
              <label style={S.formLabel}>Position</label>
              <div style={{ position:"relative" }}>
                <button style={S.formSelect} onClick={() => { setPosDropOpen(!posDropOpen); setStatusFormDropOpen(false); }}>
                  <span>{formPosition}</span><ChevronDown size={13} color="#8CA3AE" />
                </button>
                {posDropOpen && (
                  <div style={S.formDropMenu}>
                    {positionOptions.map(opt => (
                      <button key={opt} style={S.formDropItem(formPosition === opt)} onClick={() => { setFormPosition(opt); setPosDropOpen(false); }}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={S.formGroup}>
              <label style={S.formLabel}>Appointment Date</label>
              <input style={S.formInput} placeholder="21 Sep 2025" value={formDate} onChange={e => setFormDate(e.target.value)} />
            </div>

            <div style={S.formGroup}>
              <label style={S.formLabel}>Status</label>
              <div style={{ position:"relative" }}>
                <button style={S.formSelect} onClick={() => { setStatusFormDropOpen(!statusFormDropOpen); setPosDropOpen(false); }}>
                  <span>{formStatus}</span><ChevronDown size={13} color="#8CA3AE" />
                </button>
                {statusFormDropOpen && (
                  <div style={S.formDropMenu}>
                    {statusOptions.map(opt => (
                      <button key={opt} style={S.formDropItem(formStatus === opt)} onClick={() => { setFormStatus(opt); setStatusFormDropOpen(false); }}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={S.modalFooter}>
              <button style={S.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
              <button style={S.saveBtn} onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}