import { useMemo } from 'react';

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
}

export function useRenderQuality() {
  return useMemo(() => {
    if (typeof window === 'undefined') return 1;

    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--render-quality')
      .trim();

    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) return 1;

    return clamp(value, 0.25, 1);
  }, []);
}
