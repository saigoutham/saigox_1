"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { CHARACTER_STATS } from "@/data/stats";
import { cn } from "@/lib/cn";

export function CharacterStats() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <div>
      <ScrollReveal>
        <div className="mb-8 text-center lg:text-left">
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Character Sheet
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            Stats
          </h2>
          <p className="font-mono text-sm text-text-muted">
            Core Attributes
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <GlassCard rarity="legendary" tilt={false} className="p-6 md:p-8">
          {/* Character header */}
          <div className="mb-8 text-center">
            <h3 className="font-sans text-xl font-bold tracking-tight text-text-primary">
              GOUTHAM VADDI
            </h3>
            <p className="font-mono text-xs tracking-wider text-amber">
              Monetization Architect · Lv. 4.5
            </p>
          </div>

          {/* Stat rows with letter grades */}
          <div className="space-y-4">
            {CHARACTER_STATS.map((stat, i) => (
              <div
                key={stat.name}
                className="group cursor-default rounded-lg border border-border/20 p-3 transition-all hover:border-border/40"
                onClick={() => setHoveredStat(hoveredStat === i ? null : i)}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="flex items-center gap-4">
                  {/* Letter Grade */}
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border/30"
                    style={{
                      backgroundColor: `${stat.color}10`,
                      borderColor: `${stat.color}30`,
                    }}
                  >
                    <span
                      className="font-sans text-2xl font-black"
                      style={{ color: stat.color }}
                    >
                      {stat.grade}
                    </span>
                  </div>

                  {/* Stat info */}
                  <div className="flex-1">
                    <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                      {stat.name}
                    </div>

                    {/* Expandable on hover */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        hoveredStat === i
                          ? "mt-1 max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="mb-1 text-xs text-text-muted">
                        {stat.description}
                      </p>
                      <ul className="space-y-0.5">
                        {stat.evidence.map((e, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-[11px] text-text-secondary"
                          >
                            <span style={{ color: stat.color }}>→</span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
