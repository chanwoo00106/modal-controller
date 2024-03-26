import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'es',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.{ts,tsx}', 'vitest.setup.tsx', 'vitest.config.ts'],
    }),
  ],
}
