import { useState, useMemo } from "react";
import type { PresetCategory, PresetDefinition } from "../../types/preset";
import { PRESETS_DATA } from "../../data/presets";
import { PresetFilter } from "./PresetFilter";
import { PresetCard } from "./PresetCard";
import { Container } from "../layout/Container";

interface PresetExplorerProps {
  onSelectPresetForBuilder?: (preset: PresetDefinition) => void;
}

export function PresetExplorer({ onSelectPresetForBuilder }: PresetExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPresets = useMemo(() => {
    return PRESETS_DATA.filter((preset) => {
      // Category filter
      if (selectedCategory !== "all" && preset.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = preset.name.toLowerCase().includes(q);
        const matchesDesc = preset.description.toLowerCase().includes(q);
        const matchesAliases = preset.aliases.some((a) => a.toLowerCase().includes(q));
        const matchesFramework = preset.framework.toLowerCase().includes(q);
        const matchesBackend = preset.backend?.toLowerCase().includes(q) || false;
        const matchesFrontend = preset.frontend?.toLowerCase().includes(q) || false;

        return matchesName || matchesDesc || matchesAliases || matchesFramework || matchesBackend || matchesFrontend;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="presets" className="py-20 border-b border-zinc-800/60 bg-zinc-950">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
              Tested Scaffolds
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Curated Stack Presets
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Pre-configured, tested configurations. Scaffold an entire fullstack application or API backend in a single terminal command.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
            <span>List all in terminal:</span>
            <code className="text-emerald-400">qwykz --list-presets</code>
          </div>
        </div>

        {/* Filter controls */}
        <PresetFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={PRESETS_DATA.length}
          filteredCount={filteredPresets.length}
        />

        {/* Preset Cards Grid */}
        {filteredPresets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {filteredPresets.map((preset) => (
              <PresetCard
                key={preset.name}
                preset={preset}
                onSelectForCustomizer={onSelectPresetForBuilder}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl mt-8 bg-zinc-900/20">
            <p className="text-sm text-zinc-400 font-mono">No presets match "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-mono underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
