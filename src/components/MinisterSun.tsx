import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';

interface MinisterSunProps {
  onClick?: () => void;
  isZoomed?: boolean;
}

export default function MinisterSun({ onClick, isZoomed }: MinisterSunProps) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      whileHover={{ scale: isZoomed ? 1 : 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={isZoomed ? { scale: 1.5 } : { scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      {/* Radial golden rays */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute left-1/2 top-1/2 origin-left"
          style={{
            width: '400px',
            height: '2px',
            background: 'linear-gradient(to right, rgba(251, 191, 36, 0.6), rgba(251, 191, 36, 0.1), transparent)',
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
          }}
          animate={
            liteMode
              ? undefined
              : {
                  opacity: [0.4, 0.8, 0.4],
                  scaleX: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Outer glow rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05), transparent)',
        }}
        animate={
          liteMode
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.1), transparent)',
        }}
        animate={
          liteMode
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.9, 0.6],
              }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />
      
      {/* Main sun body */}
      <motion.div
        className="relative w-[220px] h-[220px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fef3c7, #fbbf24, #f59e0b, #d97706)',
          boxShadow: '0 0 80px rgba(251, 191, 36, 0.8), 0 0 150px rgba(251, 191, 36, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.3)',
        }}
        animate={
          liteMode
            ? undefined
            : {
                boxShadow: [
                  '0 0 80px rgba(251, 191, 36, 0.8), 0 0 150px rgba(251, 191, 36, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.3)',
                  '0 0 100px rgba(251, 191, 36, 0.9), 0 0 180px rgba(251, 191, 36, 0.6), inset 0 0 60px rgba(255, 255, 255, 0.3)',
                  '0 0 80px rgba(251, 191, 36, 0.8), 0 0 150px rgba(251, 191, 36, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.3)',
                ],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Surface texture */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-[15%] left-[20%] w-[40%] h-[40%] rounded-full bg-white/30 blur-xl" />
          <div className="absolute top-[40%] right-[25%] w-[25%] h-[25%] rounded-full bg-white/20 blur-lg" />
          <div className="absolute bottom-[30%] left-[30%] w-[30%] h-[30%] rounded-full bg-orange-400/20 blur-lg" />
        </div>
        
        {/* Rotating corona ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border-2"
          style={{
            borderColor: 'rgba(251, 191, 36, 0.4)',
          }}
          animate={liteMode ? undefined : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Secondary rotating ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border"
          style={{
            borderColor: 'rgba(251, 191, 36, 0.2)',
          }}
          animate={liteMode ? undefined : { rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      
      {/* Arabic & English labels */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <motion.div
          style={{
            direction: 'rtl',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
          animate={
            liteMode
              ? undefined
              : {
                  textShadow: [
                    '0 0 30px rgba(251, 191, 36, 0.9), 0 0 60px rgba(251, 191, 36, 0.5)',
                    '0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.6)',
                    '0 0 30px rgba(251, 191, 36, 0.9), 0 0 60px rgba(251, 191, 36, 0.5)',
                  ],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-white text-2xl tracking-wide" style={{ fontWeight: 300, lineHeight: '1.4' }}>
            مكتب
            <br />
            الوزير
          </div>
          <div className="text-amber-100 text-xs mt-2 tracking-widest" style={{ fontWeight: 200 }}>
            MINISTER&apos;S OFFICE
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
