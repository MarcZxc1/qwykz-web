import { useState, useMemo } from "react";
import { Container } from "../layout/Container";
import { Badge } from "../common/Badge";
import { CAPABILITY_MATRIX_DATA, type CapabilityStatus } from "../../data/matrix";

type DimensionFilter = "all" | "databases" | "auth" | "caching";

export function CapabilityMatrixViewer() {
  const [selectedDimension, setSelectedDimension] = useState<DimensionFilter>("all");
  const [filterFramework, setFilterFramework] = useState<string>("all");

  const frameworks = Object.keys(CAPABILITY_MATRIX_DATA);

  const frameworksToDisplay = useMemo(() => {
    if (filterFramework === "all") return frameworks;
    return frameworks.filter((f) => f === filterFramework);
  }, [filterFramework, frameworks]);

  const getStatusBadge = (status: CapabilityStatus) => {
    if (status === "supported") return <Badge variant="supported" size="sm">supported</Badge>;
    if (status === "experimental") return <Badge variant="experimental" size="sm">experimental</Badge>;
    return <Badge variant="unsupported" size="sm">unsupported</Badge>;
  };

  return (
    <section id="matrix" className="py-20 border-b border-zinc-800/60 bg-zinc-950">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
              Honest Capability Gating
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Interactive Capability Matrix
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Qwykz does not pretend every combination works. Compatibility is validated against{" "}
              <code className="text-emerald-400 font-mono text-xs">capability-matrix.json</code> before touching your drive. If an option is unsupported, it fails fast.
            </p>
          </div>

          {/* Quick legend */}
          <div className="flex items-center gap-3 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800 text-xs font-mono">
            <span className="text-zinc-500">Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-zinc-300">Supported</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-zinc-300">Experimental</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="text-zinc-300">Unsupported</span>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-900/40 rounded-xl border border-zinc-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Dimension:</span>
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              {(["all", "databases", "auth", "caching"] as DimensionFilter[]).map((dim) => (
                <button
                  key={dim}
                  type="button"
                  onClick={() => setSelectedDimension(dim)}
                  className={`px-2.5 py-1 text-xs font-mono rounded capitalize transition-colors cursor-pointer ${
                    selectedDimension === dim
                      ? "bg-zinc-800 text-zinc-100 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {dim}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Framework:</span>
            <select
              value={filterFramework}
              onChange={(e) => setFilterFramework(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs font-mono text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Frameworks (10 stacks)</option>
              {frameworks.map((fw) => (
                <option key={fw} value={fw}>
                  {fw}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/20">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4 font-semibold text-zinc-200">Framework</th>
                {(selectedDimension === "all" || selectedDimension === "databases") && (
                  <>
                    <th className="py-3 px-3">Local PG</th>
                    <th className="py-3 px-3">Docker PG</th>
                    <th className="py-3 px-3">Supabase</th>
                    <th className="py-3 px-3">Neon PG</th>
                  </>
                )}
                {(selectedDimension === "all" || selectedDimension === "auth") && (
                  <>
                    <th className="py-3 px-3">Local Auth</th>
                    <th className="py-3 px-3">Supabase Auth</th>
                    <th className="py-3 px-3">Clerk Auth</th>
                  </>
                )}
                {(selectedDimension === "all" || selectedDimension === "caching") && (
                  <>
                    <th className="py-3 px-3">No Cache</th>
                    <th className="py-3 px-3">Docker Redis</th>
                    <th className="py-3 px-3">Upstash</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {frameworksToDisplay.map((fw) => {
                const matrix = CAPABILITY_MATRIX_DATA[fw];
                return (
                  <tr key={fw} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-zinc-100 flex items-center gap-2">
                      <span className="capitalize">{fw}</span>
                      {matrix.dockerfile && (
                        <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                          Dockerfile
                        </span>
                      )}
                    </td>

                    {/* Databases */}
                    {(selectedDimension === "all" || selectedDimension === "databases") && (
                      <>
                        <td className="py-3 px-3">{getStatusBadge(matrix.dbTargets.local)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.dbTargets.docker)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.dbTargets.supabase)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.dbTargets.neon)}</td>
                      </>
                    )}

                    {/* Auth */}
                    {(selectedDimension === "all" || selectedDimension === "auth") && (
                      <>
                        <td className="py-3 px-3">{getStatusBadge(matrix.authTargets.local)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.authTargets.supabase)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.authTargets.clerk)}</td>
                      </>
                    )}

                    {/* Caching */}
                    {(selectedDimension === "all" || selectedDimension === "caching") && (
                      <>
                        <td className="py-3 px-3">{getStatusBadge(matrix.cachingTargets.none)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.cachingTargets.docker)}</td>
                        <td className="py-3 px-3">{getStatusBadge(matrix.cachingTargets.upstash)}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Source: <code className="text-zinc-400">capability-matrix.json</code></span>
          <span>Overrides: <code className="text-amber-400">--experimental</code> allows experimental targets</span>
        </div>
      </Container>
    </section>
  );
}
