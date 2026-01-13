import { motion } from 'motion/react';

interface AsteroidProps {
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function Asteroid({ size, x, y, duration, delay }: AsteroidProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        x: [0, -200, -400],
        y: [0, 50, -20],
        rotate: [0, 360, 720],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'linear',
        delay: delay,
      }}
    >
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Irregular asteroid shape */}
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path
            d="M 50,10 L 70,25 L 85,45 L 80,70 L 60,85 L 35,90 L 15,75 L 10,50 L 20,30 Z"
            fill="#6b7280"
            stroke="#4b5563"
            strokeWidth="2"
          />
          <path
            d="M 30,25 L 40,20 L 50,30 L 45,40 Z"
            fill="#4b5563"
          />
          <path
            d="M 60,50 L 70,55 L 65,65 L 55,60 Z"
            fill="#4b5563"
          />
          <ellipse
            cx="35"
            cy="60"
            rx="8"
            ry="6"
            fill="#374151"
          />
        </svg>
        
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-20"
          style={{
            background: 'radial-gradient(circle, #9ca3af 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
