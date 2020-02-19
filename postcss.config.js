module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer'),
    // ...
  ]
}

// this line from package.json
// "postcss": {
//   "plugins": {
//     "autoprefixer": {},
//     "tailwindcss": {}
//   }
// },