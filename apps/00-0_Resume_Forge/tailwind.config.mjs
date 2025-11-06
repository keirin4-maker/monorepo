/** @type {import('tailwindcss').Config} */
const config = {
  // This file is 100% standalone.
  // It has NO presets, NO require(), and NO dynamic paths.
  
  // These are the simple, relative paths that Tailwind
  // will scan, relative to this file's location.
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  
  // We provide a basic theme.
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;