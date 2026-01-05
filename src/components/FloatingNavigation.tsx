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
        className="px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-950/80 to-slate-900/70 border border-white/10 shadow-2xl"
      >
        <div className="flex items-center gap-6">
          {/* Logo/Title */}
          <div
            dir="rtl"
            className="text-white/80 border-l border-white/20 pl-6"
          >
            <div className="text-sm tracking-wide font-light">
              الوزارة
            </div>
          </div>

          {/* Department navigation items */}
          <div className="flex items-center gap-3 max-w-[900px] overflow-x-auto scrollbar-hide">
            {/* Minister's Office */}
            <motion.button
              dir="rtl"
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-colors border text-white text-xs font-light"
              style={{
                background: selectedIndex === -1 ? 'rgba(251, 191, 36, 0.18)' : 'rgba(255, 255, 255, 0.02)',
                borderColor: selectedIndex === -1 ? 'rgba(251, 191, 36, 0.45)' : 'rgba(255, 255, 255, 0.12)',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(251, 191, 36, 0.12)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(-1)}
            >
              مكتب الوزير
            </motion.button>

            <div className="w-px h-4 bg-white/20" />

            {/* Department items */}
            {departments.map((dept, index) => (
              <motion.button
                key={index}
                dir="rtl"
                className="px-3 py-2 rounded-lg whitespace-nowrap transition-colors relative group border text-xs font-light text-white/90"
                style={{
                  background: selectedIndex === index ? `${dept.color}26` : 'rgba(255, 255, 255, 0.02)',
                  borderColor: selectedIndex === index ? `${dept.color}88` : 'rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{ scale: 1.05, background: `${dept.color}20` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(index)}
              >
                {/* Neon line indicator */}
                {selectedIndex === index && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 rounded-full"
                    style={{ background: dept.color }}
                    layoutId="activeNav"
                  />
                )}
                
                {dept.nameAr.replace(/^دائرة |^مكتب |^قسم /, '')}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
