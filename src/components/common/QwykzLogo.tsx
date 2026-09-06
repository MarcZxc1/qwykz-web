interface QwykzLogoProps {
  size?: number | string;
  className?: string;
  variant?: "badge" | "glyph";
  useGradient?: boolean;
}

export function QwykzLogo({
  size = 32,
  className = "",
  variant = "badge",
  useGradient = true,
}: QwykzLogoProps) {
  if (variant === "badge") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="qwykz logo"
      >
        <defs>
          <linearGradient
            id="qwykzLogoGradBadge"
            x1="16"
            y1="12"
            x2="88"
            y2="84"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="55%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient
            id="qwykzLogoBg"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#131722" />
            <stop offset="100%" stopColor="#07080c" />
          </linearGradient>
        </defs>

        {/* Squircle badge container */}
        <rect width="100" height="100" rx="24" fill="url(#qwykzLogoBg)" />
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="23.5"
          stroke="#1e293b"
          strokeOpacity="0.8"
        />

        {/* Q Glyph */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M 46 16
            A 28 28 0 1 0 74 44
            A 28 28 0 0 0 46 16
            Z
            M 46 26.5
            A 17.5 17.5 0 1 1 28.5 44
            A 17.5 17.5 0 0 1 46 26.5
            Z
          "
          fill={useGradient ? "url(#qwykzLogoGradBadge)" : "currentColor"}
        />
        <path
          d="
            M 47.5 43
            L 73 68.5
            H 83
            V 79
            H 69.5
            L 42 51.5
            Z
          "
          fill={useGradient ? "url(#qwykzLogoGradBadge)" : "currentColor"}
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="qwykz logo"
    >
      <defs>
        <linearGradient
          id="qwykzLogoGradGlyph"
          x1="16"
          y1="12"
          x2="88"
          y2="84"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="55%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 46 12
          A 32 32 0 1 0 78 44
          A 32 32 0 0 0 46 12
          Z
          M 46 23.2
          A 20.8 20.8 0 1 1 25.2 44
          A 20.8 20.8 0 0 1 46 23.2
          Z
        "
        fill={useGradient ? "url(#qwykzLogoGradGlyph)" : "currentColor"}
      />
      <path
        d="
          M 47.5 42.5
          L 76 71
          H 88
          V 83
          H 72
          L 41.5 52.5
          Z
        "
        fill={useGradient ? "url(#qwykzLogoGradGlyph)" : "currentColor"}
      />
    </svg>
  );
}
