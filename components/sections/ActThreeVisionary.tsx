"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PHOTOS } from "@/data/photos";
import { AWARDS } from "@/data/awards";
import { TIMELINE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Zap,
  GraduationCap,
  Medal,
  Award,
  MapPin,
} from "lucide-react";
import type { Photo } from "@/lib/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Trophy,
  Zap,
  GraduationCap,
  Medal,
  Award,
};

// Timeline entries for Act II (business + IIM)
const ACT_TWO_TIMELINE = TIMELINE.filter(
  (e) =>
    e.category === "business" ||
    (e.category === "education" && e.company === "IIM Lucknow")
);

export function ActThreeVisionary() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const featuredPhotos = PHOTOS.filter((p) => p.featured);
  const otherPhotos = PHOTOS.filter((p) => !p.featured);
  const allPhotos = [...featuredPhotos, ...otherPhotos];

  // Lightbox navigation
  const lightboxIndex = lightboxPhoto
    ? allPhotos.findIndex((p) => p.id === lightboxPhoto.id)
    : -1;

  const navigateLightbox = useCallback(
    (dir: -1 | 1) => {
      if (lightboxIndex < 0) return;
      const next = lightboxIndex + dir;
      if (next >= 0 && next < allPhotos.length) {
        setLightboxPhoto(allPhotos[next]);
      }
    },
    [lightboxIndex, allPhotos]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxPhoto(null);
      }
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigateLightbox]);

  return (
    <section id="act-2" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-purple">
            Act II
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            The Visionary
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            Dual Identity
          </p>
        </ScrollReveal>

        {/* ═══ SPLIT LAYOUT ═══ */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT — The Operator */}
          <div className="flex flex-col">
            <ScrollReveal>
              <div className="mb-8">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-purple/60">
                  The Operator
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  From MBA strategy to CEO execution — building and leading at
                  scale.
                </p>
              </div>
            </ScrollReveal>

            {/* Leadership timeline */}
            <div className="mb-12 space-y-4">
              {ACT_TWO_TIMELINE.map((entry, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard rarity="epic" tilt={false} className="h-full p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-sans text-base font-semibold text-text-primary">
                        {entry.company}
                      </h3>
                      <span className="rounded-full border border-amber/20 bg-amber/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber">
                        {entry.category}
                      </span>
                    </div>

                    <p className="mb-1 font-mono text-xs text-purple/70">
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
                          <span className="mt-1 shrink-0 text-purple/40">
                            &rarr;
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Awards */}
            <ScrollReveal>
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-purple/60">
                Achievement Badges
              </div>
            </ScrollReveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {AWARDS.map((award, i) => {
                const Icon = ICON_MAP[award.icon] || Award;
                return (
                  <ScrollReveal key={award.id} delay={i * 0.06}>
                    <GlassCard
                      rarity="legendary"
                      tilt={false}
                      className="flex h-full min-h-[160px] flex-col p-4"
                    >
                      <Icon
                        size={20}
                        className="mb-2 text-amber"
                        aria-hidden="true"
                      />
                      <h4 className="mb-1 font-sans text-xs font-semibold text-text-primary">
                        {award.title}
                      </h4>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-mono text-[9px] uppercase text-text-muted">
                          {award.organization}
                        </span>
                        <span className="font-mono text-[9px] text-text-muted/50">
                          {award.year}
                        </span>
                      </div>
                      <p className="mt-auto text-[11px] leading-relaxed text-text-secondary">
                        {award.description}
                      </p>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* RIGHT — The Creator */}
          <div className="flex flex-col">
            <ScrollReveal>
              <div className="mb-8">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-purple/60">
                  The Creator
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Wildlife and macro photography across Indian wilderness.
                </p>
              </div>
            </ScrollReveal>

            {/* Photo grid - all photos always visible */}
            <div className="columns-1 gap-3 sm:columns-2">
              {allPhotos.map((photo, i) => (
                <ScrollReveal key={photo.id}>
                  <button
                    onClick={() => setLightboxPhoto(photo)}
                    className="group relative mb-3 w-full overflow-hidden rounded-lg border border-border transition-all duration-300 hover:border-purple/30"
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: `${photo.width}/${photo.height}`,
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 48px), calc(25vw - 24px)"
                        loading={i < 4 ? undefined : "lazy"}
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-bg/80 via-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="p-3">
                          <div className="font-sans text-xs font-semibold text-text-primary">
                            {photo.title}
                          </div>
                          <div className="font-mono text-[9px] text-text-muted">
                            {photo.category} · {photo.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-xl"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute right-4 top-4 z-10 text-text-muted transition-colors hover:text-text-primary"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className="absolute left-4 z-10 rounded-full bg-bg-card/50 p-2 text-text-muted hover:text-text-primary"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {lightboxIndex < allPhotos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className="absolute right-14 z-10 rounded-full bg-bg-card/50 p-2 text-text-muted hover:text-text-primary"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div
            className="relative h-[80vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxPhoto.src}
              alt={lightboxPhoto.title}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg border border-border bg-bg-card/80 px-4 py-2 backdrop-blur-sm">
            <div className="text-center">
              <div className="font-sans text-sm font-semibold text-text-primary">
                {lightboxPhoto.title}
              </div>
              <div className="font-mono text-[10px] text-text-muted">
                {lightboxPhoto.location} · {lightboxPhoto.date}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
