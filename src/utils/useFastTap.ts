import * as React from "react";

export type FastTapPointerType = "touch" | "pen" | "mouse";

export interface UseFastTapOptions {
  /** Which pointer types should trigger the fast-path activation. Defaults to touch+pen. */
  pointerTypes?: FastTapPointerType[];

  /** How long to suppress the subsequent synthetic click after a touch/pen activation. */
  suppressClickMs?: number;
}

/**
 * Makes touchscreen taps feel snappier by activating on pointer-down for touch/pen,
 * while suppressing the subsequent synthetic click to prevent double-fires.
 */
export function useFastTap(onActivate: () => void, options: UseFastTapOptions = {}) {
  const { pointerTypes = ["touch", "pen"], suppressClickMs = 650 } = options;

  const pointerEventsSupported = typeof window !== "undefined" && "PointerEvent" in window;

  const activateRef = React.useRef(onActivate);
  React.useEffect(() => {
    activateRef.current = onActivate;
  }, [onActivate]);

  const suppressClickRef = React.useRef(false);
  const suppressTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (suppressTimerRef.current != null) {
        window.clearTimeout(suppressTimerRef.current);
      }
    };
  }, []);

  const markSuppressClick = React.useCallback(() => {
    suppressClickRef.current = true;

    if (suppressTimerRef.current != null) {
      window.clearTimeout(suppressTimerRef.current);
    }

    suppressTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = false;
    }, suppressClickMs);
  }, [suppressClickMs]);

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      if (!pointerTypes.includes(event.pointerType as FastTapPointerType)) return;

      // Prevent unwanted text selection/callouts and reduce chance of scroll-gesture interference.
      event.preventDefault();

      markSuppressClick();
      activateRef.current();
    },
    [markSuppressClick, pointerTypes]
  );

  // Backwards-compat alias (some components may still wire pointer-up).
  const onPointerUp = onPointerDown;

  const onClick = React.useCallback((event: React.MouseEvent) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    activateRef.current();
  }, []);

  // Touch-first fallback for environments where Pointer Events aren't available.
  // (Modern browsers will use onPointerUp instead.)
  const onTouchStart = React.useCallback(
    (event: React.TouchEvent) => {
      if (pointerEventsSupported) return;

      // Prevent unwanted text selection/callouts and reduce chance of scroll-gesture interference.
      event.preventDefault();

      markSuppressClick();
      activateRef.current();
    },
    [markSuppressClick, pointerEventsSupported]
  );

  return { onPointerDown, onPointerUp, onTouchStart, onClick };
}
