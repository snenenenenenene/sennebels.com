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
      // One editorial scale. Size, leading and tracking are bundled per step,
      // because Apple's typography rule is that the three move together:
      // tight negative tracking as type grows, looser leading as it shrinks.
      fontSize: {
        display: ["clamp(2.6rem,5.4vw,4rem)", { lineHeight: "1.03", letterSpacing: "-0.032em" }],
        title1: ["clamp(1.75rem,3vw,2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.026em" }],
        title2: ["1.875rem", { lineHeight: "1.14", letterSpacing: "-0.02em" }],
        title3: ["1.375rem", { lineHeight: "1.28", letterSpacing: "-0.012em" }],
        lede: ["1.1875rem", { lineHeight: "1.68", letterSpacing: "-0.003em" }],
        body: ["1.0625rem", { lineHeight: "1.72", letterSpacing: "0" }],
        callout: ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0.003em" }],
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.012em" }],
      },
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