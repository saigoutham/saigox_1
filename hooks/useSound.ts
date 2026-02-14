"use client";

import { useCallback, useRef, useEffect } from "react";
import { Howl } from "howler";
import { useRealmStore } from "@/store/useRealmStore";

type SoundName = "hover" | "click" | "unlock" | "reveal" | "transition";

const SOUND_PATHS: Record<SoundName, string> = {
  hover: "/sounds/ui/hover.mp3",
  click: "/sounds/ui/click.mp3",
  unlock: "/sounds/achievements/unlock.mp3",
  reveal: "/sounds/ui/reveal.mp3",
  transition: "/sounds/ambient/transition.mp3",
};

export function useSound() {
  const soundEnabled = useRealmStore((s) => s.visitor.soundEnabled);
  const toggleSound = useRealmStore((s) => s.toggleSound);
  const soundsRef = useRef<Map<string, Howl>>(new Map());
  const loadAttemptedRef = useRef<Set<string>>(new Set());

  // Lazy-load sounds on first play attempt
  const getSound = useCallback((name: SoundName): Howl | null => {
    if (soundsRef.current.has(name)) {
      return soundsRef.current.get(name) || null;
    }

    // Only attempt to load each sound once
    if (loadAttemptedRef.current.has(name)) return null;
    loadAttemptedRef.current.add(name);

    try {
      const howl = new Howl({
        src: [SOUND_PATHS[name]],
        volume: 0.3,
        preload: true,
        onloaderror: () => {
          // Sound file doesn't exist — silently ignore
          soundsRef.current.delete(name);
        },
      });
      soundsRef.current.set(name, howl);
      return howl;
    } catch {
      return null;
    }
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!soundEnabled) return;
      const sound = getSound(name);
      if (sound) {
        try {
          sound.play();
        } catch {
          // Silently ignore playback errors
        }
      }
    },
    [soundEnabled, getSound]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundsRef.current.forEach((howl) => howl.unload());
      soundsRef.current.clear();
    };
  }, []);

  return {
    play,
    toggle: toggleSound,
    isEnabled: soundEnabled,
  };
}
