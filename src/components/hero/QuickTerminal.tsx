import { useState } from "react";
import { CopyButton } from "../common/CopyButton";
import { QWYKZ_VERSION } from "../../data/version";

export function QuickTerminal() {
  const [activeTab, setActiveTab] = useState<"bun" | "npm" | "preset">("bun");

  const commands = {
    bun: "bunx qwykz@latest",
    npm: "npx qwykz@latest",
    preset: "bunx qwykz@latest --preset react-rust --name my-app",
  };

  const outputs = {
    bun: `⚡ qwykz v${QWYKZ_VERSION} — Quick & Ready Boilerplate Builder
? What is your project name? › billing-service
? Select target framework › Rust (Axum)
? Select database › Docker PostgreSQL
? Select caching store › Docker Redis
? Select auth mechanism › Local JWT (Argon2)
✔ Capability check passed against capability-matrix.json
✔ Scaffold plan created [28 files planned]
✔ Staging workspace verified in memory
✔ AGENTS.md generated for AI coding tools
✨ Done in 1.4s. Run: cd billing-service && docker compose up -d`,
    npm: `⚡ qwykz v${QWYKZ_VERSION} — Quick & Ready Boilerplate Builder
? What is your project name? › api-server
? Select target framework › Go (Fiber)
? Select database › Docker PostgreSQL
? Select caching store › Docker Redis
✔ Plan verified [22 files planned]
✔ Isolated staging committed cleanly
✨ Created ./api-server with Docker Compose & tests.`,
    preset: `⚡ qwykz v${QWYKZ_VERSION} — Preset: fullstack-react-rust
✔ Frontend: React 19 + Vite (port 5173)
✔ Backend: Rust Axum (port 8080)
✔ Universal API alignment: VITE_API_URL -> http://localhost:8080
✔ Database: Docker Compose PostgreSQL + Redis
✔ AGENTS.md context pack placed in root
✨ Monorepo scaffolded. Zero failed writes, zero guesswork.`,
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-zinc-400 text-xs font-sans font-medium">terminal</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded border border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab("bun")}
            className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === "bun" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            bunx (fastest)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preset")}
            className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === "preset" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            preset
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("npm")}
            className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
              activeTab === "npm" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            npx
          </button>
        </div>
      </div>

      {/* Command prompt row */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-b border-zinc-800/60 text-zinc-200">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-emerald-400 font-bold select-none">$</span>
          <span className="text-zinc-100 whitespace-nowrap">{commands[activeTab]}</span>
        </div>
        <CopyButton text={commands[activeTab]} label="Copy" className="ml-2 shrink-0" />
      </div>

      {/* Output log */}
      <div className="p-4 bg-zinc-950/95 text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre font-mono text-[11px] sm:text-xs min-h-[160px]">
        {outputs[activeTab]}
      </div>
    </div>
  );
}
