"use client";

import { ArrowUp, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Goutham Vaddi
          </span>
          <span className="text-border">·</span>
          <span className="font-mono text-[10px] text-text-muted/50">
            Built with Next.js, GSAP & Tailwind
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/saigouthamvaddi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:saigoutham.vaddi@gmail.com"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 flex items-center gap-1 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted transition-all hover:border-accent hover:text-accent"
          >
            <ArrowUp size={12} />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
