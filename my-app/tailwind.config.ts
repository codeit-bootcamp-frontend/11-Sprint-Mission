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
        gray70: "#fcfcfc",
        gray100: "#f3f4f6",
        gray200: "#e5e7eb",
        gray400: "#9ca3af",
        gray500: "#374151",
        gray600: "#4b5563",
        bordergray: "#DFDFDF",
        skyblue: "#3692ff",
        mainbg: "#cfe5ff",
        ftbg: "#111827",
        red: "#f74747",
      },
    },
  },
  plugins: [],
} satisfies Config;
