import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/** 分頁圖示：圓角 SVG（與首頁左上角比例一致）+ PNG 後援；支援 Vite base */
const syncFaviconHref = () => {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  const svgHref = `${prefix}favicon.svg`;
  const pngHref = `${prefix}app-icon.png`;

  const ensureIcon = (type, href, sizes) => {
    let el = document.head.querySelector(`link[rel="icon"][type="${type}"]`);
    if (!el) {
      el = document.createElement("link");
      el.rel = "icon";
      el.type = type;
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    if (sizes) el.setAttribute("sizes", sizes);
  };

  ensureIcon("image/svg+xml", svgHref, "any");
  ensureIcon("image/png", pngHref, "any");

  let shortcut = document.querySelector('link[rel="shortcut icon"]');
  if (!shortcut) {
    shortcut = document.createElement("link");
    shortcut.rel = "shortcut icon";
    document.head.appendChild(shortcut);
  }
  shortcut.setAttribute("type", "image/svg+xml");
  shortcut.setAttribute("href", svgHref);
};
syncFaviconHref();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
