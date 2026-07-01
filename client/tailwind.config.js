/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: '#1e3a8a',
          dark: '#1a1a2e',
          light: '#f8fafc',
        },
        india: {
          saffron: '#FF9933',
          white: '#FFFFFF',
          green: '#138808',
        },
        northeast: {
          saffron: '#FF9933',
          forest: '#228B22',
          river: '#0077BE',
          mountain: '#4A3C31',
          tribal: '#8B4513',
          mist: '#B0C4DE',
          sunset: '#FF6B35',
          bamboo: '#7CFC00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}