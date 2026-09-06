import { useState } from "react";
import { Container } from "../layout/Container";
import { Badge } from "../common/Badge";
import { CopyButton } from "../common/CopyButton";

export function AgentsMdExplainer() {
  const [activeTab, setActiveTab] = useState<"standard" | "learn">("standard");

  const standardAgentsMd = `# AGENTS.md — payment-api

## 1. Project Truth
- Backend: Rust (Axum 0.7) listening on port 8080
- Database: PostgreSQL 16 (Docker Compose on port 5432)
- Cache: Redis 7 (Docker Compose on port 6379)
- Auth: Local JWT with Argon2id password hashing

## 2. Verification Triad (Run Before Completing Any Task)
1. Typecheck: cargo check
2. Test: cargo test
3. Local Services: docker compose up -d

## 3. Directory Layout & Rules
- \`src/api/handlers/\`: HTTP controllers. Extract typed JSON, invoke services.
- \`src/db/\`: Connection pool singleton and SQL queries.
- \`migrations/\`: Versioned SQL files. Never edit applied migrations.
- Keep ports aligned: never change 8080 without updating frontend proxy.`;

  const learnAgentsMd = `# AGENTS.md — payment-api (Hands-On Learning Mode)

## ⚠️ LEARNER WORKSPACE DIRECTIVE
The human developer created this project with \`--learn\` mode to build
their own intuition in Rust Axum.

RULES FOR THE AI ASSISTANT:
1. DO NOT write or paste completed route handlers or controllers.
2. Guide the developer milestone-by-milestone according to GUIDE.md.
3. When the user gets stuck, explain the architectural concept and suggest
   the standard Axum method to look up (e.g. \`axum::routing::get\`).
4. Ask the developer guiding questions before giving solutions.
5. Review the developer's code for security and idiom after they write it.`;

  return (
    <section id="ai-context" className="py-20 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950">
      <Container>
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
            AI Pair Programming, Done Right
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why AI coding tools work 10x better on Qwykz projects
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            Most developers use Claude Code, Cursor, Codex, or Copilot on a blank directory, only to spend the next hour correcting the AI's guesses: wrong port mappings, mismatched database pools, and hallucinated packages. Here is how Qwykz turns your AI into an accurate partner.
          </p>
        </div>

        {/* 3 Humanized Benefit Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-3 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-zinc-100 mb-2">
                Zero Token Burning
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                When an AI assistant boots up on a blank project, it runs 15+ search calls trying to guess what tools you use. It can burn 10,000+ tokens just learning your setup. Qwykz's <code className="text-zinc-200">AGENTS.md</code> gives it the ground truth on turn one.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-zinc-800/70 text-[11px] font-mono text-emerald-400">
              ⚡ Immediate context on first prompt
            </div>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mb-3 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-zinc-100 mb-2">
                No Hallucinated Wiring
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                AIs often invent conflicting ports (putting frontend and backend on port 3000) or generate outdated database drivers. With Qwykz, Docker Compose, environment variables, and connection pools are already working. The AI writes code that fits your real stack.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-zinc-800/70 text-[11px] font-mono text-cyan-400">
              🎯 Verified ports & pooled connections
            </div>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400 mb-3 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-zinc-100 mb-2">
                A Mentor Instead of a Code Dumper
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If you're learning a new framework with <code className="text-amber-400">--learn</code>, the last thing you want is an AI dumping 500 lines of finished code. <code className="text-zinc-200">AGENTS.md</code> explicitly instructs the AI to mentor you milestone-by-milestone, giving hints rather than stealing the keyboard.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-zinc-800/70 text-[11px] font-mono text-amber-400">
              🎓 Teaches concepts instead of spoon-feeding
            </div>
          </div>
        </div>

        {/* Interactive Comparison & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Real-World Experience Comparison */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl border border-red-900/30 bg-red-950/10 text-xs font-mono space-y-2">
              <span className="text-red-400 font-bold block flex items-center gap-1.5">
                <span>❌</span> What normally happens with AI
              </span>
              <ul className="text-zinc-400 space-y-2 text-[11px] leading-relaxed">
                <li>• You ask for an API endpoint; it creates a new database connection for every request instead of pooling.</li>
                <li>• It forgets CORS configuration or sets the wrong client port.</li>
                <li>• Tries running <code className="text-zinc-300">npm test</code> on a Go or Rust project.</li>
                <li>• When you ask questions to learn, it spits out 400 lines of code you don't understand.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-emerald-900/30 bg-emerald-950/10 text-xs font-mono space-y-2">
              <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                <span>✔</span> What happens with a Qwykz project
              </span>
              <ul className="text-zinc-300 space-y-2 text-[11px] leading-relaxed">
                <li>• The AI reads <code className="text-emerald-400">AGENTS.md</code> on turn one and follows established conventions.</li>
                <li>• Uses existing singleton connection pools and typed ORM models.</li>
                <li>• Knows the exact verification command (<code className="text-zinc-200">cargo test</code>, <code className="text-zinc-200">bun test</code>).</li>
                <li>• In <code className="text-amber-400">--learn</code> mode, prompts you with hints so you actually learn the stack.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Code Preview with Mode Tabs */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 font-bold">AGENTS.md Preview:</span>
                  <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab("standard")}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                        activeTab === "standard"
                          ? "bg-zinc-800 text-emerald-400 font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Standard Project
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("learn")}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                        activeTab === "learn"
                          ? "bg-zinc-800 text-amber-400 font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      --learn Mode
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={activeTab === "standard" ? "supported" : "experimental"} size="sm">
                    {activeTab === "standard" ? "Architecture Truth" : "Mentorship Directive"}
                  </Badge>
                  <CopyButton
                    text={activeTab === "standard" ? standardAgentsMd : learnAgentsMd}
                    label="Copy"
                  />
                </div>
              </div>

              <pre className="p-4 text-zinc-300 text-[11px] sm:text-xs leading-relaxed overflow-x-auto bg-zinc-950 whitespace-pre">
                {activeTab === "standard" ? standardAgentsMd : learnAgentsMd}
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
