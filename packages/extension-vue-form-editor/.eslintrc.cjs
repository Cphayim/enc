module.exports = {
  root: true,
  extends: ['@ombro/eslint-config-vue3-typescript'],
  rules: {
    'prefer-const': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-model': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
