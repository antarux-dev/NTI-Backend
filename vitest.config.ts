import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@utils': resolve(__dirname, './src/utils'),
      '@features': resolve(__dirname, './src/features'),
      '@config': resolve(__dirname, './src/config'),
      '@middleware': resolve(__dirname, './src/middleware'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
});
