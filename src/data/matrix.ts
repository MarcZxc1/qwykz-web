export type CapabilityStatus = "supported" | "experimental" | "unsupported";

export interface FrameworkMatrix {
  dbTargets: Record<string, CapabilityStatus>;
  authTargets: Record<string, CapabilityStatus>;
  cachingTargets: Record<string, CapabilityStatus>;
  dockerfile?: boolean;
  frontends?: string[];
}

export const CAPABILITY_MATRIX_DATA: Record<string, FrameworkMatrix> = {
  express: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "supported", clerk: "supported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "supported" },
    dockerfile: false,
    frontends: ["react", "vue"],
  },
  hono: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "supported", clerk: "supported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "supported" },
    dockerfile: false,
    frontends: ["react", "vue"],
  },
  elysia: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "supported", clerk: "supported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "supported" },
    dockerfile: false,
    frontends: ["react", "vue"],
  },
  nextjs: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "supported", clerk: "supported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "supported" },
    dockerfile: false,
  },
  react: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "supported", clerk: "supported" },
    cachingTargets: { none: "supported", docker: "unsupported", upstash: "unsupported" },
    dockerfile: false,
  },
  vue: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "supported", clerk: "supported" },
    cachingTargets: { none: "supported", docker: "unsupported", upstash: "unsupported" },
    dockerfile: false,
  },
  python: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "unsupported", clerk: "unsupported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "unsupported" },
    dockerfile: true,
    frontends: ["react", "vue"],
  },
  go: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "unsupported", clerk: "unsupported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "unsupported" },
    dockerfile: true,
    frontends: ["react", "vue"],
  },
  rust: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "supported" },
    authTargets: { local: "supported", supabase: "unsupported", clerk: "unsupported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "unsupported" },
    dockerfile: true,
    frontends: ["react", "vue"],
  },
  laravel: {
    dbTargets: { local: "supported", docker: "supported", supabase: "supported", neon: "unsupported" },
    authTargets: { local: "supported", supabase: "unsupported", clerk: "unsupported" },
    cachingTargets: { none: "supported", docker: "supported", upstash: "supported" },
    dockerfile: false,
    frontends: ["react", "vue"],
  },
};

export function evaluateCombination(
  framework: string,
  db: string,
  auth: string,
  caching: string
): { status: CapabilityStatus; reason?: string } {
  const fw = CAPABILITY_MATRIX_DATA[framework];
  if (!fw) return { status: "unsupported", reason: `Unknown framework "${framework}"` };

  const dbStatus = fw.dbTargets[db] || "unsupported";
  const authStatus = fw.authTargets[auth] || "unsupported";
  const cachingStatus = fw.cachingTargets[caching] || "unsupported";

  if (dbStatus === "unsupported") {
    return { status: "unsupported", reason: `${framework} does not support ${db} database.` };
  }
  if (authStatus === "unsupported") {
    return { status: "unsupported", reason: `${framework} does not support ${auth} auth.` };
  }
  if (cachingStatus === "unsupported") {
    return { status: "unsupported", reason: `${framework} does not support ${caching} caching.` };
  }

  if (dbStatus === "experimental" || authStatus === "experimental" || cachingStatus === "experimental") {
    return {
      status: "experimental",
      reason: "This combination is experimental. Use --experimental flag to allow scaffolding.",
    };
  }

  return { status: "supported" };
}
