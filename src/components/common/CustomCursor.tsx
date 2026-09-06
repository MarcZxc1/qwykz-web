import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const COLORS = ["#10b981", "#06b6d4", "#34d399", "#38bdf8"];

export function CustomCursor() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation values stored in refs for 60-120fps RAF loop without React re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isTextHovered = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);
  const particles = useRef<Particle[]>([]);
  const rippleCount = useRef(0);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkEnabled = () => {
      const isAvailable = pointerQuery.matches && !motionQuery.matches;
      setEnabled(isAvailable);
      if (!isAvailable) {
        document.documentElement.classList.remove("custom-cursor-active");
      }
    };

    pointerQuery.addEventListener("change", checkEnabled);
    motionQuery.addEventListener("change", checkEnabled);

    if (!enabled) {
      return () => {
        pointerQuery.removeEventListener("change", checkEnabled);
        motionQuery.removeEventListener("change", checkEnabled);
      };
    }

    document.documentElement.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }

      mousePos.current = { x: e.clientX, y: e.clientY };

      // Emit particle stardust trail when moving swiftly
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      const speed = Math.hypot(dx, dy);

      if (speed > 4 && particles.current.length < 35) {
        const pCount = Math.min(2, Math.floor(speed / 12) + 1);
        for (let i = 0; i < pCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const pSpeed = Math.random() * 1.5 + 0.5;
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * pSpeed - dx * 0.05,
            vy: Math.sin(angle) * pSpeed - dy * 0.05,
            size: Math.random() * 2.5 + 1,
            alpha: 0.85,
            decay: Math.random() * 0.035 + 0.02,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      }

      prevMousePos.current = { x: e.clientX, y: e.clientY };

      // Inspect target element for contextual hover reactions
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, select, textarea, [role='button'], .cursor-pointer, summary, code, pre",
        );
        const textTarget = target.closest("p, h1, h2, h3, h4, h5, h6, span.text-selectable");

        isHovered.current = !!interactive;
        isTextHovered.current = !interactive && !!textTarget;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isClicking.current = true;

      // Spawn click shockwave
      rippleCount.current += 1;
      const newRipple: Ripple = {
        id: rippleCount.current,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const onMouseUp = () => {
      isClicking.current = false;
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // High-performance RAF animation loop
    let rafId: number;

    const animate = () => {
      // 1. Lerp trailing follower ring (smooth spring damping)
      const ringEase = isHovered.current ? 0.25 : 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringEase;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringEase;

      // 2. Lerp ambient glow (soft lazy drift)
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

      // 3. Update inner precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${isClicking.current ? 0.7 : isHovered.current ? 1.4 : 1})`;
      }

      // 4. Update outer ring transform and scale
      if (ringRef.current) {
        let scale = 1;
        if (isClicking.current) {
          scale = 0.8;
        } else if (isHovered.current) {
          scale = 1.75;
        } else if (isTextHovered.current) {
          scale = 1.25;
        }

        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      // 5. Update ambient glow transform
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 6. Render particle stardust on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      pointerQuery.removeEventListener("change", checkEnabled);
      motionQuery.removeEventListener("change", checkEnabled);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  // Remove ripples once animation completes
  const handleRippleEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (!enabled) return null;

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block w-full h-full"
      />

      {/* Ambient background glow */}
      <div
        ref={glowRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/8 to-transparent blur-3xl transition-opacity duration-300 will-change-transform"
      />

      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute top-0 left-0 w-9 h-9 rounded-full border border-emerald-400/60 bg-emerald-500/[0.04] shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-[border-color,background-color,box-shadow,opacity] duration-200 ease-out will-change-transform flex items-center justify-center"
      >
        {/* Subtle decorative target crosshairs */}
        <div className="w-1.5 h-[1px] bg-cyan-400/40 absolute -top-1" />
        <div className="w-1.5 h-[1px] bg-cyan-400/40 absolute -bottom-1" />
        <div className="h-1.5 w-[1px] bg-cyan-400/40 absolute -left-1" />
        <div className="h-1.5 w-[1px] bg-cyan-400/40 absolute -right-1" />
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute top-0 left-0 w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#10b981,0_0_2px_#ffffff] transition-opacity duration-150 will-change-transform"
      />

      {/* Click Shockwave Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          onAnimationEnd={() => handleRippleEnd(ripple.id)}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          className="pointer-events-none absolute w-5 h-5 rounded-full border-2 border-emerald-400/80 animate-cursor-ripple"
        />
      ))}
    </aside>
  );
}
