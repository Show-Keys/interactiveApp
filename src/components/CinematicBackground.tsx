import { motion } from 'motion/react';
import { useMemo } from 'react';

export default function CinematicBackground() {
  // Generate stars with varying sizes and brightness
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 300; i++) {
      starArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    return starArray;
  }, []);

  // Generate floating particles
  const particles = useMemo(() => {
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    return particleArray;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0520] to-[#0f0a2e]" />
      
      {/* Nebula clouds */}
      <div className="absolute inset-0">
        {/* Purple nebula - top left */}
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
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Blue nebula - top right */}
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
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Amber nebula - bottom */}
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
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
      
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Floating particles (cosmic dust) */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.6), rgba(147,197,253,0.3))',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}
