import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Configuration for the multi-page marketing site (perception.to)
// Handles multiple landing pages and routes while keeping assets organized
export default defineConfig({
  plugins: [
    react(),
    // Serve docsify documentation at /documentation
    {
      name: 'serve-documentation',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const fullUrl = req.url || '';
          // Strip query strings and get clean pathname
          const url = fullUrl.split('?')[0];

          // Handle /documentation requests
          if (url.startsWith('/documentation')) {
            // Redirect /documentation to /documentation/
            if (url === '/documentation') {
              res.writeHead(302, { Location: '/documentation/' });
              res.end();
              return;
            }

            // Map URL to file path in public folder
            let filePath = url === '/documentation/'
              ? path.join(process.cwd(), 'public', 'documentation', 'index.html')
              : path.join(process.cwd(), 'public', url);

            // Check if file exists and serve it
            if (fs.existsSync(filePath)) {
              const stat = fs.statSync(filePath);
              if (stat.isDirectory()) {
                filePath = path.join(filePath, 'index.html');
              }

              if (fs.existsSync(filePath)) {
                const ext = path.extname(filePath);
                const contentTypes: Record<string, string> = {
                  '.html': 'text/html; charset=utf-8',
                  '.md': 'text/plain; charset=utf-8',
                  '.css': 'text/css; charset=utf-8',
                  '.js': 'application/javascript; charset=utf-8',
                  '.json': 'application/json; charset=utf-8',
                  '.png': 'image/png',
                  '.jpg': 'image/jpeg',
                  '.jpeg': 'image/jpeg',
                  '.gif': 'image/gif',
                  '.svg': 'image/svg+xml',
                  '.ico': 'image/x-icon',
                  '.mp4': 'video/mp4',
                };

                const contentType = contentTypes[ext] || 'application/octet-stream';
                res.setHeader('Content-Type', contentType);
                res.setHeader('Cache-Control', 'no-cache');
                res.end(fs.readFileSync(filePath));
                return;
              }
            }
          }
          next();
        });
      },
    },
  ],
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
