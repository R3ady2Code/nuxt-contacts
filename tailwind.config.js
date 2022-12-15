/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#128C7E',
        secondary: '#075E54',
        lightGreen: '#25D366',
        blue: '#34B7F1',
        bgColor: '#fdfdfd',
      },
    },
  },
  plugins: [],
}
