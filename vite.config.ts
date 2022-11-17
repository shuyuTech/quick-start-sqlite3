import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    electron([
      // Main-Process entry file of the Electron App.
      { entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              external: Object.keys(pkg.dependencies)
            }
          }
        }},
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          options.reload()
        },
      },
    ]),
  ],
})
