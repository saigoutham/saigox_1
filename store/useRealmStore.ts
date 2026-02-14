import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RealmVisitor } from "@/lib/types";

interface RealmState {
  visitor: RealmVisitor;
  // Photo actions
  markPhotoDeveloped: (id: string) => boolean;
  isDeveloped: (id: string) => boolean;
  // Preloader
  setPreloaderSeen: () => void;
  // Realm progression
  discoverRelic: (id: string) => void;
  isRelicDiscovered: (id: string) => boolean;
  revealSkill: (id: string) => void;
  isSkillRevealed: (id: string) => boolean;
  // Easter eggs
  discoverEasterEgg: (id: string) => void;
  hasEasterEgg: (id: string) => boolean;
  // Sound
  toggleSound: () => void;
}

export const useRealmStore = create<RealmState>()(
  persist(
    (set, get) => ({
      visitor: {
        developedPhotos: [],
        hasSeenPreloader: false,
        relicsDiscovered: [],
        skillsRevealed: [],
        discoveredEasterEggs: [],
        soundEnabled: false,
        visitCount: 0,
      },

      markPhotoDeveloped: (id: string) => {
        const { visitor } = get();
        if (visitor.developedPhotos.includes(id)) return false;
        set({
          visitor: {
            ...visitor,
            developedPhotos: [...visitor.developedPhotos, id],
          },
        });
        return true;
      },

      isDeveloped: (id: string) => {
        return get().visitor.developedPhotos.includes(id);
      },

      setPreloaderSeen: () => {
        const { visitor } = get();
        set({
          visitor: {
            ...visitor,
            hasSeenPreloader: true,
            visitCount: visitor.visitCount + 1,
          },
        });
      },

      discoverRelic: (id: string) => {
        const { visitor } = get();
        if (visitor.relicsDiscovered.includes(id)) return;
        set({
          visitor: {
            ...visitor,
            relicsDiscovered: [...visitor.relicsDiscovered, id],
          },
        });
      },

      isRelicDiscovered: (id: string) => {
        return get().visitor.relicsDiscovered.includes(id);
      },

      revealSkill: (id: string) => {
        const { visitor } = get();
        if (visitor.skillsRevealed.includes(id)) return;
        set({
          visitor: {
            ...visitor,
            skillsRevealed: [...visitor.skillsRevealed, id],
          },
        });
      },

      isSkillRevealed: (id: string) => {
        return get().visitor.skillsRevealed.includes(id);
      },

      discoverEasterEgg: (id: string) => {
        const { visitor } = get();
        if (visitor.discoveredEasterEggs.includes(id)) return;
        set({
          visitor: {
            ...visitor,
            discoveredEasterEggs: [...visitor.discoveredEasterEggs, id],
          },
        });
      },

      hasEasterEgg: (id: string) => {
        return get().visitor.discoveredEasterEggs.includes(id);
      },

      toggleSound: () => {
        const { visitor } = get();
        set({
          visitor: {
            ...visitor,
            soundEnabled: !visitor.soundEnabled,
          },
        });
      },
    }),
    {
      name: "realm-of-goutham",
    }
  )
);
