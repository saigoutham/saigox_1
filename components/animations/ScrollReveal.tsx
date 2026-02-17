"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  stagger?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 40,
  x = 0,
  once = false,
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference — show content instantly
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const targets = stagger > 0 ? el.children : el;
      gsap.set(targets, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const targets = stagger > 0 ? el.children : el;

    if (once) {
      // Legacy once-only behavior
      gsap.set(targets, { opacity: 0, y, x });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            x: 0,
            duration,
            delay,
            stagger: stagger > 0 ? stagger : 0,
            ease: "power3.out",
          });
        },
      });

      return () => {
        trigger.kill();
      };
    }

    // Reverse-capable animation: play in on scroll down, reverse out on scroll up
    gsap.set(targets, { opacity: 0, y, x });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      ease: "power3.out",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 20%",
      toggleActions: "play none none reverse",
      onEnter: () => tween.play(),
      onLeaveBack: () => tween.reverse(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [delay, duration, y, x, once, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
