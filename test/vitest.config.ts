import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

const frontendSrc = path.resolve(__dirname, '../frontend/src');

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportsDirectory: './reports/coverage',
      allowExternal: true,
      exclude: [
        '**/node_modules/**',
        '**/*.d.ts',
        '**/main.tsx',
        '**/*.test.{ts,tsx}',
        '**/*.spec.ts',
        '**/setup.ts',
        '**/vitest.config.ts',
        '**/playwright.config.ts',
        '**/reports/**',
        '**/src-bridge.ts',
      ]
    }
  },
  resolve: {
    alias: {
      '@': frontendSrc,
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
      'zustand': path.resolve(__dirname, './node_modules/zustand'),
      'lucide-react': path.resolve(__dirname, './node_modules/lucide-react')
    },
  },
});
