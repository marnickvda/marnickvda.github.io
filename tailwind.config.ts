import { type Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        '2xs': '.6875rem',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Mona Sans"', '"Inter Variable"', 'ui-sans-serif', 'sans-serif'],
      },
      opacity: {
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
    },
  },
  plugins: [],
} satisfies Config
