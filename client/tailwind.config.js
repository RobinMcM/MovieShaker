/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#2e3840',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
