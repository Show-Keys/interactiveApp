import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';
import { useRenderQuality } from './ui/use-render-quality';

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
};

export default function CinematicBackground() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;
  const renderQuality = useRenderQuality();

  // Ambient background motion/blur is expensive; keep it only for high-quality desktop.
  const ambientFx = !liteMode && renderQuality >= 0.85;

  const stars = useMemo<Star[]>(() => {
    const baseCount = liteMode ? 45 : 300;
    const count = Math.max(12, Math.round(baseCount * renderQuality));

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (liteMode ? 2 : 3) + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, [liteMode, renderQuality]);

  const particles = useMemo<Particle[]>(() => {
    if (!ambientFx) return [];

    const baseCount = 50;
    const count = Math.max(0, Math.round(baseCount * renderQuality));

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      driftX: Math.random() * 50 - 25,
    }));
  }, [ambientFx, renderQuality]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0520] to-[#0f0a2e]" />

      {ambientFx && (
        <div className="absolute inset-0">
          <div
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #8b5cf6, #6366f1, transparent)',
              top: '10%',
              left: '15%',
            }}
          />

          <div
            className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #3b82f6, #06b6d4, transparent)',
              top: '20%',
              right: '10%',
            }}
          />

          <div
            className="absolute w-[900px] h-[900px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, #f59e0b, #d97706, transparent)',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )}

      {stars.map((star) => (
        <div
          key={star.id}
          className={
            ambientFx
              ? 'absolute rounded-full bg-white twinkle'
              : 'absolute rounded-full bg-white'
          }
          style={
            ambientFx
              ? ({
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  '--twinkle-duration': `${star.duration}s`,
                  '--twinkle-delay': `${star.delay}s`,
                  '--twinkle-min': String(star.opacity * 0.3),
                  '--twinkle-max': String(star.opacity),
                  '--twinkle-scale': '1.05',
                } as CSSProperties)
              : ({
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity * 0.7,
                } as CSSProperties)
          }
        />
      ))}

      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="absolute rounded-full cosmic-drift"
          style={
            {
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'rgba(255,255,255,0.22)',
              '--drift-duration': `${particle.duration}s`,
              '--drift-delay': `${particle.delay}s`,
              '--drift-x': `${particle.driftX}px`,
              '--drift-y': `${-80 - Math.random() * 120}px`,
              '--drift-min-opacity': '0.12',
              '--drift-max-opacity': '0.28',
            } as CSSProperties
          }
        />
      ))}

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}
