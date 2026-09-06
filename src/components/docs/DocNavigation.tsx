import { useState, useMemo } from "react";
import { DOC_SECTIONS } from "../../data/docs";

interface DocNavigationProps {
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}

export function DocNavigation({ activeSectionId, onSelectSection }: DocNavigationProps) {
  const [search, setSearch] = useState("");

  const filteredSections = useMemo(() => {
    if (!search.trim()) return DOC_SECTIONS;
    const q = search.toLowerCase();
    return DOC_SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [search]);

  const guideSections = filteredSections.filter((s) => s.category === "guide");
  const conceptSections = filteredSections.filter((s) => s.category === "concepts");
  const refSections = filteredSections.filter((s) => s.category === "reference");

  return (
    <div className="space-y-5 text-sm">
      {/* Search Input */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter documentation..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
        />
      </div>

      {filteredSections.length === 0 ? (
        <div className="text-xs text-zinc-500 font-mono py-4 text-center">
          No matches found for "{search}"
        </div>
      ) : (
        <>
          {/* Quickstart / Guide Category */}
          {guideSections.length > 0 && (
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-2">
                Getting Started
              </span>
              <div className="space-y-1">
                {guideSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => onSelectSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeSectionId === sec.id
                        ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Core Concepts */}
          {conceptSections.length > 0 && (
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-2">
                Core Architecture
              </span>
              <div className="space-y-1">
                {conceptSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => onSelectSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeSectionId === sec.id
                        ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reference */}
          {refSections.length > 0 && (
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-2">
                CLI & Presets Reference
              </span>
              <div className="space-y-1">
                {refSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => onSelectSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeSectionId === sec.id
                        ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
