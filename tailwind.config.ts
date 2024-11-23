import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        /**
         * sm: 모바일 (768px 이하)
         * md: 태블릿 (1280px 이하)
         * lg: 데스크탑 (1280px 이상)
         */
        sm: '768px',
        md: '1024px',
        lg: '1280px',
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
