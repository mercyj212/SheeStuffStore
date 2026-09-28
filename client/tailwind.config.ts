import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette from user image
        midnight: {
          950: '#00030E', // Deepest Midnight Black
          900: '#0B0E1A', // Midnight Slate
        },
        plum: {
          900: '#2C1B2F', // Deep Royal Plum
          700: '#5E3A5C', // Muted Orchid Mauve
        },
        dustyRose: {
          500: '#B47A9A', // Dusty Rose Blossom
        },
        cream: {
          50: '#F3E9EC', // Soft Creamy Orchid White
        },
        brand: {
          50: '#F3E9EC',  // Soft background
          100: '#E6D7DE', // Light lavender border
          200: '#D4BAC7',
          300: '#C29DB0',
          400: '#B47A9A', // Primary Rose Accent
          500: '#8A5876',
          600: '#5E3A5C', // Mauve Orchid
          700: '#432843',
          800: '#2C1B2F', // Deep Plum
          900: '#0B0E1A', // Midnight Slate
          950: '#00030E', // Deepest Black
        },
      },
      fontFamily: {
        serif: ['"Melodrama"', 'Georgia', 'serif'],
        display: ['"Melodrama"', 'serif'],
        sans: ['"Switzer"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
