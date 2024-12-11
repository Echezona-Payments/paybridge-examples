/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nue: "'Nue', sans-serif",
        inter: "Inter, sans-serif",
        poppins: "Poppins, sans-serif",
        syne: "Syne, sans-serif",
        mono: "'PT Mono', monospace",
        jakarta: "'Plus Jakarta Sans', sans-serif",
      },
    },
  },
  plugins: [],
}