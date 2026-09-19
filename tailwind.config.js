/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sf: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        desk: {
          50: '#e8e9ee',
          100: '#dadbe0',
          200: '#c3c8d3',
          300: '#a3a7b4',
          400: '#8b90a0',
          500: '#7d8393',
          600: '#5d6374',
          700: '#464a59',
          800: '#3a3d4a',
          900: '#272937',
          950: '#1d1f2b',
        },
      },
      keyframes: {
        iconIn: {
          '0%': { opacity: '0', transform: 'scale(0.55)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        dockIn: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        barIn: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        iconIn: 'iconIn 420ms cubic-bezier(0.2, 0.8, 0.25, 1) both',
        dockIn: 'dockIn 520ms cubic-bezier(0.2, 0.8, 0.25, 1) both',
        barIn: 'barIn 380ms ease-out both',
      },
    },
  },
  plugins: [],
};
