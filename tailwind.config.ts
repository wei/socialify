import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
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
} satisfies Config
