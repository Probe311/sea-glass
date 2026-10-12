import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/*/test/**/*.test.{js,mjs,ts}', 'packages/*/src/**/*.test.ts'],
    environment: 'node',
  },
});
