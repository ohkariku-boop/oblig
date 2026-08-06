/** @type {import('tailwindcss').Config} */

// Navy ramp (primary) — the original `navy`
const navy = {
  50: '#eef1f7', 100: '#d9dfee', 200: '#b3bedd', 300: '#8a9dc7',
  400: '#5a73a8', 500: '#3a5588', 600: '#2a4170', 700: '#1b2a4a',
  800: '#16223d', 900: '#111a31', 950: '#0a0f1e',
};
// Brick-red ramp (secondary) — the original `red`
const red = {
  50: '#fbeeec', 100: '#f6d9d4', 200: '#ebb4ab', 300: '#dd8a7a',
  400: '#c95c47', 500: '#c4392e', 600: '#a82d24', 700: '#8a261f',
  800: '#71211d', 900: '#5e1e1b', 950: '#330d0b',
};

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ramps used across the SaaS shell
        primary: navy,
        secondary: red,
        accent: {
          50: '#fbf6e9', 100: '#f5ebc9', 200: '#ead48c', 300: '#ddb94d',
          400: '#d0a024', 500: '#b88810', 600: '#996e0c', 700: '#7c560d',
          800: '#66470f', 900: '#573d11', 950: '#321f06',
        },
        success: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d', 950: '#052e16',
        },
        warning: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
          800: '#92400e', 900: '#78350f', 950: '#451a03',
        },
        error: {
          50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
          400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
          800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a',
        },
        // original GRCArc editorial tokens (single-value, used by name)
        cream: '#faf7f0',
        paper: '#f5efe4',
        line: '#e6ddca',
        navy: '#1b2a4a',
        red: '#c4392e',
        ink: '#6a7993', // navy-soft
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '2px', md: '6px', lg: '8px', xl: '10px', '2xl': '12px', '3xl': '14px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,42,74,0.04)',
        card: '0 1px 3px rgba(27,42,74,0.05), 0 8px 24px -14px rgba(27,42,74,0.12)',
        glow: '0 0 0 1px rgba(196,57,46,0.18), 0 10px 30px -8px rgba(196,57,46,0.25)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'pulse-soft': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out', 'fade-up': 'fade-up 0.5s ease-out',
        shimmer: 'shimmer 1.8s infinite', 'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
