"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainStage from "@/components/MainStage";

export default function Home() {
  const [filters, setFilters] = useState({
    extraction: true,
    processing: true,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-white">
      <MainStage filters={filters} />
      <Sidebar filters={filters} toggleFilter={toggleFilter} />
    </div>
  );
}
