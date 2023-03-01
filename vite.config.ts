import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    outDir: 'lib',
    lib: {
      entry: './src/index.ts',
      name: 'V3Tabs',
      fileName: 'v3-tabs',
      formats: ['es']
    }
  }
})
