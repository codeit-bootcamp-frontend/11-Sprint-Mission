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
