import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';

interface Department {
  nameAr: string;
  nameEn: string;
  color: string;
}

interface FloatingNavigationProps {
  departments: Department[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  placement?: 'top-right' | 'below-anchor';
}

export default function FloatingNavigation({
  departments,
  selectedIndex,
  onSelect,
  placement = 'top-right',
}: FloatingNavigationProps) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;

  const wrapperClassName =
    placement === 'below-anchor'
      ? 'absolute left-1/2 top-full -translate-x-1/2 mt-4 z-40 max-h-[90vh] overflow-hidden'
      : 'fixed top-16 right-16 z-40 max-h-[90vh] overflow-hidden';

  const motionProps =
    placement === 'below-anchor'
      ? {
          initial: { y: -10, opacity: 0, scale: 0.985 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: -10, opacity: 0, scale: 0.985 },
          transition: { duration: 0.35, type: 'spring' as const, damping: 26 },
        }
      : {
          initial: { x: 150, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 150, opacity: 0 },
          transition: { duration: 0.6, type: 'spring' as const, damping: 25 },
        };

  return (
    <motion.div
      className={wrapperClassName}
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={motionProps.transition}
    >
      {/* Elegant glass panel container */}
      <div className="relative">
        {/* Outer glow effect */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background:
              'radial-gradient(circle at top right, rgba(251, 191, 36, 0.2), rgba(139, 92, 246, 0.15), transparent)',
            filter: liteMode ? 'none' : 'blur(50px)',
            transform: 'scale(1.15)',
          }}
        />

        {/* Main navigation panel */}
        <div
          className={
            liteMode
              ? 'relative px-8 py-7 rounded-[32px] overflow-hidden'
              : 'relative px-8 py-7 rounded-[32px] backdrop-blur-2xl overflow-hidden'
          }
          style={{
            background:
              'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow:
              liteMode
                ? '0 18px 50px rgba(0, 0, 0, 0.6)'
                : '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.4)',
            width: '420px',
            maxHeight: '90vh',
          }}
        >
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Header */}
          <div className="mb-7 pb-5 border-b-2 border-white/15">
            <div
              className="text-white text-center mb-3"
              style={{
                direction: 'rtl',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 400,
                fontSize: '22px',
                letterSpacing: '0.8px',
                lineHeight: '1.4',
              }}
            >
              وزارة النقل والاتصالات وتقنية المعلومات
            </div>
            <div
              className="text-white text-center"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                letterSpacing: '1.5px',
              }}
            >
              MINISTRY NAVIGATION
            </div>
          </div>

          {/* Navigation items */}
          <div
            className="space-y-3 overflow-y-auto pr-3"
            style={{
              maxHeight: 'calc(90vh - 160px)',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(251, 191, 36, 0.4) rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Minister's Office */}
            <motion.button
              className="w-full px-7 py-5 rounded-2xl transition-all relative overflow-hidden active:scale-95"
              style={{
                background:
                  selectedIndex === -1
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.2))'
                    : 'rgba(255, 255, 255, 0.05)',
                border:
                  selectedIndex === -1
                    ? '2px solid rgba(251, 191, 36, 0.6)'
                    : '2px solid rgba(255, 255, 255, 0.12)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                direction: 'rtl',
                boxShadow:
                  selectedIndex === -1
                    ? '0 8px 30px rgba(251, 191, 36, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.15)'
                    : '0 4px 12px rgba(0, 0, 0, 0.3)',
                minHeight: '80px',
                touchAction: 'manipulation',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(-1)}
            >
              {selectedIndex === -1 && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.25), transparent)',
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              <div className="relative flex items-center justify-between">
                <div className="text-right flex-1">
                  <div className="text-white text-lg mb-2" style={{ fontWeight: 500 }}>
                    مكتب الوزير
                  </div>
                  <div className="text-white" style={{ fontWeight: 300, fontSize: '15px' }}>
                    Minister&apos;s Office
                  </div>
                </div>
                <div className="text-amber-400 text-3xl ml-4">★</div>
              </div>
            </motion.button>

            <div className="flex items-center gap-4 py-3">
              <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="text-white text-sm" style={{ fontWeight: 300, letterSpacing: '2px' }}>
                الدوائر
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-white/25 to-transparent" />
            </div>

            {departments.map((dept, index) => (
              <motion.button
                key={index}
                className="w-full px-6 py-5 rounded-2xl transition-all relative overflow-hidden text-right active:scale-95"
                style={{
                  background:
                    selectedIndex === index
                      ? `linear-gradient(135deg, ${dept.color}50, ${dept.color}30)`
                      : 'rgba(255, 255, 255, 0.04)',
                  border: selectedIndex === index ? `2px solid ${dept.color}` : '2px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  direction: 'rtl',
                  boxShadow:
                    selectedIndex === index
                      ? `0 6px 24px ${dept.color}40, inset 0 2px 0 rgba(255, 255, 255, 0.12)`
                      : '0 3px 10px rgba(0, 0, 0, 0.2)',
                  minHeight: '76px',
                  touchAction: 'manipulation',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(index)}
              >
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-2 rounded-l-full"
                  style={{
                    background: `linear-gradient(180deg, ${dept.color}, ${dept.color}90)`,
                    boxShadow: `0 0 15px ${dept.color}80`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: selectedIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                />

                {selectedIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at right, ${dept.color}40, transparent)`,
                    }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                <div className="relative flex items-center justify-between">
                  <div className="text-right flex-1 pr-4">
                    <div className="text-white mb-1.5" style={{ fontWeight: 400, fontSize: '17px' }}>
                      {dept.nameAr}
                    </div>
                    <div className="text-white" style={{ fontWeight: 300, fontSize: '13px' }}>
                      {dept.nameEn}
                    </div>
                  </div>

                  <motion.div
                    className="w-4 h-4 rounded-full ml-3 flex-shrink-0"
                    style={{
                      background: dept.color,
                      boxShadow: `0 0 12px ${dept.color}`,
                    }}
                    animate={{
                      scale: selectedIndex === index ? [1, 1.2, 1] : 1,
                      opacity: selectedIndex === index ? 1 : 0.6,
                    }}
                    transition={{
                      duration: 2,
                      repeat: selectedIndex === index ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
