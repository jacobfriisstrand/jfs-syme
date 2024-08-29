/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    fontFamily: {
      sans: ["Avenir", "Montserrat", "Corbel", "URW Gothic", "source-sans-pro", "sans-serif"],
    },
    container: {
      center: true,
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
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      baseLight: "#f8f8f8",
      baseDark: "#252525",
      baseLightGray: "#D9D9D9",
      baseDarkGray: "#3D3D3D",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
