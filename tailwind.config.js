/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     fontFamily:{
      poppins: ['Poppins', 'sans-serif'],
     }
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
    require('@tailwindcss/forms')

  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "acid", "halloween"],
  },
};
