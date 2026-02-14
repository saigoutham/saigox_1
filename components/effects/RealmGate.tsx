"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REALMS } from "@/data/realms";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface RealmGateProps {
  realmIndex: number; // 0, 1, 2
}

export function RealmGate({ realmIndex }: RealmGateProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displaySubtitle, setDisplaySubtitle] = useState("");
  const [progress, setProgress] = useState(0);

  const realm = REALMS[realmIndex];
  if (!realm) return null;

  const actLabel = `ACT ${["I", "II", "III"][realmIndex]}`;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set realm accent color when gate becomes visible
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        // Text scramble effect based on scroll progress
        const title = realm.name;
        const subtitle = realm.subtitle;

        if (p < 0.3) {
          setDisplayTitle("");
          setDisplaySubtitle("");
        } else if (p < 0.7) {
          const textProgress = (p - 0.3) / 0.4;
          let t = "";
          for (let i = 0; i < title.length; i++) {
            if (title[i] === " ") {
              t += " ";
            } else if (i < title.length * textProgress) {
              t += title[i];
            } else {
              t += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
          setDisplayTitle(t);

          let s = "";
          const subProgress = Math.max(0, textProgress - 0.3) / 0.7;
          for (let i = 0; i < subtitle.length; i++) {
            if (subtitle[i] === " ") {
              s += " ";
            } else if (i < subtitle.length * subProgress) {
              s += subtitle[i];
            } else {
              s += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
          setDisplaySubtitle(s);
        } else {
          setDisplayTitle(realm.name);
          setDisplaySubtitle(realm.subtitle);
        }

        // Update realm accent CSS variable
        if (p > 0.5) {
          document.documentElement.style.setProperty(
            "--realm-accent",
            realm.accent
          );
          document.documentElement.style.setProperty(
            "--realm-accent-dim",
            realm.accentDim
          );
          document.documentElement.style.setProperty(
            "--realm-accent-glow",
            realm.accentGlow
          );
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [realm]);

  // Gate visual progress
  const gateOpacity = Math.min(1, progress * 3);
  const gateScale = 0.95 + progress * 0.05;
  const lineWidth = Math.min(100, progress * 150);
  const textOpacity = progress > 0.25 ? Math.min(1, (progress - 0.25) * 4) : 0;
  const clipProgress = Math.max(0, (progress - 0.7) / 0.3);
  const clipRadius = clipProgress * 150;

  return (
    <div
      ref={sectionRef}
      className="realm-gate relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      style={{ opacity: gateOpacity }}
    >
      {/* Gate frame border */}
      <div
        className="absolute inset-8 rounded-2xl border border-white/[0.06] sm:inset-16 md:inset-24"
        style={{
          transform: `scale(${gateScale})`,
          borderColor: `rgba(${hexToRgb(realm.accent)}, ${progress * 0.3})`,
          boxShadow:
            progress > 0.4
              ? `0 0 ${40 * progress}px ${realm.accentDim}, inset 0 0 ${20 * progress}px ${realm.accentDim}`
              : "none",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 text-center" style={{ opacity: textOpacity }}>
        {/* Act number */}
        <div
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: realm.accent }}
        >
          {actLabel}
        </div>

        {/* Decorative line */}
        <div className="mx-auto mb-6 h-px" style={{ width: `${lineWidth}%`, background: `linear-gradient(90deg, transparent, ${realm.accent}, transparent)` }} />

        {/* Title */}
        <h2 className="mb-2 font-sans text-3xl font-bold text-text-primary md:text-5xl">
          {displayTitle || "\u00A0"}
        </h2>

        {/* Subtitle */}
        <p
          className="font-mono text-sm tracking-wider"
          style={{ color: realm.accent }}
        >
          {displaySubtitle || "\u00A0"}
        </p>

        {/* Decorative line */}
        <div className="mx-auto mt-6 h-px" style={{ width: `${lineWidth}%`, background: `linear-gradient(90deg, transparent, ${realm.accent}, transparent)` }} />
      </div>

      {/* Gate open clip overlay */}
      {clipProgress > 0 && (
        <div
          className="pointer-events-none absolute inset-0 bg-bg"
          style={{
            clipPath: `circle(${clipRadius}% at 50% 50%)`,
            opacity: 1 - clipProgress,
          }}
        />
      )}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 212, 255";
}
