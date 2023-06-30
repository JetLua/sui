module.exports = {
  // prefix: 'tw-',
  content: [
    './src/**/*.{html,svelte,ts,css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00bcd4',
        'primary-dark': '#0baabe',
        gray: '#3b5d6e',
        'gray-dark': '#2d444f',
        red: '#e91e63',
        'blue-dark': '#1179cc',
        'blue-darker': '#1671b9',
      }
    },
  },
  corePlugins: {
    // preflight: false
  },
  plugins: [],
}
