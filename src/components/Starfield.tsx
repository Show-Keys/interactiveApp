import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  minOpacity: number;
  maxOpacity: number;
  scale: number;
}

export default function Starfield() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;

  const stars = useMemo<Star[]>(() => {
    const count = liteMode ? 60 : 200;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (liteMode ? 2 : 3) + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      minOpacity: liteMode ? 0.25 : 0.2,
      maxOpacity: liteMode ? 0.8 : 1,
      scale: liteMode ? 1 : 1.2,
    }));
  }, [liteMode]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white twinkle"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--twinkle-duration': `${star.duration}s`,
              '--twinkle-delay': `${star.delay}s`,
              '--twinkle-min': String(star.minOpacity),
              '--twinkle-max': String(star.maxOpacity),
              '--twinkle-scale': String(star.scale),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
