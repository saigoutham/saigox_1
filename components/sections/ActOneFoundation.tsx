"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TIMELINE } from "@/lib/constants";
import { GraduationCap, Medal, MapPin, Briefcase } from "lucide-react";

// Career entries (non-education)
const CAREER_TIMELINE = TIMELINE.filter((e) => e.category !== "education");

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  gaming: "border-accent/20 bg-accent/5 text-accent",
  business: "border-amber/20 bg-amber/5 text-amber",
  data: "border-green/20 bg-green/5 text-green",
};

// Category dot colors
const DOT_COLORS: Record<string, string> = {
  gaming: "bg-accent",
  business: "bg-amber",
  data: "bg-green",
};

export function ActOneFoundation() {
  return (
    <section id="act-3" className="relative px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-green">
            Act III
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            The Foundation
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            The Architect Awakens
          </p>
          <p className="mb-12 max-w-lg text-sm leading-relaxed text-text-secondary">
            The academic bedrock and career journey that shaped everything.
            From JEE Main top 1000 to building petabyte pipelines at Visa,
            to leading a merchandise empire at IIM Lucknow.
          </p>
        </ScrollReveal>

        {/* ═══ EDUCATION SPOTLIGHT ═══ */}
        <ScrollReveal>
          <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-green/60">
            Education
          </div>
        </ScrollReveal>

        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {/* IIM Lucknow */}
          <ScrollReveal>
            <GlassCard rarity="epic" tilt={false} className="h-full p-6">
              <GraduationCap
                size={24}
                className="mb-3 text-purple"
                aria-hidden="true"
              />
              <h3 className="font-sans text-lg font-semibold text-text-primary">
                IIM Lucknow
              </h3>
              <p className="mt-1 font-mono text-xs text-green/70">
                MBA — IT Systems, Strategy &amp; Operations
              </p>
              <p className="mt-1 font-mono text-[10px] text-text-muted">
                2021 – 2023 · Lucknow
              </p>
              <ul className="mt-4 space-y-1.5">
                <li className="flex gap-2 text-xs text-text-secondary">
                  <span className="text-green/40">→</span> Dean&apos;s Merit
                  List
                </li>
                <li className="flex gap-2 text-xs text-text-secondary">
                  <span className="text-green/40">→</span> National Finalist —
                  Microsoft PM Engage
                </li>
              </ul>
            </GlassCard>
          </ScrollReveal>

          {/* NIT Trichy */}
          <ScrollReveal delay={0.1}>
            <GlassCard rarity="epic" tilt={false} className="h-full p-6">
              <GraduationCap
                size={24}
                className="mb-3 text-purple"
                aria-hidden="true"
              />
              <h3 className="font-sans text-lg font-semibold text-text-primary">
                NIT Trichy
              </h3>
              <p className="mt-1 font-mono text-xs text-green/70">
                B.Tech — Computer Science
              </p>
              <p className="mt-1 font-mono text-[10px] text-text-muted">
                2015 – 2019 · Tiruchirappalli
              </p>
              <ul className="mt-4 space-y-1.5">
                <li className="flex gap-2 text-xs text-text-secondary">
                  <span className="text-green/40">→</span> CGPA: 9.27 · Honors
                  Degree · Minor in Management
                </li>
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* JEE Main Achievement */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <GlassCard
              rarity="legendary"
              tilt={false}
              className="mx-auto inline-block px-8 py-6"
            >
              <Medal
                size={24}
                className="mx-auto mb-2 text-amber"
                aria-hidden="true"
              />
              <div className="font-sans text-3xl font-bold text-amber">
                AIR 995
              </div>
              <div className="mt-1 font-mono text-xs text-text-muted">
                JEE Main 2015 · 99.66 percentile · 12.34L+ candidates
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ═══ CAREER JOURNEY ═══ */}
        <ScrollReveal>
          <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-green/60">
            Career Journey
          </div>
        </ScrollReveal>

        <div className="relative ml-2 border-l border-border pl-6 sm:ml-4 sm:pl-8">
          {CAREER_TIMELINE.map((entry, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative mb-12 last:mb-0">
                <div
                  className={`absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-bg sm:-left-[37px] ${
                    DOT_COLORS[entry.category] || "bg-green"
                  }`}
                />

                <GlassCard rarity="common" tilt={false} className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Briefcase
                      size={14}
                      className="text-text-muted"
                      aria-hidden="true"
                    />
                    <h3 className="font-sans text-base font-semibold text-text-primary">
                      {entry.company}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        CATEGORY_COLORS[entry.category] ||
                        "border-green/20 bg-green/5 text-green"
                      }`}
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
      </div>
    </section>
  );
}
