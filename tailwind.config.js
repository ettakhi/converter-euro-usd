/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',
        lagoon: '#0ea5e9',
        lagoonDark: '#0284c7',
        accent: '#fbbf24',
        warning: '#fb923c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 20px 45px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
}
