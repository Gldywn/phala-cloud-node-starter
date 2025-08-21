import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  target: 'node22',
  outDir: 'dist',
  minify: false,
  skipNodeModulesBundle: true,
});
