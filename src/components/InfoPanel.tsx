import * as React from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';
import { useFastTap } from '../utils/useFastTap';

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

  const closeTap = useFastTap(onClose);

  const [shouldRender, setShouldRender] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }

    const t = window.setTimeout(() => setShouldRender(false), 220);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  const toRgba = (hex: string, alpha: number) => {
    const raw = hex.trim().replace('#', '');
    if (raw.length !== 6) return `rgba(255,255,255,${alpha})`;
    const r = parseInt(raw.slice(0, 2), 16);
    const g = parseInt(raw.slice(2, 4), 16);
    const b = parseInt(raw.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 panel-backdrop"
        onTouchStart={closeTap.onTouchStart}
        onPointerDown={closeTap.onPointerDown}
        onClick={closeTap.onClick}
        style={{
          background: isOpen ? 'rgba(0,0,0,0.62)' : 'rgba(0,0,0,0)',
          transition: liteMode ? undefined : 'background 220ms ease',
        }}
      />

      {/* Side panel */}
      <div
        className="fixed right-0 top-0 bottom-0 w-[520px] max-w-[92vw] z-50 overflow-hidden panel-anim"
        style={{
          transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(24px,0,0)',
          opacity: isOpen ? 1 : 0.98,
          transition: liteMode ? undefined : 'transform 220ms ease, opacity 220ms ease',
          background: minimalist
            ? 'rgba(15, 23, 42, 0.98)'
            : 'linear-gradient(to left, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
          borderLeft: minimalist ? `1px solid ${toRgba(color, 0.28)}` : `2px solid ${toRgba(color, 0.55)}`,
          boxShadow: minimalist
            ? `-16px 0 44px rgba(0, 0, 0, 0.55)`
            : liteMode
              ? `-12px 0 30px rgba(0, 0, 0, 0.45)`
              : `-20px 0 60px rgba(0, 0, 0, 0.5), inset 0 0 100px ${color}10`,
        }}
      >
        <div className="relative h-full flex flex-col">
          {/* Color wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(1000px 900px at 0% 20%, ${toRgba(color, 0.18)}, transparent 60%), radial-gradient(900px 700px at 100% 0%, ${toRgba(
                color,
                0.10
              )}, transparent 55%)`,
            }}
          />

          {/* Header */}
          <div
            className="relative p-8 border-b"
            style={
              {
                borderColor: toRgba(color, 0.22),
                '--panel-line': toRgba(color, 0.95),
                '--panel-line-soft': toRgba(color, 0.35),
              } as React.CSSProperties
            }
          >
            {/* Close button ABOVE title */}
            <div className="flex justify-end">
              <button
                onTouchStart={closeTap.onTouchStart}
                onPointerDown={closeTap.onPointerDown}
                onClick={closeTap.onClick}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 active:bg-white/10"
                style={{
                  border: `1px solid ${toRgba(color, 0.18)}`,
                  boxShadow: `0 10px 22px rgba(0,0,0,0.35)`,
                  transition: liteMode ? undefined : 'background 180ms ease, border-color 180ms ease',
                }}
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div
              style={{
                direction: 'rtl',
                fontFamily: 'var(--font-ar)',
              }}
            >
              <div className="text-white text-3xl mb-2" style={{ fontWeight: 300, textShadow: 'none' }}>
                {nameAr}
              </div>
              <div
                className="text-white/60 text-sm tracking-widest uppercase"
                style={{ fontWeight: 200, fontFamily: 'var(--font-en)' }}
              >
                {nameEn}
              </div>
            </div>

            {/* Divider line (slides in AFTER panel) */}
            <div className="mt-6">
              <div
                className={isOpen ? 'panel-divider panel-divider--on' : 'panel-divider'}
                style={{
                  transformOrigin: 'right center',
                  transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                  transition: liteMode ? undefined : 'transform 420ms cubic-bezier(0.2, 0.9, 0.2, 1)',
                  transitionDelay: liteMode ? undefined : isOpen ? '200ms' : '0ms',
                }}
              />
            </div>
          </div>

          {/* Scrollable content */}
          <div
            className="relative flex-1 overflow-y-auto p-8 space-y-8"
            style={{ direction: 'rtl', fontFamily: 'var(--font-ar)' }}
          >
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
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{
                        background: toRgba(color, 0.06),
                        borderColor: toRgba(color, 0.18),
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: color, boxShadow: `0 0 10px ${toRgba(color, 0.35)}` }}
                      />
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
                      borderColor: toRgba(color, 0.16),
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: toRgba(color, 0.10),
                        border: `1px solid ${toRgba(color, 0.22)}`,
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
