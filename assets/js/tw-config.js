/* Tokens del design system "Inara by Alma" (exportado de Stitch).
   Se usa con el CDN de Tailwind y es el mismo objeto que tailwind.config.js. */
window.INARA_TW_THEME = {
  extend: {
    colors: {
      primary: "#5d5e38",
      "on-primary": "#ffffff",
      "primary-container": "#76774f",
      "on-primary-container": "#fffbff",
      "primary-fixed": "#e5e5b5",
      "primary-fixed-dim": "#c9c99b",
      secondary: "#725b27",
      "on-secondary": "#ffffff",
      "secondary-container": "#fcdc9b",
      "on-secondary-container": "#775f2b",
      "secondary-fixed": "#ffdf9e",
      "secondary-fixed-dim": "#e2c384",
      gold: "#c3a66a",
      tertiary: "#5b5c59",
      background: "#fafaee",
      "on-background": "#1a1c15",
      surface: "#fafaee",
      "surface-dim": "#dadbd0",
      "surface-bright": "#fafaee",
      "surface-container-lowest": "#ffffff",
      "surface-container-low": "#f4f4e9",
      "surface-container": "#eeefe3",
      "surface-container-high": "#e9e9dd",
      "surface-container-highest": "#e3e3d8",
      "surface-variant": "#e3e3d8",
      "on-surface": "#1a1c15",
      "on-surface-variant": "#48473d",
      "inverse-surface": "#2f312a",
      "inverse-on-surface": "#f1f1e6",
      outline: "#79776c",
      "outline-variant": "#c9c7b9",
      error: "#ba1a1a",
      whatsapp: "#25d366"
    },
    borderRadius: { DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", "2xl": "1rem", full: "9999px" },
    spacing: {
      "space-xs": "0.25rem", "space-sm": "0.5rem", "space-md": "1rem", "space-lg": "1.75rem", "space-xl": "3rem",
      gutter: "1.5rem", "gutter-sm": "1rem", "gutter-lg": "2.5rem",
      "margin-mobile": "1.25rem", "margin-desktop": "4rem"
    },
    fontFamily: {
      headline: ["'Playfair Display'", "Georgia", "serif"],
      body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      label: ["Montserrat", "system-ui", "sans-serif"]
    },
    fontSize: {
      "headline-xl": ["56px", { lineHeight: "68px", letterSpacing: "-0.01em", fontWeight: "400" }],
      "headline-xl-mobile": ["36px", { lineHeight: "44px", fontWeight: "400" }],
      "headline-lg": ["40px", { lineHeight: "52px", letterSpacing: "-0.005em", fontWeight: "400" }],
      "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "400" }],
      "headline-md": ["28px", { lineHeight: "38px", fontWeight: "400" }],
      "headline-sm": ["22px", { lineHeight: "30px", fontWeight: "500" }],
      "body-lg": ["18px", { lineHeight: "28px", fontWeight: "300" }],
      "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
      "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
      "label-lg": ["13px", { lineHeight: "18px", letterSpacing: "0.15em", fontWeight: "500" }],
      "label-md": ["11px", { lineHeight: "16px", letterSpacing: "0.18em", fontWeight: "500" }],
      "label-sm": ["10px", { lineHeight: "14px", letterSpacing: "0.2em", fontWeight: "600" }]
    },
    boxShadow: {
      soft: "0 1px 8px rgba(30,32,25,0.04)",
      card: "0 4px 18px -6px rgba(30,32,25,0.10)",
      lift: "0 18px 40px -16px rgba(30,32,25,0.22)"
    }
  }
};
if (window.tailwind) window.tailwind.config = { theme: window.INARA_TW_THEME };
