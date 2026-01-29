/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '.dark'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0a',
          secondary: '#111111',
          tertiary: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#39FF14',
          dim: 'rgba(57, 255, 20, 0.3)',
          glow: 'rgba(57, 255, 20, 0.5)',
        },
        light: {
          primary: '#f5f5f5',
          secondary: '#e8e8e8',
          tertiary: '#ffffff',
          accent: '#00aa00',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'blink': 'blink 1s step-end infinite',
        'bounce-slow': 'bounce-slow 2s infinite',
        'glitch-1': 'glitch-1 0.3s infinite',
        'glitch-2': 'glitch-2 0.3s infinite',
        'chart-grow': 'chart-grow 1s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(57, 255, 20, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 8px transparent' },
        },
        'blink': {
          '50%': { opacity: '0' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(10px)' },
        },
        'glitch-1': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'glitch-2': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(-2px, 2px)' },
        },
        'chart-grow': {
          'from': { height: '0' },
        },
        'fadeInUp': {
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
