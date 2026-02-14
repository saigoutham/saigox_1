"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  triggerOnScroll?: boolean;
  triggerOnMount?: boolean;
  delay?: number;
}

export function TextScramble({
  text,
  className = "",
  duration = 1.5,
  triggerOnScroll = false,
  triggerOnMount = false,
  delay = 0,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;
    hasAnimated.current = true;

    const originalText = text;
    const length = originalText.length;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 1 / (duration * 30); // ~30fps
      if (progress >= 1) {
        el.textContent = originalText;
        clearInterval(interval);
        return;
      }

      let result = "";
      for (let i = 0; i < length; i++) {
        if (originalText[i] === " ") {
          result += " ";
        } else if (i < length * progress) {
          result += originalText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = result;
    }, 1000 / 30);
  }, [text, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (triggerOnMount) {
      const timeout = setTimeout(scramble, delay * 1000);
      return () => clearTimeout(timeout);
    }

    if (triggerOnScroll) {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: scramble,
      });
      return () => trigger.kill();
    }
  }, [triggerOnMount, triggerOnScroll, scramble, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
