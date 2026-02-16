"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SKILL_BRANCHES } from "@/data/skills";
import { MISSIONS } from "@/data/missions";
import { cn } from "@/lib/cn";

// Rarity by company
const MISSION_RARITY: Record<string, "rare" | "epic" | "legendary"> = {
  Scopely: "epic",
  "Visa Inc.": "rare",
  "Hel(l)Mark — The IIML Store": "legendary",
};

export function ActTwoStrategist() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [abVariant, setAbVariant] = useState<"A" | "B">("A");
  const [expandedMission, setExpandedMission] = useState<string | null>(null);

  return (
    <section id="act-1" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Act I
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            The Strategist
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            The Monetization War Room
          </p>
          <p className="mb-12 max-w-lg text-sm leading-relaxed text-text-secondary">
            Architecting revenue systems for $80M+ mobile gaming titles. From
            player segmentation to LiveOps festivals, every metric tells a
            story.
          </p>
        </ScrollReveal>

        {/* ═══ SKILL TREE ═══ */}
        <div className="mb-20">
          <ScrollReveal>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-accent/60">
              Skill Tree
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-enhanced relative overflow-hidden rounded-xl p-6 md:p-10">
              {/* Center node */}
              <div className="mb-8 text-center">
                <div className="mx-auto inline-flex items-center justify-center rounded-full border-2 border-accent bg-accent/10 px-6 py-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                    Monetization PM
                  </span>
                </div>
              </div>

              {/* Branches */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SKILL_BRANCHES.map((branch) => (
                  <div key={branch.id} className="flex flex-col">
                    {/* Branch header */}
                    <div className="mb-3 flex h-8 items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: branch.color }}
                      />
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: branch.color }}
                      >
                        {branch.name}
                      </span>
                    </div>

                    {/* Nodes - always visible */}
                    <div className="flex-1 space-y-3">
                      {branch.nodes.map((node) => {
                        const isExpanded = expandedNode === node.id;

                        return (
                          <GlassCard
                            key={node.id}
                            rarity="rare"
                            tilt
                            glow
                            className="skill-node min-h-[120px] w-full p-4 text-left"
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="font-sans text-sm font-semibold text-text-primary">
                                {node.title}
                              </h4>
                              <div
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{
                                  backgroundColor: branch.color,
                                  boxShadow: `0 0 8px ${branch.color}`,
                                }}
                              />
                            </div>

                            <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                              {node.subtitle}
                            </p>

                            {/* View metrics toggle */}
                            <button
                              onClick={() =>
                                setExpandedNode(
                                  isExpanded ? null : node.id
                                )
                              }
                              className="mt-2 font-mono text-[10px] text-accent/70 transition-colors hover:text-accent"
                            >
                              {isExpanded ? "Hide metrics ▲" : "View metrics ▼"}
                            </button>

                            {/* Expanded metrics */}
                            {isExpanded && (
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                {node.metrics.map((m, mi) => (
                                  <div
                                    key={mi}
                                    className="rounded-md border border-border/50 bg-bg/50 p-2"
                                  >
                                    <div
                                      className="font-sans text-lg font-bold"
                                      style={{ color: branch.color }}
                                    >
                                      {m.value}
                                    </div>
                                    <div className="font-mono text-[9px] uppercase text-text-muted">
                                      {m.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </GlassCard>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ═══ A/B TEST CHAMBER ═══ */}
        <div className="mb-20">
          <ScrollReveal>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-accent/60">
              A/B Test Chamber
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <GlassCard rarity="epic" tilt={false} className="p-6 md:p-8">
              {/* Toggle */}
              <div className="mb-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => setAbVariant("A")}
                  className={cn(
                    "rounded-full border px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                    abVariant === "A"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-text-muted hover:text-text-secondary"
                  )}
                >
                  Before
                </button>
                <div className="h-px w-8 bg-border" />
                <button
                  onClick={() => setAbVariant("B")}
                  className={cn(
                    "rounded-full border px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                    abVariant === "B"
                      ? "border-green bg-green/10 text-green"
                      : "border-border text-text-muted hover:text-text-secondary"
                  )}
                >
                  After
                </button>
              </div>

              {/* Metrics */}
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    label: "Player Cohorts",
                    before: "6",
                    after: "30+",
                    delta: "+400%",
                  },
                  {
                    label: "ARPDAU",
                    before: "Baseline",
                    after: "+15%",
                    delta: "+15%",
                  },
                  {
                    label: "Conversion Rate",
                    before: "Baseline",
                    after: "+5%",
                    delta: "+5%",
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-border/30 bg-bg/50 p-4 text-center transition-all duration-500"
                  >
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {metric.label}
                    </div>
                    <div
                      className={cn(
                        "font-sans text-3xl font-bold transition-all duration-500",
                        abVariant === "B" ? "text-green" : "text-text-primary"
                      )}
                    >
                      {abVariant === "A" ? metric.before : metric.after}
                    </div>
                    {abVariant === "B" && (
                      <div className="mt-1 font-mono text-[10px] text-green">
                        {metric.delta}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-text-muted/50">
                Based on cohort segmentation expansion · 50+ A/B tests executed
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* ═══ CASE STUDIES — MAIN ATTRACTION ═══ */}
        <div>
          <ScrollReveal>
            <div className="mb-8 font-mono text-[10px] uppercase tracking-widest text-accent/60">
              Case Studies
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {MISSIONS.map((mission, i) => {
              const rarity = MISSION_RARITY[mission.company] || "common";
              const isExpanded = expandedMission === mission.slug;

              return (
                <ScrollReveal key={mission.slug} delay={i * 0.1}>
                  <GlassCard rarity={rarity} tilt={false} className="p-8 md:p-10">
                    {/* Top row: codename + company/period */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                        {mission.codename}
                      </div>
                      <div className="font-mono text-xs text-text-muted">
                        {mission.company} · {mission.period}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 font-sans text-2xl font-bold text-text-primary md:text-3xl">
                      {mission.title}
                    </h3>

                    {/* Brief */}
                    <p className="mb-8 max-w-3xl text-sm leading-relaxed text-text-secondary">
                      {mission.brief}
                    </p>

                    {/* Two-column: Approach + Results */}
                    <div className="grid gap-8 md:grid-cols-2">
                      {/* Approach */}
                      <div>
                        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                          Approach
                        </div>
                        <ul className="space-y-2">
                          {mission.approach.map((step, j) => (
                            <li
                              key={j}
                              className="flex gap-2 text-xs leading-relaxed text-text-secondary"
                            >
                              <span className="mt-0.5 shrink-0 text-accent/50">
                                {j + 1}.
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Results */}
                      <div>
                        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                          Results
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {mission.results.map((result, ri) => (
                            <div
                              key={ri}
                              className="rounded-lg border border-border/30 bg-bg/50 p-4"
                            >
                              <div className="font-sans text-2xl font-bold text-text-primary">
                                {result.value}
                              </div>
                              <div className="text-[10px] text-text-muted">
                                {result.metric}
                              </div>
                              <div className="mt-1 text-[10px] text-text-secondary">
                                {result.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Learnings (collapsible) */}
                    <div className="mt-6">
                      <button
                        onClick={() =>
                          setExpandedMission(isExpanded ? null : mission.slug)
                        }
                        className="font-mono text-[10px] uppercase tracking-widest text-text-muted/50 transition-colors hover:text-text-secondary"
                      >
                        {isExpanded ? "Hide Learnings ▲" : "Key Learnings ▼"}
                      </button>
                      {isExpanded && (
                        <ul className="mt-3 space-y-1.5">
                          {mission.learnings.map((l, j) => (
                            <li
                              key={j}
                              className="flex gap-2 text-xs text-text-secondary"
                            >
                              <span className="text-accent/40">→</span> {l}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {mission.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
