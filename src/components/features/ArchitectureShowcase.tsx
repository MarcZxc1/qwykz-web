import { Container } from "../layout/Container";
import { Badge } from "../common/Badge";

export function ArchitectureShowcase() {
  const steps = [
    {
      num: "01",
      title: "In-Memory Plan",
      description:
        "Every file, path, and template variable is calculated in RAM before anything touches your drive.",
      badge: "ScaffoldPlan",
    },
    {
      num: "02",
      title: "Capability Check",
      description:
        "Validates your database, cache, and auth combinations against capability-matrix.json. Unsupported options fail fast.",
      badge: "Gated",
    },
    {
      num: "03",
      title: "Isolated Staging",
      description:
        "Files are assembled in an isolated temporary staging directory. If an error occurs, your real directory remains untouched.",
      badge: "Sandbox",
    },
    {
      num: "04",
      title: "Package Audit",
      description:
        "In --strict mode, every package justification is audited against our verified catalog to prevent dependency bloat.",
      badge: "Audit",
    },
    {
      num: "05",
      title: "Atomic Commit",
      description:
        "Only when all validations and file checks pass does Qwykz cleanly move the complete project to your destination folder.",
      badge: "Zero Corruption",
    },
  ];

  return (
    <section id="architecture" className="py-20 border-b border-zinc-800/60 bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
            Deterministic Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How the Inspectable Staging Pipeline Works
          </h2>
          <p className="text-base text-zinc-400 mt-3 leading-relaxed">
            Most scaffolders write files directly to your disk. If an error happens midway, you are stuck cleaning up broken folders. Qwykz eliminates broken writes through a 5-step verified pipeline.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative flex flex-col justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-bold text-zinc-600">
                    {step.num}
                  </span>
                  <Badge variant="default" size="sm">
                    {step.badge}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-zinc-200 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-zinc-600 font-mono text-sm">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold">
              🔍
            </div>
            <h4 className="text-base font-bold text-zinc-100 mb-2 font-mono">
              --dry-run Inspection
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Inspect exactly what Qwykz will create before touching a single byte on disk. See the full file tree, template diffs, and package justifications.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mb-4 font-mono font-bold">
              ⚡
            </div>
            <h4 className="text-base font-bold text-zinc-100 mb-2 font-mono">
              Universal API Alignment
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When you scaffold a fullstack monorepo, your frontend automatically gets the right port configured in <code className="text-zinc-300">VITE_API_URL</code> (3000 for Go/Node, 8000 for Python/Laravel, 8080 for Rust).
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400 mb-4 font-mono font-bold">
              📜
            </div>
            <h4 className="text-base font-bold text-zinc-100 mb-2 font-mono">
              .qwykz-manifest.json
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every created project saves an audit record of chosen frameworks, databases, auth keys, and generator versions for reliable reproducibility.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
