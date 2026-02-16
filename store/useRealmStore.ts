import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RealmVisitor } from "@/lib/types";

interface RealmState {
  visitor: RealmVisitor;
  // Preloader
  setPreloaderSeen: () => void;
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
        hasSeenPreloader: false,
        discoveredEasterEggs: [],
        soundEnabled: false,
        visitCount: 0,
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
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as Record<string, unknown>;
        return {
          visitor: {
            hasSeenPreloader: (state?.visitor as Record<string, unknown>)?.hasSeenPreloader ?? false,
            discoveredEasterEggs: (state?.visitor as Record<string, unknown>)?.discoveredEasterEggs ?? [],
            soundEnabled: (state?.visitor as Record<string, unknown>)?.soundEnabled ?? false,
            visitCount: (state?.visitor as Record<string, unknown>)?.visitCount ?? 0,
          },
        };
      },
    }
  )
);
