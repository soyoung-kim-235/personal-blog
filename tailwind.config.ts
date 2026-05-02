import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--background-primary)",
          "bg-sec": "var(--background-secondary)",
          text: "var(--text-primary)",
          "text-sec": "var(--text-secondary)",
          accent: "var(--accent-primary)",
          "accent-hover": "var(--accent-hover)",
          "accent-soft": "var(--accent-soft)",
          warm: "var(--neutral-warm)",
          border: "var(--border-subtle)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [typography],
  darkMode: "class",
};
export default config;
