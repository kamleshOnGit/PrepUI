/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => {
  const isLib = command === 'build';

  return {
    plugins: [react()],

    build: isLib
      ? {
          lib: {
            entry: path.resolve(dirname, 'src/index.ts'),
            name: 'PrepUI',
            formats: ['es', 'cjs'],
            fileName: (format) => `prepui.${format === 'es' ? 'mjs' : 'cjs'}`,
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
              assetFileNames: 'style.css',
            },
          },
          cssCodeSplit: false,
          sourcemap: true,
        }
      : {},

    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  };
});
