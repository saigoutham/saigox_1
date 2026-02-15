"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Skip on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const PARTICLE_COUNT = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas.width, canvas.height, true));
    }
    particlesRef.current = particles;

    function createParticle(w: number, h: number, randomY = false): Particle {
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : h + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.2),
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      };
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Read realm accent from CSS var
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--realm-accent")
          .trim() || "#00d4ff";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in and out
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();

        // Reset particle when dead or off screen
        if (
          p.life >= p.maxLife ||
          p.y < -10 ||
          p.x < -10 ||
          p.x > canvas.width + 10
        ) {
          particles[i] = createParticle(canvas.width, canvas.height);
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
