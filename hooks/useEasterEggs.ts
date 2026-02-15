"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRealmStore } from "@/store/useRealmStore";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Easter egg detection hook.
 * - Konami code → "dev-stats" easter egg + brief flash of stats panel
 * - Logo 5-click → "secret-message" easter egg
 */
export function useEasterEggs() {
  const discoverEasterEgg = useRealmStore((s) => s.discoverEasterEgg);
  const discoveredEggs = useRealmStore((s) => s.visitor.discoveredEasterEggs);
  const konamiIndex = useRef(0);
  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Konami code listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;

        if (konamiIndex.current === KONAMI_CODE.length) {
          konamiIndex.current = 0;

          if (!discoveredEggs.includes("konami-code")) {
            discoverEasterEgg("konami-code");

            // Flash a brief dev-stats overlay
            const overlay = document.createElement("div");
            overlay.className = "konami-flash";

            const backdrop = document.createElement("div");
            Object.assign(backdrop.style, {
              position: "fixed", inset: "0", zIndex: "9999",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,0.85)",
              animation: "fadeIn 0.3s ease-out",
            });

            const content = document.createElement("div");
            Object.assign(content.style, {
              textAlign: "center",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "#10b981",
            });

            const arrow = document.createElement("p");
            arrow.textContent = "\u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA";
            Object.assign(arrow.style, {
              fontSize: "0.75rem", letterSpacing: "0.2em",
              textTransform: "uppercase", marginBottom: "0.5rem", opacity: "0.7",
            });

            const title = document.createElement("p");
            title.textContent = "DEV MODE UNLOCKED";
            Object.assign(title.style, {
              fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem",
            });

            const desc = document.createElement("p");
            desc.textContent = "Easter egg discovered! You found the Konami code.";
            Object.assign(desc.style, { fontSize: "0.7rem", opacity: "0.5" });

            content.append(arrow, title, desc);
            backdrop.appendChild(content);
            overlay.appendChild(backdrop);
            document.body.appendChild(overlay);
            setTimeout(() => overlay.remove(), 2500);
          }
        }
      } else {
        konamiIndex.current = e.key === KONAMI_CODE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [discoverEasterEgg, discoveredEggs]);

  // Logo multi-click handler
  const handleLogoClick = useCallback(() => {
    logoClicks.current++;
    clearTimeout(logoTimer.current);

    if (logoClicks.current >= 5) {
      logoClicks.current = 0;

      if (!discoveredEggs.includes("secret-message")) {
        discoverEasterEgg("secret-message");

        const msg = document.createElement("div");
        msg.style.cssText = `
          position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
          z-index: 9999; padding: 0.75rem 1.5rem;
          background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 0.75rem; backdrop-filter: blur(12px);
          font-family: var(--font-jetbrains), monospace; font-size: 0.7rem;
          color: #a855f7; letter-spacing: 0.1em; text-transform: uppercase;
          animation: fadeIn 0.3s ease-out;
        `;
        msg.textContent = "🎮 You found a secret! The realm acknowledges you.";
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
      }
    }

    logoTimer.current = setTimeout(() => {
      logoClicks.current = 0;
    }, 1500);
  }, [discoverEasterEgg, discoveredEggs]);

  return { handleLogoClick };
}
