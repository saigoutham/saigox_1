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
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 0.1,
  duration = 0.6,
  y = 30,
  delay = 0,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const childElements = el.children;
    gsap.set(childElements, { opacity: 0, y });

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
  }, [stagger, duration, y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
