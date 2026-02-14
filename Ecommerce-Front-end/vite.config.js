import { defineConfig } from 'vite' // Use 'vite' for the main config
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      '/images': {
        target: 'http://localhost:3000'
      },
    }
  },
  // Add the test section here
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  }
})