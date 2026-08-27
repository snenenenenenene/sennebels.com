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
        // Wabi-sabi tokens. Every value swaps under prefers-color-scheme: dark
        // in globals.css, so both themes come from one set of class names.
        paper: "var(--paper)",
        raised: "var(--raised)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        hairline: "var(--hairline)",
        moss: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
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