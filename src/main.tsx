import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Kiosk defaults:
// - Keep animations/transitions disabled (we selectively allow orbit rotation via CSS).
// - Reduce render density for MagicMirror/Capacitor.
const url = new URL(window.location.href);
const isCapacitor = typeof (window as any).Capacitor !== "undefined";

const qualityParam = url.searchParams.get("quality") ?? url.searchParams.get("q");
let renderQuality = qualityParam ? Number(qualityParam) : isCapacitor ? 0.5 : 1;
if (!Number.isFinite(renderQuality)) renderQuality = isCapacitor ? 0.5 : 1;
renderQuality = Math.min(1, Math.max(0.25, renderQuality));
document.documentElement.style.setProperty("--render-quality", String(renderQuality));

const animationsParam = url.searchParams.get("anim");
const forceNoAnim = url.searchParams.get("noanim") === "1" || animationsParam === "0";
if (forceNoAnim || isCapacitor) {
	document.documentElement.classList.add("no-anim");
}

createRoot(document.getElementById("root")!).render(<App />);
