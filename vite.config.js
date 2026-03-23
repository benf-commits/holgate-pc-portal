import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/holgate-pc-portal/',
  test: {
    environment: 'node',
    globals: true,
  },
})
