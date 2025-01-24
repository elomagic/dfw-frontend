import path from "path";
/// <reference types="vitest/config" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            '@components': path.resolve(__dirname, './src/components'),
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
    }
})
