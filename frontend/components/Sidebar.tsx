export default function Sidebar() {
  return (
    <aside className="w-[30%] h-screen border-l border-border bg-surface p-6 flex flex-col gap-6 overflow-y-auto z-10 relative shadow-2xl">
      {/* Section A: Title & High-level Metric */}
      <section className="glass-card p-4">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Rare Earth Dependency Map</h1>
        <div className="text-sm text-gray-400">Primary Rail: Supply Chain</div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-primary font-semibold">Live Intelligence</span>
        </div>
      </section>

      {/* Section B: Why This Matters */}
      <section className="glass-card p-4">
        <h2 className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">Why This Matters</h2>
        <p className="text-sm leading-relaxed text-gray-300">
          Good for your future-rails thesis around industrial capacity.
        </p>
      </section>

      {/* Section C: Who Controls the Rail */}
      <section className="glass-card p-4">
        <h2 className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">Who Controls the Rail</h2>
        <p className="text-sm leading-relaxed text-gray-300">
          China controls the majority of processing capacity, while western nations seek to diversify.
        </p>
      </section>

      {/* Section D: Functional Filters & Tooltips (Placeholders for now) */}
      <section className="glass-card p-4 flex-grow">
        <h2 className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">Filters</h2>
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <label className="text-sm">Extraction Nodes</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-primary" defaultChecked />
            <label className="text-sm">Processing Facilities</label>
          </div>
        </div>
      </section>

      {/* Section E: Download Sample Data */}
      <section className="mt-auto">
        <button className="w-full py-3 bg-transparent border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors glow-active">
          Download Sample Data
        </button>
      </section>
    </aside>
  );
}
