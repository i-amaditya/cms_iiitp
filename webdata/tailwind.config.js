/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/data/**/*.json"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Merriweather"', 'serif'],
      },
      colors: {
        primary: '#1B3A6B',
        accent: {
          DEFAULT: '#2563EB', // Light mode accent
          dark: '#60A5FA',    // Dark mode accent
        },
        'brand-red': {
          DEFAULT: '#DC2626', // Lighter maroon / crimson
          dark: '#F87171',    // Light red
        },
        surface: {
          DEFAULT: '#F0F4FA', // Light mode surface
          dark: '#161B22',    // Dark mode surface
        },
        text: {
          DEFAULT: '#111827', // Light mode text
          dark: '#E6EDF3',    // Dark mode text
        },
        bg: {
          DEFAULT: '#F8FAFC', // Cool Slate off-white
          dark: '#0D1117',    // Dark mode background
        },
        footer: '#0A1628',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
