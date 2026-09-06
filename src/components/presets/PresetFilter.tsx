import type { PresetCategory } from "../../types/preset";

interface PresetFilterProps {
  selectedCategory: PresetCategory;
  onSelectCategory: (category: PresetCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function PresetFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: PresetFilterProps) {
  const categories: { id: PresetCategory; label: string }[] = [
    { id: "all", label: "All Stacks" },
    { id: "api", label: "Backend APIs" },
    { id: "fullstack", label: "Fullstack Monorepos" },
    { id: "web", label: "Web & SPAs" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Input & Count Indicator */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:w-64">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search rust, fiber, elysia..."
            aria-label="Search presets by framework or language"
            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-600 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
          {filteredCount} of {totalCount}
        </span>
      </div>
    </div>
  );
}
