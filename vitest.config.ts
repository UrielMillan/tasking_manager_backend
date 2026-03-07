import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
    test: {
        environment: "node"
    },
    resolve: {
        alias: {
            '@domain': resolve(__dirname, './src/domain'),
            '@shared': resolve(__dirname, './src/shared')
        }
    }
})