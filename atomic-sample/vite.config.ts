import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@templates': path.resolve(__dirname, 'src/components/templates'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
