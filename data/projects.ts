export interface SideProject {
  id: string;
  title: string;
  emoji: string;
  url: string;
  description: string;
  tech: string[];
}

export const SIDE_PROJECTS: SideProject[] = [
  {
    id: "fat-fingers",
    title: "Fat Fingers",
    emoji: "\uD83C\uDFB9",
    url: "https://fat-fingers.vercel.app",
    description:
      "A browser-based keyboard synthesizer with multiple sound packs. Press keys to make music — built for fun and instant gratification.",
    tech: ["React", "Web Audio API", "Vercel"],
  },
  {
    id: "saigox-portfolio",
    title: "This Portfolio",
    emoji: "\uD83C\uDFAE",
    url: "https://saigox.vercel.app",
    description:
      "The site you're looking at right now — a gaming-themed portfolio with scroll-driven animations, glassmorphism, and realm transitions.",
    tech: ["Next.js 16", "GSAP", "Tailwind CSS v4", "React 19"],
  },
];
