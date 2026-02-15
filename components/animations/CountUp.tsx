"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    // Respect reduced-motion preference — show final value instantly
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      hasAnimated.current = true;
      el.textContent =
        prefix +
        (decimals > 0
          ? end.toFixed(decimals)
          : Math.round(end).toLocaleString()) +
        suffix;
      return;
    }

    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(obj, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent =
              prefix +
              (decimals > 0
                ? obj.value.toFixed(decimals)
                : Math.round(obj.value).toLocaleString()) +
              suffix;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, prefix, suffix, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
