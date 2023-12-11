/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        grayscale: {
          bg: '#101013',
          white: '#FFFFFF',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0A0A0D',
        },
        brand: {
          light: '#7B85FA',
          primary: '#4353FF',
          dark: '#1F2CB8',
        },
        error: {
          light: '#FF5151',
          primary: '#E82F2F',
          dark: '#A12323',
        },
        warning: {
          primary: '#F2DF35',
          dark: '#B9880C',
        },
        success: {
          primary: '#0EB260',
          dark: '#085E33',
        },
        point: {
          pink: {
            primary: '#CF158F',
            dark: '#8F1465',
          },
          purple: {
            primary: '#6D3AED',
            dark: '#4B21B6',
          },
        },
      },
    },
  },
  plugins: [],
};
