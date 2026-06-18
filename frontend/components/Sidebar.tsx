"use client";

interface SidebarProps {
  filters: { extraction: boolean; processing: boolean };
  toggleFilter: (key: "extraction" | "processing") => void;
}

const COUNTRY_DOMINANCE = [
  { country: "China", percent: 60, color: "#38BDF8" },
  { country: "USA", percent: 14, color: "#818CF8" },
  { country: "Australia", percent: 9, color: "#34D399" },
  { country: "Myanmar", percent: 7, color: "#F59E0B" },
  { country: "Others", percent: 10, color: "#6B7280" },
];

const KEY_STATS = [
  { label: "Global Extraction Monitored", value: "4 Sites" },
  { label: "Dominant Supply Nation", value: "China" },
  { label: "Critical Minerals Tracked", value: "17 REEs" },
  { label: "At-Risk Dependencies", value: "HIGH" },
];

export default function Sidebar({ filters, toggleFilter }: SidebarProps) {
  const handleDownload = () => {
    window.open("http://127.0.0.1:8000/api/data", "_blank");
  };

  return (
    <aside className="w-[30%] h-screen border-l border-[#1F2937] bg-[#0B1117] flex flex-col overflow-y-auto z-10 relative shadow-2xl">
      {/* ── Header ── */}
      <div className="p-5 border-b border-[#1F2937]">
        <div className="flex items-center gap-2 mb-3">
          <span className="pulse-dot"></span>
          <span className="text-xs font-semibold text-[#38BDF8] tracking-widest uppercase">Real Rails Intelligence</span>
        </div>

        <h1 className="gradient-title text-2xl font-bold leading-tight tracking-tight">
          Rare Earth<br />Dependency Map
        </h1>
        <p className="text-gray-500 text-xs mt-2 leading-relaxed">
          Mapping global extraction & processing nodes for 17 critical rare earth elements that power modern infrastructure.
        </p>

        <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1F2937] bg-[#030712] w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs text-gray-400">Supply Chain Rail</span>
        </div>
      </div>

      {/* ── Key Stats ── */}
      <div className="p-4 border-b border-[#1F2937]">
        <p className="section-label mb-3">Intelligence Snapshot</p>
        <div className="grid grid-cols-2 gap-2">
          {KEY_STATS.map((stat) => (
            <div key={stat.label} className="glass-card p-3">
              <div className={`text-sm font-bold stat-value ${stat.value === "HIGH" ? "text-red-400" : "text-[#38BDF8]"}`}>
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section B: Why This Matters ── */}
      <div className="p-4 border-b border-[#1F2937]">
        <p className="section-label mb-3">Why This Matters</p>
        <div className="glass-card p-3">
          <p className="text-xs leading-relaxed text-gray-300">
            Rare earth elements are the invisible backbone of modern defense, energy, and tech infrastructure — from EV batteries and wind turbines to fighter jet sensors. A supply disruption ripples across every industrial sector simultaneously.
          </p>
          <div className="mt-3 pt-3 border-t border-[#1F2937] flex items-start gap-2">
            <span className="text-[#818CF8] text-xs">⚡</span>
            <p className="text-[11px] text-[#818CF8]">Good for your future-rails thesis around industrial capacity.</p>
          </div>
        </div>
      </div>

      {/* ── Section C: Who Controls the Rail ── */}
      <div className="p-4 border-b border-[#1F2937]">
        <p className="section-label mb-3">Who Controls the Rail</p>
        <div className="glass-card p-3 space-y-3">
          {COUNTRY_DOMINANCE.map((item) => (
            <div key={item.country}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-300">{item.country}</span>
                <span className="text-xs font-semibold" style={{ color: item.color }}>{item.percent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${item.percent}%`, background: item.color }}></div>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-gray-500 pt-1 italic">
            China dominates extraction & processing. Western nations are racing to diversify.
          </p>
        </div>
      </div>

      {/* ── Section D: Filters ── */}
      <div className="p-4 border-b border-[#1F2937]">
        <p className="section-label mb-3">Map Filters</p>
        <div className="space-y-2">
          <button
            onClick={() => toggleFilter("extraction")}
            className={`filter-toggle w-full ${filters.extraction ? "active" : ""}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] flex-shrink-0"></span>
            <span className="text-xs text-gray-300 flex-grow text-left">Extraction Nodes</span>
            <span className={`text-[10px] font-semibold ${filters.extraction ? "text-[#38BDF8]" : "text-gray-600"}`}>
              {filters.extraction ? "ON" : "OFF"}
            </span>
          </button>
          <button
            onClick={() => toggleFilter("processing")}
            className={`filter-toggle w-full ${filters.processing ? "active" : ""}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#818CF8] flex-shrink-0"></span>
            <span className="text-xs text-gray-300 flex-grow text-left">Processing Facilities</span>
            <span className={`text-[10px] font-semibold ${filters.processing ? "text-[#818CF8]" : "text-gray-600"}`}>
              {filters.processing ? "ON" : "OFF"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Map Legend ── */}
      <div className="p-4 border-b border-[#1F2937]">
        <p className="section-label mb-3">Map Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full border-2 border-[#38BDF8] bg-[#38BDF8]/20"></div>
            <span className="text-xs text-gray-400">Extraction-only Site</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full border-2 border-[#818CF8] bg-[#818CF8]/20"></div>
            <span className="text-xs text-gray-400">Processing-only Facility</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full border-2 border-amber-400 bg-amber-400/20"></div>
            <span className="text-xs text-gray-400">Combined Site</span>
          </div>
        </div>
      </div>

      {/* ── Section E: Download ── */}
      <div className="p-4 mt-auto">
        <button onClick={handleDownload} className="download-btn">
          ↓ &nbsp;Download Sample Data (GeoJSON)
        </button>
        <p className="text-center text-[10px] text-gray-600 mt-2">
          USGS · World Bank · Real Rails Mock v1
        </p>
      </div>
    </aside>
  );
}
