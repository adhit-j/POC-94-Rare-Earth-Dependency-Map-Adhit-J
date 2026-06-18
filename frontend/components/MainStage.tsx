"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DependencyMap = dynamic(() => import("./DependencyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="pulse-dot" style={{ width: 16, height: 16 }}></div>
      <p className="text-[#38BDF8] font-semibold tracking-widest text-sm uppercase animate-pulse">Initializing Geospatial Engine</p>
      <p className="text-gray-600 text-xs">Loading Leaflet map engine...</p>
    </div>
  ),
});

export default function MainStage({
  filters,
}: {
  filters: { extraction: boolean; processing: boolean };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="w-[70%] h-screen relative overflow-hidden z-0" style={{ background: "#030712" }}>
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>
      {mounted && <DependencyMap filters={filters} />}
    </main>
  );
}
