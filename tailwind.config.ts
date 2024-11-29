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
        primary_100: "#3692FF",
        primary_200: "#1967D6",
        primary_300: "#1251AA",
        gray50: "#F9FAFB",
        gray100: "#F3F4F8",
        gray200: "#E5E7EB",
        gray400: "#9CA3AF",
        gray500: "#6B7280",
        gray600: "#4B5563",
        gray700: "#374151",
        gray800: "#1F2937",
        gray900: "#111827",
        errorRed: "#F74747",
      },
    },
    // 디바이스 사이즈 정의
    screens: {
      tablet: "745px",
      pc: "1280px",
    },
  },
  plugins: [],
} satisfies Config;
