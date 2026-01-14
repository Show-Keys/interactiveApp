import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Disable all non-functional animations/transitions (kiosk/MagicMirror).
document.documentElement.classList.add("no-anim");

createRoot(document.getElementById("root")!).render(<App />);
