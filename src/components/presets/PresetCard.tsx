import type { PresetDefinition } from "../../types/preset";
import { Badge } from "../common/Badge";
import { CopyButton } from "../common/CopyButton";

interface PresetCardProps {
  preset: PresetDefinition;
  onSelectForCustomizer?: (preset: PresetDefinition) => void;
}

export function PresetCard({ preset, onSelectForCustomizer }: PresetCardProps) {
  const primaryAlias = preset.aliases[0] || preset.name;
  const command = `bunx qwykz@latest --preset ${primaryAlias} --name my-app`;

  return (
    <div className="flex flex-col justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group">
      <div>
        {/* Header row: Name & Badges */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex flex-col">
            <h3 className="text-base font-mono font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              {preset.name}
            </h3>
            {preset.aliases.length > 0 && (
              <span className="text-xs font-mono text-zinc-500">
                alias: <span className="text-zinc-400 font-semibold">{preset.aliases.join(", ")}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {preset.experimental ? (
              <Badge variant="experimental">experimental</Badge>
            ) : (
              <Badge variant="supported">tested</Badge>
            )}
            <Badge variant="default">{preset.category}</Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          {preset.description}
        </p>

        {/* Stack Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80 mb-4">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Stack</span>
            <span className="text-zinc-300 font-medium">
              {preset.frontend ? `${preset.frontend} + ${preset.backend}` : preset.backend || preset.framework}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Database</span>
            <span className="text-zinc-300 font-medium capitalize">
              {preset.dbTarget} Postgres
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Cache</span>
            <span className="text-zinc-300 font-medium capitalize">
              {preset.cacheTarget === "none" ? "None" : `${preset.cacheTarget} Redis`}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Auth</span>
            <span className="text-zinc-300 font-medium capitalize">
              {preset.authTarget} Auth
            </span>
          </div>
        </div>

        {/* Notes callout */}
        {preset.notes && (
          <p className="text-[11px] text-zinc-500 italic mb-4">
            💡 {preset.notes}
          </p>
        )}
      </div>

      {/* Footer: Command & Actions */}
      <div className="pt-3 border-t border-zinc-800/70 flex flex-col gap-2">
        <div className="flex items-center justify-between bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-800 text-[11px] font-mono text-zinc-300">
          <div className="truncate mr-2">
            <span className="text-emerald-500 mr-1">$</span>
            <span>{command}</span>
          </div>
          <CopyButton text={command} label="" className="border-0 bg-transparent hover:bg-zinc-800 shrink-0" />
        </div>

        {onSelectForCustomizer && (
          <button
            type="button"
            onClick={() => onSelectForCustomizer(preset)}
            className="w-full text-center py-1 text-xs text-zinc-400 hover:text-zinc-200 font-mono transition-colors cursor-pointer"
          >
            Customize in Command Builder →
          </button>
        )}
      </div>
    </div>
  );
}
