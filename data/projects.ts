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
    id: "saigox-v1",
    title: "Portfolio v1",
    emoji: "\uD83C\uDF10",
    url: "https://saigox.vercel.app",
    description:
      "The first version of my portfolio — a cleaner, minimal take that laid the groundwork for this RPG-themed evolution.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
  },
];
