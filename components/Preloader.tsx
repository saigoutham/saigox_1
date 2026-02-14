"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function useTextScramble(text: string, startDelay: number = 0) {
  const [display, setDisplay] = useState(text.replace(/./g, " "));
  const hasStarted = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      let frame = 0;
      const totalFrames = 40;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (i < text.length * progress) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(result);

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 30);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  return display;
}

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const exitingRef = useRef(false);
  const name = useTextScramble("GOUTHAM VADDI", 200);
  const subtitle = useTextScramble("Entering The Realm...", 600);

  const exit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete,
    });
  }, [onComplete]);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: "100%",
      duration: 1.8,
      ease: "power2.inOut",
    });

    const timeout = setTimeout(exit, 2200);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        exit();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("keydown", handleKey);
    };
  }, [exit]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="text-center">
        <h1 className="mb-3 font-sans text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
          {name}
        </h1>
        <p className="font-mono text-sm tracking-wider text-text-muted">
          {subtitle}
        </p>
      </div>

      <p className="sr-only">Press any key to skip loading</p>
      <p className="absolute bottom-16 font-mono text-[10px] uppercase tracking-widest text-text-muted/40">
        Press Enter to skip
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border">
        <div ref={progressRef} className="h-full w-0 bg-accent" />
      </div>
    </div>
  );
}
