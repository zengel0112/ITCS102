import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: "/ITCS102/",
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
 
  server: {
    host: true,         // Allow access on phone
    port: 5173,
    strictPort: true,   // Prevent port hopping (mobile disconnect fix)
    hmr: {
      host: '192.168.1.226', // ← iPhone-т харагдах Mac-ийн жинхэнэ IP-г тавина
      protocol: 'ws',
      port: 5173,
    },
  },
  build: {
    // Performance optimizations
    minify: 'esbuild', // Faster than terser
    target: 'esnext', // Modern browsers
    cssCodeSplit: true, // Split CSS for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
