/** @type {import('tailwindcss').Config} */

// Teal ramp (primary) — top of the logo's gradient
const teal = {
  50: '#ecfdf9', 100: '#d1faf1', 200: '#a7f3e0', 300: '#6ee7cb',
  400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
  800: '#115e59', 900: '#134e4a', 950: '#042f2c',
};
// Blue ramp (secondary + brand accent) — bottom of the logo's gradient.
// Has a DEFAULT so `bg-blue` / `text-blue` work, plus full 50–950 shades
// so utilities like `from-blue-200`, `dark:bg-blue-900` resolve correctly.
const blue = {
  DEFAULT: '#2563eb',
  50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
  400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
  800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
};
// Navy ramp — deep teal-navy surfaces, matching the logo's dark backdrop.
// Has a DEFAULT so `bg-navy` / `text-navy` keep working as before, plus
// full 50–950 shades so utilities like `bg-navy-900`, `bg-navy-50` resolve.
// (Previously `navy` was a single hex string, so any `navy-###` shade
// utility silently failed to generate CSS — this is the root cause of
// text/backgrounds going missing in dark mode.)
const navy = {
  DEFAULT: '#0c1b2e',
  50: '#eef4f6', 100: '#d7e6ea', 200: '#b0cdd6', 300: '#82adba',
  400: '#4f7f8f', 500: '#2f5f6e', 600: '#1f4a57', 700: '#173b46',
  800: '#122f38', 900: '#0c1b2e', 950: '#070f1a',
};

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ramps used across the SaaS shell
        primary: teal,
        secondary: blue,
        accent: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
          800: '#92400e', 900: '#78350f', 950: '#451a03',
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
        // Oblig editorial tokens (single-value, used by name)
        cream: '#f3f7f9',   // cool off-white surface (light mode)
        paper: '#e8eef2',   // secondary light surface
        line: '#d3dfe6',    // hairline borders (light mode)
        navy: navy,         // deep navy-teal ramp — DEFAULT matches logo backdrop
        red: blue,          // brand accent ramp (was brick-red in GRCArc) — now logo blue
        ink: '#5b7280',     // muted body text (teal-grey)
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        grotesk: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '2px', md: '4px', lg: '6px', xl: '6px', '2xl': '6px', '3xl': '6px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(12,27,46,0.05)',
        card: '0 1px 3px rgba(12,27,46,0.06), 0 8px 24px -14px rgba(12,27,46,0.16)',
        glow: '0 0 0 1px rgba(45,212,191,0.20), 0 10px 30px -8px rgba(45,212,191,0.30)',
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
