import { Container } from "../layout/Container";
import { Badge } from "../common/Badge";
import { CopyButton } from "../common/CopyButton";

export function AgentsMdExplainer() {
  const sampleAgentsMd = `# AGENTS.md — payment-api

## Stack
- Backend: Rust (Axum 0.7) on port 8080
- Database: PostgreSQL (Docker Compose)
- Cache: Redis (Docker Compose)
- Auth: Local JWT (Argon2 password hashing)

## Verification Commands
- Check: cargo check
- Tests: cargo test
- Start DB: docker compose up -d

## Endpoints
- GET  /api/health
- POST /api/auth/register
- POST /api/auth/login`;

  return (
    <section className="py-20 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Explanations */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
                Built for AI Pair Programming
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Why Claude Code, Cursor, and Copilot love AGENTS.md
              </h2>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed">
              When an AI assistant opens a regular project, it doesn't know what port your server uses, where database models live, or what command runs the tests. It burns thousands of tokens searching your directory tree and guessing configuration values.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Qwykz places a tailor-made <code className="text-emerald-400 font-mono">AGENTS.md</code> file in the root of every scaffolded project. Your AI tool reads this on its very first turn, knowing immediately how to test, build, and extend your codebase without hallucinating.
            </p>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-red-900/40 bg-red-950/10 text-xs font-mono space-y-2">
                <span className="text-red-400 font-bold block">❌ Without AGENTS.md</span>
                <ul className="text-zinc-400 space-y-1.5 list-disc list-inside text-[11px]">
                  <li>AI spends 15+ tool calls exploring folders</li>
                  <li>Wastes 10,000+ tokens on initial scan</li>
                  <li>Guesses wrong ports (e.g. 3000 vs 8080)</li>
                  <li>Tries to run npm test on a Cargo project</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-emerald-900/40 bg-emerald-950/10 text-xs font-mono space-y-2">
                <span className="text-emerald-400 font-bold block">✔ With Qwykz AGENTS.md</span>
                <ul className="text-zinc-300 space-y-1.5 list-disc list-inside text-[11px]">
                  <li>AI reads 1 file and starts coding</li>
                  <li>Saves time and token quota</li>
                  <li>Exact ports, secrets, and routes verified</li>
                  <li>Zero guessing, 100% accurate context</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Code Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 font-bold">AGENTS.md</span>
                  <Badge variant="supported" size="sm">Auto-generated</Badge>
                </div>
                <CopyButton text={sampleAgentsMd} label="Copy" />
              </div>

              <pre className="p-4 text-zinc-300 text-xs leading-relaxed overflow-x-auto bg-zinc-950 whitespace-pre">
                {sampleAgentsMd}
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
