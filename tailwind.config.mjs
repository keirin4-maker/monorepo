/** @type {import('tailwindcss').Config} */
export default {
  // Add all the paths Tailwind needs to watch for classes
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

