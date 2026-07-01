/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutalist: {
          black: '#000000',
          white: '#FFFFFF',
          red: '#FF0000',
          yellow: '#FFFF00',
          blue: '#0066FF',
          green: '#00FF00',
          purple: '#9D00FF',
          orange: '#FF6600',
        },
        maximalist: {
          void: '#0D0D0D',
          neonPink: '#FF10F0',
          cyberYellow: '#FEFF37',
          electricBlue: '#00D4FF',
          acidGreen: '#ADFF2F',
          magma: '#FF4500',
          ultraviolet: '#8B00FF',
          gold: '#FFD700',
        },
        glass: {
          dark: 'rgba(13, 13, 13, 0.75)',
          light: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
          overlay: 'rgba(0, 0, 0, 0.5)',
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
        brutal: ['Impact', 'Haettenschweiler', 'Arial Black', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
        tribal: ['"Noto Serif"', 'Georgia', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
        heavy: '40px',
      },
      boxShadow: {
        brutal: '8px 8px 0px 0px #000000',
        'brutal-sm': '4px 4px 0px 0px #000000',
        'brutal-inset': 'inset 4px 4px 0px 0px #000000',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
        neon: '0 0 20px currentColor',
        'neon-strong': '0 0 40px currentColor, 0 0 80px currentColor',
        glow: '0 0 30px rgba(0, 212, 255, 0.5)',
        'glow-pink': '0 0 30px rgba(255, 16, 240, 0.5)',
        'glow-green': '0 0 30px rgba(173, 255, 47, 0.5)',
      },
      borderRadius: {
        brutal: '0',
        brutalsm: '0',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.5s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 1s infinite',
        'rainbow': 'rainbow 3s linear infinite',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tribal-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FF9933\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30 30 0zm0 10L10 30l20 20 20-20-20-20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'geometric-pattern': 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2300D4FF\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z\'/%3E%3C/g%3E%3C/svg%3E")',
        'diagonal-stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
      }
    },
  },
  plugins: [],
}