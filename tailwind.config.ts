import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          dark: '#0d2b1d',
        },
        sage: {
          DEFAULT: '#95D5B2',
          light: '#B7E4C7',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EAE0',
        },
        gold: {
          DEFAULT: '#D4A373',
          light: '#E9C46A',
        },
        charcoal: '#2B2D42',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, #0d2b1d 0%, #1B4332 50%, #2D6A4F 100%)',
        'premium-gradient': 'linear-gradient(160deg, #0d2b1d, #1B4332)',
        'dist-gradient': 'linear-gradient(160deg, #1B4332, #2D6A4F)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
