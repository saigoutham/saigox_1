"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SIDE_PROJECTS } from "@/data/projects";
import { ExternalLink } from "lucide-react";

export function SideProjects() {
  return (
    <section id="side-projects" className="relative px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Side Quests
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            Projects
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            Built for Fun & Learning
          </p>
          <p className="mb-12 max-w-lg text-sm leading-relaxed text-text-secondary">
            Side projects I built with AI tools — live, deployed, and open for
            anyone to try.
          </p>
        </ScrollReveal>

        {/* Project cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {SIDE_PROJECTS.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <GlassCard rarity="rare" tilt={false} className="flex h-full flex-col p-6 md:p-8">
                {/* Emoji icon */}
                <div className="mb-4 text-4xl">{project.emoji}</div>

                {/* Title */}
                <h3 className="mb-2 font-sans text-lg font-semibold text-text-primary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80"
                >
                  Visit Project
                  <ExternalLink size={12} />
                </a>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
