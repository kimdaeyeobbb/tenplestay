/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    colors: {
      grayscale: {
        bg: '#101013',
        50: '#F8FAFC',
        400: '#94A3B8',
        700: '#334155',
        800: '#1E293B',
        900: '#0A0A0D',
      },
      brand: {
        200: '#BFC4FE',
        primarylight: '#7B85FA',
        primary: '#4353FF',
        primarydard: '#1F2CB8',
      },
      error: {
        error: '#E82F2F',
        dark: '#B9880C',
      },
      warning: {
        primary: '#F2DF35',
        primarybold: '#B9880C',
      },
      success: {
        success: '#0EB260',
        successdark: '#085E33',
      },
      point: {
        pink500: '#CF158F',
        pink700: '#8F1465',
        purple600: '#6D3AED',
        purple800: '#4B21B6',
        orange600: '#FF6F31',
        orange800: '#963C16',
      },
    },
    extend: {},
  },
  plugins: [],
};
