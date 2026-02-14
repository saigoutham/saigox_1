"use client";

import { useState, useCallback } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Preloader } from "@/components/Preloader";
import { ParticleCanvas } from "@/components/effects/ParticleCanvas";
import { Hero } from "@/components/sections/Hero";
import { RealmGate } from "@/components/effects/RealmGate";
import { ActOneFoundation } from "@/components/sections/ActOneFoundation";
import { ActTwoStrategist } from "@/components/sections/ActTwoStrategist";
import { ActThreeVisionary } from "@/components/sections/ActThreeVisionary";
import { CharacterStats } from "@/components/sections/CharacterStats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useRealmStore } from "@/store/useRealmStore";
import { useEasterEggs } from "@/hooks/useEasterEggs";

export default function HomePage() {
  const hasSeenPreloader = useRealmStore((s) => s.visitor.hasSeenPreloader);
  const setPreloaderSeen = useRealmStore((s) => s.setPreloaderSeen);
  const [showPreloader, setShowPreloader] = useState(!hasSeenPreloader);

  // Activate easter egg listeners (Konami code, etc.)
  useEasterEggs();

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setPreloaderSeen();
  }, [setPreloaderSeen]);

  return (
    <SmoothScrollProvider>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <ParticleCanvas />
      <Navigation />
      <main id="main-content">
        <Hero />

        {/* ═══ Realm Gate I ═══ */}
        <RealmGate realmIndex={0} />

        {/* ═══ Act I: The Foundation ═══ */}
        <ActOneFoundation />

        {/* ═══ Realm Gate II ═══ */}
        <RealmGate realmIndex={1} />

        {/* ═══ Act II: The Strategist ═══ */}
        <ActTwoStrategist />

        {/* ═══ Realm Gate III ═══ */}
        <RealmGate realmIndex={2} />

        {/* ═══ Act III: The Visionary ═══ */}
        <ActThreeVisionary />

        {/* ═══ Character Stats ═══ */}
        <div className="section-divider" />
        <CharacterStats />

        {/* ═══ Contact ═══ */}
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
