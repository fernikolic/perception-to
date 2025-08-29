import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Configuration for the multi-page marketing site (perception.to)
// Handles multiple landing pages and routes while keeping assets organized
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    hmr: {
      port: 5173,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Keep JavaScript bundles in their own directory
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        // Organize other assets by type
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) return 'css/[name][extname]';
          return 'assets/[name][extname]';
        },
      }
    },
  },
});
