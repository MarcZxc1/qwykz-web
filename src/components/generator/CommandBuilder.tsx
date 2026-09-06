import { useState, useMemo } from "react";
import { Container } from "../layout/Container";
import { CopyButton } from "../common/CopyButton";
import { Badge } from "../common/Badge";
import { PRESETS_DATA } from "../../data/presets";
import { evaluateCombination } from "../../data/matrix";
import type { PresetDefinition } from "../../types/preset";

interface CommandBuilderProps {
  initialPreset?: PresetDefinition | null;
}

export function CommandBuilder({ initialPreset }: CommandBuilderProps) {
  const [packageManager, setPackageManager] = useState<"bunx" | "npx">("bunx");
  const [selectedPreset, setSelectedPreset] = useState<string>(
    initialPreset?.name || "api-rust"
  );
  const [projectName, setProjectName] = useState("my-service");
  const [dbTarget, setDbTarget] = useState<string>("docker");
  const [cachingTarget, setCachingTarget] = useState<string>("docker");
  const [authTarget, setAuthTarget] = useState<string>("local");
  const [learnMode, setLearnMode] = useState<boolean>(false);
  const [dryRun, setDryRun] = useState(false);
  const [strict, setStrict] = useState(false);
  const [experimental, setExperimental] = useState(false);
  const [yesFlag, setYesFlag] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [noAiContext, setNoAiContext] = useState(false);
  const [recordPrompts, setRecordPrompts] = useState(false);

  // Sync when an external preset is selected
  const activePreset = useMemo(() => {
    return PRESETS_DATA.find((p) => p.name === selectedPreset) || PRESETS_DATA[0];
  }, [selectedPreset]);

  // Evaluate capability matrix combination in real-time
  const capabilityEvaluation = useMemo(() => {
    return evaluateCombination(activePreset.framework, dbTarget, authTarget, cachingTarget);
  }, [activePreset.framework, dbTarget, authTarget, cachingTarget]);

  // Construct the exact CLI command
  const generatedCommand = useMemo(() => {
    const parts: string[] = [];
    parts.push(packageManager === "bunx" ? "bunx qwykz@latest" : "npx qwykz@latest");

    if (selectedPreset) {
      const alias = activePreset.aliases[0] || activePreset.name;
      parts.push(`--preset ${alias}`);
    }

    if (projectName && projectName !== "my-app") {
      parts.push(`--name ${projectName}`);
    }

    // Overrides if different from preset default
    if (dbTarget !== activePreset.dbTarget) {
      parts.push(`--db ${dbTarget}`);
    }

    if (cachingTarget !== activePreset.cacheTarget) {
      parts.push(`--caching ${cachingTarget}`);
    }

    if (authTarget !== activePreset.authTarget) {
      parts.push(`--auth ${authTarget}`);
    }

    if (learnMode) parts.push("--learn");
    if (yesFlag) parts.push("--yes");
    if (dryRun) parts.push("--dry-run");
    if (showDiff) parts.push("--show-diff");
    if (strict) parts.push("--strict");
    if (experimental) parts.push("--experimental");
    if (noAiContext) parts.push("--no-ai-context");
    if (recordPrompts) parts.push("--record-prompts");

    return parts.join(" ");
  }, [
    packageManager,
    selectedPreset,
    activePreset,
    projectName,
    dbTarget,
    cachingTarget,
    authTarget,
    learnMode,
    yesFlag,
    dryRun,
    showDiff,
    strict,
    experimental,
    noAiContext,
    recordPrompts,
  ]);

  return (
    <section id="generator" className="py-20 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950">
      <Container>
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-2">
            Interactive Tooling
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            CLI Command Builder
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Configure your stack, toggle safety and learning flags, and copy an exact command verified against Qwykz's capability matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Controls Column */}
          <div className="lg:col-span-7 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
            {/* Scaffolding Mode: Standard vs Learn */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">
                Scaffolding Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setLearnMode(false)}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    !learnMode
                      ? "bg-zinc-800/90 text-zinc-100 border border-zinc-700/80 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs font-mono">
                    <span>🚀 Standard Mode</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 font-sans">
                    Complete working boilerplate + LEARN.md guide
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLearnMode(true)}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    learnMode
                      ? "bg-amber-950/40 text-amber-200 border border-amber-800/60 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs font-mono text-amber-400">
                    <span>🎓 Guided Hands-On (--learn)</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 font-sans">
                    Clean skeleton + 6-milestone GUIDE.md (zero spoon-feeding)
                  </div>
                </button>
              </div>
            </div>

            {/* Runner & Project Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Package Runner
                </label>
                <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setPackageManager("bunx")}
                    className={`py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                      packageManager === "bunx"
                        ? "bg-zinc-800 text-emerald-400 font-bold shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    bunx (faster)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackageManager("npx")}
                    className={`py-1.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                      packageManager === "npx"
                        ? "bg-zinc-800 text-cyan-400 font-bold shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    npx (Node)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Project Name (<span className="text-zinc-500">--name</span>)
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none"
                  placeholder="my-service"
                />
              </div>
            </div>

            {/* Preset Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono text-zinc-400">
                  Curated Preset (<span className="text-zinc-500">--preset</span>)
                </label>
                <span className="text-[11px] font-mono text-zinc-500">
                  {PRESETS_DATA.length} verified presets available
                </span>
              </div>
              <select
                value={selectedPreset}
                onChange={(e) => {
                  setSelectedPreset(e.target.value);
                  const p = PRESETS_DATA.find((item) => item.name === e.target.value);
                  if (p) {
                    setDbTarget(p.dbTarget);
                    setCachingTarget(p.cacheTarget);
                    setAuthTarget(p.authTarget);
                  }
                }}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none cursor-pointer"
              >
                {PRESETS_DATA.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} — {p.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Overrides: Database & Caching & Auth */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Database (<span className="text-zinc-500">--db</span>)
                </label>
                <select
                  value={dbTarget}
                  onChange={(e) => setDbTarget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none"
                >
                  <option value="docker">Docker Postgres</option>
                  <option value="local">Local Postgres</option>
                  <option value="supabase">Supabase Cloud</option>
                  <option value="neon">Neon Postgres</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Caching (<span className="text-zinc-500">--caching</span>)
                </label>
                <select
                  value={cachingTarget}
                  onChange={(e) => setCachingTarget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none"
                >
                  <option value="docker">Docker Redis</option>
                  <option value="upstash">Upstash Redis</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Auth (<span className="text-zinc-500">--auth</span>)
                </label>
                <select
                  value={authTarget}
                  onChange={(e) => setAuthTarget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none"
                >
                  <option value="local">Local JWT / Hash</option>
                  <option value="supabase">Supabase Auth</option>
                  <option value="clerk">Clerk Auth</option>
                </select>
              </div>
            </div>

            {/* Flags Toggles */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="block text-xs font-mono uppercase text-zinc-500 tracking-wider">
                Safety & Execution Flags
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={yesFlag}
                    onChange={(e) => setYesFlag(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-emerald-500 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--yes</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Non-interactive: skip interactive prompt questions
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={dryRun}
                    onChange={(e) => setDryRun(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-emerald-500 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--dry-run</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Preview files in memory without touching disk
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={showDiff}
                    onChange={(e) => setShowDiff(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-cyan-500 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--show-diff</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Render line-by-line file diffs in dry-run mode
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={strict}
                    onChange={(e) => setStrict(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-cyan-500 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--strict</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Audit package reasons; fail on untracked dependencies
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={experimental}
                    onChange={(e) => setExperimental(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--experimental</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Permit experimental capability matrix combinations
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={noAiContext}
                    onChange={(e) => setNoAiContext(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-zinc-400 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--no-ai-context</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Suppress generating the AGENTS.md context pack
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={recordPrompts}
                    onChange={(e) => setRecordPrompts(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-zinc-400 focus:ring-0"
                  />
                  <div>
                    <span className="text-zinc-200 font-semibold block">--record-prompts</span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Record prompt answers in .qwykz-manifest.json
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Generated Terminal Command
                </span>

                {capabilityEvaluation.status === "supported" && (
                  <Badge variant="supported">matrix verified</Badge>
                )}
                {capabilityEvaluation.status === "experimental" && (
                  <Badge variant="experimental">experimental</Badge>
                )}
                {capabilityEvaluation.status === "unsupported" && (
                  <Badge variant="unsupported">unsupported</Badge>
                )}
              </div>

              {/* Capability Warning / Guidance */}
              {capabilityEvaluation.status === "experimental" && !experimental && (
                <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-xs font-mono text-amber-300">
                  ⚠️ This combination is experimental. Add <code className="text-white font-bold">--experimental</code> to permit scaffolding.
                </div>
              )}
              {capabilityEvaluation.status === "unsupported" && (
                <div className="p-3 bg-red-950/30 border border-red-800/50 rounded-lg text-xs font-mono text-red-300">
                  ❌ {capabilityEvaluation.reason}
                </div>
              )}

              {/* Command display box */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-100 break-all relative">
                <div className="text-emerald-400 select-none mb-1 font-bold">
                  {learnMode ? "# Hands-On Learning Skeleton" : "# Production Boilerplate"}
                </div>
                <div className="text-zinc-200 leading-relaxed">{generatedCommand}</div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500 font-mono">
                  {learnMode ? "Guided: GUIDE.md" : "Standard: LEARN.md"}
                </span>
                <CopyButton text={generatedCommand} label="Copy Command" className="py-2 px-4 text-xs font-semibold" />
              </div>
            </div>

            {/* Educational / Staging Guarantee card */}
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 text-xs space-y-2 font-mono text-zinc-400">
              <div className="text-zinc-300 font-semibold flex items-center gap-1.5">
                <span>{learnMode ? "🎓 Hands-On Learning" : "🛡️ Staging Guarantee"}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {learnMode
                  ? "In --learn mode, Qwykz preserves your tooling and directory tree with .gitkeep files, but strips pre-finished code so you build the application milestone-by-milestone."
                  : "Qwykz resolves all templates in-memory first. If you run with --dry-run, you get a full file tree preview without writing anything to disk."}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
