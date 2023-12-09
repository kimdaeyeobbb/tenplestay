/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    colors: {
      grayscale: {
        bg: '#01030C',
        50: '#F8FAFC',
        400: '#94A3B8',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
      },
      brand: {
        200: '#BFDBFE',
        primarylight: '#60A5FA',
        primary: '#2672ED',
        primarydard: '#1F43B8',
      },
      error: {
        error: '#E82F2F',
        dark: '#B9880C',
      },
      warning: {
        primary: '#FCC70B',
        primarybold: '#D97706',
      },
      success: {
        success: '#0EB260',
        successdark: '#085E33',
      },
      point: {
        500: '#CF158F',
        700: '#8F1465',
      },
    },
    extend: {},
  },
  plugins: [],
};
