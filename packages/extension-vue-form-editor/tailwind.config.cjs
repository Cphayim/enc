const plugin = require('tailwindcss/plugin')
const base = require('../../scripts/tailwind.base.config.cjs')

const columns = {}
for (let i = 1; i <= 24; i++) {
  const key = `${i}/24`
  columns[key] = `${(100 / 24) * i}%`
}

module.exports = {
  ...base,
  theme: {
    extend: {
      gridTemplateColumns: {
        // 24 column grid
        24: 'repeat(24, minmax(0, 1fr))',
      },
      width: columns,
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.clickable': {
          '@apply enc-cursor-pointer active:enc-brightness-75': {},
        },
      })
    }),
  ],
}
