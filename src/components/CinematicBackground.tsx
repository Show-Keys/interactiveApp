import { motion } from 'motion/react';
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';

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

  const stars = useMemo<Star[]>(() => {
    // Kiosk / MagicMirror: keep the DOM and animations very small.
    const count = liteMode ? 45 : 300;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (liteMode ? 2 : 3) + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, [liteMode]);

  const particles = useMemo<Particle[]>(() => {
    const count = liteMode ? 16 : 50;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (liteMode ? 3 : 4) + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      driftX: Math.random() * 50 - 25,
    }));
  }, [liteMode]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0520] to-[#0f0a2e]" />

      {!liteMode && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #8b5cf6, #6366f1, transparent)',
              top: '10%',
              left: '15%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #3b82f6, #06b6d4, transparent)',
              top: '20%',
              right: '10%',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <motion.div
            className="absolute w-[900px] h-[900px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, #f59e0b, #d97706, transparent)',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
      )}

      {stars.map((star) => (
        <div
          key={star.id}
          className={liteMode ? 'absolute rounded-full bg-white' : 'absolute rounded-full bg-white twinkle'}
          style={
            liteMode
              ? ({
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity * 0.7,
                } as CSSProperties)
              : ({
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
          }
        />
      ))}

      {!liteMode &&
        particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="absolute rounded-full cosmic-drift"
            style={
              {
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.6), rgba(147,197,253,0.3))',
                filter: 'blur(1px)',
                '--drift-duration': `${particle.duration}s`,
                '--drift-delay': `${particle.delay}s`,
                '--drift-x': `${particle.driftX}px`,
                '--drift-y': '-100px',
              } as CSSProperties
            }
          />
        ))}

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}
