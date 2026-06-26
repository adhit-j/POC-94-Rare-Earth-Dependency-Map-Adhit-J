/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ── Animated Radar-Ping SVG Markers ─────────────────────────
function createRadarIcon(color: string, size = 44) {
  const r = size / 2;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <filter id="glow-${color.replace('#','')}">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="fill-${color.replace('#','')}">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.4"/>
        </radialGradient>
      </defs>
      <!-- Outer ping ring -->
      <circle cx="${r}" cy="${r}" r="${r - 3}" fill="none" stroke="${color}" stroke-width="0.6" stroke-opacity="0.25"/>
      <!-- Mid ring -->
      <circle cx="${r}" cy="${r}" r="${r - 9}" fill="${color}" fill-opacity="0.07" stroke="${color}" stroke-width="1" stroke-opacity="0.4"/>
      <!-- Core dot -->
      <circle cx="${r}" cy="${r}" r="5" fill="url(#fill-${color.replace('#','')})" filter="url(#glow-${color.replace('#','')})" />
      <!-- Center point -->
      <circle cx="${r}" cy="${r}" r="2" fill="#ffffff" fill-opacity="0.9"/>
    </svg>`;
  return L.divIcon({
    html: `<div class="radar-marker" style="--mc:${color}">${svg}</div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [r, r],
    popupAnchor: [0, -r - 4],
  });
}

const icons: Record<string, L.DivIcon> = {
  extraction: createRadarIcon("#38BDF8"),
  processing:  createRadarIcon("#818CF8"),
  combined:    createRadarIcon("#FBBF24"),
};

function getIcon(type: string) {
  const e = type.includes("Extraction");
  const p = type.includes("Processing");
  if (e && p) return icons.combined;
  if (p)      return icons.processing;
  return icons.extraction;
}

function getColor(type: string) {
  const e = type.includes("Extraction");
  const p = type.includes("Processing");
  if (e && p) return "#FBBF24";
  if (p)      return "#818CF8";
  return "#38BDF8";
}

function getRisk(type: string) {
  if (type.includes("Extraction") && type.includes("Processing")) return { label: "CRITICAL", color: "#EF4444" };
  if (type.includes("Processing")) return { label: "HIGH",     color: "#F87171" };
  return                                 { label: "MEDIUM",   color: "#FBBF24" };
}

