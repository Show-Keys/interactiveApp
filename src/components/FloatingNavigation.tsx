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
  const minimalist = true;

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
        {/* Outer glow effect (removed for minimalist UI) */}

        {/* Main navigation panel */}
        <div
          className={
            minimalist
              ? 'relative px-7 py-6 rounded-2xl overflow-hidden'
              : liteMode
                ? 'relative px-8 py-7 rounded-[32px] overflow-hidden'
                : 'relative px-8 py-7 rounded-[32px] backdrop-blur-2xl overflow-hidden'
          }
          style={{
            background: minimalist
              ? 'rgba(15, 23, 42, 0.9)'
              : 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
            border: minimalist ? '1px solid rgba(255, 255, 255, 0.14)' : '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: minimalist
              ? '0 16px 50px rgba(0, 0, 0, 0.55)'
              : liteMode
                ? '0 18px 50px rgba(0, 0, 0, 0.6)'
                : '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.4)',
            width: minimalist ? '400px' : '420px',
            maxHeight: '90vh',
          }}
        >
          {/* Minimal top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

          {/* Header */}
          <div className="mb-6 pb-4 border-b border-white/10">
            <div
              className="text-white text-center mb-3"
              style={{
                direction: 'rtl',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                letterSpacing: '0.4px',
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
                letterSpacing: '1.2px',
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
              className="w-full px-6 py-4 rounded-2xl transition-all relative overflow-hidden active:scale-95"
              style={{
                background:
                  selectedIndex === -1
                    ? 'rgba(251, 191, 36, 0.16)'
                    : 'rgba(255, 255, 255, 0.03)',
                border:
                  selectedIndex === -1
                    ? '1px solid rgba(251, 191, 36, 0.55)'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                direction: 'rtl',
                boxShadow:
                  selectedIndex === -1
                    ? '0 10px 30px rgba(0, 0, 0, 0.35)'
                    : '0 8px 24px rgba(0, 0, 0, 0.25)',
                minHeight: '72px',
                touchAction: 'manipulation',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(-1)}
            >
              {selectedIndex === -1 && (
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.14), transparent)' }}
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
                <div className="text-amber-400 text-2xl ml-4">★</div>
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
                className="w-full px-6 py-4 rounded-2xl transition-all relative overflow-hidden text-right active:scale-95"
                style={{
                  background:
                    selectedIndex === index
                      ? `rgba(255, 255, 255, 0.04)`
                      : 'rgba(255, 255, 255, 0.02)',
                  border: selectedIndex === index ? `1px solid ${dept.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  direction: 'rtl',
                  boxShadow: selectedIndex === index ? '0 10px 26px rgba(0, 0, 0, 0.32)' : '0 8px 20px rgba(0, 0, 0, 0.22)',
                  minHeight: '70px',
                  touchAction: 'manipulation',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(index)}
              >
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-2 rounded-l-full"
                  style={{
                    background: `linear-gradient(180deg, ${dept.color}, ${dept.color}90)`,
                    boxShadow: minimalist ? 'none' : `0 0 15px ${dept.color}80`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: selectedIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                />

                {selectedIndex === index && (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `radial-gradient(circle at right, ${dept.color}22, transparent)` }}
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
