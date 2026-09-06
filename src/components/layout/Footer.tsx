import { Container } from "./Container";
import { QwykzLogo } from "../common/QwykzLogo";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 text-sm text-zinc-500">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <QwykzLogo size={22} />
              <span className="text-zinc-200 font-mono font-bold tracking-tight">qwykz</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Inspectable multi-stack project scaffolder</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
            <a
              href="https://bun.sh"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Built for Bun
            </a>
            <a
              href="https://github.com/MarcZxc1/qwykz"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              GitHub
            </a>
            <span className="text-zinc-600">MIT License</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-xs text-zinc-600">
          No generic boilerplate. Planned in-memory, staged safely, verified with real tests.
        </div>
      </Container>
    </footer>
  );
}
