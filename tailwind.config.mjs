/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    fontFamily: {
      sans: ["Avenir", "Montserrat", "Corbel", "URW Gothic", "source-sans-pro", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      arimo: ["Arimo", "sans-serif"],
      serif: ["Libre Baskerville", "Georgia", "serif"],
      mono: ["Fira Code", "ui-monospace", "monospace"],
      dm: ["DM Sans", "sans-serif"],
      plex: ["IBM Plex Mono", "ui-monospace", "monospace"],
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
      baseLight: "#f8f8f8",
      baseDark: "#252525",
      baseLightGray: "#D9D9D9",
      baseDarkGray: "#3D3D3D",
      ink: "#1e1e1e",
      inkMuted: "#4d4b4b",
      inkFaint: "#8f8f8f",
      success: "#ADEBB3",
      error: "#FF0000",
      link: "#006CFF",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
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
