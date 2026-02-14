"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRealmStore } from "@/store/useRealmStore";
import { PHOTOS } from "@/data/photos";
import { AWARDS } from "@/data/awards";
import { TIMELINE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import {
  Camera,
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

// Timeline entries for Act III (business + IIM)
const ACT_THREE_TIMELINE = TIMELINE.filter(
  (e) => e.category === "business" || (e.category === "education" && e.company === "IIM Lucknow")
);

export function ActThreeVisionary() {
  const [developing, setDeveloping] = useState<Photo | null>(null);
  const [devProgress, setDevProgress] = useState(0);
  const [devComplete, setDevComplete] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const developedPhotos = useRealmStore((s) => s.visitor.developedPhotos);
  const markPhotoDeveloped = useRealmStore((s) => s.markPhotoDeveloped);

  const isDeveloped = (id: string) => developedPhotos.includes(id);

  const featuredPhotos = PHOTOS.filter((p) => p.featured);
  const otherPhotos = PHOTOS.filter((p) => !p.featured);

  // Auto-develop featured photos (deferred to avoid setState during render)
  useEffect(() => {
    setTimeout(() => {
      featuredPhotos.forEach((p) => {
        if (!isDeveloped(p.id)) {
          markPhotoDeveloped(p.id);
        }
      });
    }, 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startDevelop = (photo: Photo) => {
    if (isDeveloped(photo.id)) {
      setLightboxPhoto(photo);
      return;
    }
    setDeveloping(photo);
    setDevProgress(0);
    setDevComplete(false);
  };

  // Develop animation
  useEffect(() => {
    if (!developing) return;
    const interval = setInterval(() => {
      setDevProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDevComplete(true);
          markPhotoDeveloped(developing.id);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [developing]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lightbox navigation
  const allDeveloped = PHOTOS.filter((p) => isDeveloped(p.id));
  const lightboxIndex = lightboxPhoto
    ? allDeveloped.findIndex((p) => p.id === lightboxPhoto.id)
    : -1;

  const navigateLightbox = useCallback(
    (dir: -1 | 1) => {
      if (lightboxIndex < 0) return;
      const next = lightboxIndex + dir;
      if (next >= 0 && next < allDeveloped.length) {
        setLightboxPhoto(allDeveloped[next]);
      }
    },
    [lightboxIndex, allDeveloped]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDeveloping(null);
        setLightboxPhoto(null);
      }
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigateLightbox]);

  const allPhotos = [...featuredPhotos, ...otherPhotos];

  return (
    <section id="act-3" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-purple">
            Act III
          </div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            The Visionary
          </h2>
          <p className="mb-4 font-mono text-sm text-text-muted">
            Dual Identity
          </p>
        </ScrollReveal>

        {/* ═══ SPLIT LAYOUT ═══ */}
        <div className="grid gap-16 lg:grid-cols-2">
          {/* LEFT — The Operator */}
          <div>
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
              {ACT_THREE_TIMELINE.map((entry, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard rarity="epic" tilt={false} className="p-5">
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
                      className="flex h-full flex-col p-4"
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
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-purple/60">
                  The Creator
                </div>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  Click undeveloped photos to reveal them in the darkroom.
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-text-muted">
                    {developedPhotos.length}/{PHOTOS.length} Artifacts Collected
                  </span>
                  <div className="h-1 w-24 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-purple transition-all duration-500"
                      style={{
                        width: `${(developedPhotos.length / PHOTOS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Photo grid */}
            <div className="columns-1 gap-3 sm:columns-2">
              {allPhotos.map((photo) => {
                const developed = isDeveloped(photo.id);
                return (
                  <ScrollReveal key={photo.id}>
                    <button
                      onClick={() => startDevelop(photo)}
                      className={cn(
                        "group relative mb-3 w-full overflow-hidden rounded-lg border transition-all duration-300",
                        developed
                          ? "border-border hover:border-purple/30"
                          : "border-purple/10 hover:border-purple/30"
                      )}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{
                          aspectRatio: `${photo.width}/${photo.height}`,
                        }}
                      >
                        {developed ? (
                          <Image
                            src={photo.src}
                            alt={photo.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 48px), calc(25vw - 24px)"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-bg-elevated">
                            <Camera
                              size={24}
                              className="text-purple/20"
                            />
                          </div>
                        )}

                        {/* Hover overlay */}
                        {developed && (
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
                        )}
                      </div>

                      {!developed && (
                        <div className="flex items-center justify-between bg-bg-elevated/50 px-3 py-1.5">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                            Undeveloped
                          </span>
                          <span className="font-mono text-[9px] text-purple/60">
                            Click to develop
                          </span>
                        </div>
                      )}
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ DARKROOM OVERLAY ═══ */}
      {developing && (
        <div
          className="darkroom-overlay fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo darkroom"
        >
          <button
            onClick={() => setDeveloping(null)}
            className="absolute right-4 top-4 z-10 text-text-muted transition-colors hover:text-text-primary"
            aria-label="Close darkroom"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center gap-6 px-4">
            <div className="relative h-[60vh] w-[80vw] max-w-2xl overflow-hidden rounded-lg">
              <Image
                src={developing.src}
                alt={developing.title}
                fill
                className="object-contain"
                style={{
                  clipPath: `circle(${devProgress}% at 50% 50%)`,
                  filter:
                    devProgress < 100
                      ? `saturate(${0.3 + devProgress * 0.007}) brightness(${0.5 + devProgress * 0.005})`
                      : "none",
                  transition: "filter 0.3s ease",
                }}
                sizes="80vw"
                priority
              />
              <div
                className="darkroom-safelight pointer-events-none absolute inset-0"
                style={{ opacity: 1 - devProgress / 100 }}
              />
            </div>

            {!devComplete ? (
              <div className="text-center">
                <div className="mb-2 font-mono text-sm uppercase tracking-widest text-red">
                  Developing...
                </div>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-red transition-all"
                    style={{ width: `${devProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="animate-fade-in-up text-center">
                <div className="mb-1 font-mono text-sm uppercase tracking-widest text-green">
                  Developed
                </div>
                <div className="font-sans text-lg font-semibold text-text-primary">
                  {developing.title}
                </div>
                <div className="font-mono text-xs text-text-muted">
                  {developing.location} · {developing.date} ·{" "}
                  {developing.category}
                </div>
                <button
                  onClick={() => setDeveloping(null)}
                  className="mt-4 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary"
                >
                  [Close]
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
          {lightboxIndex < allDeveloped.length - 1 && (
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
