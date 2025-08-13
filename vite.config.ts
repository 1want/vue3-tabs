import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    dts({ entryRoot: 'src', outDir: 'lib', insertTypesEntry: true, copyDtsFiles: true })
  ],
  build: {
    // cssCodeSplit: true,
    rollupOptions: {
      external: [/^vue(\/.*)?$/],
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
