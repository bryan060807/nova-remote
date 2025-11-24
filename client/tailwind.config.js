/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-850': '#1e1e1e',
        'brand-blue': '#3b82f6',
        'brand-purple': '#9333ea',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};
