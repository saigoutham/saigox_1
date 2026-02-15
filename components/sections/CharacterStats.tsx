"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { CHARACTER_STATS } from "@/data/stats";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export function CharacterStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    CHARACTER_STATS.map(() => 0)
  );
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const hasAnimated = useRef(false);
  const valuesRef = useRef<number[]>(CHARACTER_STATS.map(() => 0));
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        CHARACTER_STATS.forEach((stat, i) => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: stat.value,
            duration: 1.5,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              valuesRef.current[i] = obj.value;
              if (!rafIdRef.current) {
                rafIdRef.current = requestAnimationFrame(() => {
                  setAnimatedValues([...valuesRef.current]);
                  rafIdRef.current = 0;
                });
              }
            },
          });
        });
      },
    });

    return () => {
      trigger.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const animatedTotal =
    animatedValues.reduce((sum, v) => sum + v, 0) / animatedValues.length;

  return (
    <section ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Character Sheet
            </div>
            <h2 className="mb-1 font-sans text-3xl font-bold text-text-primary md:text-4xl">
              Stats
            </h2>
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

            {/* Stat bars */}
            <div className="space-y-5">
              {CHARACTER_STATS.map((stat, i) => (
                <div
                  key={stat.name}
                  className="group cursor-default"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                      {stat.name}
                    </span>
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: stat.color }}
                    >
                      {Math.round(animatedValues[i] * 10) / 10}/{stat.maxValue}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-border/30">
                    <div
                      className="h-full rounded-full transition-all duration-100"
                      style={{
                        width: `${(animatedValues[i] / stat.maxValue) * 100}%`,
                        backgroundColor: stat.color,
                        boxShadow: `0 0 10px ${stat.color}44`,
                        ["--stat-color" as string]: stat.color,
                      }}
                    />
                  </div>

                  {/* Tooltip on hover */}
                  <div
                    className={cn(
                      "mt-2 overflow-hidden transition-all duration-300",
                      hoveredStat === i
                        ? "max-h-32 opacity-100"
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
              ))}
            </div>

            {/* Power level */}
            <div className="mt-8 border-t border-border/30 pt-6 text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Power Level
              </div>
              <div className="font-sans text-4xl font-bold text-amber">
                {(Math.round(animatedTotal * 10) / 10).toFixed(1)}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
