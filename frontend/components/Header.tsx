"use client";

import { useState } from "react";
import { Info, X, Cpu, User, Layers } from "lucide-react";

export default function Header() {
  const [showMetadata, setShowMetadata] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-[1001] flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        {/* Left Title */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="text-[10px] font-bold text-primary tracking-[0.25em] uppercase">
              Infocreon Internship
            </span>
          </div>
          <span className="text-gray-600 text-xs">|</span>
          <span className="text-xs font-semibold text-gray-300 tracking-wider">
            Resource Rail · REE Dependency
          </span>
        </div>

        {/* Right Info Icon */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setShowMetadata(true)}
            className="flex items-center justify-center p-2 rounded-full border border-primary/20 bg-background/60 hover:bg-primary/10 hover:border-primary/50 text-primary hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg"
            title="System Info"
            id="info-modal-trigger"
          >
            <Info className="w-5 h-5 animate-pulse" />
          </button>
        </div>
      </header>

      {/* Metadata Modal */}
      {showMetadata && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
          <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-xl border border-primary/30 bg-surface/95 backdrop-blur-md shadow-2xl p-6 transition-all duration-300 scale-100">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                  Developer Signature
                </h3>
              </div>
              <button
                onClick={() => setShowMetadata(false)}
                className="text-gray-400 hover:text-white transition-colors duration-250"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg border border-border bg-background/40">
                <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Lead Architect
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Adhit J
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg border border-border bg-background/40">
                <Layers className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Cohort Group
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Batch 4 Interns
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg border border-border bg-background/40">
                <Cpu className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    System Stack
                  </div>
                  <div className="text-sm font-semibold text-white mt-1 flex flex-wrap gap-1.5">
                    {["Next.js", "FastAPI", "Tailwind CSS", "Leaflet", "Recharts"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary uppercase"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-[9px] text-gray-600 uppercase tracking-widest">
                Infocreon Internship Protocol · POC-94
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
