export interface CLIFlagOption {
  flag: string;
  description: string;
  type: "boolean" | "string";
  options?: string[];
  defaultValue?: string | boolean;
}

export interface CommandBuilderState {
  preset?: string;
  projectName: string;
  packageManager: "bunx" | "npx";
  dbTarget?: string;
  cacheTarget?: string;
  authTarget?: string;
  dryRun: boolean;
  strict: boolean;
  experimental: boolean;
  skipGit: boolean;
  skipInstall: boolean;
}
