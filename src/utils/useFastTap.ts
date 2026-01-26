import * as React from "react";

export type FastTapPointerType = "touch" | "pen" | "mouse";

export interface UseFastTapOptions {
  /** Which pointer types should trigger the fast-path activation. Defaults to touch+pen. */
  pointerTypes?: FastTapPointerType[];

  /** How long to suppress the subsequent synthetic click after a touch/pen activation. */
  suppressClickMs?: number;
}

/**
 * Makes touchscreen taps feel snappier by activating on pointer-up for touch/pen,
 * while suppressing the subsequent synthetic click to prevent double-fires.
 */
export function useFastTap(onActivate: () => void, options: UseFastTapOptions = {}) {
  const { pointerTypes = ["touch", "pen"], suppressClickMs = 650 } = options;

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

  const onPointerUp = React.useCallback(
    (event: React.PointerEvent) => {
      if (!pointerTypes.includes(event.pointerType as FastTapPointerType)) return;

      // Prevent unwanted text selection/callouts and reduce chance of scroll-gesture interference.
      event.preventDefault();

      markSuppressClick();
      activateRef.current();
    },
    [markSuppressClick, pointerTypes]
  );

  const onClick = React.useCallback((event: React.MouseEvent) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    activateRef.current();
  }, []);

  return { onPointerUp, onClick };
}
