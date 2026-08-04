/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { X, Globe, BarChart2, AlertTriangle, Cpu, ShieldAlert, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

interface SidebarProps {
  filters: { extraction: boolean; processing: boolean };
  toggleFilter: (key: "extraction" | "processing") => void;
  selectedNode: any;
  isOpen: boolean;
  onClose: () => void;
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
  { color: "#34D399", label: "Extraction Site" },
  { color: "#10B981", label: "Processing Facility" },
  { color: "#FBBF24", label: "Combined Site" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#081410", border: "1px solid #162e24",
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

export default function Sidebar({ filters, toggleFilter, selectedNode, isOpen, onClose }: SidebarProps) {
  const handleDownload = () => window.open("/api/data", "_blank");

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  useEffect(() => {
    setIsSimulating(false);
    setSimulationResult(null);
  }, [selectedNode?.id]);

  const handleSimulateDisruption = () => {
    if (!selectedNode) return;
    setIsSimulating(true);
    setSimulationResult(null);
    setTimeout(() => {
      setIsSimulating(false);
      const isCritical = selectedNode.type.includes("Processing");
      setSimulationResult({
        impact: isCritical ? "SEVERE (80-90% supply freeze)" : "MODERATE (20-30% flow reduction)",
        mitigation: isCritical 
          ? "Mobilize strategic stockpiles & accelerate Malaysia Lynas expansion." 
          : "Reroute raw extraction feed to domestic processing units.",
        timeframe: isCritical ? "Disruption window: 12-18 months" : "Disruption window: 2-3 months",
      });
    }, 1200);
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-screen w-full max-w-[420px] bg-surface/95 border-l border-border backdrop-blur-md shadow-2xl flex flex-col z-[1050] transition-transform duration-300 ease-in-out overflow-hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* ── HEADER ─────────────────────────────── */}
      <div className="relative px-5 pt-6 pb-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
            Intelligence Panel
          </span>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center p-1.5 rounded-full border border-border bg-background/50 hover:bg-primary/10 hover:border-primary/30 text-gray-400 hover:text-white transition-all duration-200"
          title="Close Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ── SELECTED NODE DETAILS ───────────────── */}
        {selectedNode ? (
          <div className="px-5 py-5 border-b border-border bg-primary/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 rounded-full pulse-dot" 
                  style={{ 
                    backgroundColor: selectedNode.type.includes("Extraction") && selectedNode.type.includes("Processing") ? "#FBBF24" : selectedNode.type.includes("Processing") ? "#10B981" : "#34D399" 
                  }} 
                />
                <span className="text-[9px] font-bold text-gray-300 tracking-widest uppercase">
                  {selectedNode.type} Node
                </span>
              </div>
              <span 
                className="text-[9px] font-bold px-2 py-0.5 rounded border"
                style={{ 
                  color: selectedNode.type.includes("Extraction") && selectedNode.type.includes("Processing") ? "#EF4444" : selectedNode.type.includes("Processing") ? "#F87171" : "#FBBF24",
                  borderColor: selectedNode.type.includes("Extraction") && selectedNode.type.includes("Processing") ? "rgba(239,68,68,0.3)" : selectedNode.type.includes("Processing") ? "rgba(248,113,113,0.3)" : "rgba(251,191,36,0.3)",
                  background: selectedNode.type.includes("Extraction") && selectedNode.type.includes("Processing") ? "rgba(239,68,68,0.1)" : selectedNode.type.includes("Processing") ? "rgba(248,113,113,0.1)" : "rgba(251,191,36,0.1)"
                }}
              >
                {selectedNode.type.includes("Extraction") && selectedNode.type.includes("Processing") ? "CRITICAL RISK" : selectedNode.type.includes("Processing") ? "HIGH RISK" : "MEDIUM RISK"}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">
              {selectedNode.name}
            </h2>
            <p className="text-xs text-gray-400 mb-4">{selectedNode.country}</p>

            {/* Grid stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg p-2.5 bg-background/60 border border-border">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Capacity metric</div>
                <div className="text-xs font-bold text-white mt-0.5">{selectedNode.capacity_metric}</div>
              </div>
              <div className="rounded-lg p-2.5 bg-background/60 border border-border">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Control Structure</div>
                <div className="text-xs font-bold text-white mt-0.5">{selectedNode.control}</div>
              </div>
            </div>

            {/* Key REEs */}
            {selectedNode.key_rees && (
              <div className="mb-4">
                <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Key Elements</div>
                <div className="flex gap-1.5 flex-wrap">
                  {selectedNode.key_rees.map((ree: string) => (
                    <span 
                      key={ree} 
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary uppercase"
                    >
                      {ree}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Insight */}
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center gap-1 text-[9px] text-primary uppercase tracking-widest font-bold mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Geopolitical Intelligence</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                &ldquo;{selectedNode.insight}&rdquo;
              </p>
            </div>

            {/* Disruption Simulator Button & Results */}
            <div className="mt-4 pt-3 border-t border-border/30">
              {!isSimulating && !simulationResult && (
                <button
                  onClick={handleSimulateDisruption}
                  className="w-full py-2 px-3 text-[10px] font-bold tracking-widest text-primary hover:text-white border border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 rounded-md transition-all duration-200 uppercase flex items-center justify-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Simulate Supply Disruption</span>
                </button>
              )}

              {isSimulating && (
                <div className="flex flex-col items-center justify-center py-2 gap-2">
                  <div className="w-4 h-4 rounded-full border border-primary border-t-transparent animate-spin" />
                  <span className="text-[9px] text-primary font-semibold tracking-wider animate-pulse uppercase">
                    Analyzing Dependency Cascade...
                  </span>
                </div>
              )}

              {simulationResult && (
                <div className="rounded-lg p-3 bg-red-500/10 border border-red-500/25 animate-fadeIn">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">
                      Simulation Report
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-gray-300">
                    <p>
                      <strong className="text-white">Impact Level:</strong> {simulationResult.impact}
                    </p>
                    <p>
                      <strong className="text-white">Mitigation:</strong> {simulationResult.mitigation}
                    </p>
                    <p className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">
                      {simulationResult.timeframe}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="px-5 py-8 text-center border-b border-border bg-background/20">
            <Globe className="w-10 h-10 text-primary/30 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-300">No Node Selected</p>
            <p className="text-xs text-gray-500 mt-1">Click a marker on the map to display node-specific intelligence.</p>
          </div>
        )}

        {/* ── COUNTRY COMPARE (Recharts) ─────────── */}
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-primary" />
              <p className="section-label">Country Compare</p>
            </div>
            <span className="text-[9px] text-gray-500 italic">China · USA · Aus</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-3">Production · Processing · Risk Score (%)</p>

          <div style={{ height: 160 }}>
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
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "rgba(52,211,153,0.04)" }} />
                <Bar dataKey="production" fill="#34D399" radius={[3, 3, 0, 0]} />
                <Bar dataKey="processing" fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="risk"       fill="#F87171" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 justify-center">
            {[
              { color: "#34D399", label: "Production" },
              { color: "#10B981", label: "Processing" },
              { color: "#F87171", label: "Risk" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── IMPORT EXPOSURE ────────────────────── */}
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center gap-1.5 mb-3">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <p className="section-label">Import Exposure</p>
          </div>
          <div className="space-y-3">
            {IMPORT_EXPOSURE.map((item) => (
              <div
                key={item.region}
                className="rounded-lg p-3 bg-background/50 border border-border"
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
                <div className="flex justify-between text-[9px] text-gray-500 mt-1">
                  <span>Primary Supplier: China</span>
                  <span>{item.pct}% exposure</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-3 italic leading-relaxed">
            China controls 85% of global REE processing — a single-point-of-failure for Western defense &amp; green tech.
          </p>
        </div>

        {/* ── MAP FILTERS ────────────────────────── */}
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center gap-1.5 mb-3">
            <Cpu className="w-4 h-4 text-primary" />
            <p className="section-label">Map Toggles</p>
          </div>
          <div className="space-y-2">
            {[
              { key: "extraction" as const, color: "#34D399", label: "Extraction Nodes" },
              { key: "processing" as const, color: "#10B981", label: "Processing Facilities" },
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
          <div className="mt-4 pt-3 space-y-2 border-t border-border/50">
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: `${l.color}20`, border: `2px solid ${l.color}` }}
                />
                <span className="text-[10px] text-gray-500 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER / DOWNLOAD ──────────────────── */}
      <div className="px-5 py-4 border-t border-border mt-auto bg-background/20">
        <button 
          onClick={handleDownload} 
          className="download-btn mb-3 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download GeoJSON</span>
        </button>
        <div className="rounded-lg px-3 py-2 flex items-center gap-2 bg-primary/5 border border-primary/10">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <p className="text-[9px] text-gray-500">
            Data feed active · World Bank API
          </p>
        </div>
      </div>
    </aside>
  );
}
