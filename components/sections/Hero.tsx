"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const realmRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      realmRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        photoRef.current,
        { opacity: 0, x: 60, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

    // Parallax on gradient orbs
    if (orb1Ref.current && orb2Ref.current) {
      gsap.to(orb1Ref.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(orb2Ref.current, {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background gradient orbs */}
      <div ref={orb1Ref} className="gradient-orb gradient-orb-1" />
      <div ref={orb2Ref} className="gradient-orb gradient-orb-2" />

      {/* Content — two-column on desktop, stacked on mobile */}
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — Text content (on desktop), below photo (on mobile) */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          {/* Realm subtitle */}
          <div
            ref={realmRef}
            className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
            style={{ opacity: 0 }}
          >
            The Realm of Goutham
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="mb-4 font-sans text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight text-text-primary"
            style={{ opacity: 0 }}
          >
            GOUTHAM
            <br />
            <span className="text-gradient-accent">VADDI</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mx-auto mb-8 max-w-xl font-mono text-sm tracking-wider text-text-muted md:text-base lg:mx-0"
            style={{ opacity: 0 }}
          >
            Product Manager · Monetization & LiveOps · Wildlife Photographer
          </p>

          {/* CTA buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            style={{ opacity: 0 }}
          >
            <MagneticButton
              onClick={() =>
                document
                  .getElementById("act-1")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full rounded-full border border-accent bg-accent/10 px-8 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all hover:bg-accent/20 sm:w-auto"
            >
              Enter the Realm
            </MagneticButton>
            <MagneticButton
              onClick={() =>
                document
                  .getElementById("act-2")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full rounded-full border border-border px-8 py-3 font-mono text-sm uppercase tracking-wider text-text-secondary transition-all hover:border-text-muted hover:text-text-primary sm:w-auto"
            >
              View Gallery
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT — Photo (on desktop), top (on mobile) */}
        <div
          ref={photoRef}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
          style={{ opacity: 0 }}
        >
          <div className="relative">
            {/* Decorative rings */}
            <div className="absolute -inset-4 rounded-2xl border border-accent/10" />
            <div className="absolute -inset-8 rounded-3xl border border-accent/5" />

            {/* Photo */}
            <div className="relative h-[280px] w-[280px] overflow-hidden rounded-2xl border-2 border-accent/20 sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px]">
              <Image
                src="/images/self/DSC_3639.jpg"
                alt="Goutham Vaddi"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                priority
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/60 to-transparent" />
            </div>

            {/* Currently @ badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-accent/30 bg-bg-card/90 px-4 py-1.5 backdrop-blur-sm lg:left-auto lg:right-4 lg:translate-x-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                Currently @ Scopely
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="scroll-indicator-hide absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            Scroll
          </span>
          <ChevronDown
            size={16}
            className="animate-scroll-bounce text-text-muted"
          />
        </div>
      </div>
    </section>
  );
}
