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
      const params = new URLSearchParams(window.location.search);
      const liteParam = params.get("lite");
      const forceLite = liteParam === "1" || liteParam === "true" || params.has("lite");

      const deviceMemory = getDeviceMemory();
      const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : undefined;

      // Heuristic: treat low-memory / low-core devices as reduced-motion to avoid jank,
      // even when screen size is large (e.g. kiosks / "magic mirror" devices).
      const isLowEnd = (deviceMemory !== undefined && deviceMemory <= 4) || (cores !== undefined && cores <= 4);

      // Some Android WebViews (including kiosk-style devices) don't expose deviceMemory,
      // and can still struggle with heavy blur + infinite animations.
      const ua = navigator.userAgent || "";
      const isAndroid = /Android/i.test(ua);
      const isWebView = /\bwv\b/i.test(ua) || /Version\/[\d.]+.*Chrome\/[\d.]+/i.test(ua);
      const isCapacitor = Boolean((window as unknown as { Capacitor?: unknown }).Capacitor);
      const aspect = window.innerHeight / Math.max(1, window.innerWidth);
      const isKioskLike = aspect >= 2.1;
      const isAndroidKioskWebView = (isWebView || isCapacitor) && isAndroid && isKioskLike;

      setReduced(forceLite || Boolean(prefersReduced?.matches) || isLowEnd || isAndroidKioskWebView);
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
