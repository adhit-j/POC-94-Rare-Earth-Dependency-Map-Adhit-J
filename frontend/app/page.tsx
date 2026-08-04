/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainStage from "@/components/MainStage";
import Header from "@/components/Header";

export default function Home() {
  const [filters, setFilters] = useState({
    extraction: true,
    processing: true,
  });
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
    setIsPanelOpen(true);
  };

  return (
    <div className="relative w-screen h-screen bg-background overflow-hidden text-white font-sans">
      <Header />
      <MainStage filters={filters} onSelectNode={handleSelectNode} />
      <Sidebar
        filters={filters}
        toggleFilter={toggleFilter}
        selectedNode={selectedNode}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}
