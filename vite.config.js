import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/end-of-world-character-sheet/',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  build: {
    // Ensure we're generating static build output
    outDir: 'dist',
    // Generate source maps for better debugging
    sourcemap: true,
    // Ensure assets are properly named and cached
    assetsDir: 'assets',
    // Log the build process
    reportCompressedSize: true,
    // Optimize chunks
    chunkSizeWarningLimit: 1000
  }
})
