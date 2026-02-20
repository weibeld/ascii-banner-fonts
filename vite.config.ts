import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ascii-banner-fonts/',
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});