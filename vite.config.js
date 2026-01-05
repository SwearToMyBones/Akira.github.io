import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Akira.github.io/', // <--- 这里！例如 '/my-endfield-blog/'
})
