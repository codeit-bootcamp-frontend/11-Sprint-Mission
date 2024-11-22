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
        gray50: "#f9fafb",
        gray200: "#e5e7eb",
        gray600: "#4b5563",
        bordergray: "#DFDFDF",
        skyblue: "#3692ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
