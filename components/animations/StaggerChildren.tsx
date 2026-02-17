"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 0.1,
  duration = 0.6,
  y = 30,
  delay = 0,
  once = false,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    const childElements = el.children;
    gsap.set(childElements, { opacity: 0, y });

    if (once) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(childElements, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: "power3.out",
          });
        },
      });

      return () => trigger.kill();
    }

    // Reverse-capable stagger animation
    const tween = gsap.to(childElements, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
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
  }, [stagger, duration, y, delay, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
