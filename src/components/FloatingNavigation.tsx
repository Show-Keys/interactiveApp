import { motion } from 'motion/react';

interface Department {
  nameAr: string;
  nameEn: string;
  color: string;
}

interface FloatingNavigationProps {
  departments: Department[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function FloatingNavigation({ departments, selectedIndex, onSelect }: FloatingNavigationProps) {
  return (
    <motion.div
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div
        className="px-8 py-4 rounded-2xl backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.7))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex items-center gap-6">
          {/* Logo/Title */}
          <div
            className="text-white/80 border-l pl-6"
            style={{
              direction: 'rtl',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="text-sm tracking-wide" style={{ fontWeight: 200 }}>
              الوزارة
            </div>
          </div>

          {/* Department navigation items */}
          <div className="flex items-center gap-3 max-w-[900px] overflow-x-auto scrollbar-hide">
            {/* Minister's Office */}
            <motion.button
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-all"
              style={{
                background: selectedIndex === -1 ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                border: selectedIndex === -1 ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                direction: 'rtl',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(251, 191, 36, 0.15)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(-1)}
            >
              <div className="text-white text-xs" style={{ fontWeight: 300 }}>
                مكتب الوزير
              </div>
            </motion.button>

            <div className="w-px h-4 bg-white/20" />

            {/* Department items */}
            {departments.map((dept, index) => (
              <motion.button
                key={index}
                className="px-3 py-2 rounded-lg whitespace-nowrap transition-all relative group"
                style={{
                  background: selectedIndex === index ? `${dept.color}30` : 'transparent',
                  border: selectedIndex === index ? `1px solid ${dept.color}80` : '1px solid rgba(255, 255, 255, 0.05)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  direction: 'rtl',
                }}
                whileHover={{ scale: 1.05, background: `${dept.color}20` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(index)}
              >
                {/* Neon line indicator */}
                {selectedIndex === index && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 rounded-full"
                    style={{ background: dept.color, boxShadow: `0 0 8px ${dept.color}` }}
                    layoutId="activeNav"
                  />
                )}
                
                <div className="text-white/90 text-xs" style={{ fontWeight: 300 }}>
                  {dept.nameAr.replace(/^دائرة |^مكتب |^قسم /, '')}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
