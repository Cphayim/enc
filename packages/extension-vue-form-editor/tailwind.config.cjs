// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  prefix: 'enc-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {},
  plugins: [],
}
