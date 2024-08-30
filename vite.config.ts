import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from "vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ammr-ecommerce.runasp.net',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
