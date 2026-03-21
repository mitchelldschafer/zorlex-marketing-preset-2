/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "var(--color-dark)",
        "dark-surface": "var(--color-dark-surface)",
        light: "var(--color-light)",
        "light-surface": "var(--color-light-surface)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        muted: "var(--color-muted)",
        border: "var(--color-border)"
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      spacing: {
        'xs': "var(--space-xs)",
        's': "var(--space-s)",
        'm': "var(--space-m)",
        'l': "var(--space-l)",
        'xl': "var(--space-xl)",
        '2xl': "var(--space-2xl)",
        '3xl': "var(--space-3xl)",
        '4xl': "var(--space-4xl)",
        '5xl': "var(--space-5xl)",
      }
    },
  },
  plugins: [],
}
