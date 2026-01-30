/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#1a1a1a',
        'navy-blue': '#1e3a8a',
        'primary-blue': '#3b82f6',
        'success-green': '#10b981',
        'danger-red': '#dc2626',
        'warning-yellow': '#f59e0b',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
