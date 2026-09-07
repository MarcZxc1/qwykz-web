import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem("qwykz_visitor_cache");
      return cached ? parseInt(cached, 10) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchVisitorCount() {
      try {
        // Only count a new hit if this browser session hasn't been counted yet
        const hasVisited = Boolean(sessionStorage.getItem("qwykz_visited"));
        const hitParam = hasVisited ? "0" : "1";

        const res = await fetch(`/api/visitors?hit=${hitParam}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = (await res.json()) as { count: number | null };

        if (active && data.count !== null && typeof data.count === "number") {
          setCount(data.count);
          try {
            sessionStorage.setItem("qwykz_visited", "true");
            localStorage.setItem("qwykz_visitor_cache", String(data.count));
          } catch {
            // Storage quota / private browsing error
          }
        }
      } catch {
        // Retain existing cached count or fallback
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void fetchVisitorCount();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      role="status"
      aria-label={count !== null ? `Visitor count: ${count.toLocaleString()}` : "Visitor counter"}
      title="Live visitors on qwykz-web.vercel.app"
      className="inline-flex items-center gap-2 rounded border border-zinc-800/80 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-zinc-400 select-none hover:border-zinc-700/80 transition-colors"
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <span className="text-zinc-500">visitors:</span>
      {loading && count === null ? (
        <span className="inline-block w-8 animate-pulse text-zinc-600">...</span>
      ) : (
        <span className="font-semibold text-zinc-200 tabular-nums">
          {count !== null ? count.toLocaleString() : "live"}
        </span>
      )}
    </div>
  );
}
