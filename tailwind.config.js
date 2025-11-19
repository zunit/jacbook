/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // <-- REQUIRED for TS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
