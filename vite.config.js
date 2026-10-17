import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sadam-family/',
  plugins: [react()],
  server: { host: true }
})
