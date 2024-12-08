/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard'],
      },
      colors: {
        blue: {
          500: '#3692ff',
          400: '#2f80ed',
          300: '#e6f2ff',
          100: '#cfe5ff',
        },
        red: {
          500: '#f74747',
        },
        gray: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#d1d5db',
          200: '#e5e7eb',
          150: '#dfdfdf',
          100: '#f3f4f6',
          50: '#f9fafb',
        },
        white: '#ffffff',
        neutral: {
          100: '#fcfcfc',
          400: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
};
