import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/quizzapp-bosque-como-recurso-natural/',
  plugins: [react(), tailwindcss()],
})
