import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/GDE-Gerenciamento-de-Defesa-de-Estagio/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        defesas: resolve(__dirname, 'defesas.html'),
        login: resolve(__dirname, 'login.html'),
        perfil: resolve(__dirname, 'perfil.html'),
        dashboard: resolve(__dirname, 'dashboard.html')
      }
    }
  },

  server: {
    open: true  // abre o navegador automaticamente
  },

  plugins: [
    tailwindcss(),
  ]
})
