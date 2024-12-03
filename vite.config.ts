import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import zipPack from "vite-plugin-zip-pack";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    zipPack({
      outFileName: 'dfw-frontend.zip',
    })
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
