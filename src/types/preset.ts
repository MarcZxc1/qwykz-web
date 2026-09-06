export type PresetCategory = "all" | "api" | "fullstack" | "web";

export type Framework =
  | "rust"
  | "go"
  | "python"
  | "elysia"
  | "hono"
  | "express"
  | "laravel"
  | "nextjs"
  | "react"
  | "vue"
  | "monorepo";

export type DbTarget = "docker" | "local" | "supabase" | "neon";
export type CacheTarget = "none" | "docker" | "upstash";
export type AuthTarget = "local" | "supabase" | "clerk";

export interface PresetDefinition {
  name: string;
  aliases: string[];
  description: string;
  category: "api" | "fullstack" | "web";
  framework: string;
  frontend?: string;
  backend?: string;
  dbTarget: DbTarget;
  cacheTarget: CacheTarget;
  authTarget: AuthTarget;
  extraPackages: string[];
  experimental?: boolean;
  notes?: string;
}
