import * as React from "react";

export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const compute = () => setPrefers(Boolean(mql?.matches));

    compute();

    if (mql?.addEventListener) {
      mql.addEventListener("change", compute);
      return () => mql.removeEventListener("change", compute);
    }

    return;
  }, []);

  return prefers;
}

function getDeviceMemory(): number | undefined {
  const anyNavigator = navigator as unknown as { deviceMemory?: number };
  return anyNavigator.deviceMemory;
}

export function useReducedMotionLike() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const compute = () => {
      const deviceMemory = getDeviceMemory();
      const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : undefined;

      // Heuristic: treat low-memory / low-core devices as reduced-motion to avoid jank,
      // even when screen size is large (e.g. kiosks / "magic mirror" devices).
      const isLowEnd = (deviceMemory !== undefined && deviceMemory <= 4) || (cores !== undefined && cores <= 4);

      setReduced(Boolean(prefersReduced?.matches) || isLowEnd);
    };

    compute();

    if (prefersReduced?.addEventListener) {
      prefersReduced.addEventListener("change", compute);
      return () => prefersReduced.removeEventListener("change", compute);
    }

    return;
  }, []);

  return reduced;
}
