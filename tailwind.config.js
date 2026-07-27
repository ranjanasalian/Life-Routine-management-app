/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      colors: {
        ios: {
          bg: '#05070c',
          card: 'rgba(18, 24, 38, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          emerald: '#10b981',
          teal: '#14b8a6',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          rose: '#f43f5e',
          indigo: '#6366f1',
          purple: '#a855f7'
        }
      }
    },
  },
  plugins: [],
}
