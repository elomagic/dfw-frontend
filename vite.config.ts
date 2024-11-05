import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import zipPack from "vite-plugin-zip-pack";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
    zipPack({
      outFileName: 'dfw-frontend.zip',
    })
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
