// tailwind.config.ts
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Scan all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      // Optional: Add custom theme configurations here
      colors: {
        primary: '#15803d', // A green shade for agroecology theme
        secondary: '#4b5563', // A neutral gray for text
      },
    },
  },
  plugins: [typography], // Include the typography plugin for prose classes
} satisfies Config;