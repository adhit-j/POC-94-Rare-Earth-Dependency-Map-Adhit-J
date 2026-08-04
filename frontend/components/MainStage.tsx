/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DependencyMap = dynamic(() => import("./DependencyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <div
        className="w-10 h-10 rounded-full border-2 border-[#38BDF8] border-t-transparent animate-spin"
        style={{ boxShadow: "0 0 20px rgba(56,189,248,0.3)" }}
      />
      <div className="text-center">
        <p className="text-[#38BDF8] font-bold tracking-[0.2em] text-xs uppercase animate-pulse">
          Initializing Geospatial Engine
        </p>
        <p className="text-gray-600 text-[10px] mt-1">Connecting to Leaflet · USGS · World Bank</p>
      </div>
    </div>
  ),
});

export default function MainStage({
  filters,
  onSelectNode,
}: {
  filters: { extraction: boolean; processing: boolean };
  onSelectNode: (node: any) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <main
      className="w-full h-screen relative overflow-hidden z-0"
      style={{ background: "#040907" }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #34D399 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(4,9,7,0.8) 100%)",
        }}
      />
      {mounted && <DependencyMap filters={filters} onSelectNode={onSelectNode} />}
    </main>
  );
}
