import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import zipPack from "vite-plugin-zip-pack";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    zipPack({
      outFileName: 'dfw-frontend.zip',
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  }
})
