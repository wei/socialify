/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes').dark,
          primary: '#661AE6',
          'primary-content': '#ffffff',
          success: '#36D399',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
