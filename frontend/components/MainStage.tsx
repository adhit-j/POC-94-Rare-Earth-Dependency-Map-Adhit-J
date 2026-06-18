"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import the map to avoid SSR issues with Leaflet
const DependencyMap = dynamic(() => import("./DependencyMap"), {
  ssr: false,
  loading: () => (
    <div className="text-center w-full flex flex-col items-center justify-center h-full">
      <h2 className="text-primary text-xl font-medium animate-pulse">Initializing Geospatial Engine...</h2>
      <p className="text-gray-500 mt-2 text-sm">Loading Map Components</p>
    </div>
  ),
});

export default function MainStage({ filters }: { filters: { extraction: boolean; processing: boolean } }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="w-[70%] h-screen relative bg-background flex items-center justify-center border-r border-border z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-10"></div>
      {mounted && <DependencyMap filters={filters} />}
    </main>
  );
}
