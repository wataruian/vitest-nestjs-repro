import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    coverage: {
      clean: true,
      cleanOnRerun: true,
      enabled: true,
      exclude: ['src/main.ts', 'src/**/*.module.ts'],
      include: ['src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'clover', 'lcov', 'json'],
    },
    environment: 'node',
    globals: true,
  },
});
