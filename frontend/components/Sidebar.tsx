"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";

interface SidebarProps {
  filters: { extraction: boolean; processing: boolean };
  toggleFilter: (key: "extraction" | "processing") => void;
}

const COMPARE_DATA = [
  { name: "China",     production: 60, processing: 85, risk: 92 },
  { name: "USA",       production: 14, processing: 5,  risk: 38 },
  { name: "Australia", production: 9,  processing: 2,  risk: 28 },
];

const IMPORT_EXPOSURE = [
  { region: "United States", pct: 74, risk: "HIGH",   color: "#F87171" },
  { region: "European Union", pct: 87, risk: "SEVERE", color: "#EF4444" },
  { region: "Japan",          pct: 62, risk: "HIGH",   color: "#F87171" },
];

const LEGEND = [
  { color: "#38BDF8", label: "Extraction Site" },
  { color: "#818CF8", label: "Processing Facility" },
  { color: "#FBBF24", label: "Combined Site" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#0B1117", border: "1px solid #1F2937",
        borderRadius: 8, padding: "8px 12px", fontSize: 11,
      }}>
        <p style={{ color: "#9CA3AF", marginBottom: 4 }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.fill, margin: "2px 0" }}>
            {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}: <strong>{p.value}%</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Sidebar({ filters, toggleFilter }: SidebarProps) {
  const handleDownload = () => window.open("http://127.0.0.1:8000/api/data", "_blank");

  return (
    <aside
      className="w-[30%] h-screen flex flex-col overflow-y-auto z-10 relative"
      style={{
        background: "linear-gradient(180deg, #080f18 0%, #0B1117 100%)",
        borderLeft: "1px solid #1a2332",
      }}
    >
      {/* ── HEADER ─────────────────────────────── */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid #1a2332" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="text-[10px] font-bold text-[#38BDF8] tracking-[0.2em] uppercase">
              Real Rails Intelligence
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400 tracking-[0.15em] uppercase">Live</span>
          </div>
        </div>

        <h1 className="gradient-title text-[1.7rem] font-extrabold leading-[1.2] tracking-tight mb-2">
          Rare Earth<br />Dependency Map
        </h1>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Streaming real-time data from the{" "}
          <span className="text-[#38BDF8] font-medium">World Bank API</span> across 17 critical rare earth elements.
        </p>

        {/* Mini stat row */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { v: "17", l: "REEs" },
            { v: "4", l: "Sites" },
            { v: "HIGH", l: "Risk", red: true },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-lg p-2 text-center"
              style={{ background: "rgba(56,189,248,0.05)", border: "1px solid #1a2332" }}
            >
              <div className={`text-sm font-extrabold ${s.red ? "text-red-400" : "text-[#38BDF8]"}`}>{s.v}</div>
              <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COUNTRY COMPARE (Recharts) ─────────── */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #1a2332" }}>
        <div className="flex items-center justify-between mb-1">
          <p className="section-label">Country Compare</p>
          <span className="text-[9px] text-gray-600 italic">China · USA · Australia</span>
        </div>
        <p className="text-[10px] text-gray-600 mb-3">Production · Processing · Risk Score (%)</p>

        <div style={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARE_DATA} barCategoryGap="28%" barGap={2}
              margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 10 }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                tick={{ fill: "#4B5563", fontSize: 9 }}
                axisLine={false} tickLine={false}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "rgba(56,189,248,0.04)" }} />
              <Bar dataKey="production" fill="#38BDF8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="processing" fill="#818CF8" radius={[3, 3, 0, 0]} />
              <Bar dataKey="risk"       fill="#F87171" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-1 justify-center">
          {[
            { color: "#38BDF8", label: "Production" },
            { color: "#818CF8", label: "Processing" },
            { color: "#F87171", label: "Risk" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm" style={{ background: l.color }} />
              <span className="text-[9px] text-gray-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── IMPORT EXPOSURE ────────────────────── */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #1a2332" }}>
        <p className="section-label mb-3">Import Exposure</p>
        <div className="space-y-3">
          {IMPORT_EXPOSURE.map((item) => (
            <div
              key={item.region}
              className="rounded-lg p-3"
              style={{ background: "rgba(11,17,23,0.9)", border: "1px solid #1a2332" }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-white">{item.region}</span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  {item.risk}
                </span>
              </div>
              <div className="progress-bar mb-1">
                <div className="progress-bar-fill" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
              <div className="flex justify-between text-[9px] text-gray-600 mt-1">
                <span>Primary Supplier: China</span>
                <span>{item.pct}% exposure</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-3 italic leading-relaxed">
          China controls 85% of global REE processing — a single-point-of-failure for Western defense &amp; green tech.
        </p>
      </div>

      {/* ── WHO CONTROLS THE RAIL ──────────────── */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #1a2332" }}>
        <p className="section-label mb-3">Extraction Share</p>
        <div className="space-y-2.5">
          {[
            { country: "China",     pct: 60, color: "#38BDF8" },
            { country: "USA",       pct: 14, color: "#818CF8" },
            { country: "Australia", pct: 9,  color: "#34D399" },
            { country: "Myanmar",   pct: 7,  color: "#F59E0B" },
            { country: "Others",    pct: 10, color: "#4B5563" },
          ].map((item) => (
            <div key={item.country}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-400">{item.country}</span>
                <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAP FILTERS ────────────────────────── */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #1a2332" }}>
        <p className="section-label mb-3">Map Filters</p>
        <div className="space-y-2">
          {[
            { key: "extraction" as const, color: "#38BDF8", label: "Extraction Nodes" },
            { key: "processing" as const, color: "#818CF8", label: "Processing Facilities" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key)}
              className="filter-toggle w-full"
              style={
                filters[f.key]
                  ? { borderColor: `${f.color}60`, background: `${f.color}08` }
                  : {}
              }
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: filters[f.key] ? f.color : "#374151" }}
              />
              <span className="text-[11px] text-gray-300 flex-grow text-left">{f.label}</span>
              <span
                className="text-[9px] font-bold tracking-wider"
                style={{ color: filters[f.key] ? f.color : "#4B5563" }}
              >
                {filters[f.key] ? "ON" : "OFF"}
              </span>
            </button>
          ))}
        </div>

        {/* Map Legend */}
        <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: "1px solid #1a2332" }}>
          {LEGEND.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: `${l.color}20`, border: `2px solid ${l.color}` }}
              />
              <span className="text-[10px] text-gray-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER / DOWNLOAD ──────────────────── */}
      <div className="px-5 py-4 mt-auto">
        <button onClick={handleDownload} className="download-btn mb-3">
          ↓ &nbsp;Download Live GeoJSON Data
        </button>
        <div
          className="rounded-lg px-3 py-2 flex items-center gap-2"
          style={{ background: "rgba(56,189,248,0.04)", border: "1px solid #1a2332" }}
        >
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <p className="text-[9px] text-gray-600">
            Sources: <span className="text-gray-500 font-medium">USGS MRDS · World Bank API</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
