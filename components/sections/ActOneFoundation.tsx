"use client";

import { useState, useCallback } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRealmStore } from "@/store/useRealmStore";
import { RELICS } from "@/data/relics";
import { TIMELINE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import {
  Database,
  Activity,
  Clock,
  Rocket,
  Globe,
  Trophy,
  GraduationCap,
  Medal,
  MapPin,
  HelpCircle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Database,
  Activity,
  Clock,
  Rocket,
  Globe,
  Trophy,
  GraduationCap,
  Medal,
};

// Timeline entries for Act I (Visa + Education)
const ACT_ONE_TIMELINE = TIMELINE.filter(
  (e) => e.category === "data" || e.category === "education"
);

export function ActOneFoundation() {
  const relicsDiscovered = useRealmStore((s) => s.visitor.relicsDiscovered);
  const discoverRelic = useRealmStore((s) => s.discoverRelic);
  const discoverEasterEgg = useRealmStore((s) => s.discoverEasterEgg);
  const hasEasterEgg = useRealmStore((s) => s.hasEasterEgg);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [expandedRelic, setExpandedRelic] = useState<string | null>(null);

  const handleRelicClick = useCallback(
    (relicId: string, easterEgg?: string) => {
      discoverRelic(relicId);
      setExpandedRelic((prev) => (prev === relicId ? null : relicId));

      // Easter egg: JEE percentile
      if (easterEgg && relicId === "jee" && !hasEasterEgg("jee-percentile")) {
        discoverEasterEgg("jee-percentile");
        setEasterEggActive(true);
        setTimeout(() => setEasterEggActive(false), 3000);
      }
    },
    [discoverRelic, discoverEasterEgg, hasEasterEgg]
  );

  return (
    <section id="act-1" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-green">
            Act I
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            The Foundation
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            The Architect Awakens
          </p>
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-text-secondary">
            Building the infrastructure that powers global commerce. Visa&apos;s
            data backbone, from petabyte pipelines to real-time transaction
            processing.
          </p>
        </ScrollReveal>

        {/* Data Pipeline Visualization */}
        <ScrollReveal>
          <div className="relative mb-16 overflow-hidden rounded-xl border border-green/10 bg-bg-card/30 p-8">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-green/60">
              Data Pipeline Architecture
            </div>
            {/* Pipeline lines */}
            <div className="space-y-6">
              {["Transaction Stream", "Validation Layer", "Client Reporting"].map(
                (label, i) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {label}
                    </div>
                    <div className="pipeline-node" style={{ animationDelay: `${i * 0.2}s` }} />
                    <div
                      className="pipeline-line flex-1"
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.6 + i * 0.15,
                      }}
                    />
                    <div className="pipeline-node" style={{ animationDelay: `${i * 0.4}s` }} />
                  </div>
                )
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Relic counter */}
        <ScrollReveal>
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs text-text-muted">
              {relicsDiscovered.length}/{RELICS.length} Relics Discovered
            </span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-green transition-all duration-500"
                style={{
                  width: `${(relicsDiscovered.length / RELICS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Relic Grid */}
        <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELICS.map((relic, i) => {
            const isDiscovered = relicsDiscovered.includes(relic.id);
            const isExpanded = expandedRelic === relic.id;
            const Icon = ICON_MAP[relic.icon] || HelpCircle;

            return (
              <ScrollReveal key={relic.id} delay={i * 0.08}>
                <GlassCard
                  rarity={isDiscovered ? "rare" : "common"}
                  tilt={isDiscovered}
                  glow={isDiscovered}
                  onClick={() => handleRelicClick(relic.id, relic.easterEgg)}
                  as="button"
                  className={cn(
                    "w-full cursor-pointer p-5 text-left transition-all",
                    isDiscovered ? "relic-discovered" : "relic-undiscovered"
                  )}
                >
                  <div className="flex items-start justify-between">
                    {isDiscovered ? (
                      <Icon
                        size={20}
                        className="text-green"
                        aria-hidden="true"
                      />
                    ) : (
                      <HelpCircle
                        size={20}
                        className="text-text-muted/30"
                        aria-hidden="true"
                      />
                    )}
                    {relic.category === "education" && (
                      <span className="rounded-full border border-purple/20 bg-purple/5 px-2 py-0.5 font-mono text-[8px] uppercase text-purple">
                        edu
                      </span>
                    )}
                    {relic.category === "recognition" && (
                      <span className="rounded-full border border-amber/20 bg-amber/5 px-2 py-0.5 font-mono text-[8px] uppercase text-amber">
                        award
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div
                      className={cn(
                        "font-sans text-2xl font-bold",
                        isDiscovered ? "text-text-primary" : "text-text-muted/20"
                      )}
                    >
                      {isDiscovered ? relic.value : "???"}
                    </div>
                    <div
                      className={cn(
                        "mt-1 font-mono text-[10px] uppercase tracking-wider",
                        isDiscovered ? "text-text-muted" : "text-text-muted/20"
                      )}
                    >
                      {isDiscovered ? relic.label : "Click to discover"}
                    </div>
                  </div>

                  {/* Expanded description */}
                  {isDiscovered && isExpanded && (
                    <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                      {relic.description}
                    </p>
                  )}
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Easter Egg: JEE Percentile Badge */}
        {easterEggActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="badge-reveal rounded-xl border border-amber/30 bg-bg-card/95 p-8 text-center backdrop-blur-xl"
              onClick={() => setEasterEggActive(false)}
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">
                Easter Egg Discovered
              </div>
              <div className="font-sans text-5xl font-bold text-amber">
                99.66%
              </div>
              <div className="mt-2 font-mono text-xs text-text-muted">
                JEE Main Percentile · Top 0.34%
              </div>
            </div>
          </div>
        )}

        {/* Career Timeline for Act I */}
        <ScrollReveal>
          <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-green/60">
            Career Timeline
          </div>
        </ScrollReveal>

        <div className="relative ml-2 border-l border-border pl-6 sm:ml-4 sm:pl-8">
          {ACT_ONE_TIMELINE.map((entry, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative mb-12 last:mb-0">
                <div
                  className={cn(
                    "absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-bg sm:-left-[37px]",
                    entry.category === "data" ? "bg-green" : "bg-purple"
                  )}
                />

                <GlassCard rarity="common" tilt={false} className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-sans text-base font-semibold text-text-primary">
                      {entry.company}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        entry.category === "data"
                          ? "border-green/20 bg-green/5 text-green"
                          : "border-purple/20 bg-purple/5 text-purple"
                      )}
                    >
                      {entry.category}
                    </span>
                  </div>

                  <p className="mb-1 font-mono text-xs text-green/70">
                    {entry.role}
                  </p>

                  <div className="mb-3 flex items-center gap-3 font-mono text-[10px] text-text-muted">
                    <span>{entry.period}</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} aria-hidden="true" />
                      {entry.location}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {entry.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-xs leading-relaxed text-text-secondary"
                      >
                        <span className="mt-1 shrink-0 text-green/40">
                          &rarr;
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Gate hint */}
        {relicsDiscovered.length >= 3 && (
          <ScrollReveal>
            <div className="mt-16 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-accent/50">
                The Citadel awaits...
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
