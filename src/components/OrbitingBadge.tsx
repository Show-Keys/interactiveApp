import { motion } from 'motion/react';
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

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: `${orbitRadius * 2}px`,
        height: `${orbitRadius * 2}px`,
        marginLeft: `-${orbitRadius}px`,
        marginTop: `-${orbitRadius}px`,
      }}
      animate={liteMode ? undefined : { rotate: 360 }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${color}dd, ${color}99)`,
          boxShadow: `0 0 15px ${color}cc, 0 0 30px ${color}66, inset 0 0 10px rgba(255,255,255,0.3)`,
          border: `1px solid ${color}`,
          left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
          top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={liteMode ? undefined : { rotate: -360 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Badge glow pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}60, transparent)`,
          }}
          animate={
            liteMode
              ? undefined
              : {
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Label tooltip */}
        <div
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${color}60`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            direction: 'rtl',
          }}
        >
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}
