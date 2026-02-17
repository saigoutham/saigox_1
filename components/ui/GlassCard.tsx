"use client";

import { useRef, useState, useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Rarity = "common" | "rare" | "epic" | "legendary";

const RARITY_COLORS: Record<Rarity, { border: string; glow: string }> = {
  common: { border: "rgba(161, 161, 161, 0.2)", glow: "rgba(161, 161, 161, 0.1)" },
  rare: { border: "rgba(255, 107, 107, 0.3)", glow: "rgba(255, 107, 107, 0.15)" },
  epic: { border: "rgba(168, 85, 247, 0.3)", glow: "rgba(168, 85, 247, 0.15)" },
  legendary: { border: "rgba(245, 158, 11, 0.3)", glow: "rgba(245, 158, 11, 0.15)" },
};

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  rarity?: Rarity;
  onClick?: () => void;
  as?: "div" | "button";
}

export function GlassCard({
  children,
  className,
  tilt = true,
  glow = true,
  rarity = "common",
  onClick,
  as = "div",
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const rarityColor = RARITY_COLORS[rarity];

  // Detect hover capability (disable tilt/glow on touch devices)
  const hasHover = useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(hover: hover)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: hover)").matches,
    () => true // SSR fallback: assume hover capable
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hasHover) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (tilt) {
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        setTransform(
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        );
      }

      if (glow) {
        setGlowPos({ x, y });
      }
    },
    [tilt, glow, hasHover]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  const sharedProps = {
    className: cn(
      "glass-card relative overflow-hidden rounded-xl border transition-all duration-300",
      "bg-white/[0.03] backdrop-blur-xl",
      className
    ),
    style: {
      transform: transform || undefined,
      borderColor: rarityColor.border,
      willChange: tilt ? ("transform" as const) : undefined,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    onKeyDown: onClick ? handleKeyDown : undefined,
    tabIndex: onClick && as !== "button" ? 0 : undefined,
    role: onClick && as !== "button" ? ("button" as const) : undefined,
  };

  const inner = (
    <>
      {/* Cursor-follow glow */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, ${rarityColor.glow}, transparent 60%)`,
            opacity: transform ? 1 : 0,
          }}
        />
      )}
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </>
  );

  if (as === "button") {
    return (
      <button ref={cardRef as unknown as React.RefObject<HTMLButtonElement>} {...sharedProps}>
        {inner}
      </button>
    );
  }

  return (
    <div ref={cardRef} {...sharedProps}>
      {inner}
    </div>
  );
}
