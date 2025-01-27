import path from "node:path";
/// <reference types="vitest/config" />
import {defineConfig, configDefaults} from "vitest/config";
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
        include: ["test/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
        exclude: [
            ...configDefaults.exclude,
            "**/src/component/element/**",
            "**/src/style/**",
            "**/src/**/*i18n.{js,jsx,ts,tsx}",
        ],
    },
    environments: {
        client: {
            dev: {
                /* 2025-01-27 Added by elo to suppress error message "to many files open".
                 * https://github.com/vitest-dev/vitest/issues/7345
                 */
                preTransformRequests: false
            }
        }
    }
})
