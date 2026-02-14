"use client";

import { useState, useCallback } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRealmStore } from "@/store/useRealmStore";
import { SKILL_BRANCHES } from "@/data/skills";
import { MISSIONS } from "@/data/missions";
import { cn } from "@/lib/cn";
import type { SkillNode } from "@/lib/types";

// Rarity by company
const MISSION_RARITY: Record<string, "rare" | "epic" | "legendary"> = {
  Scopely: "epic",
  "Visa Inc.": "rare",
  "Hel(l)Mark — The IIML Store": "legendary",
};

export function ActTwoStrategist() {
  const skillsRevealed = useRealmStore((s) => s.visitor.skillsRevealed);
  const revealSkill = useRealmStore((s) => s.revealSkill);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [abVariant, setAbVariant] = useState<"A" | "B">("A");

  const handleNodeClick = useCallback(
    (node: SkillNode) => {
      revealSkill(node.id);
      setExpandedNode((prev) => (prev === node.id ? null : node.id));
    },
    [revealSkill]
  );

  const allNodes = SKILL_BRANCHES.flatMap((b) => b.nodes);

  return (
    <section id="act-2" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Act II
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            The Strategist
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            The Monetization War Room
          </p>
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-text-secondary">
            Architecting revenue systems for $80M+ mobile gaming titles. From
            player segmentation to LiveOps festivals, every metric tells a
            story.
          </p>
        </ScrollReveal>

        {/* Skill counter */}
        <ScrollReveal>
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs text-text-muted">
              {skillsRevealed.length}/{allNodes.length} Skills Revealed
            </span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{
                  width: `${(skillsRevealed.length / allNodes.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ SKILL TREE ═══ */}
        <div className="mb-20">
          <ScrollReveal>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-accent/60">
              Skill Tree
            </div>
          </ScrollReveal>

          {/* SVG Skill Tree */}
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-xl border border-accent/10 bg-bg-card/30 p-6 md:p-10">
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
                  <div key={branch.id}>
                    {/* Branch header */}
                    <div className="mb-3 flex items-center gap-2">
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

                    {/* Nodes */}
                    <div className="space-y-3">
                      {branch.nodes.map((node) => {
                        const isRevealed = skillsRevealed.includes(node.id);
                        const isExpanded = expandedNode === node.id;

                        return (
                          <GlassCard
                            key={node.id}
                            rarity={isRevealed ? "rare" : "common"}
                            tilt={isRevealed}
                            glow={isRevealed}
                            onClick={() => handleNodeClick(node)}
                            as="button"
                            className={cn(
                              "skill-node w-full cursor-pointer p-4 text-left",
                              !isRevealed && "opacity-60"
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="font-sans text-sm font-semibold text-text-primary">
                                {node.title}
                              </h4>
                              <div
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{
                                  backgroundColor: isRevealed
                                    ? branch.color
                                    : "var(--color-border)",
                                  boxShadow: isRevealed
                                    ? `0 0 8px ${branch.color}`
                                    : "none",
                                }}
                              />
                            </div>

                            {isRevealed && (
                              <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                                {node.subtitle}
                              </p>
                            )}

                            {/* Expanded metrics */}
                            {isRevealed && isExpanded && (
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

                            {!isRevealed && (
                              <p className="mt-1 font-mono text-[10px] text-text-muted/30">
                                Click to reveal
                              </p>
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

        {/* ═══ CASE STUDIES ═══ */}
        <div>
          <ScrollReveal>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-accent/60">
              Case Studies
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MISSIONS.map((mission, i) => {
              const rarity = MISSION_RARITY[mission.company] || "common";

              return (
                <ScrollReveal key={mission.slug} delay={i * 0.1}>
                  <GlassCard
                    rarity={rarity}
                    className="flex h-full flex-col p-6"
                  >
                    {/* Codename */}
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {mission.codename}
                    </div>

                    {/* Title & Company */}
                    <h3 className="mb-1 font-sans text-lg font-bold text-text-primary">
                      {mission.title}
                    </h3>
                    <div className="mb-4 font-mono text-xs text-text-muted">
                      {mission.company} · {mission.period}
                    </div>

                    {/* Brief */}
                    <p className="mb-6 text-xs leading-relaxed text-text-secondary">
                      {mission.brief}
                    </p>

                    {/* Key Metrics */}
                    <div className="mb-6 mt-auto grid grid-cols-2 gap-3">
                      {mission.results.slice(0, 4).map((result, ri) => (
                        <div key={ri}>
                          <div className="font-sans text-xl font-bold text-text-primary">
                            {result.value}
                          </div>
                          <div className="text-[10px] text-text-muted">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
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
