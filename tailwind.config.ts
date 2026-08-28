// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      // One editorial scale. Size, leading and tracking are bundled per step,
      // because Apple's typography rule is that the three move together:
      // tight negative tracking as type grows, looser leading as it shrinks.
      // SSOT for surface treatment. Every radius, shadow and glass recipe on the
      // site resolves here, so nothing is hand-tuned at the call site.
      borderRadius: {
        card: "26px",
        panel: "20px",
        media: "18px",
        tile: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,16,12,0.05), 0 12px 36px -28px rgba(20,16,12,0.5)",
        "card-hover": "0 2px 4px rgba(20,16,12,0.07), 0 26px 60px -30px rgba(20,16,12,0.55)",
        media: "0 20px 50px -26px rgba(20,16,12,0.6)",
        // Liquid Glass edge. No border: the rim is a top highlight and a lower
        // shade, which is how a real glass edge catches light. Defined here so
        // the comma-separated value is parsed once instead of inline.
        pane:
          "0 12px 44px -14px var(--glass-shade), inset 0 1px 0 var(--glass-edge), inset 0 -1px 0 var(--glass-shade)",
      },
      spacing: {
        tap: "44px", // HIG minimum interactive target
        stack: "28px", // the one vertical rhythm step between grouped cards
      },
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
        tan: "var(--tan)",
        mark: {
          red: "var(--mark-red)",
          blue: "var(--mark-blue)",
          yellow: "var(--mark-yellow)",
          green: "var(--mark-green)",
        },
        sys: {
          red: "var(--sys-red)",
          blue: "var(--sys-blue)",
          yellow: "var(--sys-yellow)",
          green: "var(--sys-green)",
        },
        // Text-safe accents. Named `tone` because `ink` is already the body
        // colour, and a key cannot appear twice in the colour scale.
        tone: {
          red: "var(--ink-red)",
          blue: "var(--ink-blue)",
          yellow: "var(--ink-yellow)",
          green: "var(--ink-green)",
        },
        glass: {
          tint: "var(--glass-tint)",
          edge: "var(--glass-edge)",
          shade: "var(--glass-shade)",
        },
        gray: {
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
        },
        background: "var(--color-background)",
        text: "var(--color-text)",
      },
      backgroundColor: {
      }
    },
  },
  plugins: [],
};

export default config;