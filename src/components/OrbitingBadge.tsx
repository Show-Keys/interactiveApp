import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';

interface OrbitingBadgeProps {
  label: string;
  angle: number;
  orbitRadius: number;
  color: string;
  size?: number;
  duration?: number;
}

export default function OrbitingBadge({
  label,
  angle,
  orbitRadius,
  color,
  size = 28,
  duration = 20,
}: OrbitingBadgeProps) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;

  void duration;

  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: `${orbitRadius * 2}px`,
        height: `${orbitRadius * 2}px`,
        marginLeft: `-${orbitRadius}px`,
        marginTop: `-${orbitRadius}px`,
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${color}dd, ${color}99)`,
          boxShadow: liteMode
            ? `0 0 8px ${color}99, inset 0 0 6px rgba(255,255,255,0.18)`
            : `0 0 15px ${color}cc, 0 0 30px ${color}66, inset 0 0 10px rgba(255,255,255,0.3)`,
          border: `1px solid ${color}`,
          left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
          top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}35, transparent)`,
          }}
        />

        <div
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: liteMode ? 'none' : 'blur(4px)',
            border: `1px solid ${color}60`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            direction: 'rtl',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
