"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ── Custom SVG Marker Icons ──────────────────────────────────
function createCustomIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="10" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="1.5"/>
      <circle cx="18" cy="18" r="5" fill="${color}"/>
      <circle cx="18" cy="18" r="12" fill="none" stroke="${color}" stroke-width="0.5" stroke-opacity="0.4"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

const extractionIcon = createCustomIcon("#38BDF8");
const processingIcon = createCustomIcon("#818CF8");
const combinedIcon   = createCustomIcon("#FBBF24");

function getIcon(type: string) {
  const isExtraction = type.includes("Extraction");
  const isProcessing = type.includes("Processing");
  if (isExtraction && isProcessing) return combinedIcon;
  if (isProcessing) return processingIcon;
  return extractionIcon;
}

function getTypeColor(type: string) {
  const isExtraction = type.includes("Extraction");
  const isProcessing = type.includes("Processing");
  if (isExtraction && isProcessing) return "#FBBF24";
  if (isProcessing) return "#818CF8";
  return "#38BDF8";
}

// ── Popup content ────────────────────────────────────────────
function NodePopup({ p }: { p: any }) {
  const color = getTypeColor(p.type);
  return (
    <div style={{
      background: "#0B1117",
      borderRadius: "0.75rem",
      padding: "1rem",
      minWidth: "240px",
      border: `1px solid ${color}55`,
      boxShadow: `0 0 20px ${color}22`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }}></div>
        <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: color }}>
          {p.type}
        </span>
      </div>
      <h3 style={{ margin: 0, color: "#fff", fontSize: "1rem", fontWeight: 700, lineHeight: 1.3 }}>{p.name}</h3>
      <p style={{ margin: "0.25rem 0 0", color: "#6B7280", fontSize: "12px" }}>{p.country}</p>

      <div style={{ margin: "0.75rem 0", padding: "0.5rem 0.75rem", background: "#030712", borderRadius: "0.5rem", border: "1px solid #1F2937" }}>
        <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Capacity Share</div>
        <div style={{ fontSize: "14px", fontWeight: 700, color: color, marginTop: "2px" }}>{p.capacity_metric}</div>
      </div>

      <div style={{ background: "#030712", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", border: "1px solid #1F2937" }}>
        <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Control Structure</div>
        <div style={{ fontSize: "12px", color: "#D1D5DB" }}>{p.control}</div>
      </div>

      <p style={{ margin: "0.75rem 0 0", fontSize: "11px", fontStyle: "italic", color: "#9CA3AF", borderTop: "1px solid #1F2937", paddingTop: "0.5rem" }}>
        "{p.insight}"
      </p>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function DependencyMap({
  filters,
}: {
  filters: { extraction: boolean; processing: boolean };
}) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data")
      .then((r) => r.json())
      .then(setGeoData)
      .catch((e) => console.error("API failed:", e));
  }, []);

  const visible = geoData?.features?.filter((f: any) => {
    const isExtraction = f.properties.type.includes("Extraction");
    const isProcessing = f.properties.type.includes("Processing");
    if (isExtraction && !isProcessing) return filters.extraction;
    if (isProcessing && !isExtraction) return filters.processing;
    return filters.extraction || filters.processing;
  });

  return (
    <div className="w-full h-full relative">
      {/* ── Top Banner ── */}
      <div className="map-banner z-[1000] pointer-events-none">
        <div className="pulse-dot"></div>
        <span className="text-xs font-semibold text-white tracking-wide">Global Rare Earth Extraction Network</span>
        <span className="text-gray-600 text-xs">·</span>
        <span className="text-[#38BDF8] text-xs font-medium">{visible?.length ?? 0} nodes active</span>
      </div>

      <MapContainer
        center={[20, 15]}
        zoom={2}
        minZoom={2}
        className="w-full h-full"
        style={{ background: "#030712" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {visible?.map((feature: any) => {
          const p = feature.properties;
          const [lng, lat] = feature.geometry.coordinates;
          return (
            <Marker
              key={p.id}
              position={[lat, lng]}
              icon={getIcon(p.type)}
            >
              <Popup>
                <NodePopup p={p} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
