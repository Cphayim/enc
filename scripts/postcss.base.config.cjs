const base = {
  plugins: {
    'tailwindcss/nesting': {},
  },
}

const baseWithTailwind = {
  plugins: {
    ...base.plugins,
    tailwindcss: {},
    'postcss-replace': {
      pattern: /(--tw|\*, ::before, ::after)/g,
      data: {
        '--tw': '--enc', // Prefixing
        '*, ::before, ::after': ':root', // So variables does not pollute every element
      },
    },
  },
}

module.exports = {
  base,
  baseWithTailwind,
}
