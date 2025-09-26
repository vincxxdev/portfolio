
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-background': 'var(--primary-background)',
        'secondary-background': 'var(--secondary-background)',
        'primary-text': 'var(--primary-text)',
        'secondary-text': 'var(--secondary-text)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-text': 'var(--accent-text)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { "border-color": "transparent" },
          "50%": { "border-color": "#2dd4bf" },
        },
        "fade-out-bck": {
          "0%": {
            transform: "translateZ(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateZ(-80px)",
            opacity: "0",
          },
        },
      },
      animation: {
        "content-fade-in": "fade-in 1s ease-in-out",
        typewriter: "typing 1.5s steps(9, end), blink-caret .75s step-end infinite",
        "fade-out-bck": "fade-out-bck 1s ease-in 1.5s both",
      },
    },
  },
  plugins: [],
}
export default config
