import { X } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';

interface InfoPanelProps {
  isOpen: boolean;
  nameAr: string;
  nameEn: string;
  color: string;
  purpose: string;
  subDepartments: string[];
  responsibilities: string[];
  onClose: () => void;
}

export default function InfoPanel({
  isOpen,
  nameAr,
  nameEn,
  color,
  purpose,
  subDepartments,
  responsibilities,
  onClose,
}: InfoPanelProps) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;
  const minimalist = true;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={'fixed inset-0 bg-black/60 z-40'} onClick={onClose} />

      {/* Side panel */}
      <div
        className="fixed right-0 top-0 bottom-0 w-[500px] z-50 overflow-hidden"
        style={{
          background: minimalist
            ? 'rgba(15, 23, 42, 0.98)'
            : 'linear-gradient(to left, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
          borderLeft: minimalist ? '1px solid rgba(255, 255, 255, 0.12)' : `2px solid ${color}80`,
          boxShadow: minimalist
            ? `-16px 0 44px rgba(0, 0, 0, 0.55)`
            : liteMode
              ? `-12px 0 30px rgba(0, 0, 0, 0.45)`
              : `-20px 0 60px rgba(0, 0, 0, 0.5), inset 0 0 100px ${color}10`,
        }}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-8 border-b" style={{ borderColor: `${color}30` }}>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div
              style={{
                direction: 'rtl',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              <div className="text-white text-3xl mb-2" style={{ fontWeight: 300, textShadow: 'none' }}>
                {nameAr}
              </div>
              <div className="text-white/60 text-sm tracking-widest uppercase" style={{ fontWeight: 200 }}>
                {nameEn}
              </div>
            </div>

            <div
              className="mt-6 h-px"
              style={{
                background: `linear-gradient(to left, ${color}, transparent)`,
                boxShadow: 'none',
              }}
            />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8" style={{ direction: 'rtl', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Purpose */}
            <div>
              <div className="text-white/70 text-sm mb-3 tracking-wide" style={{ fontWeight: 300 }}>
                الغرض
              </div>
              <div className="text-white/90 leading-relaxed" style={{ fontWeight: 300, fontSize: '15px' }}>
                {purpose}
              </div>
            </div>

            {/* Sub-departments */}
            {subDepartments.length > 0 && (
              <div>
                <div className="text-white/70 text-sm mb-4 tracking-wide" style={{ fontWeight: 300 }}>
                  الأقسام الفرعية
                </div>
                <div className="space-y-2">
                  {subDepartments.map((sub, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/10">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, boxShadow: 'none' }} />
                      <div className="text-white/80 text-sm" style={{ fontWeight: 300 }}>
                        {sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            <div>
              <div className="text-white/70 text-sm mb-4 tracking-wide" style={{ fontWeight: 300 }}>
                المسؤوليات الرئيسية
              </div>
              <div className="space-y-3">
                {responsibilities.map((resp, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: 'rgba(255, 255, 255, 0.10)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                      }}
                    >
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <div className="text-white/85 flex-1" style={{ fontWeight: 300, fontSize: '14px', lineHeight: '1.6' }}>
                      {resp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
