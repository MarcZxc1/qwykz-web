interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "supported" | "experimental" | "unsupported" | "cyan" | "amber" | "red";
  size?: "sm" | "md";
}

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  const variantClasses = {
    default: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    supported: "bg-emerald-950/70 text-emerald-300 border border-emerald-800/80",
    experimental: "bg-amber-950/70 text-amber-300 border border-amber-800/80",
    unsupported: "bg-red-950/70 text-red-300 border border-red-800/80",
    red: "bg-red-950/70 text-red-300 border border-red-800/80",
    cyan: "bg-cyan-950/70 text-cyan-300 border border-cyan-800/80",
    amber: "bg-amber-950/70 text-amber-300 border border-amber-800/80",
  }[variant];

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded ${sizeClasses} ${variantClasses}`}
    >
      {children}
    </span>
  );
}
