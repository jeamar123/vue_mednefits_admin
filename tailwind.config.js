const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  theme: {
    screens: {
      
      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }
      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }
      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }
      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      'xs': {'min':'220px', 'max': '480px'},

    },
    fontFamily: {
      display: ['Helvetica Medium', 'sans-serif'],
      body: ['Helvetica Light', 'sans-serif'],
    },
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          '100': '#0000001f',
          '500': '#ecf0f1',
          '900': '#666',
        },
        red: {
          ...colors.red,
          '500': '#ff6763'
        }
      }
    },
  },
  variants: {},
  plugins: []
}