// ── Popup ────────────────────────────────────────────────────
function NodePopup({ p }: { p: any }) {
  const color = getColor(p.type);
  const risk  = getRisk(p.type);
  return (
    <div style={{
      background: "linear-gradient(160deg, #0d1b2a 0%, #0B1117 100%)",
      borderRadius: 12,
      padding: "14px 16px",
      minWidth: 260,
      border: `1px solid ${color}40`,
      boxShadow: `0 0 30px ${color}18, 0 16px 40px rgba(0,0,0,0.8)`,
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Type badge row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color }}>
            {p.type}
          </span>
        </div>
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: "0.1em",
          color: risk.color, background: `${risk.color}15`,
          border: `1px solid ${risk.color}30`,
          borderRadius: 4, padding: "2px 7px",
        }}>
          {risk.label}
        </span>
      </div>

      {/* Name & country */}
      <h3 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>{p.name}</h3>
      <p style={{ margin: "3px 0 12px", color: "#6B7280", fontSize: 11 }}>{p.country}</p>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
        <div style={{ background: "#030b14", borderRadius: 8, padding: "8px 10px", border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 9, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Capacity</div>
          <div style={{ fontSize: 12, fontWeight: 700, color }}>{p.capacity_metric}</div>
        </div>
        <div style={{ background: "#030b14", borderRadius: 8, padding: "8px 10px", border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 9, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Risk</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: risk.color }}>{risk.label}</div>
        </div>
      </div>

      {/* Control */}
      <div style={{ background: "#030b14", borderRadius: 8, padding: "8px 10px", border: "1px solid #1a2332", marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Control Structure</div>
        <div style={{ fontSize: 11, color: "#D1D5DB" }}>{p.control}</div>
      </div>

      {/* Key REEs */}
      {p.key_rees && (
        <div style={{ background: "#030b14", borderRadius: 8, padding: "8px 10px", border: "1px solid #1a2332", marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Key REEs</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {p.key_rees.map((ree: string) => (
              <span key={ree} style={{
                fontSize: 9, fontWeight: 700, color: color, background: `${color}15`,
                border: `1px solid ${color}40`, borderRadius: 4, padding: "2px 6px"
              }}>
                {ree}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Insight */}
      <div style={{ borderTop: "1px solid #1a2332", paddingTop: 10 }}>
        <div style={{ fontSize: 9, color: "#818CF8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>⚡ Intelligence</div>
        <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", lineHeight: 1.6, fontStyle: "italic" }}>
          {p.insight}
        </p>
      </div>
    </div>
  );
}

// ── Main Map Component ───────────────────────────────────────
export default function DependencyMap({
  filters,
}: {
  filters: { extraction: boolean; processing: boolean };
}) {
  const [geoData, setGeoData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data")
      .then((r) => r.json())
      .then((d) => {
        setGeoData(d);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch((e) => console.error("API failed:", e));
  }, []);

  const visible = geoData?.features?.filter((f: any) => {
    const isE = f.properties.type.includes("Extraction");
    const isP = f.properties.type.includes("Processing");
    if (isE && !isP) return filters.extraction;
    if (isP && !isE) return filters.processing;
    return filters.extraction || filters.processing;
  });

  return (
    <div className="w-full h-full relative">

      {/* ── Top HUD Bar ── */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, display: "flex", alignItems: "center", gap: 16,
        padding: "8px 22px",
        background: "rgba(8,15,24,0.92)",
        border: "1px solid rgba(56,189,248,0.2)",
        borderRadius: 999,
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 30px rgba(56,189,248,0.08), 0 8px 32px rgba(0,0,0,0.6)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>
            Global REE Extraction Network
          </span>
        </div>
        <div style={{ width: 1, height: 12, background: "#1a2332" }} />
        <span style={{ fontSize: 10, color: "#38BDF8", fontWeight: 600 }}>
          {visible?.length ?? 0} nodes
        </span>
        {lastUpdated && (
          <>
            <div style={{ width: 1, height: 12, background: "#1a2332" }} />
            <span style={{ fontSize: 9, color: "#4B5563" }}>Updated {lastUpdated}</span>
          </>
        )}
      </div>

      {/* ── Map ── */}
      <MapContainer
        center={[20, 10]}
        zoom={2.5}
        minZoom={2.5}
        maxZoom={10}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        className="w-full h-full"
        style={{ background: "#030b14" }}
        zoomControl={false}
      >
        {/* Dark, no-labels tile for a cleaner intelligence-map look */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
          noWrap={true}
        />
        {/* Labels-only overlay so country names still appear */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
          pane="shadowPane"
          noWrap={true}
        />

        <ZoomControl position="bottomright" />

        {visible?.map((feature: any) => {
          const p = feature.properties;
          const [lng, lat] = feature.geometry.coordinates;
          const color = getColor(p.type);
          const risk  = getRisk(p.type);
          return (
            <Marker key={p.id} position={[lat, lng]} icon={getIcon(p.type)}>
              <Tooltip direction="top" offset={[0, -16]} opacity={1}>
                <div style={{
                  background: "linear-gradient(135deg,#0d1b2a,#0B1117)",
                  border: `1px solid ${color}40`,
                  padding: "5px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  color: "#fff",
                  boxShadow: `0 0 12px ${color}20, 0 4px 12px rgba(0,0,0,0.6)`,
                  minWidth: 140,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ color: "#6B7280", fontSize: 9, marginBottom: 4 }}>{p.country}</div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 9, fontWeight: 700, color: risk.color,
                    background: `${risk.color}12`, border: `1px solid ${risk.color}25`,
                    borderRadius: 3, padding: "1px 6px",
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: risk.color }} />
                    {risk.label} RISK
                  </div>
                </div>
              </Tooltip>
              <Popup>
                <NodePopup p={p} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* ── Bottom Status Bar ── */}
      <div style={{
        position: "absolute", bottom: 12, left: 12,
        zIndex: 1000, display: "flex", alignItems: "center", gap: 12,
        padding: "6px 14px",
        background: "rgba(8,15,24,0.88)",
        border: "1px solid #1a2332",
        borderRadius: 8,
        backdropFilter: "blur(12px)",
        pointerEvents: "none",
      }}>
        {[
          { dot: "#38BDF8", label: "Extraction" },
          { dot: "#818CF8", label: "Processing" },
          { dot: "#FBBF24", label: "Combined" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.dot, boxShadow: `0 0 6px ${l.dot}` }} />
            <span style={{ fontSize: 9, color: "#6B7280", fontWeight: 500 }}>{l.label}</span>
          </div>
        ))}
        <div style={{ width: 1, height: 10, background: "#1a2332" }} />
        <span style={{ fontSize: 9, color: "#374151" }}>Tile: CARTO Dark · World Bank API</span>
      </div>
    </div>
  );
}
