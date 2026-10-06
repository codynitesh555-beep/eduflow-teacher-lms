import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ← this was missing! fixes CSS
  ],
  server: {
    port: 5173,
    strictPort: true
  }
})
