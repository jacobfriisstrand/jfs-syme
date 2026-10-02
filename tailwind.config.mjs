/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    fontFamily: {
      sans: "var(--font-inter)",
      inter: "var(--font-inter)",
      arimo: "var(--font-arimo)",
      serif: "var(--font-serif)",
      dm: "var(--font-dm)",
      plex: "var(--font-plex)",
    },
    container: {
      center: "true",
      padding: "1.5rem",
    },
    fontSize: {
      xs: "0.5rem",
      sm: "0.625rem",
      base: "1rem",
      md: "0.875rem",
      lg: "1.0625rem",
      xl: "1.3125rem",
      "2xl": "1.5625rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "cover-label": "var(--cover-label-size)",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      baseLight: "rgb(var(--base-light-rgb) / <alpha-value>)",
      baseDark: "rgb(var(--base-dark-rgb) / <alpha-value>)",
      baseLightGray: "rgb(var(--base-light-gray-rgb) / <alpha-value>)",
      baseDarkGray: "rgb(var(--base-dark-gray-rgb) / <alpha-value>)",
      ink: "rgb(var(--ink-rgb) / <alpha-value>)",
      inkMuted: "rgb(var(--ink-muted-rgb) / <alpha-value>)",
      inkFaint: "rgb(var(--ink-faint-rgb) / <alpha-value>)",
      success: "rgb(var(--success-rgb) / <alpha-value>)",
      error: "rgb(var(--error-rgb) / <alpha-value>)",
      link: "rgb(var(--link-rgb) / <alpha-value>)",
      paper: "rgb(var(--paper-rgb) / <alpha-value>)",
      canvasNight: "rgb(var(--canvas-night-rgb) / <alpha-value>)",
      canvasInk: "rgb(var(--canvas-ink-rgb) / <alpha-value>)",
      panel: "rgb(var(--panel-rgb) / <alpha-value>)",
      cta: "rgb(var(--cta-rgb) / <alpha-value>)",
      ctaHover: "rgb(var(--cta-hover-rgb) / <alpha-value>)",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        header: "var(--shadow-header)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "marquee-mid": "marquee 48s linear infinite",
        "marquee-slow": "marquee 42s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
