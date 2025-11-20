import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Configuração extra para JSX Accessibility
    plugins: ['jsx-a11y'],
    rules: {
      // Corrige falsos positivos de aria-expanded dinâmico
      'jsx-a11y/aria-props': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
