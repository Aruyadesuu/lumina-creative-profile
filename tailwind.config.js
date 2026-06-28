/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0F',
        surface: '#111118',
        'surface-2': '#1A1A24',
        violet: {
          neon: '#B54FFF',
          deep: '#7B2FE0',
          muted: '#6B21A8',
          glow: 'rgba(181, 79, 255, 0.15)',
        },
        'off-white': '#E8E8F0',
        muted: '#8888A0',
        border: '#2A2A38',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'sweep': 'sweep 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        sweep: {
          '0%, 100%': { transform: 'translateX(-60%) translateY(-30%) rotate(-15deg)', opacity: '0.4' },
          '50%': { transform: 'translateX(60%) translateY(30%) rotate(-15deg)', opacity: '0.7' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(181,79,255,0.3), 0 0 40px rgba(181,79,255,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(181,79,255,0.6), 0 0 80px rgba(181,79,255,0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        grain: {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-5% -10%' },
          '20%': { backgroundPosition: '-15% 5%' },
          '30%': { backgroundPosition: '7% -25%' },
          '40%': { backgroundPosition: '20% 25%' },
          '50%': { backgroundPosition: '-25% 10%' },
          '60%': { backgroundPosition: '15% 5%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '25% 35%' },
          '90%': { backgroundPosition: '-10% 10%' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
