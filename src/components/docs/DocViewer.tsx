import { useState } from "react";
import { Container } from "../layout/Container";
import { DocNavigation } from "./DocNavigation";
import { DOC_SECTIONS, QUICKSTART_STEPS } from "../../data/docs";
import { CopyButton } from "../common/CopyButton";
import { Badge } from "../common/Badge";

export function DocViewer() {
  const [activeId, setActiveId] = useState<string>("overview");

  const currentSection =
    DOC_SECTIONS.find((s) => s.id === activeId) || DOC_SECTIONS[0];

  const currentIndex = DOC_SECTIONS.findIndex((s) => s.id === activeId);
  const prevSection = currentIndex > 0 ? DOC_SECTIONS[currentIndex - 1] : null;
  const nextSection =
    currentIndex < DOC_SECTIONS.length - 1 ? DOC_SECTIONS[currentIndex + 1] : null;

  return (
    <section id="docs" className="py-20 bg-zinc-950">
      <Container>
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
            Documentation Hub
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Learn Qwykz
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Human-friendly tutorials, architectural breakdowns, and complete CLI flag specifications. Zero buzzwords, 100% verified behavior.
          </p>
        </div>

        {/* Quickstart 4-Step Cards (shown on overview) */}
        {activeId === "overview" && (
          <div className="mb-14 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                ⚡ 30-Second Quickstart
              </span>
              <Badge variant="supported" size="sm">Zero Install Required</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICKSTART_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex flex-col justify-between p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/80 text-xs font-mono"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-400 font-bold">Step {step.step}</span>
                    </div>
                    <h3 className="font-sans font-bold text-zinc-200 text-sm mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-zinc-400 text-xs leading-relaxed mb-3">
                      {step.explanation}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between bg-zinc-900 px-2 py-1.5 rounded border border-zinc-800 text-[11px] text-zinc-300">
                      <span className="truncate mr-1">{step.command}</span>
                      <CopyButton text={step.command} label="" className="border-0 bg-transparent hover:bg-zinc-800 p-0.5" />
                    </div>
                    {step.tip && (
                      <span className="block text-[10px] text-zinc-500 mt-1 font-sans">
                        💡 {step.tip}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Docs Layout: Sidebar + Article */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 sticky top-24">
            <DocNavigation
              activeSectionId={activeId}
              onSelectSection={setActiveId}
            />
          </div>

          {/* Main Article Content */}
          <div className="md:col-span-8 lg:col-span-9 bg-zinc-900/20 p-6 sm:p-8 rounded-2xl border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="default" size="sm">
                {currentSection.category}
              </Badge>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              {currentSection.title}
            </h3>

            <p className="text-base text-zinc-400 font-medium mb-6 pb-6 border-b border-zinc-800">
              {currentSection.summary}
            </p>

            {/* Rendered Prose */}
            <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
              {currentSection.content.split("\n\n").map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Code Snippet Box if available */}
            {currentSection.codeSnippet && (
              <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
                  <span className="text-zinc-400 font-sans text-xs">
                    {currentSection.codeSnippet.caption || "Terminal"}
                  </span>
                  <CopyButton
                    text={currentSection.codeSnippet.code}
                    label="Copy Code"
                  />
                </div>
                <pre className="p-4 text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
                  {currentSection.codeSnippet.code}
                </pre>
              </div>
            )}

            {/* Next / Prev Navigation Controls */}
            <div className="mt-12 pt-6 border-t border-zinc-800 flex items-center justify-between">
              {prevSection ? (
                <button
                  type="button"
                  onClick={() => setActiveId(prevSection.id)}
                  className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span>←</span>
                  <span>{prevSection.title}</span>
                </button>
              ) : (
                <div></div>
              )}

              {nextSection && (
                <button
                  type="button"
                  onClick={() => setActiveId(nextSection.id)}
                  className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{nextSection.title}</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
