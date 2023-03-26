/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // fontFamily: {
    //   'nunito': ['nunito', 'sans-serif'],
    //   'leagueSpartan': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    // },
      fontFamily: {
        'roboto': ['roboto', 'sans-serif']
      },
    extend: {
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')
  ],
};
