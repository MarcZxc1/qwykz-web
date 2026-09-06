import { useState } from "react";
import { Container } from "./Container";
import { CopyButton } from "../common/CopyButton";
import { QwykzLogo } from "../common/QwykzLogo";

interface NavbarProps {
  activeTab?: string;
  onNavigate?: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo & Version */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick("hero")}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <QwykzLogo
                size={32}
                className="group-hover:scale-105 transition-transform duration-200 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              />
              <div className="flex flex-col">
                <span className="font-mono font-bold text-lg text-zinc-100 tracking-tight">
                  qwykz
                </span>
              </div>
            </button>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 rounded">
              v1.4.6
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <button
              type="button"
              onClick={() => handleNavClick("presets")}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Presets
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("generator")}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Command Builder
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("learn-mode")}
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
            >
              <span>🎓</span> Hands-On Mode
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("matrix")}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Matrix
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("architecture")}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Staging & AGENTS.md
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("docs")}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Docs
            </button>
          </nav>

          {/* Action item: Quick run copy */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded px-2.5 py-1 text-xs font-mono text-zinc-300">
              <span className="text-zinc-500">$</span>
              <span>bunx qwykz@latest</span>
              <CopyButton text="bunx qwykz@latest" label="" className="border-0 bg-transparent hover:bg-zinc-800 p-1" />
            </div>
            <a
              href="https://github.com/MarcZxc1/qwykz"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
              aria-label="GitHub repository"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded border border-zinc-800"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleNavClick("presets")}
              className="text-left py-2 text-zinc-300 hover:text-white"
            >
              Presets
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("generator")}
              className="text-left py-2 text-zinc-300 hover:text-white"
            >
              Command Builder
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("learn-mode")}
              className="text-left py-2 text-amber-400 hover:text-amber-300 font-mono text-xs"
            >
              🎓 Hands-On Mode (--learn)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("matrix")}
              className="text-left py-2 text-zinc-300 hover:text-white"
            >
              Capability Matrix
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("architecture")}
              className="text-left py-2 text-zinc-300 hover:text-white"
            >
              Staging & AGENTS.md
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("docs")}
              className="text-left py-2 text-zinc-300 hover:text-white"
            >
              Documentation
            </button>
            <div className="pt-2 border-t border-zinc-900">
              <div className="text-xs font-mono text-zinc-500 mb-1">Quickstart:</div>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded p-2 text-xs font-mono text-zinc-200">
                <span>bunx qwykz@latest</span>
                <CopyButton text="bunx qwykz@latest" label="Copy" />
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
