/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      transitionProperty: {
        size: 'height, width',
        spacing: 'margin, padding',
      },
    },
    fontFamily: {
      primary: ['Tektur'],
    },
  },
  plugins: [],
};
