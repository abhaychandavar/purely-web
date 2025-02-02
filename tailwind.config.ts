import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        tertiary: "var(--tertiary)",
        secondary: "var(--secondary)",
        overBackgroundOutline: "var(--over-background-outline)",
        overBackgroundOutlinePrimary: "var(--over-background-outline-primary)",
        overBackground: "var(--over-background)",
        overBackgroundSecondary: "var(--over-background-secondary)",
        overBackgroundDivider: "var(--over-background-divider)",
        overlay: "var(--overlay)",
        overCard: "var(--over-card)",
        card: "var(--card)",
        highlight: "var(--highlight)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [],
} satisfies Config;
