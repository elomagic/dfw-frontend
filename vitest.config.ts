/// <reference types="vitest/config" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
    plugins: [
        nodePolyfills(),
        react()
    ],
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
    },
})
