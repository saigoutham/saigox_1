"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import { Menu, X, Volume2, VolumeX, Download } from "lucide-react";
import { useRealmStore } from "@/store/useRealmStore";
import { REALMS } from "@/data/realms";

const NAV_ACTS = [
  { label: "I · Strategist", href: "#act-1", realmIndex: 0 },
  { label: "II · Visionary", href: "#act-2", realmIndex: 1 },
  { label: "III · Foundation", href: "#act-3", realmIndex: 2 },
  { label: "Contact", href: "#contact", realmIndex: -1 },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstNavRef = useRef<HTMLButtonElement>(null);

  const soundEnabled = useRealmStore((s) => s.visitor.soundEnabled);
  const toggleSound = useRealmStore((s) => s.toggleSound);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = ["act-1", "act-2", "act-3", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }, []);

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileOpen && firstNavRef.current) {
      firstNavRef.current.focus();
    }
  }, [mobileOpen]);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
    burgerRef.current?.focus();
  }, []);

  // Get realm accent for active section
  const getActiveAccent = () => {
    const active = NAV_ACTS.find((item) => item.href === activeSection);
    if (active && active.realmIndex >= 0) {
      return REALMS[active.realmIndex]?.accent || "#FF6B6B";
    }
    return "#FF6B6B";
  };

  const accent = getActiveAccent();

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-border/50 py-3"
            : "bg-transparent py-5"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-sm font-medium tracking-wider text-text-primary transition-colors hover:text-accent"
            style={{
              textShadow: scrolled ? `0 0 20px ${accent}44` : "none",
            }}
          >
            GV
            <span
              className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_ACTS.map((item) => {
              const isActive = activeSection === item.href;
              const itemAccent =
                item.realmIndex >= 0
                  ? REALMS[item.realmIndex]?.accent || "#FF6B6B"
                  : "#FF6B6B";

              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    "nav-item-glow relative font-mono text-[11px] uppercase tracking-widest transition-colors",
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  )}
                  style={isActive ? { color: itemAccent } : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        backgroundColor: itemAccent,
                        boxShadow: `0 0 8px ${itemAccent}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop right side — sound + divider + CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleSound}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-muted transition-colors hover:text-text-secondary"
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <div className="h-4 w-px bg-border/50" />

            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full border border-accent bg-accent/10 px-5 py-2 font-mono text-[10px] uppercase tracking-wider text-accent transition-all hover:bg-accent/20"
            >
              Let&apos;s Connect
            </button>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-text-secondary transition-all hover:border-text-muted hover:text-text-primary"
            >
              <Download size={12} />
              Resume
            </a>
          </div>

          {/* Mobile burger */}
          <button
            ref={burgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-primary md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/30">
            <div
              className="scroll-progress h-full"
              style={{
                transform: `scaleX(${scrollProgress})`,
                backgroundColor: accent,
              }}
            />
          </div>
        )}
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-xl md:hidden">
          {NAV_ACTS.map((item, i) => {
            const isActive = activeSection === item.href;
            const itemAccent =
              item.realmIndex >= 0
                ? REALMS[item.realmIndex]?.accent || "#FF6B6B"
                : "#FF6B6B";

            return (
              <button
                key={item.href}
                ref={i === 0 ? firstNavRef : undefined}
                onClick={() => {
                  scrollTo(item.href);
                  handleMobileClose();
                }}
                className={cn(
                  "min-h-[44px] font-sans text-2xl font-medium transition-colors",
                  isActive ? "text-text-primary" : "text-text-secondary"
                )}
                style={isActive ? { color: itemAccent } : undefined}
              >
                {item.label}
              </button>
            );
          })}

          {/* Mobile CTAs */}
          <div className="mt-4 flex w-full max-w-xs flex-col gap-3 px-6">
            <button
              onClick={() => {
                scrollTo("#contact");
                handleMobileClose();
              }}
              className="w-full rounded-full border border-accent bg-accent/10 py-3 font-mono text-sm uppercase tracking-wider text-accent transition-all hover:bg-accent/20"
            >
              Let&apos;s Connect
            </button>

            <a
              href="/resume.pdf"
              download
              onClick={() => handleMobileClose()}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 font-mono text-sm uppercase tracking-wider text-text-secondary transition-all hover:border-text-muted hover:text-text-primary"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>

          <button
            onClick={toggleSound}
            className="mt-2 flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundEnabled ? "Sound On" : "Sound Off"}
          </button>
        </div>
      )}
    </>
  );
}
