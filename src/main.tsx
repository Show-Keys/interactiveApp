import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./kiosk.css";

// Kiosk defaults:
// - Keep animations/transitions disabled (we selectively allow orbit rotation via CSS).
// - Reduce render density for MagicMirror/Capacitor.
const url = new URL(window.location.href);
const isCapacitor = typeof (window as any).Capacitor !== "undefined";
const kioskParam = url.searchParams.get("kiosk");
const isKiosk = isCapacitor || kioskParam === "1" || kioskParam === "true";

if (isKiosk) {
	document.documentElement.classList.add("kiosk");
	document.body.classList.add("kiosk");
}

const qualityParam = url.searchParams.get("quality") ?? url.searchParams.get("q");
const defaultCapacitorQuality = (() => {
	// Heuristic: high-resolution portrait panels (e.g. ~1440x3830) are GPU-expensive in WebView.
	// Lowering render quality reduces star/particle density and keeps touch/animations feeling smooth.
	const dpr = typeof window.devicePixelRatio === "number" ? window.devicePixelRatio : 1;
	const w = window.innerWidth || window.screen.width || 0;
	const h = window.innerHeight || window.screen.height || 0;
	const pixelLoad = Math.max(1, Math.round(w * h * dpr * dpr));

	// ~5.5M at 1440x3830@1x; 22M at @2x.
	if (pixelLoad >= 16000000) return 0.4;
	if (pixelLoad >= 9000000) return 0.45;
	return 0.5;
})();

let renderQuality = qualityParam ? Number(qualityParam) : isCapacitor ? defaultCapacitorQuality : 1;
if (!Number.isFinite(renderQuality)) renderQuality = isCapacitor ? defaultCapacitorQuality : 1;
renderQuality = Math.min(1, Math.max(0.25, renderQuality));
document.documentElement.style.setProperty("--render-quality", String(renderQuality));

const animationsParam = url.searchParams.get("anim");
const forceNoAnim = url.searchParams.get("noanim") === "1" || animationsParam === "0";
if (forceNoAnim || isCapacitor) {
	document.documentElement.classList.add("no-anim");
}

createRoot(document.getElementById("root")!).render(<App />);
