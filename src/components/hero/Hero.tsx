import { Container } from "../layout/Container";
import { QuickTerminal } from "./QuickTerminal";
import { Badge } from "../common/Badge";

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export function Hero({ onScrollTo }: HeroProps) {
  return (
    <section id="hero" className="pt-12 pb-20 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="supported">v1.4.6</Badge>
              <Badge variant="cyan">Inspectable Scaffolder</Badge>
              <Badge variant="amber">AI-Ready Context Pack</Badge>
              <Badge variant="default">Bun + React 19</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Stop wasting an hour wiring databases, auth, and Docker.
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Qwykz scaffolds production-ready backends, frontends, and fullstack monorepos in 10 seconds. Every project is planned in-memory, verified against honest capability matrices, and pre-packaged with an <span className="text-emerald-400 font-mono text-sm">AGENTS.md</span> guide so Claude Code, Cursor, Codex, and Copilot never guess your ports or burn your token budget.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onScrollTo("presets")}
                className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50 cursor-pointer flex items-center gap-2"
              >
                <span>Browse 17 Presets</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onScrollTo("generator")}
                className="px-5 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm border border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer"
              >
                CLI Command Builder
              </button>

              <button
                type="button"
                onClick={() => onScrollTo("docs")}
                className="px-4 py-3 rounded-lg text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors cursor-pointer"
              >
                Read Documentation →
              </button>
            </div>

            {/* Value Guarantees / Grounded Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80 text-xs font-mono">
              <div className="flex flex-col">
                <span className="text-zinc-500">Presets</span>
                <span className="text-zinc-200 font-semibold text-sm">17 Tested Stacks</span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500">Staging Safety</span>
                <span className="text-emerald-400 font-semibold text-sm">In-Memory Plan</span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500">AI Context</span>
                <span className="text-zinc-200 font-semibold text-sm">AGENTS.md Pack</span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500">Dry-Run Mode</span>
                <span className="text-cyan-400 font-semibold text-sm">Preview Diff</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-5">
            <QuickTerminal />
          </div>
        </div>
      </Container>
    </section>
  );
}
