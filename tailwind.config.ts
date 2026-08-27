// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter Tight", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        sans: ["var(--font-hanken)", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        // Soft Stack palette
        paper: "#F9F8F5",
        ink: "#1E1515",
        "ink-2": "#4A3F3F",
        "ink-3": "#8C8079",
        hairline: "#E4E1DA",
        moss: "#2E6B48",
        // Per-project card tints
        tint: {
          violet: "#F0EAF7",
          mint: "#EAF7E4",
          blush: "#FDEDE7",
          rose: "#FBEAEF",
          butter: "#FFF8DF",
        },
        'dark-accent': '#bc6c25',
        gray: {
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
        },
        background: "var(--color-background)",
        text: "var(--color-text)",
      },
      backgroundColor: {
        light: {
          primary: "#ccd5ae",
          secondary: "#e9edc9",
          tertiary: "#fefae0",
          quaternary: "#faedcd",
          accent: "#d4a373"
        },
        dark: {
          primary: "#606c38",
          secondary: "#283618",
          tertiary: "#fefae0",
          quaternary: "#dda15e",
          accent: "#bc6c25"
        },
      }
    },
  },
  plugins: [],
};

export default config;