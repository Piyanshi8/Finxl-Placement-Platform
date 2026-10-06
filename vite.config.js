import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      '/generate': 'http://127.0.0.1:5000',
      '/download': 'http://127.0.0.1:5000',
    },
  },
})
